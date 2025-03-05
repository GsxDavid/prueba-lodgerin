#!/bin/sh

echo "Generando JWT secret..."
npm run generate:jwt-secret

echo "Creando la base de datos..."
npx sequelize-cli db:create

echo "Ejecutando migraciones..."
npx sequelize-cli db:migrate

echo "Sembrando datos iniciales..."
npx sequelize-cli db:seed:all

echo "Iniciando la aplicación..."
npm start
