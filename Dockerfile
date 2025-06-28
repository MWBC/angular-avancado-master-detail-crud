FROM node:20.13.1 as builder

#Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json for dependency installation
COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build --production

# Use Nginx to serve the built Angular app
FROM nginx:alpine
COPY --from=builder /app/dist/finansys/browser /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

# RUN chmod -R 755 /usr/share/nginx/html

# Expose port for Angular app
EXPOSE 80

# Start the Nginx server
CMD ["nginx", "-g", "daemon off;"]