import { AppRouter } from "@/router/AppRouter";

import {
  StoreProvider,
  ThemeProvider,
  ErrorBoundary,
  RouterProvider,
} from "./providers";

export default function App() {
  return (
    <StoreProvider>
      <ThemeProvider>
        <RouterProvider>
          <ErrorBoundary>
            <AppRouter />
          </ErrorBoundary>
        </RouterProvider>
      </ThemeProvider>
    </StoreProvider>
  );
}
