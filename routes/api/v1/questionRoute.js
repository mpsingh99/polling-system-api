const express = require('express');
const router = express.Router();
const questionController = require('../../../controllers/api/v1/questionController');
const optionController = require('../../../controllers/api/v1/optionController');


// ------------------------route for creation of a  question
router.post('/create',questionController.createQuestion)




// -------------------route for viewing a question and its options
router.get('/:id',questionController.viewQuestion)



// -----------------------------route for deletion of a question
router.delete('/:id/delete',questionController.deleteQuestion)



//------------------------------- route for creation of option to a specific question
// router.use('/:id/options',require('./optionRoute'));
router.use('/:id/options/create',optionController.createOption);




module.exports = router;