const { User, Role } = require('../../models');
const bcrypt = require('bcryptjs');

const getUsers = async () => {
    return await User.findAll({ include: { model: Role, as: 'role' } });
};

const saveUser = async (user) => {

    try {

        // Verificar si el email ya existe
        const existingUser = await User.findOne({ where: { email: user.email } });
        if (existingUser) {
            return { success: false, message: "El email ya está registrado" };
        }

        // Hashear la contraseña
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(user.password, salt);

        // Crear el usuario
        const newUser = await User.create({
            fullname: user.fullname,
            email: user.email,
            password: hashedPassword,
            roleId: user.roleId
        });

        return { success: true, message: "Usuario creado exitosamente", user: newUser };

    } catch (error) {
        console.error("Error al crear usuario:", error);
        return { success: false, message: "Error al crear usuario" };
    }
};

const getUserByEmail = async (email) => {
    try {
        // Buscar el usuario por email
        const user = await User.findOne({
            where: { email },
            attributes: { exclude: ['password'] } // Excluir el campo de contraseña
        });

        if (!user) {
            throw new Error("No se encontró un usuario con ese email.");
        }

        return user;
    } catch (error) {
        console.error("Error al obtener el usuario:", error);
        throw new Error("Error al obtener los datos del usuario.");
    }
};


const getUserById = async (id) => {
    try {
        const user = await User.findOne({
            where: { id },
            attributes: { exclude: ['password'] }
        });

        if (!user) {
            throw new Error("No se encontró un usuario con ese ID.");
        }

        return user;
    } catch (error) {
        console.error("Error al obtener el usuario:", error);
        throw new Error("Error al obtener los datos del usuario.");
    }
};

const updateUser = async (userId, updates) => {

    try {
        const user = await User.findByPk(userId);
        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        await user.update(updates);

        return user;
    } catch (error) {
        console.error('Error al actualizar usuario:', error);
        throw new Error('No se pudo actualizar el usuario');
    }
};


const updatePassword = async (userId, newPassword) => {
    try {

        // Encontrar el usuario a actualizar
        const user = await User.findOne({ where: { id: userId } });

        if (!user) {
            throw new Error("Usuario no encontrado.");
        }

        // Encriptar la nueva contraseña
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // Actualizar la contraseña
        user.password = hashedPassword;
        await user.save();

        return user;
    } catch (error) {
        console.error("Error al cambiar la contraseña:", error);
        throw new Error(error.message || "Error al cambiar la contraseña.");
    }
};

module.exports = {
    getUsers,
    saveUser,
    getUserByEmail,
    getUserById,
    updateUser,
    updatePassword
}