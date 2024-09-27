import LoginCriarForm from "@/components/login-criar-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Crie sua conta",
  description: "Crie sua conta no site Dogs.",
};

const CriarPage = () => {
  return (
    <div className="animeLeft">
      <h1 className="title">Cadastre-se</h1>
      <LoginCriarForm />
    </div>
  );
};

export default CriarPage;
