import addCategoryService from '../services/category.service';
import responseHelper from '../utils/responseHelper';

export default {
  /**
   * @method addCategory
   * - create a catgory
   * - validate user input
   * - returns new category added
   * Route: POST: /category
   *
   * @param {Object} request request object
   * @param {Object} response response object
   *
   * @returns {Response} response object
   */

  async addCategory(request, response) {
    try {
      const newCategory = await addCategoryService(request.body);

      return responseHelper.successResponse(response, 201, newCategory);
    } catch (error) {
      return responseHelper.serverErrorResponse(
        response,
        500,
        'something went wrong',
        error
      );
    }
  }
};
