FROM node:20

WORKDIR /app

COPY package*  .
RUN npm ci

COPY . .

RUN npm run build

EXPOSE 4000

# Add Env-Var's

CMD [ "node","dist/index.js" ]