import type { IconType } from "react-icons";
import { SiPython, SiPytorch, SiTensorflow, SiOpencv, SiLangchain, SiMlflow, SiOnnx, SiPostgresql, SiNeo4J, SiApachespark, SiTypescript, SiGooglecloud, SiGithub, SiDocker, SiMqtt } from "react-icons/si";
import { FaAws } from "react-icons/fa";
import { technicalSkills } from "@/lib/profile";

// Real brand marks aid scanning; method and system names need no stand-in symbol.
const marks: Record<string, IconType> = {
  Python: SiPython, PyTorch: SiPytorch, TensorFlow: SiTensorflow,
  OpenCV: SiOpencv,
  LangChain: SiLangchain, MLflow: SiMlflow, ONNX: SiOnnx,
  PostgreSQL: SiPostgresql, Neo4j: SiNeo4J,
  PySpark: SiApachespark, TypeScript: SiTypescript, GCP: SiGooglecloud,
  AWS: FaAws, GitHub: SiGithub, Docker: SiDocker, MQTT: SiMqtt,
};

export default function TechnicalSkills() {
  return <dl className="process-resume-skills">
    {technicalSkills.map(({ area, tools }) => <div key={area} data-process-item>
      <dt>{area}</dt>
      <dd><ul className="technical-tools" aria-label={area}>
        {tools.replace(/\.$/, "").split(", ").map(name => {
          const Mark = marks[name];
          return <li key={name}>{Mark && <Mark aria-hidden="true" />}<span>{name}</span></li>;
        })}
      </ul></dd>
    </div>)}
  </dl>;
}
