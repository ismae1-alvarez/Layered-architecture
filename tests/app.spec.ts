import app from '../src/app';
import { describe, expect, it } from 'vitest';
import supertest from 'supertest';

describe('App Servidor', () => {
  it('Deberia escuchar en el puerto correcto', async () => {
    const response = await supertest(app).get('/api/v1/');
    expect(response.status).toBe(200);
    expect(response.text).toContain('hola desde mi API');
  });

  it('Debería servir la documentación en /docs', async () => {
    const response = await supertest(app).get('/docs/');

    // Validaciones
    expect(response.status).toBe(200);
    expect(response.text).toContain('Swagger UI');
  });
});
