import type { IconType } from "react-icons";
import { SiPython, SiPytorch, SiTensorflow, SiOpencv, SiLangchain, SiMlflow, SiOnnx, SiPostgresql, SiNeo4J, SiApachespark, SiTypescript, SiGooglecloud, SiGithub, SiDocker, SiMqtt } from "react-icons/si";
import { FaAws } from "react-icons/fa";
import { Cpu, Database, Workflow, Trees, GitBranch, Radio, SlidersHorizontal, Activity } from "lucide-react";
import { technicalSkills } from "@/lib/profile";

// Use real brand marks where available; general methods and industrial systems
// retain their names beside a neutral technical symbol rather than a fabricated logo.
const marks: Record<string, IconType> = {
  Python: SiPython, PyTorch: SiPytorch, TensorFlow: SiTensorflow,
  XGBoost: GitBranch, "Random Forest": Trees, OpenCV: SiOpencv,
  LangChain: SiLangchain, MLflow: SiMlflow, ONNX: SiOnnx,
  SQL: Database, PostgreSQL: SiPostgresql, Neo4j: SiNeo4J,
  PySpark: SiApachespark, TypeScript: SiTypescript, GCP: SiGooglecloud,
  AWS: FaAws, GitHub: SiGithub, Docker: SiDocker, MQTT: SiMqtt,
  Ignition: Workflow, DeltaV: SlidersHorizontal, "Honeywell Experion": Activity,
  "Allen Bradley": Cpu, "RSLogix 500": Radio,
};

export default function TechnicalSkills() {
  return <dl className="process-resume-skills">
    {technicalSkills.map(({ area, tools }) => <div key={area} data-process-item>
      <dt>{area}</dt>
      <dd><ul className="technical-tools" aria-label={area}>
        {tools.replace(/\.$/, "").split(", ").map(name => {
          const Mark = marks[name] ?? Cpu;
          return <li key={name}><Mark aria-hidden="true" /><span>{name}</span></li>;
        })}
      </ul></dd>
    </div>)}
  </dl>;
}
