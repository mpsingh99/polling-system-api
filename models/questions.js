const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    title: String, 
    options: [
        { 
           type:mongoose.Schema.Types.ObjectId,
           ref:'option' 
        }
    ]
});

const Question = mongoose.model('question',questionSchema);
module.exports = Question;