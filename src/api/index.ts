import express from "express";
import cors from "cors";
import { appConfig, databaseConfig } from "@/config";
import responseHandler from "@/middlewares/responseHandler";
import errorHandler from "@/middlewares/errorHandler";

// Express sunucuyu başlat
const server = express();
const host = appConfig.url;
const port = appConfig.port;

// Middlewares
server.use(cors());                     // Tarayıcıların farklı kaynaklardan (origin) gelen istekleri kabul etmesini sağlar. (API adresine istek atmamızı sağlar.)
server.use(express.json());             // Gelen isteklerin gövdesinde (body) JSON formatında veri varsa, bu verileri otomatik olarak ayrıştırır (parse eder) ve req.body nesnesine yerleştirir.
// server.use(express.static('build'));    // build klasöründeki dosyaları static olarak sunmayı sağlar. http://example.com/style.css şeklinde kullanmamızı sağlar.
server.use(responseHandler as express.RequestHandler);

// Route tanımları
server.get("/", (req, res) => {
    res.send("Hello world!");
});

// Uygulamayı Başlat
const main = () => {
    try {
        console.log(`db: ${databaseConfig.database}`);
        server.listen(port, () => {
            console.log("env: " + appConfig.env);
            console.log(`server: ${host}:${port}, start running`);
        });
    } catch (err) {
        console.error(`Unable to start server or connect db: ${err}`);
    }
};
main();

// ErrorHandler
server.use(errorHandler as express.ErrorRequestHandler);