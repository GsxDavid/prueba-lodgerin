const jwt = require('jsonwebtoken');
const { generateToken } = require('../src/utils/jwt.util');

jest.mock('jsonwebtoken');

describe('JWT Utility Tests', () => {

    const mockUser = {
        id: 1,
        email: 'test@example.com',
        roleId: 2
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('generateToken debería generar un token válido', () => {
        const mockToken = 'mocked.jwt.token';

        jwt.sign.mockReturnValue(mockToken);

        const token = generateToken(mockUser);

        expect(jwt.sign).toHaveBeenCalledWith(
            { id: mockUser.id, email: mockUser.email, roleId: mockUser.roleId },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        expect(token).toBe(mockToken);
    });

    test('generateToken debería lanzar un error si falta la clave secreta', () => {
        process.env.JWT_SECRET = '';

        jwt.sign.mockImplementation(() => {
            throw new Error('Missing secret key');
        });

        expect(() => generateToken(mockUser)).toThrow('Missing secret key');
    });

});
