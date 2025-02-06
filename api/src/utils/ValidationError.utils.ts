export class ValidationError extends Error {
  constructor(
    mensage: string,
    public readonly errors: string[] = [],
  ) {
    super(mensage);
  }
}
