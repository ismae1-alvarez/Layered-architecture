import ts from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import prettier from "eslint-plugin-prettier";

export default [
  {
    files: ["**/*.ts", "**/*.tsx"], 
    languageOptions: {
      parser: tsParser,
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        require: "readonly",
        process: "readonly",
        __dirname: "readonly",
        module: "readonly",
      },
    },
    plugins: {
      "@typescript-eslint": ts,
      "prettier": prettier
    },
    extends: [
      "plugin:@typescript-eslint/recommended",  // Reglas de ESLint para TypeScript
      "prettier",  // Desactiva las reglas de ESLint que pueden entrar en conflicto con Prettier
      "plugin:prettier/recommended",  // Habilita las reglas recomendadas de Prettier
      ["@commitlint/config-conventional"]
    ],
    rules: {
      "@typescript-eslint/no-unused-vars": ["warn"],
      "semi": ["error", "always"],
      "quotes": ["error", "double"],
      "prettier/prettier": ["error"],  // Marca como error si Prettier no está configurado
    },
  },
];
