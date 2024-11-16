import { userRoles } from "@/endpoints/auth/enums/userRoles";

export const userRoleTypeValues = Object.values(userRoles);
export type UserRoleType = typeof userRoleTypeValues[number];