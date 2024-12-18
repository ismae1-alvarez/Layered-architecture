import { Router } from 'express';
import { handleInputErrores } from '../../middleware/validation';
import { AuthController } from './auth.controller';
import { authenticate } from '../../middleware/auth';

import {
  validateCreateAccount,
  validateLogin,
  validateUpdateProfile,
} from '../../middleware/auth.validations';

const authRouter: Router = Router();

/**
 * @swagger
 * components:
 *      schemas:
 *          User:
 *            type: object
 *            properties:
 *                id:
 *                    type: integer
 *                    description: The User ID
 *                    example: 6744107bf803c5899d6ae2b2
 *                name:
 *                    type: string
 *                    description: The User name
 *                    example: Johan
 *                email:
 *                    type: string
 *                    description: registre email
 *                    example: ismaelalvarez514@5124.com
 *                password:
 *                    type: string
 *                    description: 8-Character Password
 *                    example: 12312468mkdsnfk
 *                password_confirmation:
 *                    type: string
 *                    description: Repeat password
 *                    example: 12312468mkdsnfk
 */

/**
 * @swagger
 * /api/v1/create-account:
 *        post:
 *            summary:  Creates a new user
 *            tags:
 *                - Users
 *            description: Returns messages
 *            requestBody:
 *                required: true
 *                content:
 *                    application/json:
 *                        schema:
 *                            type: object
 *                            properties:
 *                                email:
 *                                     type: string
 *                                     example: ismaelalvarez514@5124.com
 *                                name:
 *                                      type: string
 *                                      example: 'Johan'
 *                                password:
 *                                      type: string
 *                                      example: "Johan122134134@"
 *                                password_confirmation:
 *                                      type: string
 *                                      example: "Johan122134134@"
 *            responses:
 *                201:
 *                    description: Cuenta creada exitosamente
 *                409:
 *                    description: El usuario ya existe registrado
 *                500:
 *                    description: Error interno del servidor
 *
 */
authRouter.post(
  '/create-account',
  validateCreateAccount,
  handleInputErrores,
  AuthController.createAccount,
);

/**
 * @swagger
 * /api/v1/login:
 *        post:
 *            summary:  Login user
 *            tags:
 *                - Users
 *            description: Returns JWT
 *            requestBody:
 *                required: true
 *                content:
 *                    application/json:
 *                        schema:
 *                            type: object
 *                            properties:
 *                                email:
 *                                     type: string
 *                                     example: ismaelalvarez514@5124.com
 *                                password:
 *                                      type: string
 *                                      example: "Johan122134134@"
 *            responses:
 *                200:
 *                    description: Return JWT
 *                404:
 *                    description: Usuario no encontrado
 *                401:
 *                    description: Password incorrecto!!
 *                500:
 *                    description: Hubo un error
 */
authRouter.post(
  '/login',
  validateLogin,
  handleInputErrores,
  AuthController.login,
);

/**
 * @swagger
 * /api/v1/user:
 *        get:
 *            summary:  get user
 *            tags:
 *                - Users
 *            description: Returns User
 *            security:
 *                - bearerAuth: []
 *            responses:
 *                200:
 *                    description: user values in json
 *                404:
 *                    description: Usuario no encontrado
 *                500:
 *                    description: Hubo un error
 */
authRouter.get('/user', authenticate, AuthController.user);

/** Profile */
/**
 * @swagger
 * /api/v1/profile:
 *        put:
 *            summary:  Update User
 *            tags:
 *                - Users
 *            description: Update user
 *            security:
 *                - bearerAuth: []
 *            requestBody:
 *                required: true
 *                content:
 *                    application/json:
 *                        schema:
 *                            type: object
 *                            properties:
 *                                email:
 *                                     type: string
 *                                     example: ismaelalvarez514@gmail.com
 *                                password:
 *                                      type: string
 *                                      example: "Johan122134134@"
 *                                name:
 *                                      type: string
 *                                      example: ismael
 *            responses:
 *                200:
 *                    description: Perfil acttualizado correctamente!!
 *                401:
 *                    description: No autorizado
 *                409:
 *                    description: Este email ya esta registrado
 *                500:
 *                    description: Hubo un error
 */
authRouter.put(
  '/profile',
  authenticate,
  validateUpdateProfile,
  handleInputErrores,
  AuthController.updateProfile,
);

export default authRouter;
