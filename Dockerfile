# Use an official Node.js runtime as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Copy the .env file
COPY .env .env

# Build the application
RUN npm run build

# Expose the port on which the app will run
EXPOSE 5173

# Run the application in production mode
CMD ["npm", "run", "preview"] 

# Build the Docker image
# docker build -t connectin-app .

# Run the Docker container
# docker run -d -p 5173:5173 --env-file .env connectin-app
