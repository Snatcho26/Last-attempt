import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        snatcho: {
          purple: "#6C47FF",
          dark: "#1A1A1A",
        },
      },
    },
  },
  plugins: [],
};

export default config;
