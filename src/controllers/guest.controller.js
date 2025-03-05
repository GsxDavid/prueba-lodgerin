const { updatePassword, saveUser, updateUser, getUserById } = require('../services/user.service');

const createUser = async (req, res) => {
    try {
        const { fullname, email, password } = req.body;

        const assignedRoleId = 2;

        // Validar que los datos requeridos estén presentes
        if (!fullname || !email || !password) {
            return res.status(400).json({ message: "Todos los campos son obligatorios." });
        }

        // Intentar crear el usuario
        const result = await saveUser({ fullname, email, password, roleId: assignedRoleId });

        // Manejo de error si el email ya está registrado
        if (!result.success) {
            return res.status(400).json({ message: result.message });
        }

        // Remover la contraseña del objeto usuario antes de enviarlo
        const userWithoutPassword = result.user.toJSON();
        delete userWithoutPassword.password;

        return res.status(201).json({ message: result.message, user: userWithoutPassword });

    } catch (error) {
        console.error("Error en createUser:", error);
        return res.status(500).json({ message: "Error interno al crear el usuario" });
    }
};

const changePassword = async (req, res) => {

    const { id: currentUserId } = req.user;
    const { newPassword } = req.body;

    if (!newPassword) {
        return res.status(400).json({ message: "La nueva contraseña es obligatoria." });
    }

    try {
        const updatedUser = await updatePassword(currentUserId, newPassword);

        const userWithoutPassword = updatedUser.toJSON();
        delete userWithoutPassword.password;


        res.status(200).json({ message: "Contraseña actualizada correctamente.", usuario: userWithoutPassword });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const getUserDetails = async (req, res) => {

    try {
        const { id } = req.user;

        const user = await getUserById(id);

        return res.status(200).json(user);
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
};

const updateGuestProfile = async (req, res) => {
    try {
        const updates = req.body;

        // Restringir el cambio de contraseña desde este método ya que existe un específico para el cambio de contraseña
        ["password", "roleId"].forEach((field) => delete updates[field]);

        // Un usuario solo puede actualizar su propia información
        const updatedUser = await updateUser(req.user.id, updates);

        res.json({ message: "Usuario actualizado correctamente.", updatedUser });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    changePassword,
    getUserDetails,
    createUser,
    updateGuestProfile
}