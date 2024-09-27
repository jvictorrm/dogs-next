import photoGet from "@/actions/photo-get";
import FeedModal from "@/components/feed-modal";
import { notFound } from "next/navigation";

type FotoIdParams = {
  params: {
    id: string;
  };
};

export async function generateMetadata({ params }: FotoIdParams) {
  const { data } = await photoGet(params.id);

  if (!data) return { title: "Fotos" };

  return {
    title: data.photo.title,
  };
}

const FotoIdPage = async ({ params }: FotoIdParams) => {
  const { data } = await photoGet(params.id);

  if (!data) return notFound();

  return (
    <section className="container mainContainer">
      <FeedModal photo={data} />
    </section>
  );
};

export default FotoIdPage;
