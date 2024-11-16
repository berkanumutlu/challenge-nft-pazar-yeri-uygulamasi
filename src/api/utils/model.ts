import { Model } from 'sequelize';
import { Request } from "@/types/request";
import { isAdminUser } from "./auth";
import { slugifyText } from "./text";

export const filterRecordFields = (record: any, type: string, req?: Request, model?: any, includedFields: string[] = [], excludedFields: string[] = []) => {
    if (!record) return [];

    if (!isAdminUser(req)) {
        let attributeList = [...(model && model[type] || []), ...includedFields];
        attributeList = attributeList.filter(attr => !excludedFields.includes(attr));// excludedFields'i attributeList'ten çıkartıyor.

        if (Array.isArray(record)) {
            return record.filter(item => !attributeList.includes(item));
        }

        const recordData = typeof record.toJSON === 'function' ? record.toJSON() : record;

        attributeList.forEach((attr: string) => {
            delete recordData[attr];
        });

        return recordData;
    }

    return record;
};
export const filterHiddenFields = (record: any, req?: Request, model?: any, includedFields?: string[], excludedFields?: string[]) => {
    return filterRecordFields(record, 'hiddenAttributes', req, model, includedFields || [], excludedFields || []);
};
export const filterGuardedFields = (record: any, req?: Request, model?: any, includedFields?: string[], excludedFields?: string[]) => {
    return filterRecordFields(record, 'guardedAttributes', req, model, includedFields || [], excludedFields || []);
};
export const slugifyModelField = (record: Model, field: string, fallbackField: string) => {
    let value = record.get(field) as string;
    if (!value) {
        value = record.get(fallbackField) as string;
    }

    const slugifiedValue = slugifyText(value);
    record.set(field, slugifiedValue);

    return record;
};
export const checkRecordSlug = (record: Model) => {
    return slugifyModelField(record, 'slug', 'name');
};