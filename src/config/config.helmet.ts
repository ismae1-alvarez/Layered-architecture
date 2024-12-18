export const configHelmet = {
    contentSecurityPolicy: {
      directives: {
        "default-src": "'none'", // Bloquea todo por defecto
        "script-src": ["'self'"], // Permite scripts de tu dominio y un CDN
        "object-src": "'none'", // Bloquea objetos incrustados
        "frame-ancestors": "'none'", // Evita que tu API sea incrustada
      },
    },
}