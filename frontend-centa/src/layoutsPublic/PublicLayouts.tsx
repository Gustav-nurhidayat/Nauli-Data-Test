import React from "react";
import { Outlet } from "react-router-dom";
import NavbarPublic from "../componentsPublic/NavbarPublic";
import FooterPublic from "../componentsPublic/FooterPublic";

export const PublicLayout: React.FC = () => {
  return (
    <div
      className="
        min-h-screen
        bg-[var(--centa-bg)]
        text-[var(--centa-text)]
        antialiased
        font-sans
        selection:bg-[var(--centa-cyan)]/20
        selection:text-[var(--centa-cyan-light)]
      "
    >
      <NavbarPublic />

      <main className="min-h-screen">
        <Outlet />
      </main>

      <FooterPublic />
    </div>
  );
};

export default PublicLayout;