export type ResponseServices = {
  setResponseStatus: ISetResponseStatus;
  sendResponse: ISendResponse;
};

export interface ISetResponseStatus {
  execute: (statusCode: number) => void;
}

export interface ISendResponse {
  execute: (data?: unknown) => void;
}
