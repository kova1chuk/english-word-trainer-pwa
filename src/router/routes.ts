export const routes = {
  // Public routes
  signin: "/signin",
  signup: "/signup",

  // Main routes
  home: "/",
  dictionary: "/dictionary",
  dictionaryEntry: "/dictionary/:id",
  words: "/words",
  practice: "/practice",
  statistics: "/statistics",

  // Profile routes
  profile: "/profile",
  profileSetup: "/profile/setup",
  profileSettings: "/profile/settings",

  // System routes
  notFound: "*",
} as const;
