import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import jsdoc from "eslint-plugin-jsdoc";

const eslintConfig = defineConfig([
  ...nextVitals,
  // Semua fungsi yang diekspor dari lib/ wajib punya JSDoc (deskripsi, @param, @returns)
  {
    files: ["lib/**/*.js"],
    plugins: { jsdoc },
    rules: {
      "jsdoc/require-jsdoc": ["warn", { publicOnly: true, require: { FunctionDeclaration: true } }],
      "jsdoc/require-description": "warn",
      "jsdoc/require-param": "warn",
      "jsdoc/require-returns": "warn",
      "jsdoc/check-param-names": "warn",
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Laporan coverage hasil Vitest bukan kode kita
    "coverage/**",
  ]),
]);

export default eslintConfig;
