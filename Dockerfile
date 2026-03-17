FROM node:20

WORKDIR /app

# зависимости
COPY package*.json ./
RUN npm install --legacy-peer-deps

# код
COPY . .

# порт vite
EXPOSE 5173

# запуск dev сервера
CMD ["npm", "run", "dev"]