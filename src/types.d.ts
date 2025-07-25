// Para TypeScript, o ideal é usar .ts, mas aqui está em .js conforme pedido.

/**
 * Tipo para função memoizada.
 * @template T
 */
export type MemoizeIt<T extends (...args: any[]) => any> = (
  func: T,
  limit?: number
) => T;