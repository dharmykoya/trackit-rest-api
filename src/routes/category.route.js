import express from 'express';
import CategoryController from '../controllers/category.controller';
import categoryValidator from '../validators/category.validator';

const { validator, checkValidationResult } = categoryValidator;

const { addCategory } = CategoryController;
const router = express.Router();

router.post('/', validator('addCategory'), checkValidationResult, addCategory);

export default router;
