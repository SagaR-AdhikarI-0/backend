const asynchandler=(requestHandlerFunction)=>async (req,res,next)=>{
    try {
        await requestHandlerFunction(req,res,next)
    } catch (error) {
        res.status(error.code || 5000).json({
            success:false,
            message:error.message
        })
    }

}

    

export {asynchandler}