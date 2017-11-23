const router = require('express').Router();
const QuestionController = require('../controllers/question-controller');
const CategoryController = require('../controllers/category-controller');

router.get('/view-questions/:category/:difficulty', QuestionController.viewQuestions);
router.post('/delete-question', QuestionController.deleteQuestion);
router.get('/view-categories', CategoryController.viewCategories);
router.get('/find-category-by-id/:_id', CategoryController.findById);

//Edit Category
//Edit Question

module.exports = router;
