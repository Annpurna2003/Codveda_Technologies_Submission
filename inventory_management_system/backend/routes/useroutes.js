import express from "express";
import usercontroller from "../controllers/usercontroller.js";


const userrouter = express.Router();
userrouter.post('/register',usercontroller.register)
userrouter.post('/login',usercontroller.login)
export default userrouter;
