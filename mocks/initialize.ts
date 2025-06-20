// Initialize MSW in the browser
// This file should be imported in the app's entry point

const IS_BROWSER = typeof window !== "undefined" && !!window.document;


export async function initializeMSW() {
  if (IS_BROWSER) {
    const { worker } = await import('./browser');
    await worker.start();
  } else {
    const { server } = await import('./node');
    server.listen();
  }
}