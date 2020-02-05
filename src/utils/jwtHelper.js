import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';

dotenv.config();

/**
 * @method getToken
 * - it implement jwt to sign user object
 * - returns a generated token
 *
 * @param {Object} user user's data object containing email, id, roleType
 *
 * @returns {Response} object
 */

const getToken = user => {
  return jwt.sign(
    { id: user.uuid, email: user.email },
    process.env.JWT_SECRET,
    {
      expiresIn: '24h'
    }
  );
};

export default getToken;
