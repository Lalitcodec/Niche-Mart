class errorHandler extends Error {
    constructor(
        statusCode,
        message
    ){
        super(message);
        this.statusCode = statusCode
        this.message = message
    }
}


export const errorMiddleware = (err,req,res,next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    if(err.name === "CastError"){
        const message = `Invalid ${err.path}`
        err = new errorHandler(message,400)
    }
    if(err.code ===11000){
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered`
        err = new errorHandler(message,400)
    }
    if(err.name === "JsonWebTokenError"){
        const message = `Json Web Token is invalid, Try Again. `
        err = new errorHandler(message,400)
    }
    if(err.name === "TokenExpiredError"){
        const message = `Json Web Token is expired, Try Again.`
        err = new errorHandler(message,400)
    }

    return res.status(err.statusCode).json({
        success : false,
        message : err.message,
    })
}

export {errorHandler}