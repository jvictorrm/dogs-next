import LoginResetForm from "@/components/login-reset-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resetar a senha | Dogs",
  description: "Resete a sua senha.",
};

interface ResetarPageProps {
  searchParams: {
    key: string;
    login: string;
  };
}

const ResetarPage = ({ searchParams }: ResetarPageProps) => {
  return (
    <div className="animeLeft">
      <h1 className="title">Resete a senha</h1>
      <LoginResetForm keyToken={searchParams.key} login={searchParams.login} />
    </div>
  );
};

export default ResetarPage;
