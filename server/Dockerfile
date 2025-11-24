FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install
COPY . .

ENV DATABASE_URL="postgresql://postgres:1234@db:5432/nxgen?schema=public"
ENV PORT=3000
ENV NODE_ENV=development

RUN npx prisma generate
# RUN npx prisma migrate deploy
# RUN npx prisma db seed

EXPOSE 3000
CMD ["sh", "-c", "npx prisma migrate deploy && npm run prisma:seed && npm run seed && npm run dev"]
