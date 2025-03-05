const express = require('express');
const router = express.Router();
const { getAllUsers, createUser, getUserDetails, adminUpdateUser } = require('../controllers/admin.controller');
const adminMiddleware = require('../middlewares/admin.middleware');

router.use(adminMiddleware);

/**
 * @swagger
 * /api/admin/users/{email}:
 *   get:
 *     summary: Obtener detalles de un usuario por email
 *     tags: [Admin]
 *     description: Recupera la información de un usuario a partir de su dirección de correo electrónico.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *     responses:
 *       200:
 *         description: Información del usuario obtenida correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 fullname:
 *                   type: string
 *                   example: "Lodgerin admin"
 *                 email:
 *                   type: string
 *                   format: email
 *                   example: "usuario@example.com"
 *                 roleId:
 *                   type: integer
 *                   example: 1
 *                 createdAt:
 *                   type: date
 *                   example: "2025-03-04T14:29:53.612Z"
 *                 updatedAt:
 *                   type: date
 *                   example: "2025-03-04T14:29:53.612Z"
 *       400:
 *         description: Solicitud incorrecta (por ejemplo, email no válido).
 *       401:
 *         description: No autorizado (token inválido o ausente).
 *       404:
 *         description: Usuario no encontrado.
 */
router.get('/users/:email', getUserDetails);

/**
 * @swagger
 * /api/admin/users:
 *   get:
 *     summary: Obtiene la lista de usuarios
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida correctamente
 *       500:
 *         description: Error en el servidor
 */
router.get('/users', getAllUsers);

/**
 * @swagger
 * /api/admin/users:
 *   post:
 *     summary: Crear un nuevo usuario
 *     tags: [Admin]
 *     description: Permite registrar un nuevo usuario con nombre completo, email, contraseña y rol.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fullname
 *               - email
 *               - password
 *               - rol
 *             properties:
 *               fullname:
 *                 type: string
 *                 example: "Stephen King"
 *                 description: Nombre completo del usuario.
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "stephen.king@example.com"
 *                 description: Correo electrónico del usuario.
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "Pennywise123!"
 *                 description: Contraseña del usuario (mínimo 8 caracteres).
 *               rol:
 *                 type: integer
 *                 enum: [1, 2]
 *                 example: 2
 *                 description: Rol del usuario (1 para "admin", 2 para "guest").
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente.
 *       400:
 *         description: Error en la solicitud.
 *       403:
 *         description: Acceso denegado.
 */
router.post('/users', createUser);

/**
 * @swagger
 * /api/admin/users/{userId}:
 *   put:
 *     summary: Actualizar un usuario
 *     tags: [Admin]
 *     description: Permite a un administrador actualizar la información de un usuario. No puede cambiar su propio rol.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullname:
 *                 type: string
 *                 example: "Jane Doe"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "jane.doe@example.com"
 *               status:
 *                 type: boolean
 *                 example: true
 *               roleId:
 *                 type: integer
 *                 example: 2
 *                 description: "1 para Admin, 2 para Guest"
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Usuario actualizado correctamente"
 *                 updatedUser:
 *                   type: object
 *                   example: {}
 *       400:
 *         description: Error en la solicitud (datos incorrectos)
 *       403:
 *         description: No permitido (Admin intentando cambiar su propio rol)
 *       404:
 *         description: Usuario no encontrado
 */
router.put('/users/:userId', adminUpdateUser);


module.exports = router;
