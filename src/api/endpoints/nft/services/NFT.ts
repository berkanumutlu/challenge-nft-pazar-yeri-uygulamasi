import { Model, UpdateOptions, FindOptions } from "sequelize";
import { NFTModelType } from "@/types/models";
import { NFT } from "../models/NFT";

export const list = (filters?: FindOptions<NFTModelType>) => {
    return NFT.findAll(filters);
};
export const count = (filters?: FindOptions<NFTModelType>) => {
    if (Object.hasOwn(filters, 'attributes')) {
        delete filters.attributes;
    }
    return NFT.count(filters);
};
export const get = (filters?: FindOptions<NFTModelType>) => {
    return NFT.findOne(filters);
};
export const create = (data: NFTModelType) => {
    return NFT.create(data);
};
export const update = (filters: UpdateOptions, fields: NFTModelType) => {
    return NFT.update(fields, filters);
};
export const deleteRecord = (record: Model<NFTModelType>) => {
    return record.destroy();
};
export const restore = (record: Model<NFTModelType>) => {
    return record.restore();
};