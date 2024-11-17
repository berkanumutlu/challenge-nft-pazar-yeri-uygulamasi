import { faker } from "@faker-js/faker";
import { priceCurrencies } from "@/endpoints/nft/enums/priceCurrencies";
import { mediaFileTypes } from "@/endpoints/nft/enums/mediaFile";
import { getRandomEnumValue } from "@/utils/text";
import { NFT } from "@/endpoints/nft/models/NFT";
import { User } from "@/endpoints/auth/models/User";

export const destroyNFTs = async () => {
    try {
        await NFT.destroy({ where: {}, truncate: true });
        console.log(`${new Date()} - NFTs tablosu sıfırlandı...`);
    } catch (error) {
        console.error(`${new Date()} - NFTs tablosu sıfırlanırken bir hata oluştu:`, error);
    }
};
export const createNFTs = async (count: number, users: User[]) => {
    try {
        console.log(`${new Date()} - ${count} adet NFT oluşturuluyor...\n`);
        const nfts = [];
        for (let i = 1; i < count + 1; i++) {
            nfts.push({
                id: faker.string.uuid(),
                title: `${faker.commerce.productName()}-${i}`,
                description: faker.commerce.productDescription(),
                price: faker.commerce.price({ min: 10, max: 2000 }),
                priceCurrency: getRandomEnumValue(priceCurrencies),
                media: faker.image.url(),
                mediaFileType: getRandomEnumValue(mediaFileTypes),
                isFeatured: faker.datatype.boolean(),
                status: faker.datatype.boolean(),
                createdBy: faker.helpers.arrayElement(users).getDataValue('id'),
                createdAt: new Date(),
                updatedAt: new Date(),
                deletedAt: Math.random() < 0.5 ? null : new Date()
            });
        }

        const createdNfts = await NFT.bulkCreate(nfts);
        console.log(`${new Date()} - ${count} adet NFT başarıyla oluşturuldu!\n`);

        return createdNfts;
    } catch (error) {
        console.error(`${new Date()} - NFT oluşturulurken bir hata oluştu:`, error);
    }
}
