import { faker } from '@faker-js/faker';
import { userRoles } from '@/endpoints/auth/enums/userRoles';
import { getRandomEnumValue } from '@/utils/text';
import { User } from "@/endpoints/auth/models/User";

export const destroyUsers = async () => {
    try {
        await User.destroy({ where: {}, truncate: true });
        console.log(`${new Date()} - Users tablosu sıfırlandı...`);
    } catch (error) {
        console.error(`${new Date()} - Users tablosu sıfırlanırken bir hata oluştu:`, error);
    }
};
export const createUsers = async (count: number) => {
    try {
        console.log(`${new Date()} - ${count} adet kullanıcı oluşturuluyor...\n`);
        const users = [];
        for (let i = 0; i < count; i++) {
            users.push({
                id: faker.string.uuid(),
                firstName: faker.person.firstName(),
                lastName: faker.person.lastName(),
                email: faker.internet.email(),
                password: faker.internet.password(),
                avatar: faker.image.url(),
                role: getRandomEnumValue(userRoles),
                status: faker.datatype.boolean(),
                createdAt: new Date(),
                updatedAt: new Date(),
                deletedAt: Math.random() < 0.5 ? null : new Date()
            });
        }

        const createdUsers = await User.bulkCreate(users);
        console.log(`${new Date()} - ${count} adet kullanıcı başarıyla oluşturuldu!\n`);

        return createdUsers;
    } catch (error) {
        console.error(`${new Date()} - Kullanıcı oluşturulurken bir hata oluştu:`, error);
    }
};