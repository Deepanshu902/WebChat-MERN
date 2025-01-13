import mongoose from "mongoose"
import {User} from "../models/user.models.js"

const  generateAccessAndRefreshTokens = async(userId)=>{
    try{
       const user = await User.findOne(userId)
     const accessToken =  user.generateAccessToken()
      const refreshToken=  user.generateRefreshToken()
 
       user.refreshToken = refreshToken // save value to db 
       await  user.save({ validateBeforeSave : false })  // save the updated user
       // dont do any validation just save the user
 
       return {refreshToken,accessToken}
 
    }
    catch(error){
       throw new ApiError(501,"Something went wrong while generating refresh and access token ")
    }
 }

 export {generateAccessAndRefreshTokens}