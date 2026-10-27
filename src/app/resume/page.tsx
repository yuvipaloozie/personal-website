import type { Metadata } from "next";
import PrintResume from "@/components/PrintResume";
import Card from "@/components/Card";
import AnimateIn from "@/components/AnimateIn";
import { graphData } from "@/data/graphData";

export const metadata: Metadata = {
  title: "Résumé",
  description:
    "Education, experience, and technical skills of Yuvraj Tripathy, process automation engineer and Georgia Tech Data Science graduate student.",
};
export default function Resume() {
  const expNodes = graphData.nodes.filter(
    (n) => n.type === "detail" && n.id.startsWith("e_"),
  );

  return (
    <div className="container section">
      <AnimateIn
        delay={0.1}
        style={{ textAlign: "center", marginBottom: "4rem" }}
      >
        <h1
          className="section-title"
          style={{ marginBottom: "1rem", border: "none" }}
        >
          resume
        </h1>
        <p
          style={{
            fontSize: "1.05rem",
            marginBottom: "2rem",
            color: "var(--text-muted)",
          }}
        >
          yuvraj.tripathy@outlook.com | Atlanta, GA
        </p>
        <PrintResume />
      </AnimateIn>

      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <AnimateIn delay={0.2}>
          <h2
            style={{
              borderBottom: "1px solid var(--card-border)",
              paddingBottom: "0.75rem",
              marginBottom: "2rem",
              fontSize: "2rem",
              fontWeight: 800,
              letterSpacing: "-0.03em",
            }}
          >
            Education
          </h2>
          <div style={{ marginBottom: "4rem" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "0.5rem",
              }}
            >
              <h3 style={{ margin: 0, fontSize: "1.4rem", fontWeight: 700 }}>
                Georgia Institute of Technology
              </h3>
              <span style={{ color: "var(--text-muted)", fontWeight: 600 }}>
                Atlanta, GA
              </span>
            </div>
            <p
              style={{
                margin: 0,
                fontSize: "1.1rem",
                color: "var(--text-color)",
              }}
            >
              <strong>MSc. Data Science</strong>
            </p>
            <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
              May 2027
            </p>

            <p
              style={{
                margin: "1.5rem 0 0 0",
                fontSize: "1.1rem",
                color: "var(--text-color)",
              }}
            >
              <strong>BSc. Chemical and Biomolecular Engineering</strong>
            </p>
            <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
              May 2024
            </p>
          </div>
        </AnimateIn>

        <AnimateIn delay={0.3}>
          <h2
            style={{
              borderBottom: "1px solid var(--card-border)",
              paddingBottom: "0.75rem",
              marginBottom: "2rem",
              fontSize: "2rem",
              fontWeight: 800,
              letterSpacing: "-0.03em",
            }}
          >
            Experience
          </h2>
          <div className="grid" style={{ gap: "2.5rem", marginBottom: "4rem" }}>
            {expNodes.map((node, i) => (
              <Card
                key={node.id}
                title={node.details!.title}
                subtitle={node.details!.subtitle}
                description={node.details!.description}
              />
            ))}
          </div>
        </AnimateIn>

        <AnimateIn delay={0.4}>
          <h2
            style={{
              borderBottom: "1px solid var(--card-border)",
              paddingBottom: "0.75rem",
              marginBottom: "2rem",
              fontSize: "2rem",
              fontWeight: 800,
              letterSpacing: "-0.03em",
            }}
          >
            Technical Skills
          </h2>
          <div
            style={{
              background: "var(--card-bg)",
              padding: "2.5rem",
              borderRadius: "var(--radius)",
              border: "1px solid var(--card-border)",
              boxShadow: "var(--card-shadow)",
              marginBottom: "4rem",
            }}
          >
            <p
              style={{
                marginBottom: "1.25rem",
                fontSize: "1.1rem",
                color: "var(--text-color)",
                fontWeight: 700,
              }}
            >
              Data Science / Machine Learning
            </p>
            <div
              style={{
                display: "flex",
                gap: "0.6rem",
                flexWrap: "wrap",
                marginBottom: "2.5rem",
              }}
            >
              {[
                "Python",
                "Pandas",
                "NumPy",
                "Scikit",
                "TensorFlow",
                "PyTorch",
                "SQL",
                "TypeScript",
                "Tableau",
                "PowerBI",
                "Time-Series Modeling",
                "OCR",
              ].map((skill) => (
                <span
                  key={skill}
                  style={{
                    backgroundColor: "rgba(99, 102, 241, 0.08)",
                    color: "var(--accent-color)",
                    padding: "0.4rem 1rem",
                    borderRadius: "10px",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>

            <p
              style={{
                marginBottom: "1.25rem",
                fontSize: "1.1rem",
                color: "var(--text-color)",
                fontWeight: 700,
              }}
            >
              Engineering / Automation
            </p>
            <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap" }}>
              {[
                "DeltaV",
                "Honeywell Experion",
                "RSLogix 5000",
                "SolidWorks",
                "AutoCAD",
                "Eaton",
              ].map((skill) => (
                <span
                  key={skill}
                  style={{
                    backgroundColor: "rgba(99, 102, 241, 0.08)",
                    color: "var(--accent-color)",
                    padding: "0.4rem 1rem",
                    borderRadius: "10px",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </AnimateIn>
      </div>
    </div>
  );
}
