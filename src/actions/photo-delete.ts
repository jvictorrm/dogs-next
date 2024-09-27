"use server";

import apiError from "@/functions/api-error";
import { PHOTO_DELETE } from "@/functions/api";
import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export default async function photoDelete(id: string) {
  const token = cookies().get("token")?.value;

  try {
    if (!token) {
      throw new Error("Token inválido.");
    }

    const { url } = PHOTO_DELETE(id);
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    if (!response.ok) {
      throw new Error("Erro ao tentar deletar foto.");
    }

    await response.json();
  } catch (error: unknown) {
    return apiError(error, "Erro ao tentar deletar foto.");
  }
  revalidateTag("photos");
  redirect("/conta");
}
