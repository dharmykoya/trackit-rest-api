import model from '../database/models';

const { Category } = model;

/**
 * @method addCategoryService
 * - it persist a new category to the database
 * -
 * - returns category data
 *
 * @param {Object} categoryDetails request body's object
 *
 * @returns {Object} category object
 */

const addCategoryService = async categoryDetails => {
  let result;

  const { name } = categoryDetails;

  try {
    result = await Category.create({
      name
    });
  } catch (error) {
    const response = { error: 'Database error', name: error.name };

    throw response;
  }

  const category = {
    name: result.name
  };

  return category;
};

export default addCategoryService;
