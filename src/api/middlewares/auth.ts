import jwt from 'jsonwebtoken';
import { Request, Response, Next } from '@/types/request';
import { AuthenticatedRequest } from '@/types/request';
import { jwtConfig } from '@/config';
import { isAdminUser, isSuperUser, isUser } from '@/utils/auth';
import { User } from '@/endpoints/auth/models/User';

export const authToken = (req: Request, res: Response, next: Next): void => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.warning('Access denied. No token provided.', 403);

    try {
        jwt.verify(token, jwtConfig.secretKey, async (err, decoded) => {
            if (err) return res.warning('Invalid token.', 403);

            const user = await User.findByPk((decoded as any).id);
            if (!user) return res.warning('User not found.', 404);
            if (user.getDataValue('status') !== true) return res.warning('Access denied.', 403);

            req.user = user.get({ plain: true });
            next();
        });
    } catch (err) {
        next(err);
    }
};
export const authSuper = (req: AuthenticatedRequest, res: Response, next: Next): void => {
    if (req?.user && isSuperUser(req)) {
        next();
    } else {
        return res.warning('You are not authorized.', 403);
    }
};
export const authAdmin = (req: AuthenticatedRequest, res: Response, next: Next): void => {
    if (req?.user && (isSuperUser(req) || isAdminUser(req))) {
        next();
    } else {
        return res.warning('You are not authorized.', 403);
    }
};
export const authUser = (req: AuthenticatedRequest, res: Response, next: Next): void => {
    if (req?.user && (isSuperUser(req) || isAdminUser(req) || isUser(req))) {
        next();
    } else {
        return res.warning('You are not authorized.', 403);
    }
};