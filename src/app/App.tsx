import { AppRouter } from "@/router/AppRouter";

import ErrorBoundary from "./providers/ErrorBoundary";
import RouterProvider from "./providers/RouterProvider";
import StoreProvider from "./providers/StoreProvider";

export default function App() {
  return (
    <StoreProvider>
      <RouterProvider>
        <ErrorBoundary>
          <AppRouter />
        </ErrorBoundary>
      </RouterProvider>
    </StoreProvider>
  );
}
