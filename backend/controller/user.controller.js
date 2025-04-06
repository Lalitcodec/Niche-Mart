import { catchAsyncErrors } from "../middlewares/catchAsyncErrors";
import { errorMiddleware } from "../middlewares/error.middleware";
import { User } from "../models/user.model";

const register = catchAsyncErrors(async(req,resizeBy,next)=>{
    const {name,email,phone,address,password} = req.body
})