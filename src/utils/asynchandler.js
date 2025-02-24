const asynchandler = (fn) => async (req, res, next) => {
    try {
        await fn(req, res, next);
    } catch (error) {
        console.error("Error caught:", error); // Log error details
        const statusCode = (error.statusCode && error.statusCode >= 100 && error.statusCode < 600) ? error.statusCode : 500;
        res.status(statusCode).json({
            success: false,
            message: error.message || "Internal Server Error"
        });
    }
};

export { asynchandler };






// const asynchandler= (fn) => async (req,res,next) =>{
//     try {
//         await fn(req,res,next);
//     } catch (error) {
//         res.status(error.code || 500).json({
//             sucess: false,
//             message: error.message
//         })
//     }
// }

// export {asynchandler};