"use server";

import apiError from "@/functions/api-error";
import { USER_POST } from "@/functions/api";
import { cookies } from "next/headers";

export type User = {
  id: number;
  username: string;
  email: string;
  name: string;
};

export default async function userGet() {
  try {
    const token = cookies().get("token")?.value;
    if (!token) throw new Error("Token não encontrado");

    const { url } = USER_POST();
    const response = await fetch(url, {
      headers: {
        Authorization: "Bearer " + token,
      },
      next: {
        revalidate: 60,
      },
    });

    if (!response.ok) {
      throw new Error("Erro ao buscar o usuário.");
    }

    const data = (await response.json()) as User;
    return {
      ok: true,
      data,
      error: "",
    };
  } catch (error: unknown) {
    return apiError(error, "Erro ao tentar realizar cadastro de usuário");
  }
}
