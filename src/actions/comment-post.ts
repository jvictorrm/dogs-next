"use server";

import apiError from "@/functions/api-error";
import { COMMENT_POST } from "@/functions/api";
import { cookies } from "next/headers";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { Comment } from "./photo-get";

export default async function commentPost(state: {}, formData: FormData) {
  const token = cookies().get("token")?.value;
  const comment = formData.get("comment") as string | null;
  const id = formData.get("id") as string | null;

  try {
    if (!token || !comment || !id) {
      throw new Error("Preencha os dados.");
    }

    const { url } = COMMENT_POST(id);
    const response = await fetch(url, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    if (!response.ok) {
      throw new Error("E-mail ou usuário já cadastrado.");
    }

    const data = (await response.json()) as Comment;
    revalidatePath("comment");
    return { data, ok: true, error: "" };
  } catch (error: unknown) {
    return apiError(error, "Erro ao tentar comentar foto");
  }
}
