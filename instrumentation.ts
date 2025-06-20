export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs" && process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
    const { server } = await import("./mocks/node");
    server.listen();
    console.log('[MSW] Server-side Mock Service Worker started');
  }
}
