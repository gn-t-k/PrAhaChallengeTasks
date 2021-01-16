/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
export interface Error {
  message: string;
}

export const isError = (arg: any): arg is Error => arg.message !== undefined;
