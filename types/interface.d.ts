interface AnyObj<T = any> {
  [key: string]: T;
  [key: number]: T;
}
