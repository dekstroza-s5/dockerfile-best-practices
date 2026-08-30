FROM node:22-alpine AS dependencies
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

FROM node:22-alpine
ENV NODE_ENV=production
RUN addgroup -S app && adduser -S -G app app
WORKDIR /app
COPY --from=dependencies --chown=app:app /app/node_modules ./node_modules
COPY --chown=app:app . .
USER app
CMD ["node", "server.js"]
