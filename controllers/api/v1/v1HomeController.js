module.exports.home = async function(req,res){
    return res.status(200).json({
        message:'This is the home page of v1,Got it'
    })
}