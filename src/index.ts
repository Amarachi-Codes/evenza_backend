 import dotenv from "dotenv";
import express  from "express";
import configuration from "./config/config";
import cors from "cors"
import { userRouter } from "./route/user.routes";
import authRouter from "./route/auth.routes";
import { eventRouter } from "./route/event.routes";

dotenv.config()

const portEnv = Number(configuration.app.port);

if(!portEnv){
    console.log("Error:PORT is not detected in .env file");
    process.exit(1);
}
const PORT:number = portEnv;
if(isNaN(PORT)){
    console.log("Error:PORT is not a nuber in .env file");
    process.exit(1);
    
}
const app = express ();
app.use(cors({
   origin: "*",
   credentials: true,
   allowedHeaders: "*",
   methods: "GET,HEAD,PUT,PATCH,POST,DELETE", 
})
);

app.use(express.json());


app.use("api/v1/users", userRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/events", eventRouter);
app.use(express.urlencoded({extended:true}));


app.listen(PORT,()=>{
    console.log(`The server is up and running at ${PORT}`)
})



