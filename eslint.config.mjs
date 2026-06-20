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
    // Generated build artifacts (gitignored) — linting their minified output
    // yields thousands of false positives and breaks `npm run lint` locally
    // once build-storybook / coverage have run.
    "storybook-static/**",
    "coverage/**",
  ]),
]);

export default eslintConfig;
