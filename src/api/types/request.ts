import { Response as ExpressResponse, Request as ExpressRequest, NextFunction } from "express";

export type Request = ExpressRequest & {
    token?: string
};
export type Response = ExpressResponse & {
    success: (data: any, message?: string, status?: number) => void;
    warning: (message?: string, status?: number) => void;
    error: (err: any, message?: string, status?: number) => void;
};
export type Next = NextFunction;