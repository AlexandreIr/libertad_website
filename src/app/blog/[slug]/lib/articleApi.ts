import type { ApiComment, ApiPost, BlogPost, PagedResponse } from "./articleTypes";
import { getArrayContent, normalizePost } from "./articleFormatters";

export const revalidate = 60;

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "https://libertad-api.onrender.com";

async function fetchJson<T>(path: string): Promise<T | null> {
  try {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      next: { revalidate },
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) return null;

    return response.json() as Promise<T>;
  } catch (error) {
    console.error(`Erro ao buscar ${path}:`, error);
    return null;
  }
}

export async function getAllPosts(): Promise<BlogPost[]> {
  const data = await fetchJson<PagedResponse<ApiPost> | ApiPost[]>(
    "/posts?page=0&size=1000&sort=publishedAt,desc"
  );

  return getArrayContent(data)
    .map(normalizePost)
    .filter((post): post is BlogPost => Boolean(post))
    .sort((a, b) => {
      const dateA = new Date(a.publishedAt).getTime() || 0;
      const dateB = new Date(b.publishedAt).getTime() || 0;
      return dateB - dateA;
    });
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const decodedSlug = decodeURIComponent(slug);

  const directPost = await fetchJson<ApiPost>(
    `/posts/${encodeURIComponent(decodedSlug)}`
  );

  const normalizedDirectPost = directPost ? normalizePost(directPost) : null;

  if (normalizedDirectPost) {
    return normalizedDirectPost;
  }

  const posts = await getAllPosts();

  return posts.find((post) => post.slug === decodedSlug) ?? null;
}

export function getCommentsPath(postSlug: string, page: number, size: number) {
  return `/posts/${encodeURIComponent(
    postSlug
  )}/comments?page=${page}&size=${size}&sort=createdAt,desc`;
}

export function createCommentPath(postSlug: string) {
  return `/posts/${encodeURIComponent(postSlug)}/comments`;
}

export type CommentsResponse = PagedResponse<ApiComment> | ApiComment[];