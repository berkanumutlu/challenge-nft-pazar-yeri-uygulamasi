# Base image olarak Node 20-alpine kullan
FROM node:20-alpine

# Gerekli build araçlarını yükle
RUN apk add --no-cache python3 make g++

# Çalışma dizinini ayarla
WORKDIR /app

# Uygulama dosyalarını kopyala
COPY src/app ./

# Bağımlılıkları yükle
RUN npm install

# Uygulamanın çalışacağı portu belirt
EXPOSE 3000

# Uygulamayı başlat
CMD ["npm", "run", "dev"]