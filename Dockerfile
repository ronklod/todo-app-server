FROM node:17.3.0
WORKDIR /todo-app
COPY package*.json /todo-app
RUN npm install
COPY . /todo-app
EXPOSE 3001
#setting the production variables
ENV NODE_ENV=production
CMD ["node", "./bin/www"]

