import express from "express"
import cors from "cors"
import { authRouter } from "./routes/Auth.route.js";


const main = express();

main.use(cors());
main.use(express.json());
main.use(express.urlencoded({ extended: true }));


main.use('/api/auth',authRouter)


export { main }