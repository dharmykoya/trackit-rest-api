import express from 'express';
import AuthenticationController from '../controllers/auth.controller';
import authenticationValidator from '../validators/user.validator';

const { validator, checkValidationResult } = authenticationValidator;

const { signUp } = AuthenticationController;
const router = express.Router();

router.post('/signup', validator('signup'), checkValidationResult, signUp);

export default router;
