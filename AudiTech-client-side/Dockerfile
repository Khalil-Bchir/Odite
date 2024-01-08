# Use an official Node.js runtime as a base image for the build stage
FROM node:18 as build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install --legacy-peer-deps

# Copy the entire project to the working directory
COPY . .

# Build the Angular app for production
RUN npm install -g @angular/cli@latest && ng build

# Use a lightweight Node.js runtime as a base image for the final stage
FROM nginx:alpine

# Set the working directory
WORKDIR /usr/share/nginx/html

# Copy the built app from the build stage to the nginx public directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose the port that the app will run on
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
