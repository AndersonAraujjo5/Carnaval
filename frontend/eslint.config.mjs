import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends(
    "next/core-web-vitals",
    "next/typescript",
    "prettier" // Adiciona o Prettier
  ),
  {
    plugins: ["prettier"],
    rules: {
      "prettier/prettier": "error", // Garante que o código segue as regras do Prettier
    },
  },
];

export default eslintConfig;
