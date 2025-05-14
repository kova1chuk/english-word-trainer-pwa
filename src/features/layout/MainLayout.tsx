// src/shared/layouts/MainLayout.tsx
import React from "react";
import { Outlet } from "react-router-dom";

import Header from "@/features/layout/ui/Header";

const MainLayout: React.FC = () => (
  <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors">
    <Header />
    <main className="flex-1 flex flex-col">
      <Outlet />
    </main>
  </div>
);

export default MainLayout;
