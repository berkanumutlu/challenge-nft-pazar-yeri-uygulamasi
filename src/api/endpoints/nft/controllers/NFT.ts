import { Request, Response, Next } from "@/types/request";
import { createPaginatedResponseData } from "@/middlewares/responseHandler";
import { prepareRequestFilters } from "@/utils/request";
import { isAdminUser } from "@/utils/auth";
import { filterHiddenFields, filterGuardedFields } from "@/utils/model";
import * as NFTService from "../services/NFT";
import { NFT } from "../models/NFT";
import { User } from "@/endpoints/auth/models/User";

export async function list(req: Request, res: Response, next: Next) {
    try {
        const { filters } = req.body;

        let requestFilter = prepareRequestFilters(filters, req, NFT);
        if (requestFilter?.include) {
            requestFilter.include['model'] = User;
            requestFilter.include['required'] = true;
        }
        if (!isAdminUser(req)) {
            requestFilter.where = { status: true, ...requestFilter?.where };
            if (requestFilter?.include) {
                requestFilter.include['where'] = { status: true, ...requestFilter?.include['where'] };
            }
        }

        const records = await NFTService.list(requestFilter);
        const count = await NFTService.count(requestFilter);

        return res.success(createPaginatedResponseData(records, count, filters?.limit, filters?.skip));
    } catch (err) {
        next(err);
    }
};
export async function get(req: Request, res: Response, next: Next) {
    try {
        const { filters } = req.body;

        let requestFilter = prepareRequestFilters(filters, req, NFT);
        if (requestFilter?.include) {
            requestFilter.include['model'] = User;
            requestFilter.include['required'] = true;
        }
        if (!isAdminUser(req)) {
            if (!filters || !filters?.where || !Object.hasOwn(filters?.where, 'slug')) return res.warning('Please provide slug.', 400);
            requestFilter.where = { status: true, ...requestFilter?.where };
            if (requestFilter?.include) {
                requestFilter.include['where'] = { status: true, ...requestFilter?.include['where'] };
            }
        }

        const record = await NFTService.get(requestFilter);
        if (!record) return res.warning('NFT not found.', 404);

        // TODO: Tek bir kayıt için createResponseData() fonksiyonu kullanılmalı mı?
        return res.success(record);
    } catch (err) {
        next(err);
    }
};
export async function create(req: Request, res: Response, next: Next) {
    try {
        let requestData = req.body;

        if (!isAdminUser(req)) {
            requestData = filterHiddenFields(requestData, req, NFT);
        }
        if (requestData.title.trim().length < 3) return res.warning('The title field cannot be less than 3 characters.', 400);
        requestData.createdBy = req.user.id;

        const newRecord = await NFTService.create(requestData);
        const responseData = !isAdminUser(req) ? filterHiddenFields(newRecord, req, NFT, ['createdBy']) : newRecord;

        return res.success(responseData, 'The NFT has been created successfully.', 201);
    } catch (err) {
        next(err);
    }
};
export async function update(req: Request, res: Response, next: Next) {
    try {
        const { filters, fields } = req.body;

        if (!filters || !filters?.where) return res.warning('Please provide filters.', 400);
        if (!fields || Object.keys(fields).length === 0) return res.warning('Please provide fields.', 400);
        // TODO: NFT title değişince slug da otomatik olarak değişmeli mi?
        if (Object.hasOwn(fields, 'title') && fields?.title?.trim()?.length < 3) return res.warning('The title field cannot be less than 3 characters.', 400);

        const requestFilter = prepareRequestFilters(filters);
        let requestFields = fields;
        if (!isAdminUser(req)) {
            if (!Object.hasOwn(requestFilter?.where, 'slug')) return res.warning('Please provide slug.', 400);
            requestFilter.where = { createdBy: req.user.id, ...requestFilter?.where };
            requestFields = filterGuardedFields(fields, req, NFT);
        }

        const record = await NFTService.get(requestFilter);
        if (!record) return res.warning('NFT not found.', 404);

        const updatedRecord = await NFTService.update(requestFilter, requestFields);
        if (updatedRecord[0] === 0) return res.warning('The message has not been updated.', 200);
        const responseData = filterHiddenFields(requestFields, req, NFT);

        return res.success(responseData, 'The NFT has been updated successfully.');
    } catch (err) {
        next(err);
    }
};
export async function deleteRecord(req: Request, res: Response, next: Next) {
    try {
        const { filters } = req.body;

        if (!filters || !filters?.where) return res.warning('Please provide filters.', 400);

        const requestFilter = prepareRequestFilters(filters);
        if (!isAdminUser(req)) {
            if (!Object.hasOwn(requestFilter?.where, 'slug')) return res.warning('Please provide slug.', 400);
            requestFilter.where = { createdBy: req.user.id, ...requestFilter?.where };
        }

        const record = await NFTService.get(requestFilter);
        if (!record) return res.warning('NFT not found.', 404);

        await NFTService.deleteRecord(record);

        return res.success(null, 'The NFT has been deleted successfully.');
    } catch (err) {
        next(err);
    }
};
export async function restore(req: Request, res: Response, next: Next) {
    try {
        const { filters } = req.body;

        if (!filters || !filters?.where) return res.warning('Please provide filters.', 400);

        const requestFilter = prepareRequestFilters(filters);
        requestFilter.paranoid = false;
        if (!isAdminUser(req)) {
            if (!Object.hasOwn(requestFilter?.where, 'slug')) return res.warning('Please provide slug.', 400);
            requestFilter.where = { createdBy: req.user.id, ...requestFilter?.where };
        }

        const record = await NFTService.get(requestFilter);
        if (!record) return res.warning('NFT not found.', 404);
        const restoredRecord = await NFTService.restore(record);
        const responseData = filterHiddenFields(restoredRecord, req, NFT);

        return res.success(responseData, 'The NFT has been restored successfully.');
    } catch (err) {
        next(err);
    }
};