
FROM node:18-alpine


WORKDIR /app


COPY package*.json ./


RUN npm install


COPY . .


RUN npm run build


EXPOSE 3000

# Define the command to run your app
CMD ["npm", "start"]
