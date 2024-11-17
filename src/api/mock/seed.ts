import { db } from "@/config/database";
import { createUsers, destroyUsers } from "./user";
import { createNFTs, destroyNFTs } from "./nft";

async function seedMockData() {
    try {
        console.log(`${new Date()} - Database bağlantısı kuruluyor...`);
        await db.authenticate();

        await destroyUsers();
        const users = await createUsers(50);

        await destroyNFTs();
        await createNFTs(300, users);

        console.log(`${new Date()} - Sahte veriler başarıyla dolduruldu!`);
    } catch (error) {
        console.error(`${new Date()} - Veri doldurulurken bir hata oluştu:`, error);
    } finally {
        await db.close();
    }
}

seedMockData();
