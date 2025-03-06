# syntax=docker/dockerfile:1

ARG NODE_VERSION=22.13.1

# Sử dụng image node làm cơ sở
FROM node:${NODE_VERSION}-alpine as base

# Thiết lập thư mục làm việc
WORKDIR /usr/src/app

# Sao chép file package.json và package-lock.json
COPY package.json package-lock.json ./

# Cài đặt tất cả các phụ thuộc, bao gồm cả devDependencies
RUN npm ci

# Sao chép toàn bộ mã nguồn vào container
COPY . .

# Xây dựng ứng dụng
RUN npm run build

# Cài đặt serve để phục vụ ứng dụng
RUN npm install -g serve

# Mở cổng 4173
EXPOSE 4173

# Chạy ứng dụng bằng serve
CMD ["serve", "-s", "dist", "-l", "4173"]
