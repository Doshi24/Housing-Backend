import { User } from "../models/Auth.models.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

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

const login = async () =>{

}

export {Regsiter , login}
