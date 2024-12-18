module.exports = {
    extends: ["@commitlint/config-conventional"],
    rules: {
      "type-enum": [
        2,
        "always",
        [
          "feat",    // Nueva funcionalidad
          "fix",     // Solución de errores
          "docs",    // Cambios en documentación
          "style",   // Cambios de estilo (no funcionales)
          "refactor",// Refactorización de código
          "test",    // Agregar pruebas
          "chore"    // Cambios en configuración (builds, tools, etc.)
        ]
      ],
      "subject-case": [2, "always", "sentence-case"] // Primer letra en mayúscula
    }
  };
  