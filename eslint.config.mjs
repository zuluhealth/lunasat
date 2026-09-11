import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Design-source JSX files are published as downloadable artifacts, not app code.
    "public/**/*.jsx",
  ]),
  {
    rules: {
      // The portal intentionally renders technical labels prefixed with `//`.
      "react/jsx-no-comment-textnodes": "off",
      // The stylesheet is declared once in the App Router root layout.
      "@next/next/no-page-custom-font": "off",
    },
  },
]);

export default eslintConfig;
