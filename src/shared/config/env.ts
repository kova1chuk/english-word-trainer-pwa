/**
 * Environment configuration
 * This file provides type-safe access to environment variables
 */

export const env = {
  /**
   * API Configuration
   */
  api: {
    url:
      import.meta.env.VITE_API_URL || "https://d1tezlh4qfat0a.cloudfront.net",
  },

  /**
   * Environment Detection
   */
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
} as const;

/**
 * Type definitions for environment variables
 */
declare global {
  interface ImportMetaEnv {
    API_URL: string;
  }
}
