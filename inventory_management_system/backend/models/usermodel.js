import mongoose from 'mongoose'
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true

    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["Admin","Purchase Officer","Store Keeper","Department User","Maneger"]
      
    }
  
},{timestamps:true})
const userModel=mongoose.models.user||mongoose.model("user",userSchema)
export default userModel