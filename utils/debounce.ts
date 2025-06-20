type FnType = (...args: any[]) => void
export type DebounceReturnType<T extends FnType> = (...args: Parameters<T>) => NodeJS.Timeout

/**
 * Debounce a function
 * @param func The function to debounce
 * @param delay The delay in milliseconds
 * @returns The debounced function
 */
export function debounce<T extends FnType>(
  func: T,
  delay: number
): (...args: Parameters<T>) => NodeJS.Timeout {
  let timer: NodeJS.Timeout

  return function (...args: Parameters<T>) {
    clearTimeout(timer)
    timer = setTimeout(() => func(...args), delay)
    return timer
  }
}
