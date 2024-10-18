# Use the official Node.js image for building the frontend
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json* ./
RUN npm install

# Copy the rest of the frontend code and build it
COPY . .
RUN npm run build

# Use a lightweight Nginx image to serve the built files
FROM nginx:alpine

# Copy built files to Nginx web directory
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80 for the frontend
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
