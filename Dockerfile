# 1. Build Stage
FROM node:18 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

# 2. Production Stage
FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app ./

ENV NODE_ENV=production

# Expose the port Next.js runs on
EXPOSE 3000

CMD ["npm", "start"]