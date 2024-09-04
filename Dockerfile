# Etapa de build
FROM node:20-alpine AS builder

# Defina o diretório de trabalho
WORKDIR /app

# Copie os arquivos package.json e package-lock.json para instalar as dependências
COPY package*.json ./

# Instale as dependências do projeto
RUN npm install --frozen-lockfile

# Copie o restante dos arquivos da aplicação
COPY . .

# Construa a aplicação Next.js
RUN npm run build

# Etapa de produção
FROM node:20-alpine AS runner

# Defina o diretório de trabalho
WORKDIR /app

# Copie as dependências instaladas e a build
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package*.json ./

# Exponha a porta usada pelo Next.js
EXPOSE 3000

# Defina a variável de ambiente NODE_ENV como produção
ENV NODE_ENV production

# Comando para iniciar a aplicação
CMD ["npm", "start"]
