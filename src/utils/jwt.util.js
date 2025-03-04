const jwt = require('jsonwebtoken');

exports.generateToken = (user) => {
  return jwt.sign({ id: user.id, email: user.email, roleId: user.role.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};
