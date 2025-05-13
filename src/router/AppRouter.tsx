import { Routes, Route } from "react-router-dom";

import HomePage from "@/pages/Home/HomePage";
import NotFoundPage from "@/pages/NotFoundPage/NotFoundPage";

import { routes } from "./routes";

export const AppRouter = () => (
  <Routes>
    <Route path={routes.home} element={<HomePage />} />
    <Route path={routes.notFound} element={<NotFoundPage />} />
  </Routes>
);
