# Use Node.js image to build the apps
FROM node:23.5 AS build

WORKDIR /app

# Copy the entire repo into the container
COPY . .

#COPY 404.html /usr/share/nginx/html/404.html

# Install dependencies
RUN yarn install

# Build each app separately
RUN yarn workspace website build
# RUN yarn workspace admin build
# RUN yarn workspace blog build

# Serve each app using NGINX
FROM nginx:alpine

# Copy built files for each app into their respective directories
COPY --from=build /app/apps/website/dist /usr/share/nginx/html/website
#COPY --from=build /app/apps/admin/public /usr/share/nginx/html/admin
# COPY --from=build /app/blog/build /usr/share/nginx/html/blog
# COPY --from=build /app/landing/build /usr/share/nginx/html/landing

# Copy custom NGINX configuration
COPY nginx.conf /etc/nginx/conf.d/web.conf


# Expose the port NGINX will use
EXPOSE 80

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]


