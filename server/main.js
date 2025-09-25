import express from "express"
import cors from "cors"


const main = express();

main.use(cors());
main.use(express.json());
main.use(express.urlencoded({ extended: true }));


export { main }