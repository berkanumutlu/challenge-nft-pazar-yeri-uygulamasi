import { DataTypes, Model, UpdateOptions } from "sequelize";
import { UserModelType } from "@/types/models";
import { userRoleTypeValues } from "@/types/user";
import { userRoles } from "../enums/userRoles";
import { db } from "@/config/database";
import { encryptText, isEncrypted } from "@/utils/text";

export class User extends Model<UserModelType> {
    static hiddenAttributes = ['id', 'password', 'role', 'status', 'updatedAt', 'deletedAt'];
    static guardedAttributes = ['id', 'fullName', 'role', 'status', 'createdAt', 'updatedAt', 'deletedAt'];
};

User.init({
    id: {
        type: DataTypes.UUID, // DataTypes.INTEGER
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
        unique: true,
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fullName: {
        type: DataTypes.VIRTUAL,
        get() {
            return `${this.getDataValue('firstName')} ${this.getDataValue('lastName')}`;
        },
        set() {
            throw new Error("Set firstName and lastName to set the `fullName`!");
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "Hashed password"
    },
    avatar: {
        type: DataTypes.STRING,
        defaultValue: null,
        allowNull: true
    },
    role: {
        type: DataTypes.ENUM,
        values: userRoleTypeValues,
        defaultValue: userRoles.USER,
        allowNull: false
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false
    }
}, {
    sequelize: db,
    tableName: 'Users',
    timestamps: true,
    paranoid: true,
    scopes: {
        // fullName alanı virtual olduğu için bu alanın değerine ulaşmak için request içerisinde firstName, lastName değerlerininde alınması gerekiyor.
        withFullName: {
            attributes: { include: ['firstName', 'lastName', 'fullName'] }
        }
    },
    hooks: {
        beforeCreate: async (instance) => {
            if (!await isEncrypted(instance.getDataValue('password'))) {
                instance.setDataValue('password', await encryptText(instance.getDataValue('password')));
            }
        },
        beforeUpdate: async (instance) => {
            if (instance.changed('password' as keyof User) && !await isEncrypted(instance.getDataValue('password'))) {
                instance.setDataValue('password', await encryptText(instance.getDataValue('password')));
            }
        },
        beforeBulkCreate: async (instances) => {
            for (const instance of instances) {
                const password = instance.getDataValue('password');
                if (!await isEncrypted(password)) {
                    instance.setDataValue('password', await encryptText(password));
                }
            }
        },
        beforeBulkUpdate: async (options: CustomUpdateOptions<UserModelType>) => {
            if (options.fields.includes("password")) {
                const password = options.attributes?.password as string;
                if (password && !await isEncrypted(password)) {
                    options.attributes.password = await encryptText(password);
                }
            }
        }
    }
});

interface CustomUpdateOptions<T> extends UpdateOptions<T> {
    attributes?: Partial<T>;
};