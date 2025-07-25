/**
 * Tipo para função memoizada.
 * @template T
 */
export type MemoizeIt<T extends (...args: any[]) => any> = (func: T, limit?: number) => T;
