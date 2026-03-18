FROM nginx:alpine
COPY build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY auth/.htpasswd /etc/nginx/auth/.htpasswd
EXPOSE 80