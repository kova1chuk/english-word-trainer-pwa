import { Route, Routes } from "react-router-dom";

import { SignInPage, SignUpPage } from "@/features/auth";
import {
  DictionaryBrowserPage,
  DictionaryEntryPage,
} from "@/features/dictionary/pages";
import MainLayout from "@/features/layout/MainLayout";
import {
  ProfilePage,
  ProfileSettingsPage,
  ProfileSetupPage,
} from "@/features/profile";
import { PracticePage, StatisticsPage, WordsListPage } from "@/features/words";
import { NotFoundPage } from "@/pages/NotFound";

import { PrivateRoute } from "./PrivateRoute";
import { routes } from "./routes";

export const AppRouter = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        {/* Public Routes */}
        <Route path={routes.signin} element={<SignInPage />} />
        <Route path={routes.signup} element={<SignUpPage />} />

        {/* Protected Routes */}
        <Route element={<PrivateRoute />}>
          <Route path={routes.home} element={<WordsListPage />} />
          <Route path={routes.profile} element={<ProfilePage />} />
          <Route path={routes.profileSetup} element={<ProfileSetupPage />} />
          <Route
            path={routes.profileSettings}
            element={<ProfileSettingsPage />}
          />
          <Route path={routes.dictionary} element={<DictionaryBrowserPage />} />
          <Route
            path={routes.dictionaryEntry}
            element={<DictionaryEntryPage />}
          />
          <Route path={routes.words} element={<WordsListPage />} />
          <Route path={routes.practice} element={<PracticePage />} />
          <Route path={routes.statistics} element={<StatisticsPage />} />
        </Route>

        {/* 404 Route */}
        <Route path={routes.notFound} element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};
