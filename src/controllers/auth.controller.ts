import { Request, Response } from "express";
import asyncHandler from "../utils/async-handler.util";
import APiResponse from "../utils/api-response.util";

const register = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  res.status(201).json(new APiResponse(201, "user registered"));
});

const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  res.status(201).json(new APiResponse(201, "user registered"));
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
