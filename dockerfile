# FROM node:20
# WORKDIR /user/src/app
# COPY package*  .
# RUN npm install   
# COPY . .
# RUN npm run build
# EXPOSE 4000
# CMD [ "node","dist/index.js" ]

FROM node:20

WORKDIR /user/src/app

COPY package*  .

RUN npm install

COPY . .

RUN npm run build

CMD ["npm", "start"]

EXPOSE 3000