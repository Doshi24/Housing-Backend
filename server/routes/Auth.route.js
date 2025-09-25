import express from 'express'
import { Regsiter, login } from '../controller/Auth.controller.js'

const authRouter = express.Router()

authRouter.post('/register', Regsiter)
authRouter.post('/login', login)

export { authRouter }