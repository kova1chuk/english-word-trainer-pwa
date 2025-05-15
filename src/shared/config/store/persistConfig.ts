import storage from "redux-persist/lib/storage";
import { encryptTransform } from "redux-persist-transform-encrypt";

import type { AuthState } from "@/features/auth/store/slice";
import type { PersistConfig } from "redux-persist";

// This key should ideally come from environment variables
const ENCRYPT_KEY = "your-secure-key-min-16-chars";

const encryptionTransform = encryptTransform({
  secretKey: ENCRYPT_KEY,
  onError: function (error: unknown) {
    // Handle encryption/decryption errors
    console.error("Persist Transform Error:", error);
  },
});

export const persistConfig: PersistConfig<AuthState> = {
  key: "auth",
  storage,
  transforms: [encryptionTransform],
};
