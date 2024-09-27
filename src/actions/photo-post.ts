"use server";

import apiError from "@/functions/api-error";
import { PHOTO_POST } from "@/functions/api";
import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export default async function photoPost(state: {}, formData: FormData) {
  const token = cookies().get("token")?.value;
  const nome = formData.get("nome") as string | null;
  const idade = formData.get("idade") as string | null;
  const peso = formData.get("peso") as string | null;
  const img = formData.get("img") as File;

  try {
    if (!nome || !peso || !idade || img.size === 0) {
      throw new Error("Preencha os dados.");
    }

    const { url } = PHOTO_POST();
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

    await response.json();
  } catch (error: unknown) {
    return apiError(error, "Erro ao tentar realizar cadastro de usuário");
  }
  revalidateTag("photos");
  redirect("/conta");
}
