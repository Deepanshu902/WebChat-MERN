import mongoose from "mongoose"

import {User} from "../models/user.models.js"

import {asyncHandler} from "../utils/asyncHandler.js"

import {ApiError} from "../utils/ApiError.js"

import {ApiResponse} from "../utils/ApiResponse.js"

import {generateAccessAndRefreshTokens} from "../utils/generateAccessAndRefreshToken.js"

import {uploadOnCloudinary} from "../utils/cloudinary.js"


//global variable 
const options = {
  httpOnly:true,  // anyone can modifiy cookie from frontend but after after this frontend can only see
  secure:true
}


const registerUser = asyncHandler(async(req,res)=>{

  const {email,name,username,password} = req.body

  if(!email || !name || !username || !password){
    throw new ApiError(401,"All fields are req")
  }

  const existedUser = await User.findOne({email})

  if(existedUser){
    throw new ApiError(500,"User Already Exist")
  }

  const user = await User.create({
    email,name,username,password
  })

  return res.status(200).
  json(new ApiResponse(200,user,"Created successfully"))

})

const loginUser = asyncHandler(async(req,res)=>{
 const {email,password} =req.body

  if(!email || !password){
    throw new ApiError(401,"All fields are required")
   }

   const user = await User.findOne({email})
   if(!user){
    throw new ApiError(500,"No user exist ")
    
   }
   const iscorrectPassword = await user.isPasswordCorrect(password)

   if(!iscorrectPassword){
    throw new ApiError(401,"Password incorrect")
 }

  const {refreshToken,accessToken} = await generateAccessAndRefreshTokens(user._id)

  
const loggedInUser = await User.findById(user._id).select(
  "-password -refreshToken"
)


return res.status(200).
cookie("accessToken",accessToken,options).
cookie("refreshToken",refreshToken,options).
json( new ApiResponse(200,loggedInUser,"Login Success"))


  })

  
  const logoutUser = asyncHandler(async(req,res)=>{
    await User.findByIdAndUpdate(
       req.user._id,
       {
          $set:{
             refreshToken: undefined
          }
          },
          {
             new: true
          }
       
     )
     
 
    return res.status(200).
    clearCookie("accessToken",options).
    clearCookie("refreshToken",options).
    json(new ApiResponse(200,{},"User Logged out"))
 
    })

    const changeCurrentPassword = asyncHandler(async(req,res)=>{
      const{oldpassword,newpassword} = req.body

      if(!newpassword){
        throw new ApiError(401,"New Password Required")
      }

      const user = await User.findById(req.user._id)

      const isPasswordcorrect = await user.isPasswordCorrect(oldpassword)

      if(!isPasswordcorrect){
        throw new ApiError(401,"Old Password not correct ")
      }
      user.password =  newpassword
      await user.save({validateBeforeSave:false})

      return res.status(200).
      json(new ApiResponse(200,{},"Password Changed Successfully"))

    })

    const updateAccountDetails = asyncHandler(async(req,res)=>{

      const {name,email} = req.body
            if(!name && !email){
               throw new ApiError(401,"all feilds are req")
            }
      
          const user = await User.findByIdAndUpdate(
            req.user?._id,
            {
               $set:{
                  name: name ,
                   email : email
               }
            },
            {new:true}
           ).select("-password  ")
      
           return res.status(200).json(new ApiResponse(200,user,"Account Details Updated"))
    })

    const getCurrentUser = asyncHandler(async(req,res)=>{
      return res.status(200).json(new ApiResponse(200,req.user,"CurrentUser Fetch successfully"))
    })


    const updateUserAvatar = asyncHandler(async (req, res) => {
      const avatarLocalPath = req.file?.path;
   
      if (!avatarLocalPath) {
         throw new ApiError(400, "Avatar file is missing");
      }
   
      const user = await User.findById(req.user._id);
      const oldAvatarPublicId = user.avatar?.split("/").pop().split(".")[0];
   
      const avatar = await uploadOnCloudinary(avatarLocalPath, oldAvatarPublicId);
   
      if (!avatar || !avatar.url) {
         throw new ApiError(400, "Error while uploading avatar");
      }
   
      const updatedUser = await User.findByIdAndUpdate(
         req.user._id,
         { $set: { avatar: avatar.url } },
         { new: true }
      ).select("-password");
   
      return res
         .status(200)
         .json(new ApiResponse(200, updatedUser, "Avatar Uploaded"));
   })
   

export {
    registerUser,loginUser,logoutUser,changeCurrentPassword,updateAccountDetails,getCurrentUser,updateUserAvatar
}