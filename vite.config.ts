import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),
  ],
  // For GitHub Pages project sites, base must be the repo name with exact casing, prefixed and suffixed by '/'
  base: "/ReactQuiz/",
});
