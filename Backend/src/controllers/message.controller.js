import mongoose from "mongoose"

import {User} from "../models/user.models.js"

import {Message} from "../models/message.model.js"

import {asyncHandler} from "../utils/asyncHandler.js"

import {ApiError} from "../utils/ApiError.js"

import {ApiResponse} from "../utils/ApiResponse.js"







const getUsersForSideBar = asyncHandler(async(req,res)=>{

    const loggedInUserId = req.user._id

    const fitleredUsers =  await User.find({_id:{$ne:loggedInUserId}}).select("-password") // exclude logged In user

    if(fitleredUsers.length===0){
        throw new ApiError(501,"No user fetched")

    }

    return res.status(200).json(new ApiResponse(200,fitleredUsers,"Fetched Successfully"))
})


const getUserMessage = asyncHandler(async(req,res)=>{
    const {userChatId} = req.params
    const senderId = req.user._id
    if(!userChatId){
        throw new ApiError(501,"No userid get")
    }
    const message  = await Message.find({
        $or:[{
            
                senderId:senderId,
                receiverId:userChatId
            },
            {
                senderId:userChatId,
                receiverId:senderId
            }
        ]
    })

    if(!message.length===0){
        return res.status(200).json(new ApiResponse(200, [], "No messages found between users or failed to fetch messages"));
    }
    return res.status(200).json(new ApiResponse(200,message,"Message Fetched Successfully"))
})

const sendMessage = asyncHandler(async(req,res)=>{
    const {userToSendMessage} = req.params
    const {text} = req.body
    const senderId = req.user._id

  if(!text){
    throw new ApiError(400,"Message or image is required")
  }
  const sendMessage = await Message.create({
    senderId,
    userToSendMessage,
    text

  })
  await sendMessage.save()

  res.status(200).json(new ApiResponse(200,sendMessage,"Message Send"))
    
})


export {
    getUsersForSideBar,getUserMessage,sendMessage
    
}