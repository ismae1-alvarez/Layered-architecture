import ts from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

export default [
  {
    files: ["**/*.ts"], // Asegúrate de cubrir tanto .ts como .tsx
    parser: tsParser, // Configura el parser adecuado para TypeScript
    parserOptions: {
      ecmaVersion: "latest", // Usa la última versión de ECMAScript
      sourceType: "module",  // Define el tipo de módulos (especifica 'module' para usar import/export)
    },
    plugins: {
      "@typescript-eslint": ts, // Activa el plugin de TypeScript
    },
    rules: {
      // Advierte sobre variables no usadas
      "@typescript-eslint/no-unused-vars": ["warn"],
      // Exige punto y coma
      "semi": ["error", "always"],
      // Exige comillas dobles
      "quotes": ["error", "double"]
    },
  },
];
