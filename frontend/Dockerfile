FROM node:20-slim
WORKDIR /app
COPY package*.json ./

# Limpa o cache do NPM antes de instalar para evitar erros
RUN npm cache clean --force && npm install

COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]