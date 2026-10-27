import AnimateIn from "@/components/AnimateIn";
import { graphData } from "@/data/graphData";
import Link from "next/link";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  const nodes = graphData.nodes.filter(
    (n) =>
      n.type === "detail" &&
      n.id.startsWith("e_") &&
      n.details?.link?.startsWith("/experience/"),
  );
  return nodes.map((node) => {
    const slug = node.details?.link?.split("/").pop();
    return { slug };
  });
}

export default async function ExperiencePost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const node = graphData.nodes.find(
    (n) => n.type === "detail" && n.details?.link === `/experience/${slug}`,
  );

  if (!node || !node.details) {
    notFound();
  }

  const { title, subtitle, image, description, fullDescription, tags } =
    node.details;

  return (
    <div className="container section">
      <AnimateIn delay={0.1}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <Link
            href="/resume"
            style={{
              color: "var(--accent-color)",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              fontWeight: 600,
              display: "inline-block",
              marginBottom: "2rem",
              textDecoration: "none",
            }}
          >
            &larr; Back to Resume
          </Link>

          {image && (
            <div
              style={{
                marginBottom: "2rem",
                border: "1px solid var(--card-border)",
                padding: "0.5rem",
                background: "var(--bg-color)",
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "-5px",
                  left: "-5px",
                  width: "10px",
                  height: "10px",
                  borderTop: "2px solid var(--accent-color)",
                  borderLeft: "2px solid var(--accent-color)",
                }}
              ></div>
              <div
                style={{
                  position: "absolute",
                  bottom: "-5px",
                  right: "-5px",
                  width: "10px",
                  height: "10px",
                  borderBottom: "2px solid var(--accent-color)",
                  borderRight: "2px solid var(--accent-color)",
                }}
              ></div>
              <img
                src={image}
                alt={title}
                style={{
                  width: "100%",
                  height: "400px",
                  objectFit: "cover",
                  display: "block",
                  filter: "contrast(1.1) grayscale(0.2)",
                }}
              />
            </div>
          )}

          <h1
            style={{
              fontSize: "2.5rem",
              marginBottom: "0.5rem",
              color: "var(--text-color)",
            }}
          >
            {title}
          </h1>
          <h2
            style={{
              color: "var(--accent-color)",
              fontSize: "1.2rem",
              marginBottom: "2rem",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}
          >
            {subtitle}
          </h2>

          <div
            style={{
              borderLeft: "3px solid var(--card-border)",
              paddingLeft: "1.5rem",
              marginBottom: "2rem",
            }}
          >
            <p style={{ fontSize: "1.2rem", color: "var(--text-muted)" }}>
              {description}
            </p>
          </div>

          <div
            style={{
              fontSize: "1.1rem",
              lineHeight: 1.8,
              color: "var(--text-color)",
            }}
          >
            {fullDescription?.map((p, idx) => (
              <p key={idx} style={{ marginBottom: "1.5rem" }}>
                {p}
              </p>
            ))}
          </div>

          {tags && tags.length > 0 && (
            <div
              style={{
                display: "flex",
                gap: "0.5rem",
                flexWrap: "wrap",
                marginTop: "2rem",
              }}
            >
              {tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontSize: "0.8rem",
                    border: "1px dashed var(--accent-color)",
                    color: "var(--accent-color)",
                    padding: "0.2rem 0.5rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    fontFamily: "'IBM Plex Mono', monospace",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </AnimateIn>
    </div>
  );
}
