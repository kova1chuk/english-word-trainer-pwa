import "@/shared/i18n/i18n";
import type { ReactNode } from "react";

interface I18nProviderProps {
  children: ReactNode;
}

const I18nProvider: React.FC<I18nProviderProps> = ({ children }) => {
  return <>{children}</>;
};

export default I18nProvider;
