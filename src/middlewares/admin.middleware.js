const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(403).json({ message: "Acceso denegado. Token no proporcionado." });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (decoded.roleId !== 1) {
            return res.status(403).json({ message: "Acceso denegado. Se requiere rol de administrador." });
        }

        req.user = decoded; // Pasar la info del usuario al request
        next(); // Continuar con la siguiente función
    } catch (error) {
        return res.status(401).json({ message: "Token inválido o expirado." });
    }
};
