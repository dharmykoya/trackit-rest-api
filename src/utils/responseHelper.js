import dotenv from 'dotenv';

dotenv.config();

const responseHelper = {
  /**
   * @method errorResponse
   * - returns response object
   *
   * @param {String} response
   * @param {Number} statusCode
   *
   * @returns {Response} response object
   */

  errorResponse(response, statusCode, error) {
    return response.status(statusCode).json({
      status: 'error',
      message: error
    });
  },

  /**
   * @method successResponse
   * - returns response object
   *
   * @param {String} response
   * @param {Number} statusCode
   * @param {Object} data response object
   *
   * @returns {Response} response object
   */

  successResponse(response, statusCode, data) {
    return response.status(statusCode).json({
      status: 'success',
      data
    });
  },

  /**
   * @method failResponse
   * - returns response object
   *
   * @param {String} response
   * @param {Number} statusCode
   * @param {Object} error response object
   *
   * @returns {Response} response object
   */

  serverErrorResponse(response, statusCode, error, developer) {
    return response.status(statusCode).json({
      status: 'fail',
      message: error,
      developer
    });
  }
};

export default responseHelper;
