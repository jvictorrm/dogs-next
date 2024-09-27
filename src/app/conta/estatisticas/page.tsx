import statsGet from "@/actions/stats-get";
import { Metadata } from "next";
import dynamic from "next/dynamic";

const ContaEstatisticas = dynamic(
  () => import("@/components/conta/conta-estatisticas"),
  {
    loading: () => <p>Carregando...</p>,
    ssr: false,
  }
);

export const metadata: Metadata = {
  title: "Estatísticas | Minha Conta",
};

const EstatisticasPage = async () => {
  const { data } = await statsGet();

  if (!data) return <></>;

  return (
    <section>
      <ContaEstatisticas data={data} />
    </section>
  );
};

export default EstatisticasPage;
