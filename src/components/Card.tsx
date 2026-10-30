import Image from "next/image";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
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
    <article className="reading-entry">
      {image && (
        <Image
          src={image}
          alt={title}
          width={480}
          height={260}
          sizes="(max-width: 600px) 100vw, 50vw"
        />
      )}
      {subtitle && <p className="entry-date">{subtitle}</p>}
      <h3>{link ? <Link href={link}>{title}</Link> : title}</h3>
      <p>{description}</p>
      {tags && <p className="entry-tags">{tags.join(" · ")}</p>}
      {(link || github) && (
        <div className="project-links">
          {link && link !== github && (
            <Link href={link}>
              Read more<span className="sr-only">: {title}</span>
            </Link>
          )}
          {github && (
            <a href={github} target="_blank" rel="noreferrer">
              <FaGithub aria-hidden="true" /> GitHub<span className="sr-only">: {title}, opens in a new tab</span>
            </a>
          )}
        </div>
      )}
    </article>
  );
}
