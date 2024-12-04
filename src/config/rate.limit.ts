import rateLimit from 'express-rate-limit';

// limitar a 100 solicitude por IP cada ventana de 15 minutos
export const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
});
