const express = require('express');
const router = express.Router();
const { createUser, getUserDetails, changePassword, updateGuestProfile } = require('../controllers/guest.controller');
const authMiddleware = require('../middlewares/auth.middleware');

/**
 * @swagger
 * /api/guest:
 *   post:
 *     summary: Crear un nuevo usuario invitado
 *     tags: [Guest]
 *     description: Permite registrar un nuevo usuario invitado con nombre completo, email y contraseña.
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
 *                 example: "Paul Sheldon"
 *                 description: Nombre completo del usuario.
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "paul.sheldon@example.com"
 *                 description: Correo electrónico del usuario.
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "Misery123!"
 *                 description: Contraseña del usuario (mínimo 8 caracteres).
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente.
 *       400:
 *         description: Error en la solicitud.
 *       403:
 *         description: Acceso denegado.
 */
router.post('/', createUser);

router.use(authMiddleware);

/**
 * @swagger
 * /api/guest/profile:
 *   get:
 *     summary: Obtiene información del usuario autenticado
 *     security:
 *       - bearerAuth: []
 *     tags: [Guest]
 *     responses:
 *       200:
 *         description: Información del usuario creado
 *       500:
 *         description: Error en el servidor
 */
router.get('/profile', getUserDetails)

/**
 * @swagger
 * /api/guest/password:
 *   put:
 *     summary: Cambiar la contraseña de un usuario
 *     tags: [Guest]
 *     description: Permite cambiar la contraseña de un usuario autenticado. Los administradores pueden cambiar cualquier contraseña, pero un usuario solo puede cambiar la suya.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newPassword:
 *                 type: string
 *                 description: Nueva contraseña del usuario.
 *     responses:
 *       200:
 *         description: Contraseña actualizada exitosamente.
 *       400:
 *         description: Error en la solicitud.
 *       403:
 *         description: Acceso denegado.
 */
router.put('/password', changePassword)

/**
 * @swagger
 * /api/guest/profile:
 *   put:
 *     summary: Actualiza el perfil del usuario autenticado
 *     description: Permite a un usuario invitado actualizar su información personal, pero no su contraseña ni su rol.
 *     tags:
 *       - Guest
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullname:
 *                 type: string
 *                 example: "John Katzenbach"
 *                 description: Nombre completo del usuario.
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "john.katzenbach@example.com"
 *                 description: Nuevo email del usuario (opcional).
 *     responses:
 *       200:
 *         description: Perfil actualizado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Usuario actualizado correctamente."
 *                 updatedUser:
 *                    type: object
 *                    properties:
 *                      id:
 *                        type: integer
 *                        example: 1
 *                      fullname:
 *                        type: string
 *                        example: "John Katzenbach"
 *                      email:
 *                        type: string
 *                        format: email
 *                        example: "john.katzenbach@example.com"
 *                      status:
 *                        type: boolean
 *                        example: true
 *                      roleId:
 *                        type: integer
 *                        example: 2
 *       400:
 *         description: Error en la solicitud (por ejemplo, datos inválidos).
 *       401:
 *         description: No autorizado (falta de autenticación).
 *       500:
 *         description: Error interno del servidor.
 */
router.put("/profile", updateGuestProfile)


module.exports = router;
