"use client";

import Button from "@/components/forms/button";
import Input from "@/components/forms/input";
import ErrorMessage from "@/components/helper/error-message";
import { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import styles from "../login-form/login-form.module.css";
import passwordLost from "@/actions/password-lost";

function FormButton() {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending}>
      {pending ? "Enviando e-mail..." : "Recuperar"}
    </Button>
  );
}

const LoginPerdeuForm = () => {
  const [url, setUrl] = useState("");
  const [state, action] = useFormState(passwordLost, {
    ok: false,
    error: "",
    data: null,
  });

  useEffect(() => {
    setUrl(window.location.href.replace("perdeu", "resetar"));
  }, []);

  return (
    <>
      <form action={action} className={styles.form}>
        <Input label="E-mail / Usuário" name="login" />
        <input type="hidden" name="url" value={url} />
        <ErrorMessage error={state.error} />
        {state.ok ? (
          <p style={{ color: "green" }}>E-mail enviado.</p>
        ) : (
          <FormButton />
        )}
      </form>
    </>
  );
};

export default LoginPerdeuForm;
