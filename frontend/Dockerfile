FROM node:20-slim
# Pasta interna do container (não precisa criar no Windows)
WORKDIR /app
# Copia as configurações do seu PC para a VPS
COPY package*.json ./
RUN npm install
# Copia todo o seu código do VS Code
COPY . .
EXPOSE 5173
# Comando obrigatório para o Vite aceitar conexões externas
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]