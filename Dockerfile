# Use the official Nginx image
FROM nginx:latest

# Copy your website files to the default Nginx directory
COPY . /usr/share/nginx/html
