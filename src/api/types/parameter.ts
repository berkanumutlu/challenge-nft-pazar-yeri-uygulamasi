import { DataTypes } from "sequelize";

export type ParameterRecordIdType = string | number | typeof DataTypes.UUID;
export type ParameterUserIdType = string | number | typeof DataTypes.UUID;