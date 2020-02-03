import { check, validationResult } from 'express-validator';
import responseHelper from '../utils/responseHelper';

const CategoryValidator = {
  validator(route) {
    switch (route) {
      case 'addCategory':
        return [
          check('name')
            .trim()
            .isAlpha()
            .withMessage('Category name must be only alphabetical chars')
            .isLength({ min: 2 })
            .withMessage('Please enter your category name')
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
export default CategoryValidator;
