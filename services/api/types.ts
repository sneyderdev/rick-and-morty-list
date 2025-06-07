import { OPERATION_STATUS } from './consts';

interface FailureResponse {
  status: typeof OPERATION_STATUS.ERROR;
  message: string;
}

export type ApiResponse<T> =
  T extends Array<infer U>
    ?
        | { status: typeof OPERATION_STATUS.SUCCESS; data: Array<U> }
        | FailureResponse
    : { status: typeof OPERATION_STATUS.SUCCESS; data: T } | FailureResponse;
