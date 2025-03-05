const bcrypt = require('bcryptjs');
const { User } = require('../../models');
const { generateToken } = require('../utils/jwt.util');

const login = async (email, password) => {
    try {
        // Buscar el usuario por email
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return { success: false, message: "Usuario no encontrado" };
        }

        // Verificar si la contraseña es correcta
        const isMatch = bcrypt.compareSync(password, user.password);

        if (!isMatch) {
            return { success: false, message: "Contraseña incorrecta" };
        }

        const userData = user.get({ plain: true });

        const token = generateToken(userData);

        return { success: true, token };
    } catch (error) {
        console.error("Error en autenticación:", error);
        return { success: false, message: "Error en el servidor" };
    }
};


module.exports = { login };
