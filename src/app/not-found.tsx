"use client";

import Link from "next/link";

const NotFound = () => {
  return (
    <section className="container">
      <h1 className="title">Página não encontrada.</h1>
      <Link
        className="button"
        href="/"
        style={{ marginBottom: "1.5rem", display: "inline-block" }}
      >
        Volte para a Home.
      </Link>
    </section>
  );
};

export default NotFound;
