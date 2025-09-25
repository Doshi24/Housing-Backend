import {connectdb} from './utils/dbconfig.js'
import { main } from './main.js'
import logger from './utils/logger.js'



connectdb()
.then(()=>{
    main.listen(process.env.PORT, ()=>{
        logger.info(`server is ready at http:127.0.0.1:${process.env.PORT}`)
        console.log(`server is ready at http:127.0.0.1:${process.env.PORT}`);
        
    })
}).catch(()=>{
    console.log("Error While Starting Server");
    logger.info("Error While Starting Server")
})