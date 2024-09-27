import photosGet from "@/actions/photos-get";
import userGet from "@/actions/user-get";
import Feed from "@/components/feed";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Minha Conta",
};

const ContaPage = async () => {
  const { data: user } = await userGet();
  const { data } = await photosGet({ user: user?.username });

  if (!data?.length)
    return (
      <section>
        <div>
          <p
            style={{
              color: "#444",
              fontSize: "1.125rem",
              marginBottom: "1rem",
            }}
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
      </section>
    );

  return (
    <section>
      <Feed photos={data} user={user?.username} />
    </section>
  );
};

export default ContaPage;
