import { pick } from 'lodash';

// TODO: Fix the typing here
export const getUserFromPayload = (payload: any) => pick(payload, 'id', 'username', 'email', 'permissions', 'golferId');
