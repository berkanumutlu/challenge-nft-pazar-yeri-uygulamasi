import { DataTypes } from "sequelize";
import { userRoles } from "@/endpoints/auth/enums/userRoles";

export type UserModelType = {
    id: typeof DataTypes.UUID;
    fullName?: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    // role:  keyof typeof userRoles,                      // keyleri alır
    role: (typeof userRoles)[keyof typeof userRoles];   // valuelari alır
    status: boolean;
};
export type NFTModelType = {
    id: typeof DataTypes.UUID;
    title: string;
    slug: string;
    description: string | null;
    price: number;
    priceCurrency: string;
    media: string | null;
    mediaFileType: string | null;
    isFeatured: boolean;
    status: boolean;
    createdBy: typeof DataTypes.UUID;
};