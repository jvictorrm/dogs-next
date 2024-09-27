import { PHOTOS_GET } from "@/functions/api";
import apiError from "@/functions/api-error";
import { Photo } from "@/types/photo";

type PhotosGetParams = {
  page?: number;
  total?: number;
  user?: 0 | string;
};

export default async function photosGet(
  { page = 1, total = 6, user = 0 }: PhotosGetParams = {},
  optionsFront?: RequestInit
) {
  try {
    const options = optionsFront || {
      next: { revalidate: 10, tags: ["photos"] },
    };

    const { url } = PHOTOS_GET({ page, total, user });

    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error("Erro ao buscar feed de fotos");
    }

    const data = (await response.json()) as Photo[];

    return {
      ok: true,
      data,
      error: "",
    };
  } catch (error: unknown) {
    return apiError(error, "Erro ao buscar feed de fotos");
  }
}
