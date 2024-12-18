import { afterEach, afterAll, describe, it, expect } from 'vitest';
import mongoose from 'mongoose';
import User from '../../src/models/User';

describe('Inserción de datos en la base de datos', () => {
  // No es necesario conectar aquí, porque ya lo hacemos en setup.ts

  // Limpiar la base de datos después de cada prueba
  afterEach(async () => {
    const collections = mongoose.connection.collections;
    // Limpiar todas las colecciones de la base de datos
    for (const key in collections) {
      await collections[key].deleteMany({});
    }
  });

  // Cerrar la conexión después de todas las pruebas
  // afterAll(async () => {
  //   // Asegúrate de esperar el cierre de la conexión
  //   await mongoose.connection.close();
  // }, 20000)

  it('Debe insertar varios usuarios en la base de datos', async () => {
    const usersData = [
      { name: 'Juan', email: 'juan@example.com', password: '12345643' },
      { name: 'Ana', email: 'ana@example.com', password: '987653434' },
      { name: 'Carlos', email: 'carlos@example.com', password: '123qwe2442' },
    ];

    await User.insertMany(usersData);

    const foundUsers = await User.find({}).lean();
    expect(foundUsers).toHaveLength(usersData.length);

    // Verificar valores específicos de los usuarios
    expect(foundUsers[0].name).toBe('Juan');
    expect(foundUsers[1].email).toBe('ana@example.com');

    // Verificar si hay errores al insertar usuarios duplicados
    await expect(User.insertMany(usersData)).rejects.toThrow('E11000 duplicate key error');
  });
});
