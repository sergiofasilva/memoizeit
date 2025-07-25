
/**
 * Type definition for the memoizeit function.
 * @template T
 */
export type MemoizeIt<T extends (...args: any[]) => any> = (
  func: T,
  limit?: number
) => T;