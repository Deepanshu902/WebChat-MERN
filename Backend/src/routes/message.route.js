import express from "express";

import {verifyJwt} from "../middleware/auth.middleware.js"

import { getUsersForSideBar,getUserMessage,sendMessage } from "../controllers/message.controller.js";

const router = express.Router();

router.get("/users",verifyJwt,getUsersForSideBar)

router.get("/:id",verifyJwt,getUserMessage)

router.post(":send/id",verifyJwt,sendMessage)

export default router;
