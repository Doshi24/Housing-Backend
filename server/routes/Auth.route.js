import express from 'express'
import { Regsiter, login ,forgetpassword } from '../controller/Auth.controller.js'

const authRouter = express.Router()

authRouter.post('/register', Regsiter)
authRouter.post('/login', login)
// authRouter.post('/forget-password',forgetpassword)

export { authRouter }