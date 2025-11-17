# Use official Node.js image
FROM node:23

# Set working directory
WORKDIR /usr/src/app

# Install nodemon globally for dev
RUN npm install -g nodemon

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of your app
COPY . .

# Expose the port your app runs on
EXPOSE 3000

# Start with nodemon for auto-restart
CMD ["npm", "run", "dev"]
