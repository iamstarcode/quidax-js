export class QuidaxError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public code?: string
  ) {
    super(message);
    this.name = 'QuidaxError';
  }
}

export class QuidaxApiError extends QuidaxError {
  constructor(
    message: string,
    statusCode: number,
    code?: string,
    public data?: unknown
  ) {
    super(message, statusCode, code);
    this.name = 'QuidaxApiError';
  }
}
