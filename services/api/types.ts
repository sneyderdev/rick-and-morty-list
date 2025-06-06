import { OPERATION_STATUS } from './consts';

import type { Character } from '../domain';

interface SuccessGetCharactersPayload {
  status: typeof OPERATION_STATUS.SUCCESS;
  data: Array<Character>;
}

interface FailureGetCharactersPayload {
  status: typeof OPERATION_STATUS.ERROR;
  message: string;
}

export type GetCharactersPayload =
  | SuccessGetCharactersPayload
  | FailureGetCharactersPayload;
