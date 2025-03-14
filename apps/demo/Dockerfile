# Use Node.js image to build the apps
FROM node:23.5 AS build

WORKDIR /app

# Copy the entire repo into the container
COPY . .

# Install dependencies
RUN npm install

# Build demo
RUN npm run build


# Serve each app using NGINX
FROM nginx:alpine

# Copy built files
COPY --from=build /app/dist /usr/share/nginx/html

# Use a custom NGINX configuration (replace main nginx.conf)
COPY nginx.conf /etc/nginx/nginx.conf

# Expose the port NGINX will use
EXPOSE 80

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]


