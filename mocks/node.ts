import { setupServer } from 'msw/node';
import { handlers } from './handlers';

// This configures a request mocking server, Vitest tests run in a Node.js process.
export const server = setupServer(...handlers);