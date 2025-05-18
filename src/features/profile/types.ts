import type { ApiError } from "@/shared/config/store/api";

export interface Language {
  code: string;
  name: string;
}

export interface Profile {
  id: string;
  user_id: string;
  name: string;
  native_language: string;
  target_language: string;
  created_at: string;
  updated_at: string;
}

export interface CreateProfileRequest {
  name: string;
  native_language: string;
  target_language: string;
}

export interface UpdateProfileRequest {
  name?: string;
  native_language?: string;
  target_language?: string;
}

export type ProfileResponse = Profile;

export type { ApiError };
