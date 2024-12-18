import { body } from 'express-validator';

export const validateCreateAccount = [
  body('name').notEmpty().withMessage('El nombre no debe ir vacío'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('El password es muy corto, mínimo 8 caracteres'),
  body('password_confirmation').custom((value, { req }) => {
    if (value !== req.body.password)
      throw new Error('Los passwords no son iguales');
    return true;
  }),
  body('email').isEmail().withMessage('El e-mail no es válido'),
];

export const validateLogin = [
  body('email').notEmpty().withMessage('El e-mail no debe ir vacío'),
  body('password').notEmpty().withMessage('El password no debe ir vacío'),
];

export const validateUpdateProfile = [
  body('name').notEmpty().withMessage('El nombre no debe ir vacío'),
  body('email').notEmpty().withMessage('El e-mail no debe ir vacío'),
];
