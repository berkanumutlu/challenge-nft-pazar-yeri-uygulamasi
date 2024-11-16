import { DataTypes } from "sequelize";
import { userRoles } from "@/endpoints/auth/enums/userRoles";

export const userRole = Object.values(userRoles);
export type UserRoleType = typeof userRole[number];

export type UserType = {
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