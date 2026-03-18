FROM nginx:alpine
COPY build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY auth/.htpasswd /etc/nginx/auth/.htpasswd
COPY certs/cert.pem /etc/nginx/certs/cert.pem
COPY certs/key.pem /etc/nginx/certs/key.pem
EXPOSE 80
EXPOSE 443