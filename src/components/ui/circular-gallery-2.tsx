"use client";

import { Camera, Mesh, Plane, Program, Renderer, Texture, Transform } from "ogl";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export interface GalleryItem { image: string; text: string; width: number; height: number }
interface CircularGalleryProps {
  items: GalleryItem[];
  bend?: number;
  borderRadius?: number;
  durationMs?: number;
  selected: number;
  onSelect: (index: number) => void;
  reducedMotion: boolean;
  className?: string;
}

/** Adapted from the user-supplied 21st.dev CircularGallery / OGL component.
 * Natural image geometry replaces uniform cropped planes; input stays local,
 * DOM controls/captions remain accessible, and GPU resources are disposed. */
export function CircularGallery({ items, bend = 1.1, borderRadius = 0.015, durationMs = 820, selected, onSelect, reducedMotion, className }: CircularGalleryProps) {
  const container = useRef<HTMLDivElement>(null);
  const navigate = useRef<((index: number) => void) | null>(null);
  const selection = useRef(selected);
  const callbacks = useRef({ onSelect });
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  useEffect(() => { callbacks.current = { onSelect }; }, [onSelect]);
  useEffect(() => { selection.current = selected; navigate.current?.(selected); }, [selected]);

  useEffect(() => {
    const element = container.current;
    if (!element) return;
    let renderer: Renderer;
    try { renderer = new Renderer({ alpha: true, antialias: true, dpr: Math.min(window.devicePixelRatio || 1, 1.5) }); }
    catch { setFailed(true); return; }
    const gl = renderer.gl;
    const canvas = gl.canvas as HTMLCanvasElement;
    canvas.setAttribute("aria-hidden", "true");
    element.appendChild(canvas);
    gl.clearColor(0, 0, 0, 0);
    const camera = new Camera(gl, { fov: 45 });
    camera.position.z = 20;
    const scene = new Transform();
    const geometry = new Plane(gl, { widthSegments: 28, heightSegments: 16 });
    let disposed = false, raf = 0, visible = false, current = 0, target = 0, total = 1, time = 0, lastTime = 0;
    let inMotion = false, dragging = false, startX = 0, startScroll = 0, dragDistance = 0;
    let worldWidth = 1, worldHeight = 1, settledIndex = selection.current;
    let glideFrom = 0, glideElapsed = 0, deformation = 0;
    const media = items.map((item, index) => {
      const texture = new Texture(gl, { generateMipmaps: false });
      const program = new Program(gl, {
        depthTest: false, depthWrite: false, transparent: true,
        vertex: `attribute vec3 position; attribute vec2 uv;
          uniform mat4 modelViewMatrix; uniform mat4 projectionMatrix;
          uniform float uTime; uniform float uSpeed; varying vec2 vUv;
          void main(){ vUv=uv; vec3 p=position;
            p.z=(sin(p.x*4.0+uTime)+cos(p.y*2.0+uTime))*uSpeed;
            gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.0); }`,
        fragment: `precision highp float; uniform sampler2D tMap; uniform float uRadius; uniform float uLoaded; uniform float uAspect; varying vec2 vUv;
          void main(){ if(uLoaded<0.5) discard;
            vec2 p=(vUv-0.5)*vec2(uAspect,1.0); vec2 b=vec2(uAspect,1.0)*0.5-uRadius;
            vec2 d=abs(p)-b; float edge=length(max(d,0.0))+min(max(d.x,d.y),0.0)-uRadius;
            vec4 color=texture2D(tMap,vUv); gl_FragColor=vec4(color.rgb,color.a*(1.0-smoothstep(-0.002,0.002,edge))); }`,
        uniforms: { tMap: { value: texture }, uTime: { value: 0 }, uSpeed: { value: 0 }, uRadius: { value: borderRadius }, uLoaded: { value: 0 }, uAspect: { value: item.width / item.height } },
      });
      const mesh = new Mesh(gl, { geometry, program });
      mesh.setParent(scene);
      const image = new window.Image();
      image.onload = () => { if (!disposed) { texture.image = image; program.uniforms.uLoaded.value = 1; requestPaint(); } };
      image.onerror = () => { if (!disposed) { setFailed(true); } };
      image.src = item.image;
      return { mesh, program, texture, image, index, center: 0, width: 1 };
    });

    function wrap(value: number) { return ((value + total / 2) % total + total) % total - total / 2; }
    function nearest(position = current) { let best = 0, distance = Infinity; media.forEach(m => { const d = Math.abs(wrap(m.center - position)); if (d < distance) { distance = d; best = m.index; } }); return best; }
    function requestPaint() { if (!disposed && !raf && visible && !document.hidden) raf = requestAnimationFrame(paint); }
    function paint(now: number) {
      raf = 0;
      if (disposed || !visible || document.hidden) return;
      const dt = lastTime ? Math.min((now - lastTime) / 1000, 0.05) : 1 / 60;
      lastTime = now; time += dt;
      const previous = current;
      glideElapsed += dt;
      const progress = Math.min(1, glideElapsed * 1000 / durationMs);
      const eased = 1 - Math.pow(1 - progress, 4);
      current = reducedMotion || dragging ? target : glideFrom + (target - glideFrom) * eased;
      if (progress === 1 || Math.abs(target - current) < 0.0001) current = target;
      const speed = reducedMotion ? 0 : Math.min(Math.abs(current - previous) / dt * 0.002, 0.025);
      deformation += (speed - deformation) * (1 - Math.exp(-12 * dt));
      if (current === target && !dragging) deformation = 0;
      media.forEach(m => {
        const x = wrap(m.center - current);
        m.mesh.position.x = x;
        const half = worldWidth / 2, amount = reducedMotion ? 0 : bend;
        const radius = amount ? (half * half + amount * amount) / (2 * amount) : 1;
        const effective = Math.min(Math.abs(x), half);
        m.mesh.position.y = amount ? -(radius - Math.sqrt(Math.max(0, radius * radius - effective * effective))) : 0;
        m.mesh.rotation.z = amount ? -Math.sign(x) * Math.asin(Math.min(effective / radius, 1)) : 0;
        m.program.uniforms.uTime.value = time;
        m.program.uniforms.uSpeed.value = deformation;
      });
      renderer.render({ scene, camera });
      if (inMotion && !dragging && current === target) { inMotion = false; const next = nearest(); if (next !== settledIndex) { settledIndex = next; callbacks.current.onSelect(next); } }
      if (current !== target || dragging) requestPaint();
    }
    function resize() {
      const width = element!.clientWidth, height = element!.clientHeight;
      if (!width || !height) return;
      renderer.setSize(width, height); camera.perspective({ aspect: width / height });
      worldHeight = 2 * Math.tan(camera.fov * Math.PI / 360) * camera.position.z;
      worldWidth = worldHeight * camera.aspect;
      let offset = 0;
      media.forEach(m => {
        const aspect = items[m.index].width / items[m.index].height;
        const h = Math.min(worldHeight * 0.76, worldHeight * 1.02 / aspect, worldWidth * 0.74 / aspect), w = h * aspect;
        m.mesh.scale.set(w, h, 1); m.width = w; m.center = offset + w / 2;
        offset += w + worldHeight * 0.09;
      });
      total = offset;
      current = target = glideFrom = media[settledIndex]?.center ?? 0;
      glideElapsed = durationMs / 1000;
      requestPaint();
    }
    function glide(position: number) { glideFrom = current; glideElapsed = 0; lastTime = 0; target = position; inMotion = true; requestPaint(); }
    navigate.current = index => { settledIndex = index; glide(current + wrap(media[index].center - current)); };
    function down(event: PointerEvent) {
      if (event.button !== 0) return;
      dragging = true; startX = event.clientX; startScroll = current; target = current; dragDistance = 0;
      element!.setPointerCapture(event.pointerId);
    }
    function move(event: PointerEvent) { if (!dragging) return; dragDistance = event.clientX - startX; target = startScroll - dragDistance / element!.clientWidth * worldWidth; requestPaint(); }
    function up() {
      if (!dragging) return;
      dragging = false; current = reducedMotion ? target : current;
      const next = nearest(target); glide(current + wrap(media[next].center - current));
    }
    function visibility() { if (document.hidden) { cancelAnimationFrame(raf); raf = 0; lastTime = 0; } else requestPaint(); }
    const observer = new ResizeObserver(resize); observer.observe(element);
    const intersection = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; if (!visible) { cancelAnimationFrame(raf); raf = 0; lastTime = 0; } else requestPaint(); }); intersection.observe(element);
    element.addEventListener("pointerdown", down); element.addEventListener("pointermove", move); element.addEventListener("pointerup", up); element.addEventListener("pointercancel", up);
    document.addEventListener("visibilitychange", visibility);
    const contextLost = (event: Event) => { event.preventDefault(); setFailed(true); };
    canvas.addEventListener("webglcontextlost", contextLost);
    resize(); setReady(true);
    return () => {
      disposed = true; navigate.current = null; cancelAnimationFrame(raf);
      observer.disconnect(); intersection.disconnect(); document.removeEventListener("visibilitychange", visibility);
      element.removeEventListener("pointerdown", down); element.removeEventListener("pointermove", move); element.removeEventListener("pointerup", up); element.removeEventListener("pointercancel", up); canvas.removeEventListener("webglcontextlost", contextLost);
      media.forEach(m => { m.image.onload = null; m.image.onerror = null; gl.deleteTexture(m.texture.texture); gl.deleteProgram(m.program.program); }); geometry.remove(); canvas.remove();
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [items, bend, borderRadius, durationMs, reducedMotion]);

  return <div className={cn("circular-gallery", className)}>
    <div ref={container} className="circular-gallery-canvas" style={{ display: failed ? "none" : undefined }} aria-hidden="true" />
    {(!ready || failed) && <div className="gallery-fallback"><img src={items[selected].image} alt={items[selected].text} /></div>}
  </div>;
}
