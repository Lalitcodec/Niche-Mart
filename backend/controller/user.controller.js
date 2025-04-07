import { catchAsyncErrors } from "../middlewares/catchAsyncErrors";
import {errorHandler} from "../middlewares/error.middleware";
import { User } from "../models/user.model";
import {v2 as cloudinary} from "cloudinary"

const register = catchAsyncErrors(async(req,res,next)=>{
    const {name,
        email,
        phone,
        address,
        password,
        role,
        firstNiche,
        secondNiche,
        thirdNiche,
        coverLetter
    } = req.body

    if(!name || !email || !phone || !address || !password || !role){
        return next(new errorHandler(400,"All Fields are required"))
    }
    if(role === "Job Seeker" && (!firstNiche || !secondNiche || !thirdNiche)){
        return next(new errorHandler(400,"Please provide your preffered Job Niches"))
    }

    const existingUser = await User.findOne({email})
    
    if(existingUser){
        throw new errorHandler(400,"User already exists")
    }

    const userData = {
        name,
        email,
        phone,
        address,
        password,
        role,
        niches : {
            firstNiche,
            secondNiche,
            thirdNiche
        },
        coverLetter
    }

    if(req.files && req.files.resume){
        const {resume} = req.files
        if(resume){
            try {
                const cloudinaryResponse = await cloudinary.uploader.upload(resume.tempFilePath,
                    {folder : "Jpb_Seeker_Resume"}
                )
                if(!cloudinaryResponse || cloudinaryResponse.error){
                    throw new errorHandler(500,"Failed to upload resume to cloud ")
                }
                userData.resume = {
                    public_id : cloudinaryResponse.public_id,
                    url : cloudinaryResponse.secure_url
                }
            } catch (error) {
                throw new errorHandler(500,"Failed to upload Resume")
            }
        }
    }

    const user = await User.create(userData)

    return res.status(201).json({
        success : true,
        message : "User Registered"
    })
})


export {register}