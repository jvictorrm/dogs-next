"use client";

import Button from "@/components/forms/button";
import Input from "@/components/forms/input";
import ErrorMessage from "@/components/helper/error-message";
import { useFormState, useFormStatus } from "react-dom";
import styles from "../login-form/login-form.module.css";
import passwordReset from "@/actions/password-reset";

function FormButton() {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending}>
      {pending ? "Enviando e-mail..." : "Recuperar"}
    </Button>
  );
}

interface LoginResetFormProps {
  keyToken: string;
  login: string;
}

const LoginResetForm = ({ keyToken, login }: LoginResetFormProps) => {
  const [state, action] = useFormState(passwordReset, {
    ok: false,
    error: "",
    data: null,
  });

  return (
    <>
      <form action={action} className={styles.form}>
        <Input label="Nova Senha" name="password" type="password" />
        <input type="hidden" value={keyToken} name="key" />
        <input type="hidden" value={login} name="login" />
        <ErrorMessage error={state.error} />=
        <FormButton />
      </form>
    </>
  );
};

export default LoginResetForm;
