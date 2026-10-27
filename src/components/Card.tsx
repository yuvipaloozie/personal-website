import Image from "next/image";
import Link from "next/link";
export default function Card({
  title,
  subtitle,
  description,
  tags,
  link,
  image,
  github,
}: {
  title: string;
  subtitle?: string;
  description: string;
  tags?: string[];
  link?: string;
  image?: string;
  github?: string;
}) {
  return (
    <article className="project-card">
      {image && (
        <div className="card-image">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 600px) 100vw, 50vw"
          />
        </div>
      )}
      {subtitle && <div className="eyebrow">{subtitle}</div>}
      <h3>{link ? <Link href={link}>{title}</Link> : title}</h3>
      <p>{description}</p>
      {tags && (
        <div className="tags">
          {tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      )}
      {(link || github) && (
        <div className="card-links">
          {link && (
            <Link href={link}>
              Read project ↗<span className="sr-only">: {title}</span>
            </Link>
          )}
          {github && (
            <a href={github} target="_blank" rel="noreferrer">
              Source code ↗<span className="sr-only">: {title}</span>
            </a>
          )}
        </div>
      )}
    </article>
  );
}
