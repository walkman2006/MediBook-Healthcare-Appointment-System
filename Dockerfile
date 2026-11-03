FROM nginx:alpine

WORKDIR /usr/share/nginx/html

COPY index.html .
COPY doctors.html .
COPY login.html .
COPY register.html .
COPY booking.html .

COPY css/ ./css/
COPY js/ ./js/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]