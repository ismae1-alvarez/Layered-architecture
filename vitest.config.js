import { defineConfig } from 'vite';

export default defineConfig({
  test: {
    // Basic
    environment: 'node',
    globals: true,

    setupFiles: ['./tests/setup.ts'],

    // hookTimeout: 20000
  },
});
