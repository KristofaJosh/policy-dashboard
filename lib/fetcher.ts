const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

/**
 * Returns a new object containing only the entries whose values
 * are neither null, undefined, nor empty strings.
 * @param {Record<string, any>} obj
 * @returns {Record<string, any>}
 */
function filterEmptyProperties(obj: Record<string, any>): Record<string, any> {
  return Object.fromEntries(
    Object.entries(obj).filter(
      ([, v]) => v != null && !(typeof v === "string" && v === ""),
    ),
  );
}

export const fetcher = async (
  path: string,
  params: Record<string, any> = {},
  options: RequestInit = {},
) => {
  const _params = filterEmptyProperties(params);
  const searchParams = Object.keys(_params)
    ? `?${new URLSearchParams(_params)}`
    : "";

  const response = await fetch(`${baseUrl}${path}${searchParams}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers ?? {}),
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch: ${response.status}`);
  }

  const data = await response.json();
  return { data, message: "success" };
};
