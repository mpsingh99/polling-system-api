const Question = require('../../../models/questions');
const Option = require('../../../models/options');


// ------------------------------action for creation of a question
module.exports.createQuestion = async function(req,res){

    const question = await Question.create(req.body);
    return res.status(200).json({
        message:'Question created',
        question:question,
        
    })
}




// ---------------------------------action for viewing a questions and its options
module.exports.viewQuestion = async function(req,res){
    try {

        let {id} = req.params;
        const question = await Question.findById(id);
        if(question){
            // await question.populate('options');

            // vs  


            await question.populate({
                path:'options'
            });
            // console.log("After population",question);
            return res.status(200).json({
                no_of_options:question.options.length,
                Question:question,
            })

        }else{
            return res.status(200).json({
                message:"No question found with the question id provided",
            })
        }
        
    } catch (error) {

        console.log("Error is",error);
        return res.status(200).json({
            message:'Error occured',
            error:error
        })
        
    }
    
}




// --------------------------action for deletion of a question
module.exports.deleteQuestion = async function(req,res){
    try {
        const {id} = req.params;
        let question = await Question.findById(id);
        if(question){
            let arr = question.options;
            await question.populate("options");
            const allOptionsArray = question.options;
            const totalOptionsCount = allOptionsArray.length;
            if(allOptionsArray.length>0){
                for(let eachOption of allOptionsArray ){
                    if(eachOption.votes>0)    {

                        return res.status(200).json({
                            message:"This Question can't be deleted because its options do contain some votes",
                        })
                    }
                }
                await Option.deleteMany({_id: {$in: arr}});
                await Question.findByIdAndDelete(id);
                return res.status(200).json({
                    message:`Question deleted successfully with all ${totalOptionsCount} options`,
                    
                }) 
            }else{
                await Option.deleteMany({_id: {$in: arr}});
                await Question.findByIdAndDelete(id);
                return res.status(200).json({
                    message:"Question deleted successfully no option were there...",
                })
            }
        }else{
            return res.status(200).json({
                message:"No Question is there with the question id provided, hence no deletion can be done"
            })
        }
     
    } catch (error) {
        
        console.log("Error is :-",error);
        return res.status(200).json({
            Error:error
        })
    }
}
