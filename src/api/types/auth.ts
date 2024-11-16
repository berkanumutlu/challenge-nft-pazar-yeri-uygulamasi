import { DataTypes } from 'sequelize';
import { JwtPayload } from 'jsonwebtoken';
import { UserRoleType } from "./user";

export type JWTUserType = JwtPayload & {
    id: string | number | typeof DataTypes.UUID,
    role: UserRoleType
};