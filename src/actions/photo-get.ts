import { PHOTO_GET } from "@/functions/api";
import apiError from "@/functions/api-error";
import { Photo } from "@/types/photo";

export type Comment = {
  comment_ID: string;
  comment_post_ID: string;
  comment_author: string;
  comment_content: string;
};

export type PhotoData = {
  photo: Photo;
  comments: Comment[];
};

export default async function photoGet(id: string) {
  try {
    const { url } = PHOTO_GET(id);

    const response = await fetch(url, {
      next: { revalidate: 60, tags: ["photos", "comment"] },
    });

    if (!response.ok) {
      throw new Error("Erro ao buscar foto");
    }

    const data = (await response.json()) as PhotoData;

    return {
      ok: true,
      data,
      error: "",
    };
  } catch (error: unknown) {
    return apiError(error, "Erro ao buscar foto");
  }
}
