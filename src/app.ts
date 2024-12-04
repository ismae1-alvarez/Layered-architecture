import { envs, logger } from './config';
import app from './server';

// PORT
const port = envs.PORT || 4000;

const server = app.listen(port, () => {
  logger.info(`REST API Funcionando en el puerto ${port}`);
});

server.keepAliveTimeout = 5000; // Mantener la conexión abierta por 5 segundos
server.headersTimeout = 20000; // Esperar hasta 20 segundos por encabezados



// Para el test
export default app