import { Request, Response } from "express";
import { ApiError, APiResponse, asyncHandler } from "../utils/index";
import { Auth, IRequestAuth } from "../models/auth.model";
import { generatingAccessAndRefreshToken } from "../helper/auth.helper";
import { UserRolesEnum } from "../constant";

const register = asyncHandler(async (req: Request, res: Response) => {
  const { email, password, role } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "Please fill the all required field");
  }

  const existedUser = await Auth.findOne({ email });

  if (existedUser) {
    throw new ApiError(409, "user already registered, Please Login!");
  }

  if (role === UserRolesEnum.ADMIN) {
    throw new ApiError(
      403,
      "You don't have permission to register as an Admin",
    );
  }

  const user = await Auth.create({
    email,
    password,
    role,
  });

  const loggedInUser = await Auth.findById(user?._id);

  if (!loggedInUser) {
    throw new ApiError(500, "Internal server error, Please try again");
  }

  res.status(201).json(new APiResponse(201, "user registered", loggedInUser));
});

const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "Please fill the all required field");
  }

  const user = await Auth.findOne({ email });

  if (!user) {
    throw new ApiError(404, "Invalid credentional, Please register!");
  }

  const isCorrectPassword = user?.isCheckingPassword(password);

  if (!isCorrectPassword) {
    throw new ApiError(401, "Invalid credentional");
  }

  const { accessToken, refreshToken } = await generatingAccessAndRefreshToken(
    user?._id,
  );

  const accessOption = {
    httpOnly: true,
    secure: true,
    maxAge: 1000 * 60 * 60 * 1,
  };

  const refreshOption = {
    httpOnly: true,
    secure: true,
    maxAge: 1000 * 60 * 60 * 24,
  };

  res
    .status(201)
    .cookie("accessToken", accessToken, accessOption)
    .cookie("refreshTOken", refreshToken, refreshOption)
    .json(new APiResponse(200, "user login successfully"));
});

const logout = asyncHandler(async (req: IRequestAuth, res: Response) => {
  if (!req.user || !req.user?._id) {
    throw new ApiError(404, "Request userId not found");
  }

  const { _id } = req.user;

  const user = await Auth.findByIdAndUpdate(
    _id,
    {
      $set: {
        refreshToken: 1,
      },
    },
    { new: true },
  ).select("-password");

  if (!user) {
    throw new ApiError(500, "Internal server error,");
  }

  res.status(201).json(new APiResponse(200, "user logout successfully", user));
});

const getMe = asyncHandler(async (req: IRequestAuth, res: Response) => {
  if (!req.user || !req.user?._id) {
    throw new ApiError(404, "Request userId not found");
  }

  const user = req.user;

  res.status(201).json(new APiResponse(200, `fetched ${user.email} data`));
});

export { register, login, logout, getMe };
