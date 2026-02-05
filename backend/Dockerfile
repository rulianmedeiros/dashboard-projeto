FROM node:20-slim
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3001
# Inicia o seu servidor Node.js que conecta ao n8n
CMD ["npm", "start"]