import express from 'express';
import AuthenticationController from '../controllers/auth.controller';
import authenticationValidator from '../validators/user.validator';

const { validator, checkValidationResult } = authenticationValidator;

const { signUp, login } = AuthenticationController;
const router = express.Router();

router.post('/signup', validator('signup'), checkValidationResult, signUp);
router.post('/login', validator('login'), checkValidationResult, login);

export default router;
