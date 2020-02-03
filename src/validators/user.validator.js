import { check, validationResult } from 'express-validator';
import responseHelper from '../utils/responseHelper';

const UserValidator = {
  validator(route) {
    switch (route) {
      case 'signup':
        return [
          check('firstName')
            .trim()
            .isAlpha()
            .withMessage('First name must be only alphabetical chars')
            .isLength({ min: 2 })
            .withMessage('Please enter your first name'),

          check('lastName')
            .isAlpha()
            .withMessage('Last name must be only alphabetical chars')
            .isLength({ min: 2 })
            .withMessage('Please enter your last name')
            .trim(),
          check('email')
            .isEmail()
            .withMessage('Please enter a valid email')
            .trim(),
          check('password')
            .not()
            .isEmpty()
            .isLength({ min: 8 })
            .withMessage('Password can not be less than 8 characters')
            .matches('[0-9]')
            .withMessage('Password must contain a number')
            .matches('[A-Z]')
            .withMessage('Password must contain an upper case letter')
        ];

      default:
    }
  },

  checkValidationResult(request, response, next) {
    const errorFormatter = ({ msg }) => `${msg}`;

    const result = validationResult(request).formatWith(errorFormatter);

    if (!result.isEmpty()) {
      return responseHelper.errorResponse(response, 400, result.mapped());
    }

    return next();
  }
};
export default UserValidator;
