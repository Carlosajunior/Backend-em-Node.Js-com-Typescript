export interface Job<T> {
  execute<U extends T>(data?: U): void | Promise<void>;
}
