import bcrypt from 'bcrypt';
import slugify from 'slugify';
import { bcryptConfig } from '@/config';

export const encryptText = async (text: string, rounds: number = bcryptConfig.saltRounds): Promise<string> => {
    const salt = await bcrypt.genSalt(rounds);
    return await bcrypt.hash(text, salt);
};
export const isEncrypted = async (text: string): Promise<boolean> => {
    return text.startsWith('$2b$' + bcryptConfig.saltRounds + '$');
};
export const compareBcryptText = async (text: string, encryptedText: string): Promise<boolean> => {
    return await bcrypt.compare(text, encryptedText);
};
export const slugifyText = (text: string): string => {
    return slugify(text, {
        replacement: '-',  // boşluk yerine kullanılacak karakter, varsayılan `-`
        remove: undefined, // regex ile eşleşen karakterleri kaldırır, varsayılan `undefined`, e.g. /[*+~.()'"!:@]/g
        lower: true,       // küçük harfe dönüştür, varsayılan `false`
        strict: false,     // sadece harf ve sayılara izin verir, varsayılan `false`
        locale: 'tr',      // belirli bir dil için özel karakterleri dönüştürmek üzere yerelleştirme ayarlarını kullanır
        trim: true         // baş ve sondaki boşlukları kırpar, varsayılan `true`
    });
};