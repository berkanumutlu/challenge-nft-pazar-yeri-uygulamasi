import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Request, Response, Next } from '@/types/request';
import { appConfig } from '@/config';

const date: string = new Date().toISOString();
// const date: string = new Date().toISOString();
// const date: string = new Date().toUTCString();
// const date: string = new Date().toLocaleString('tr-TR');
// const date: string = new Date().toString();

// Basit console log oluşturur
export const createConsoleLog = (req: Request, res: Response, next: Next): void => {
    console.log(`${new Date().toUTCString()} - ${req.method} ${req.url}`);
    next();
};
// Log mesajı oluşturur
export const createLogMessage = (err: Error, req: Request, res: Response): string => {
    return `${date} - ${req.method} ${req.url} (message: ${err.message})\nstack: ${err.stack}\n\n`;
};
// Log dosyası oluşturur
const createLogFile = (): string => {
    // const __filename = fileURLToPath(import.meta.url); // Çözümlenmiş dosya yolunu al (tsconfig.json'daki module: CommonJS olmadığında bu satır kullanılacak.)
    const __dirname = path.dirname(__filename); // Dizinin adını al
    const logDirectory = path.join(__dirname, '../logs');
    const logFileName = `${date.slice(0, 10)}.log`;

    if (!fs.existsSync(logDirectory)) {
        fs.mkdirSync(logDirectory);
    }
    return path.join(logDirectory, logFileName);
};
// Log dosyasına yeni bir log ekler
const appendLogFile = (err: Error, req: Request, res: Response): void => {
    const logFile = createLogFile();
    const errorLogMessage = createLogMessage(err, req, res);

    try {
        fs.appendFileSync(logFile, errorLogMessage);
    } catch (fileErr) {
        console.error('Failed to write to log file', fileErr);
    }
};
// Yeni log kaydı oluşturur
export const createNewLog = async (err: Error, req: Request, res: Response, next?: Next): Promise<void> => {
    // TODO: Hata takip sistemleri ile entegrasyon yapılabilir. (örnek: sentry.io, rollbar.com)
    if (appConfig.loggingFile) {
        appendLogFile(err, req, res);
    } else {
        createLogMessage(err, req, res);
    }
};
