import type { ApiError } from "@/shared/config/store/api";

export interface Language {
  code: string;
  name: string;
}

export interface Profile {
  id: string;
  email: string;
  name: string;
  native_language: Language;
  target_language: Language;
  created_at: string;
  updated_at: string;
}

export interface CreateProfileRequest {
  name: string;
  native_language: string;
  target_language: string;
}

export type UpdateProfileRequest = CreateProfileRequest;
export type ProfileResponse = Profile;

export type { ApiError };
