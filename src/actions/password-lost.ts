import apiError from "@/functions/api-error";
import { PASSWORD_LOST } from "@/functions/api";

export default async function passwordLost(state: {}, formData: FormData) {
  const login = formData.get("login") as string | null;
  const urlPerdeu = formData.get("url") as string | null;

  try {
    if (!login) {
      throw new Error("Preencha os dados.");
    }

    const { url } = PASSWORD_LOST();
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({ login, url: urlPerdeu }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("E-mail ou usuário não cadastrado.");
    }

    const data = await response.json();

    return {
      ok: true,
      data,
      error: "",
    };
  } catch (error: unknown) {
    return apiError(error, "Erro ao tentar realizar cadastro de usuário");
  }
}
