// src/shared/layouts/MainLayout.tsx
import React from "react";
import { Outlet } from "react-router-dom";

import Header from "@/features/layout/ui/Header";

const MainLayout: React.FC = () => (
  <div className="min-h-screen flex flex-col">
    <Header />
    <main className="flex-grow">
      <Outlet />
    </main>
  </div>
);

export default MainLayout;
