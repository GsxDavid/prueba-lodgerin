const { getUsers, saveUser, getUserByEmail, updateUser } = require('../services/user.service');

const getAllUsers = async (req, res) => {
    try {
        const users = await getUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createUser = async (req, res) => {

    try {
        const { fullname, email, password, rol } = req.body;

        // Validar que los datos requeridos estén presentes
        if (!fullname || !email || !password) {
            return res.status(400).json({ message: "Todos los campos son obligatorios." });
        }

        if (!rol) {
            return res.status(400).json({ message: "Debe proporcionar un roleId válido." });
        }

        const result = await saveUser({ fullname, email, password, roleId: rol });

        if (!result.success) {
            return res.status(400).json({ message: result.message });
        }

        const userWithoutPassword = result.user.toJSON();
        delete userWithoutPassword.password;

        return res.status(201).json({ message: result.message, user: userWithoutPassword });

    } catch (error) {
        console.error("Error en createUser:", error);
        return res.status(500).json({ message: "Error interno al crear el usuario" });
    }
};


const getUserDetails = async (req, res) => {

    try {
        const { email } = req.params;

        if (!email) {
            return res.status(400).json({ message: "El email es obligatorio." });
        }

        const user = await getUserByEmail(email);

        return res.status(200).json(user);
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
};

const adminUpdateUser = async (req, res) => {
    
    try {
        const { userId } = req.params;
        const updates = req.body;

        // Un admin no puede cambiar su propio rol
        if (updates.roleId && req.user.id === parseInt(userId)) {
            return res.status(403).json({ message: 'No puedes cambiar tu propio rol' });
        }

        const updatedUser = await updateUser(userId, updates);
        res.json({message: "Usuario actualizado correctamente", updatedUser});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


module.exports = {
    getAllUsers,
    createUser,
    getUserDetails,
    adminUpdateUser
}