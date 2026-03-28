FROM node:22-alpine AS builder

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:22-alpine

WORKDIR /usr/src/app

# Only copy production dependencies and built files
COPY package*.json ./
RUN npm ci --omit=dev

COPY --from=builder /usr/src/app/dist ./dist

# Set production environment
ENV NODE_ENV=production

# Cloud Run injects PORT, but default to 8080
ENV PORT=8080
EXPOSE 8080

CMD ["npm", "start"]
