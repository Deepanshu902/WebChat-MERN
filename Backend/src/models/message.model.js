import mongoose from "mongoose"

import {User} from "../models/user.models.js"

const messageSchema = mongoose.Schema(
        {
            senderId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"User",
                required:true
            },
            receiverId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"User",
                required:true
            },
            text:{
                type:String // none of them are req as we can only send text or image or both so no required feild here 
            },
            image:{
                type:String
            }


            },
        {timestamp:true})



        export const Message = mongoose.model("Message",messageSchema)