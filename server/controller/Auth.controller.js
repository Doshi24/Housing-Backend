import { User } from "../models/Auth.models.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import logger from '../utils/logger.js'
import axios from 'axios'

const Regsiter  = async (req, res) =>{
    try {
        const {name ,email , password,Terms_n_ploliy,Repassword ,role, phone} = req.body
        
        const user = await User.findOne({email})
        if(user){
            return res.status(400).json({status : "unsuccess", message : `User already exist with email ${user.email}` , data : null })
        }

        if(password !== Repassword)
        return res.status(400).json({status : "unsuccess", message : "User Passowrd not matched with Repassword"  , data : null })
        
        console.log("passowrd with out hash", password)
        const bcryptpass = await bcrypt.hash(password, 10)
        console.log("hashed password", bcryptpass)

        const newuser = await User.create({
            name,
            email,
            password : bcryptpass,
            // Repassword : bcryptpass,
            phone,
            role,
            Terms_n_ploliy
        })

        const token = jwt.sign(
            {id:newuser._id, email : newuser.email , role: newuser.role},process.env.JWT,{expiresIn : process.env.JWT_expiresIn || "1d"}
        )

        return res.status(201).json({status : "success", message : `User registered successfully with Email ${newuser.email}` , data : newuser , token : token })

    } catch (error) {
        return res.status(500).json({status : "unsuccess", message : error.message , data : null })
    }
}

const login = async (req, res) =>{
    try {
        const {email , password} = req.body

        const finduser = await User.findOne({email})
        if(!finduser){
            return res.status(400).json({status : "unsuccess", message : "User does not exist with email" + email , data : null })
        }

        const passmatch = await bcrypt.compare(password , finduser.password)
        if(!passmatch){
            return res.status(400).json({status : "unsuccess", message : "Password is incorrect" , data : null })
        }

        const token = jwt.sign(
            {id:finduser._id, email : finduser.email , role: finduser.role},process.env.JWT,{expiresIn : process.env.JWT_expiresIn || "1d"}
        )

        return res.status(200).json({status : "success", message : "User logged in successfully" , data : {user : finduser, token : token} })
    } catch (error) {
     return res.status(500).json({status : "unsuccess", message : error.message , data : null })   
    }
}


const forgetpassword = async(req, res) =>{
    // not working 
    const {phone} = req.body

    const finduser = await User.findOne({phone})

    if(!phone) return res.status(500).json({status : "unsuccess", messsage : "Phone Number not proovided" , data : null})
    if(!finduser.phone == phone) return  res.status(500).json({status : "unsuccess", message : "User not register" , data : null })

    const otp = Math.floor(100000 + Math.random()* 900000).toString()
    finduser.otp = otp

    logger.info("otp"+JSON.stringify(otp))
    console.log("otp " , otp)

    const expireotpin = new Date(Date.now() + 5 * 60 *  1000)
    finduser.otpexpire = expireotpin

    logger.info("otpexpire"+JSON.stringify(expireotpin))
    console.log("expiresin" , expireotpin)

    await finduser.save()
    logger.info("saved user with opt"+JSON.stringify(finduser))
    
    
    try {
        const sendopt = await axios.post(
            "https://www.fast2sms.com/dev/bulkV2",
            {
                route: "otp",
                variables_values: otp,
                numbers: phone
            },
            {
                headers: {
                    authorization: process.env.fast2sms,
                    "Content-Type": "application/json"
                }
            }
        );
    } catch (error) {
        logger.info(error)
    }

    // logger.info("sendopt" +JSON.stringify(sendopt))
    res.status(200).json({status : "success" , message : "opt send successfully" , data : finduser , otp : otp})
}

export {Regsiter , login ,forgetpassword}
