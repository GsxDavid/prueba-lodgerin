# prueba-lodgerin

Desarrollo de prueba técnica para el cargo `Backend Junior` utilizando express, Sequelize y Jest.


## Dependencias

1. Express
2. Sequelize
3. Jest
4. JWT

## Instalación

1. Instalar dependencias

    ```bash
        npm install
    ```
2. Crear archivo `.env` y definir las variables de entorno para conexión a base de datos y configuración de la aplicación.

    ```bash
        cp .env.example .env
    ```



## Crear la base de datos y ejecutar migraciones en Sequelize

Para configurar la base de datos correctamente, sigue estos pasos:

### 1️⃣ Crear la base de datos 

Antes de ejecutar las migraciones, es necesario crear la base de datos definida en la configuración de Sequelize. Usa el siguiente comando:  

```bash
    npx sequelize-cli db:create
```

### 2️⃣ Ejecutar las migraciones

La migraciones crean las tablas y estructura la base de datos según los modelos definidos en Sequelize.

```bash
    npx sequelize-cli db:migrate
```
### 3️⃣ Ejecutar los seeders

Por último se deben ejecutar los seeders para generar el usuario de prueba.

```bash
    npx sequelize-cli db:seed:all
```

## Ejecutar pruebas

```bash
    npm test
```

## Ejecutar la aplicación

```bash
    npm run dev
```