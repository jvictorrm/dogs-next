"use client";

import Button from "@/components/forms/button";
import Input from "@/components/forms/input";
import ErrorMessage from "@/components/helper/error-message";
import { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import styles from "../login-form/login-form.module.css";
import userPost from "@/actions/user-post";

function FormButton() {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending}>
      {pending ? "Cadastrando..." : "Cadastrar"}
    </Button>
  );
}

const LoginCriarForm = () => {
  const [state, action] = useFormState(userPost, {
    ok: false,
    error: "",
    data: null,
  });

  useEffect(() => {
    if (state.ok) window.location.href = "/conta";
  }, [state.ok]);

  return (
    <>
      <form action={action} className={styles.form}>
        <Input label="Usuário" name="username" />
        <Input label="E-mail" name="email" type="email" />
        <Input label="Senha" type="password" name="password" />
        <ErrorMessage error={state.error} />
        <FormButton />
      </form>
    </>
  );
};

export default LoginCriarForm;
