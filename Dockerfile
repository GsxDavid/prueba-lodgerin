FROM node:18

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar archivos necesarios
COPY package.json package-lock.json ./
COPY . .

# Instalar dependencias
RUN npm install

# Dar permisos de ejecución al script de inicio
RUN chmod +x /app/entrypoint.sh

# Definir el comando de inicio
ENTRYPOINT ["/app/entrypoint.sh"]
