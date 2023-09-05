const Option = require('../../../models/options');
const Question = require('../../../models/questions');



// -----------------------------------------action for creation of an option
module.exports.createOption = async function(req,res){
    try {
         let quesId = req.params.id;
        // console.log("this is the id",quesId);
        const question = await Question.findById(quesId);
        if(question){
            const {text}=req.body;
            // console.log("text is",text);
            if(text){
                const option = await Option.create({
                    text:text,
                    votes:0,
                    // link_to_vote:`http://localhost:8000/api/v1/options/${option._id}/add_vote:`
                })
                option.link_to_vote=`http://localhost:8000/api/v1/options/${option._id}/add_vote`;
                
                await option.save();
                question.options.push(option);
                await question.save();
                return res.status(200).json({
                    message:'Option created',
                    option:option
                })
        

            }else{
                return res.status(200).json({
                    message:'Text for the option is required',
        
                })
        
            }
            
        }else{
            return res.status(200).json({
                message:'Wrong question id provided'
            })
        }
    } catch (error) {
        return res.status(200).json({
            message:'Some error occured',
            error:error

        })
        
    }
    
}




// -------------------action for deletion of an option
module.exports.deleteOption = async function(req,res){
    try {
        const {id} = req.params;
        let option = await Option.findById(id);
        if(option){
            if(option.votes==0){
                await Option.findByIdAndDelete(id);
                return res.status(200).json({
                    message:"Option deleted successfully",
                })

            }else{
                return res.status(200).json({
                    message:"This option can't be deleted because it has some votes",
                })
            }
        }else{
            return res.status(200).json({
                message:"No option is there with the option id provided hence no deletion can be done"
            })
        }
     
    } catch (error) {
        

        return res.status(200).json({
            Error:error
        })
    }
}





// ------------------------------action for addition of vote to an option-
module.exports.addVote = async function(req,res){
   try {

        let {id} = req.params;
        let option = await Option.findById(id);
        if(option){
             option.votes+= 1;
             await option.save();
             return res.status(200).json({
                message:"Voting successfull",
                voteCount:option.votes
            })

        }else{
            return res.status(200).json({
                message:"No option is there with the option id provided"
            })
        }
            
        
   } catch (error) {
        return res.status(200).json({
            Error:error
        })
   }
}
