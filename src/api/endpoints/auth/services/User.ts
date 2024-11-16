import { FindOptions } from "sequelize";
import { UserModelType } from "@/types/models";
import { User } from "../models/User";

export const list = (filters?: FindOptions<UserModelType>) => {
    return User.findAll(filters);
};
export const count = (filters?: FindOptions<UserModelType>) => {
    if (Object.hasOwn(filters, 'attributes')) {
        delete filters.attributes;
    }
    return User.count(filters);
};
export const get = (filters?: FindOptions) => {
    return User.findOne(filters);
};
export const create = (data: UserModelType) => {
    return User.create(data);
};