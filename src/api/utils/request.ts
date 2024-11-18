import { Op } from "sequelize";
import { Request, RequestFilterType } from "@/types/request";
import { isAdminUser } from "./auth";
import { filterHiddenFields } from "./model";

export const prepareRequestFilters = (filters?: RequestFilterType, req?: Request, model?: any, relatedModel?: any): any => {
    let preparedFilters: any = {};
    if (filters) {
        if (filters?.limit && Number.isInteger(filters?.limit)) {
            preparedFilters.limit = Number(filters.limit);
        }

        if (filters?.skip && Number.isInteger(filters?.skip)) {
            preparedFilters.offset = Number(filters.skip);
        }

        if (filters?.where) {
            preparedFilters.where = !isAdminUser(req) ? filters.where : filterHiddenFields(filters?.where, req, model);

            // "price": [1, 50] gibi özel durumlar için
            Object.keys(filters.where).forEach((key) => {
                const value = filters.where[key];
                if (Array.isArray(value) && value.length === 2) {
                    preparedFilters.where[key] = { [Op.between]: value };
                } else {
                    preparedFilters.where[key] = value;
                }
            });

            // filters.where.search işlemi
            if (filters.where?.search && model?.searchableAttributes) {
                const search = filters.where.search;
                const searchConditions = model.searchableAttributes.map((attribute: string) => {
                    const fieldDefinition = model.rawAttributes?.[attribute];
                    if (fieldDefinition.type.key === "STRING") {
                        return { [attribute]: { [Op.like]: `%${search}%` } };
                    } else if (fieldDefinition.type.key === "FLOAT" || fieldDefinition.type.key === "INTEGER") {
                        return { [attribute]: search };
                    }
                    return null;
                }).filter(Boolean);

                preparedFilters.where = {
                    ...preparedFilters.where,
                    [Op.or]: searchConditions
                };

                delete preparedFilters.where['search'];
            }

            if (filters.where?.include) {
                preparedFilters.include = preparedFilters.include || {};
                preparedFilters.include = { where: { ...(!isAdminUser(req) ? filterHiddenFields(filters?.where?.include, req, relatedModel) : filters.where.include) } };
                delete preparedFilters.where['include'];
            }
        }

        if (filters?.order) {
            const orderKey = Object.keys(filters.order)[0];
            const orderDirection = filters.order[orderKey].toUpperCase();
            preparedFilters.order = [[orderKey, orderDirection]];
        }

        if (filters?.select) {
            preparedFilters.attributes = Array.isArray(filters.select) ? filters.select : [filters.select];
            if (!isAdminUser(req)) {
                preparedFilters.attributes = filterHiddenFields(preparedFilters?.attributes, req, model);
            }
        } else {
            if (!isAdminUser(req) && model?.hiddenAttributes) {
                preparedFilters.attributes = {
                    exclude: model?.hiddenAttributes
                };
            }
        }

        if (filters?.selectInclude) {
            preparedFilters.include = preparedFilters.include || {};
            preparedFilters.include["attributes"] = filters.selectInclude;
            if (!isAdminUser(req)) {
                preparedFilters.include["attributes"] = filterHiddenFields(filters?.selectInclude, req, relatedModel);
            }
        } else {
            if (!isAdminUser(req) && relatedModel?.hiddenAttributes) {
                preparedFilters.include = preparedFilters.include || {};
                preparedFilters.include["attributes"] = {
                    exclude: relatedModel?.hiddenAttributes
                };
            }
        }
    } else {
        if (!isAdminUser(req) && model?.hiddenAttributes) {
            preparedFilters.attributes = {
                exclude: model?.hiddenAttributes
            };
        }
    }
    return preparedFilters;
};