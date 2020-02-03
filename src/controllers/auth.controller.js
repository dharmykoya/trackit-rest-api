import { signUpService } from '../services/auth.service';
import responseHelper from '../utils/responseHelper';

export default {
  /**
   * @method signUp
   * - create a new user
   * - validate user input
   * - returns user data with a generated token
   * Route: POST: /auth/signup
   *
   * @param {Object} request request object
   * @param {Object} response response object
   *
   * @returns {Response} response object
   */

  async signUp(request, response) {
    try {
      const newUser = await signUpService(request.body);
      if (newUser.error) {
        return responseHelper.errorResponse(response, 409, newUser.error);
      }
      return responseHelper.successResponse(response, 201, newUser);
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
