import { useDispatch } from "react-redux";

import type { AppDispatch } from "@/shared/config/store";

export const useAppDispatch = () => useDispatch<AppDispatch>();
