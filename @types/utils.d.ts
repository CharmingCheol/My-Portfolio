type DeepPartial<T> = T extends { [key: string]: any }
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;
