# Usa una imagen base ligera de Node.js
FROM node:16-alpine as build

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /reactapp

# Copia los archivos de tu aplicación al directorio de trabajo
COPY package.json ./
COPY package-lock.json ./
RUN npm install --force
COPY . .

# Construye la aplicación React
#RUN npm run build

# Usa una imagen base ligera de Nginx para servir los archivos estáticos
#FROM nginx:alpine

# Copia los archivos de la aplicación React compilados
#COPY --from=build /reactapp/build /usr/share/nginx/html

# Exponer el puerto 80
EXPOSE 4580
CMD ["npm", "run", "start"]