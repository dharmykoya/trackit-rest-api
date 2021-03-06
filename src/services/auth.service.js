import bcrypt from 'bcryptjs';
import model from '../database/models';
import getToken from '../utils/jwtHelper';

const { User } = model;

/**
 * @method hashPassword
 * - it hashes a new user password
 *
 * @param {string} password - plain text of user password
 *
 * @returns {string} hashed password
 */

export const hashPassword = async password => bcrypt.hash(password, 10);

/**
 * @method isUserExist
 * - it check if user exist in the database
 * - returns a promise
 *
 * @param {String} userEmail user's email
 *
 * @returns {Promise}
 */

export const isEmailExist = async userEmail => {
  const user = await User.findOne({ where: { email: userEmail } });

  if (user) {
    return true;
  }

  return false;
};

/**
 * @method signUpService
 * - it persist a new user to the database
 * - sends new user a welcome email
 * - returns user data
 *
 * @param {Object} userDetails request body's object
 *
 * @returns {Object} user object
 */

export const signUpService = async userDetails => {
  let result;
  const { firstName, lastName, email, password } = userDetails;

  if (await isEmailExist(email)) {
    result = {
      error: 'email exist, please login'
    };
    return result;
  }

  const sanitizedEmail = email.toLowerCase();
  const hashedPassword = await hashPassword(password);

  try {
    result = await User.create({
      firstName,
      lastName,
      password: hashedPassword,
      email: sanitizedEmail
    });
  } catch (error) {
    const response = { error: 'Database error', name: error.name };

    throw response;
  }

  const user = {
    firstName: result.firstName,
    lastName: result.lastName,
    email: result.email,
    image: result.profileImage,
    id: result.uuid,
    token: getToken(result),
    isNotified: result.isNotified
  };

  return user;
};

/**
 * @method loginService
 * - it verifies if user exist in the database
 * - returns user data
 *
 * @param {Object} body request body's object
 *
 * @returns {Object} user object
 */

export const loginService = async loginDetails => {
  let result;
  const { email, password } = loginDetails;

  try {
    result = await User.findOne({
      where: { email }
    });
  } catch (error) {
    const response = { error: 'Database error', name: error.name };
    throw response;
  }

  const validatePassword = plainText => {
    return bcrypt.compareSync(plainText, result.password);
  };

  if (result && validatePassword(password)) {
    const token = await getToken(result);

    const user = {
      firstName: result.firstName,
      lastName: result.lastName,
      email: result.email,
      image: result.profileImage,
      uuid: result.uuid,
      token,
      isNotified: result.isNotified
    };
    return user;
  }
  result = {
    error: true,
    message: 'incorrect email/password'
  };
  return result;
};
