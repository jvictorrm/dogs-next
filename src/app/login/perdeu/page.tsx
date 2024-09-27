import LoginPerdeuForm from "@/components/login-perdeu-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Perdeu a senha | Dogs",
  description: "Recupere a sua senha.",
};

const PerdeuPage = () => {
  return (
    <div className="animeLeft">
      <h1 className="title">Perdeu a senha?</h1>
      <LoginPerdeuForm />
    </div>
  );
};

export default PerdeuPage;
