export interface Error {
  message: string;
}

export const isError = (arg: unknown): arg is Error =>
  !!arg && typeof (arg as Partial<Error>).message === "string";
