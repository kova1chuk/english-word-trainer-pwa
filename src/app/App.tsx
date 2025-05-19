import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";

import store, { persistor } from "@/shared/config/store";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <div className="min-h-screen bg-background p-4">
            <h1 className="text-3xl font-bold text-primary">
              English Word Trainer
            </h1>
            <p className="mt-2 text-muted-foreground">
              Your vocabulary learning companion
            </p>
          </div>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
