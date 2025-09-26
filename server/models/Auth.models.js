import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name : {
            type : String,
            required : true,
        },
        email : {
            type : String,
            required : true,
        },
        phone : {
            type : Number,
            required : true
        },
        password : {
            type : String,
            required : true
        },
        // Repassword : {
        //     type : String,
        //     required : true
        // },
        role : {
            type : String,
            enum : ['Buyer', 'Seller', 'Broker'],
            required : true
        },
        Terms_n_ploliy :{
            type : Boolean,
            default : false
        },
        otp : {
            type : String
        },
        otpexpire :{
            type : Date
        }

    },
    {
        timestamps : true
    }
)

 export const User = mongoose.model("User", userSchema)