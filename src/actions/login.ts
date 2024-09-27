"use server";

import { cookies } from "next/headers";
import apiError from "@/functions/api-error";
import { TOKEN_POST } from "@/functions/api";

export default async function login(state: {}, formData: FormData) {
  const username = formData.get("username") as string | null;
  const password = formData.get("password") as string | null;

  try {
    if (!username || !password) {
      throw new Error("Preencha os dados.");
    }

    const { url } = TOKEN_POST();
    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Usuário ou senha inválidos.");
    }

    const data = await response.json();

    cookies().set("token", data.token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24,
    });

    return {
      ok: true,
      data,
      error: "",
    };
  } catch (error: unknown) {
    return apiError(error, "Erro ao tentar efetuar login");
  }
}
