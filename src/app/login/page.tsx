import LoginForm from "@/components/login-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | Dogs",
  description: "Logue na sua conta no site Dogs.",
};

const LoginPage = () => {
  return (
    <section className="animeLeft">
      <h1 className="title">Login</h1>
      <LoginForm />
    </section>
  );
};

export default LoginPage;
