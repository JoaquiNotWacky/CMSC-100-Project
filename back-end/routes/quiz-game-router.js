const router = require('express').Router();
const QuestionController = require('../controllers/question-controller');
const CategoryController = require('../controllers/category-controller');

router.get('/view-questions', QuestionController.viewQuestions);

router.get('/view-categories', CategoryController.viewCategories);


//Edit Category
//Edit Question

module.exports = router;
