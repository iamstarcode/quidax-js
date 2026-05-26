export type ApiResponse<T> = {
  status: string;
  message: string;
  data: T;
};

export * from './user';
export * from './wallet';
export * from './market';
export * from './trade';
export * from './swap';
export * from './withdrawal';
export * from './deposit';
export * from './order';
export * from './fee';
export * from './ramp';
export * from './custodial';
