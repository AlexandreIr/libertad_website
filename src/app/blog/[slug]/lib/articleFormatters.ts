import sanitizeHtml from "sanitize-html";
import type {
  ApiComment,
  ApiPost,
  BlogComment,
  BlogPost,
  Category,
  HeadingItem,
  PagedResponse,
} from "./articleTypes";

export function getArrayContent<T>(data: PagedResponse<T> | T[] | undefined | null): T[] {
  if (!data) return [];
  if (Array.isArray(data)) return data;
  return data.content ?? [];
}

export function stripHtml(value: string): string {
  return value.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
}

export function createSlug(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export function formatDate(date: string): string {
  if (!date) return "Data não informada";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Data não informada";
  }

  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(parsedDate);
}

function normalizeCategories(post: ApiPost): Category[] {
  if (Array.isArray(post.categories)) return post.categories;

  if (post.categories && !Array.isArray(post.categories)) {
    return [post.categories];
  }

  if (post.category) return [post.category];

  return [];
}

function estimateReadTime(post: ApiPost, summary: string, content: string): string {
  if (post.readTime) return post.readTime;
  if (post.readingTime) return post.readingTime;

  const baseText = stripHtml(`${post.title ?? ""} ${summary} ${content}`);
  const words = baseText.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 200));

  return `${minutes} min de leitura`;
}

export function normalizePost(post: ApiPost): BlogPost | null {
  if (!post.title || !post.slug) return null;

  const summary = post.summary ?? post.sumary ?? post.excerpt ?? "";
  const content = post.content ?? "";
  const publishedAt = post.publishedAt ?? post.createdAt ?? post.updatedAt ?? "";
  const coverImageUrl = post.coverImageUrl ?? post.coverImage ?? post.image ?? "";

  return {
    id: post.id,
    title: post.title,
    slug: post.slug,
    summary,
    content,
    coverImageUrl,
    publishedAt,
    readTime: estimateReadTime(post, summary, content),
    categories: normalizeCategories(post),
  };
}

export function normalizeComment(comment: ApiComment): BlogComment {
  return {
    id: comment.id ?? crypto.randomUUID(),
    authorName: comment.authorName?.trim() || "Leitor",
    content: comment.content ?? "",
    createdAt: comment.createdAt ?? "",
  };
}

export function prepareArticleHtml(content: string): {
  html: string;
  headings: HeadingItem[];
} {
  const headings: HeadingItem[] = [];

  const sanitizedHtml = sanitizeHtml(content, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat([
  "img",
  "figure",
  "figcaption",
  "video",
  "source",
  "iframe",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "span",
]),
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      "*": ["class", "id"],
      a: ["href", "name", "target", "rel"],
      img: ["src", "alt", "title", "width", "height", "loading"],
      video: ["src", "controls", "poster", "width", "height"],
      source: ["src", "type"],
      iframe: [
        "src",
        "width",
        "height",
        "allow",
        "allowfullscreen",
        "frameborder",
        "title",
      ],
    },
    allowedSchemes: ["http", "https", "mailto", "tel", "data"],
    allowedIframeHostnames: ["www.youtube.com", "youtube.com", "player.vimeo.com"],
    transformTags: {
      a: (tagName, attribs) => ({
        tagName,
        attribs: {
          ...attribs,
          target: attribs.target ?? "_blank",
          rel: "noopener noreferrer",
        },
      }),
      img: (tagName, attribs) => ({
        tagName,
        attribs: {
          ...attribs,
          loading: attribs.loading ?? "lazy",
        },
      }),
    },
  });

  const headingCounters = [0, 0, 0, 0, 0, 0];

const htmlWithHeadingIds = sanitizedHtml.replace(
  /<(h[1-6])([^>]*)>(.*?)<\/\1>/gi,
  (match, tag, attributes, innerHtml) => {
    const level = Number(tag.replace("h", "")) as 1 | 2 | 3 | 4 | 5 | 6;
    const text = stripHtml(innerHtml);

    if (!text) return match;

    headingCounters[level - 1] += 1;

    for (let index = level; index < headingCounters.length; index += 1) {
      headingCounters[index] = 0;
    }

    const number = headingCounters
      .slice(0, level)
      .filter((item) => item > 0)
      .join(".");

    const baseId = createSlug(text) || `secao-${headings.length + 1}`;

    const duplicatedCount = headings.filter((heading) =>
      heading.id.startsWith(baseId)
    ).length;

    const id = duplicatedCount > 0 ? `${baseId}-${duplicatedCount + 1}` : baseId;

    headings.push({
      id,
      text,
      level,
      number,
    });

    const attributesWithoutId = attributes.replace(/\s+id=["'][^"']*["']/i, "");

    return `<${tag}${attributesWithoutId} id="${id}">${innerHtml}</${tag}>`;
  }
);

  return {
    html: htmlWithHeadingIds,
    headings,
  };
}