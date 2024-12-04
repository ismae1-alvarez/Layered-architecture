import ts from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

export default [
  {
    files: ["**/*.ts"], 
    languageOptions: {
      parser: tsParser,
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        // Define las variables globales aquí (por ejemplo, para Node.js):
        require: "readonly",
        process: "readonly",
        __dirname: "readonly",
        module: "readonly",
      }
    },
    plugins: {
      "@typescript-eslint": ts
    },
    rules: {
      // Advierte sobre variables no usadas
      "@typescript-eslint/no-unused-vars": ["warn"],
      // Exige punto y coma
      "semi": ["error", "always"],
      // Exige comillas dobles
      "quotes": ["error", "double"] 
    }
  }
];
