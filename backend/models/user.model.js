import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import jwt from 'jwt'
import validator from 'validator'
import { validate } from "node-cron";

const userScehma = new mongoose.Schema({
    name : {
        type : String,
        requires : true,
        minLength : [3," Name must contain atleast 3 characters. "]
    },
    email : {
        type : String,
        required : true,
        validate : [validator.isEmail, " Please provide valid Email"]
    },
    phone : {
        type : Number,
        required : true,
    },
    address : {
        type : String,
        required : true,
    },
    niches : {
        firstNiche : String,
        secondNiche : String,
        thirdNiche : String
    },
    password : {
        type : String,
        required : true,
        minLength : [8,"Password must contain atleast 8 characters"], 
        maxLength : [32,"Password must not contain more than 32 characters"] 
    },
    resume : {
        public_id : String,
        url : String
    },
    coverLetter : {
        type : String
    },
    role : {
        type : String,
        required  : true,
        enum : ["Job Seeker","Employer"]
    },
    createdAt : {
        type : Date, 
        default : Date.now
    }
})


export const User = mongoose.model("User",userScehma)