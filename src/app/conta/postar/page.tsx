import ContaPhotoPost from "@/components/conta/conta-photo-post";
import { Metadata } from "next";

export const runtime = "edge";

export const metadata: Metadata = {
  title: "Postar | Minha Conta",
};

const PostarPage = () => {
  return <ContaPhotoPost />;
};

export default PostarPage;
