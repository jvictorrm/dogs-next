"use client";

import Button from "@/components/forms/button";
import Input from "@/components/forms/input";
import ErrorMessage from "@/components/helper/error-message";
import { ChangeEvent, useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import styles from "./conta-photo-post.module.css";
import photoPost from "@/actions/photo-post";

function FormButton() {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending}>{pending ? "Enviando..." : "Enviar"}</Button>
  );
}

const ContaPhotoPost = () => {
  const [img, setImg] = useState("");
  const [state, action] = useFormState(photoPost, {
    ok: false,
    error: "",
    data: null,
  });

  function handleImgChange({ target }: ChangeEvent<HTMLInputElement>) {
    if (!!target.files) {
      setImg(URL.createObjectURL(target.files[0]));
    }
  }

  return (
    <section className={`${styles.photoPost} animeLeft`}>
      <form action={action}>
        <Input label="Nome" name="nome" />
        <Input label="Peso" name="peso" type="number" />
        <Input label="Idade" name="idade" type="number" />
        <input
          onChange={handleImgChange}
          type="file"
          name="img"
          id="img"
          className={styles.file}
        />
        <ErrorMessage error={state.error} />
        <FormButton />
      </form>
      <div>
        <div
          className={styles.preview}
          style={{ backgroundImage: `url(${img})` }}
        ></div>
      </div>
    </section>
  );
};

export default ContaPhotoPost;
