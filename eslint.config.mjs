import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import prettier from "eslint-plugin-prettier/recommended";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    plugins: { js },
    extends: ["js/recommended"],
  },
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    languageOptions: { globals: globals.browser },
  },
  {
    rules: {
      eqeqeq: "off",
      "no-unused-vars": "error",
      "no-undef": "error",
      "no-console": "warn",
      "no-debugger": "warn",
      "no-duplicate-imports": "error",
      "no-unused-expressions": "error",
      "no-undef": "error",
      "prefer-const": ["error", { ignoreReadBeforeAssign: true }],
    },
    globals: {
      process: "readonly",
      __dirname: "readonly",
      module: "readonly",
      require: "readonly",
      exports: "readonly",
      globalThis: "readonly",
    },
  },
  {
    ignores: ["node_modules/*", "dist/*"],
  },
  tseslint.configs.recommended,
  prettier,
]);
