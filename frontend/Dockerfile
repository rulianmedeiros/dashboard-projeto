# Etapa 1: Construir o site (Build)
FROM node:20-slim AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install --no-audit --progress=false
COPY . .
RUN npm run build

# Etapa 2: Servir o site (Produção)
FROM nginx:stable-alpine
# Copia o resultado do build para a pasta padrão do Nginx
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]