export default function apiError(
  error: unknown,
  genericErrorMessage: string = "Erro genérico"
): {
  data: null;
  ok: false;
  error: string;
} {
  if (error instanceof Error) {
    return {
      ok: false,
      data: null,
      error: error.message,
    };
  } else {
    return {
      ok: false,
      data: null,
      error: genericErrorMessage,
    };
  }
}
