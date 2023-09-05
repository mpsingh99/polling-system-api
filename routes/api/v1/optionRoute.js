const express = require('express');
const router = express.Router();
const optionController = require('../../../controllers/api/v1/optionController');

//-------------------------------- route for creation of an option
// router.post('/create',optionController.createOption)

// ------------------------------route for deletion of an option
router.delete('/:id/delete',optionController.deleteOption)

//------------------------------ route for adding vote to an option
router.get('/:id/add_vote',optionController.addVote);


module.exports = router;