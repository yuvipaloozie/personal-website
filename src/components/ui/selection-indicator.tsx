"use client";

import { useLayoutEffect, useRef } from "react";

/** One moving surface explains selection; the real links/buttons keep focus. */
export function SelectionIndicator({ value, selector = '[aria-pressed="true"]' }: {
  value: string;
  selector?: string;
}) {
  const surface = useRef<HTMLSpanElement>(null);
  const animation = useRef<Animation | null>(null);

  useLayoutEffect(() => {
    const element = surface.current;
    const group = element?.parentElement;
    if (!element || !group) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const ambient = document.querySelector(".ambient-research");

    function place(animate: boolean) {
      const selected = group!.querySelector<HTMLElement>(selector);
      if (!selected) {
        animation.current?.cancel();
        element!.hidden = true;
        element!.dataset.ready = "false";
        return;
      }
      const before = element!.getBoundingClientRect();
      const bounds = group!.getBoundingClientRect();
      const target = selected.getBoundingClientRect();
      if (!target.width || !target.height) {
        animation.current?.cancel();
        element!.hidden = true;
        element!.dataset.ready = "false";
        return;
      }
      const ready = element!.dataset.ready === "true";
      animation.current?.cancel();
      element!.hidden = false;
      const x = target.left - bounds.left;
      const y = target.top - bounds.top;
      element!.style.width = `${target.width}px`;
      element!.style.height = `${target.height}px`;
      element!.style.transform = `translate(${x}px, ${y}px)`;
      element!.dataset.ready = "true";
      if (animate && ready && before.width && !preference.matches && !document.hidden
        && ambient?.getAttribute("data-paused") !== "true") {
        animation.current = element!.animate([
          { transform: `translate(${before.left - bounds.left}px, ${before.top - bounds.top}px) scale(${before.width / target.width}, ${before.height / target.height})` },
          { transform: `translate(${x}px, ${y}px) scale(1)` },
        ], { duration: 240, easing: "cubic-bezier(.16, 1, .3, 1)" });
      }
    }

    function finish() { animation.current?.cancel(); }
    place(true);
    let observed = false;
    const resize = new ResizeObserver(() => {
      if (observed) place(false);
      observed = true;
    });
    resize.observe(group);
    const selected = group.querySelector<HTMLElement>(selector);
    if (selected) resize.observe(selected);
    const pause = new MutationObserver(finish);
    if (ambient) pause.observe(ambient, { attributes: true, attributeFilter: ["data-paused"] });
    preference.addEventListener("change", finish);
    document.addEventListener("visibilitychange", finish);
    return () => {
      resize.disconnect(); pause.disconnect();
      preference.removeEventListener("change", finish);
      document.removeEventListener("visibilitychange", finish);
      // Leave the current transform available to an interrupted selection change.
    };
  }, [value, selector]);

  useLayoutEffect(() => () => animation.current?.cancel(), []);

  return <span ref={surface} hidden className="selection-indicator" aria-hidden="true" />;
}
