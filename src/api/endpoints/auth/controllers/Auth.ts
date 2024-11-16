import { Request, Response, Next, AuthenticatedRequest } from "@/types/request";
import { userRoles } from "../enums/userRoles";
import { compareBcryptText } from "@/utils/text";
import { createToken, verifyToken } from "@/utils/auth";
import { filterGuardedFields, filterHiddenFields } from "@/utils/model";
import * as UserService from "../services/User";
import { User } from "../models/User";

export const register = async (req: Request, res: Response, next: Next) => {
    try {
        let requestData = req.body;

        requestData.role = userRoles.USER;
        const newRecord = await UserService.create(filterGuardedFields(requestData, req, User));
        const responseData = filterHiddenFields(newRecord, req, User);

        return res.success(responseData, 'You have successfully registered.', 201);
    } catch (err) {
        next(err);
    }
};
export const login = async (req: Request, res: Response, next: Next) => {
    try {
        const { username, password } = req.body;

        const record = await UserService.get({ where: { email: username }, attributes: ['id', 'password', 'role'] });
        if (!record) return res.warning('User not found.', 404);

        const isPaswordCorrect = await compareBcryptText(password, record.getDataValue('password'));
        if (!isPaswordCorrect) return res.warning('Username or password is incorrect.', 401);

        const userToken = createToken({ id: record.getDataValue('id'), role: record.getDataValue('role') });
        const responseData = { token: userToken };

        return res.success(responseData, 'You have successfully logged in.', 200);
    } catch (err) {
        next(err);
    }
};
export const logout = async (req: Request, res: Response, next: Next) => {
    try {
        // TODO: Token bir tabloda tutulmadığı için şuanda herhangi bir işlem yapılmıyor.
        return res.success(null, 'You have successfully logout.', 200);
    } catch (err) {
        next(err);
    }
};
export const me = async (req: AuthenticatedRequest, res: Response, next: Next) => {
    try {
        const { token } = req.body;

        const decoded = verifyToken(token);
        if (!decoded) return res.warning('Invalid token.', 403);

        const user = await User.findByPk((decoded as any).id);
        if (!user) return res.warning('User not found.', 404);
        if (user.getDataValue('status') !== true) return res.warning('Access denied.', 403);

        const responseData = filterHiddenFields(user, req, User, null, ['id']);

        return res.success(responseData);
    } catch (err) {
        next(err);
    }
};