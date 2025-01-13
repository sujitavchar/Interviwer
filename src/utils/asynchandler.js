

const asynchandler= (fn) => async (req,res,next) =>{
    try {
        await fn(req,res,next);
    } catch (error) {
        res.status(error.code || 500).json({
            sucess: false,
            message: error.message
        })
    }
}

export {asynchandler};