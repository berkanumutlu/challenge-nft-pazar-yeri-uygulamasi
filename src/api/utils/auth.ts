import { JwtPayload, verify, sign } from 'jsonwebtoken';
import { Request } from '@/types/request';
import { UserRoleType, UserType } from '@/types/user';
import { JWTUserType } from '@/types/auth';
import { jwtConfig } from '@/config';
import { userRoles } from '@/endpoints/auth/enums/userRoles';

export const createToken = (payload: JwtPayload | string): string => {
    return sign(payload, jwtConfig.secretKey, { expiresIn: jwtConfig.expiresIn });
};
export const verifyToken = (payload: JwtPayload | string): JWTUserType | false => {
    try {
        return verify(payload, jwtConfig.secretKey) as JWTUserType;
    } catch (err) {
        return false;
    }
};
export const checkUserRole = (req: Request, role: UserRoleType) => {
    return req?.user && req?.user?.role === role;
};
export const isSuperUser = (req: Request): boolean => {
    return checkUserRole(req, userRoles.SUPER);
};
export const isAdminUser = (req: Request): boolean => {
    return checkUserRole(req, userRoles.ADMIN);
};
export const isUser = (req: Request): boolean => {
    return checkUserRole(req, userRoles.USER);
};