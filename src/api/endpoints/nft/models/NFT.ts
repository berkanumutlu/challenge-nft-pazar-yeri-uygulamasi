import { DataTypes, Model, UpdateOptions } from "sequelize";
import { NFTModelType } from "@/types/models";
import { priceCurrencyTypeValues } from "@/types/price";
import { mediaFileTypeValues } from "@/types/media";
import { priceCurrencies } from "../enums/priceCurrencies";
import { db } from "@/config/database";
import { checkRecordSlug } from "@/utils/model";
import { User } from "@/endpoints/auth/models/User";

export class NFT extends Model<NFTModelType> {
    static hiddenAttributes = ['id', 'updatedAt', 'deletedAt'];
    static guardedAttributes = ['id', 'slug', 'isFeatured', 'createdBy', 'createdAt', 'updatedAt', 'deletedAt'];
    static searchableAttributes = ['title', 'slug', 'description', 'price', 'priceCurrency'];
};

NFT.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
        unique: true
    },
    title: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    slug: {
        type: DataTypes.STRING(150),
        allowNull: true,
        unique: true
    },
    description: {
        type: DataTypes.STRING(160),
        defaultValue: null,
        allowNull: true
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0,
        allowNull: false
    },
    priceCurrency: {
        type: DataTypes.ENUM,
        values: priceCurrencyTypeValues,
        defaultValue: priceCurrencies.TRY,
        allowNull: false
    },
    media: {
        type: DataTypes.STRING,
        defaultValue: null,
        allowNull: true
    },
    mediaFileType: {
        type: DataTypes.ENUM,
        values: mediaFileTypeValues,
        defaultValue: null,
        allowNull: true
    },
    isFeatured: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
        comment: 'Öne çıkan nft\'ler listelenmek istenebilir.'
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false
    },
    createdBy: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    }
}, {
    sequelize: db,
    tableName: 'NFTs',
    timestamps: true,
    paranoid: true,
    hooks: {
        beforeCreate: (instance) => {
            instance = checkRecordSlug(instance);
        },
        beforeUpdate: (instance) => {
            instance = checkRecordSlug(instance);
        },
        beforeBulkCreate: (instances) => {
            instances.forEach(instance => {
                instance = checkRecordSlug(instance);
            });
        },
        beforeBulkUpdate: (options: CustomUpdateOptions<NFTModelType>) => {
            const instances = options?.attributes;
            if (Array.isArray(instances) && instances.length > 0) {
                instances.forEach(instance => {
                    if (instance?.slug) {
                        instance.slug = checkRecordSlug(instance).get('slug');
                    }
                });
            }
        }
    }
});

interface CustomUpdateOptions<T> extends UpdateOptions<T> {
    attributes?: Partial<T>;
};