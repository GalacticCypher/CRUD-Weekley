FROM node:18
WORKDIR /app
RUN npm install -g serve
COPY . .
CMD ["serve", ".", "-l", "3000"]