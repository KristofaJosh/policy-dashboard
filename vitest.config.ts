import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./test/setup.ts'],
    include: ['**/*.test.{ts,tsx}'],
    exclude: ['**/*.integration.test.{ts,tsx}', 'node_modules', 'cypress'],
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './'),
    },
  },
});