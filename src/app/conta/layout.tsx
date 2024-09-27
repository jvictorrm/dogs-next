import ContaHeader from "@/components/conta/conta-header";
import React, { ReactNode } from "react";

const ContaLayout = async ({ children }: { children: ReactNode }) => {
  return (
    <div className="container">
      <ContaHeader />
      {children}
    </div>
  );
};

export default ContaLayout;
