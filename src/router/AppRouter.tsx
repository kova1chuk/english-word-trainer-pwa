import { Routes, Route } from "react-router-dom";

import SignInPage from "@/features/auth/pages/SignInPage";
import SignUpPage from "@/features/auth/pages/SignUpPage";
import MainLayout from "@/features/layout/MainLayout";
import HomePage from "@/pages/Home/HomePage";
import NotFoundPage from "@/pages/NotFoundPage/NotFoundPage";

import { routes } from "./routes";

export const AppRouter = () => (
  <Routes>
    <Route path="/" element={<MainLayout />}>
      <Route index element={<HomePage />} />
      <Route path={routes.signin} element={<SignInPage />} />
      <Route path={routes.signup} element={<SignUpPage />} />
      <Route path={routes.notFound} element={<NotFoundPage />} />
    </Route>
  </Routes>
);
