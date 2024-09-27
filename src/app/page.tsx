"use server";

import photosGet from "@/actions/photos-get";
import Feed from "@/components/feed";
import Link from "next/link";

export default async function Home() {
  const { data } = await photosGet();

  if (!data?.length)
    return (
      <div>
        <p
          style={{ color: "#444", fontSize: "1.125rem", marginBottom: "1rem" }}
        >
          Nenhuma foto cadastrada.
        </p>
        <Link
          href="/conta/postar"
          className="button"
          style={{ display: "inline-block" }}
        >
          Postar foto
        </Link>
      </div>
    );

  return (
    <section className="container mainContainer">
      <Feed photos={data} />
    </section>
  );
}
