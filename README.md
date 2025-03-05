# prueba-lodgerin

Desarrollo de prueba técnica para el cargo `Backend Junior` utilizando express, Sequelize y Jest.


## Dependencias

1. Express
2. Sequelize
3. Jest
4. JWT

## Instalación

Sigue estos pasos para configurar y ejecutar la aplicación correctamente.

### 1️⃣ Instalar dependencias

Ejecuta el siguiente comando para instalar las dependencias del proyecto:  

```bash
npm install
```

### 2️⃣ Crear archivo `.env` y definir las variables de entorno para conexión a base de datos y configuración de la aplicación.

Copia el archivo de ejemplo .env.example y renómbralo como .env. Luego, edítalo con la configuración de tu base de datos y otras variables necesarias como el puerto de la aplicación.

```bash
cp .env.example .env
```

### 3️⃣ Generar clave secreta para JWT

Para garantizar la seguridad de los tokens, es necesario generar un secreto aleatorio para JWT. Para esto ejecuta el siguiente comando
    
```bash
npm run generate:jwt-secret
```

Deberías ver el siguiente mensaje en consola al ejecutar el comando ✅

>       JWT_SECRET generado y actualizado en .env


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
npm start
```

## Autenticación

Para propósitos de prueba, pueden utilizar el siguiente usuario:

- **Email:** `admin@example.com`
- **Contraseña:** `SecurePWD123*`

La autenticación se realiza a través de la ruta `/auth`, la cual devolverá un token JWT.  

### Uso del JWT

Una vez obtenido el token, pueden utilizarlo en la UI de Swagger:  

1. Ir a la sección **Authorize**.
2. Ingresar el token en el campo correspondiente.
3. Aplicar la autenticación para que el token sea incluido en todas las solicitudes protegidas. 