"use client";

import { useState } from "react";
import styles from "./photo-delete.module.css";
import photoDelete from "@/actions/photo-delete";

const PhotoDelete = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    setLoading(true);
    const confirm = window.confirm("Tem certeza que deseja deletar?");
    if (confirm) {
      await photoDelete(id);
    }
    setLoading(false);
  }

  return (
    <button onClick={handleClick} disabled={loading} className={styles.delete}>
      Deletar
    </button>
  );
};

export default PhotoDelete;
