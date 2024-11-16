import { FindOptions } from "sequelize";
import { UserType } from "@/types/user";
import { User } from "../models/User";

export const list = (filters?: FindOptions<UserType>) => {
    return User.findAll(filters);
};
export const count = (filters?: FindOptions<UserType>) => {
    if (Object.hasOwn(filters, 'attributes')) {
        delete filters.attributes;
    }
    return User.count(filters);
};
export const get = (filters?: FindOptions) => {
    return User.findOne(filters);
};
export const create = (data: UserType) => {
    return User.create(data);
};