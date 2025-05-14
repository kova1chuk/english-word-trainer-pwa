/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Primary colors
        primary: {
          light: "#6D28D9", // Darker purple for better contrast in light mode
          DEFAULT: "#7C3AED",
          dark: "#A78BFA", // Lighter purple for better visibility in dark mode
        },
        // Background colors
        background: {
          light: "#FFFFFF",
          DEFAULT: "#F9FAFB",
          dark: "#111827", // Darker background for better contrast
          darker: "#0F172A", // Even darker background for nested elements
        },
        // Text colors
        text: {
          primary: {
            light: "#111827", // Near black for light mode
            dark: "#F8FAFC", // Very light gray for dark mode
          },
          secondary: {
            light: "#374151", // Darker gray for better readability
            dark: "#E2E8F0", // Lighter gray for dark mode
          },
          accent: {
            light: "#6D28D9", // Darker purple for light mode
            dark: "#A78BFA", // Lighter purple for dark mode
          },
        },
        // Border colors
        border: {
          light: "#CBD5E1", // Darker border for light mode
          dark: "#475569", // Lighter border for dark mode
        },
        // Status colors
        success: {
          light: "#059669", // Darker green for light mode
          DEFAULT: "#10B981",
          dark: "#34D399", // Lighter green for dark mode
        },
        warning: {
          light: "#D97706", // Darker yellow for light mode
          DEFAULT: "#F59E0B",
          dark: "#FBBF24", // Lighter yellow for dark mode
        },
        error: {
          light: "#DC2626", // Darker red for light mode
          DEFAULT: "#EF4444",
          dark: "#FCA5A5", // Lighter red for dark mode
        },
      },
    },
  },
  plugins: [],
};
