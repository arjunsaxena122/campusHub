import { Request, Response } from "express";
import asyncHandler from "../utils/async-handler.util";
import APiResponse from "../utils/api-response.util";
import { ApiError } from "../utils/api-error.util";
import { Auth } from "../models/auth.model";

const register = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if(!email || !password){
    throw new ApiError(400,"Please fill the all required field")
  }

  const existedUser = await Auth.findOne({email})

  if(existedUser){
    throw new ApiError(409,"user already registered, Please Login!")
  }

  const user = await Auth.create({
    email,
    password
  })

  const loggedInUser = await Auth.findById(user?._id)

  if(!loggedInUser){
    throw new ApiError(500,"Internal server error, Please try again")
  }

  res.status(201).json(new APiResponse(201, "user registered",loggedInUser));
});

const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

   if(!email || !password){
    throw new ApiError(400,"Please fill the all required field")
  }

  const user = await Auth.findOne({email})

  if(!user){
    throw new ApiError(404,"user not found, Please register!")
  }

  const isCorrectPassword = user?.isCheckingPassword(user?.password) 

  res.status(201).json(new APiResponse(201, "user login successfully"));
});

const logout = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  res.status(201).json(new APiResponse(201, "user registered"));
});

const getMe = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  res.status(201).json(new APiResponse(201, "user registered"));
});

export { register, login, logout, getMe };
