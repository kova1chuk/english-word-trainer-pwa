import { AppRouter } from "@/router/AppRouter";

import {
  StoreProvider,
  ThemeProvider,
  ErrorBoundary,
  RouterProvider,
  I18nProvider,
} from "./providers";

export default function App() {
  return (
    <StoreProvider>
      <I18nProvider>
        <ThemeProvider>
          <RouterProvider>
            <ErrorBoundary>
              <AppRouter />
            </ErrorBoundary>
          </RouterProvider>
        </ThemeProvider>
      </I18nProvider>
    </StoreProvider>
  );
}
