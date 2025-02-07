# Use an official Node.js runtime as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json before installing dependencies (helps with caching)
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy all files from the project directory to the container
COPY . .

# Expose the application port
EXPOSE 9908

# Define the command to run the application
CMD ["node", "server.js"]
