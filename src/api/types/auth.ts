import { JwtPayload } from 'jsonwebtoken';
import { UserRoleType } from "./user";
import { ParameterUserIdType } from './parameter';

export type JWTUserType = JwtPayload & {
    id: ParameterUserIdType,
    role: UserRoleType
};