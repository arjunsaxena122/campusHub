import { Types } from "mongoose";
import { Auth } from "../models/auth.model";
import { ApiError } from "../utils";

export const generatingAccessAndRefreshToken = async (id: Types.ObjectId) => {
  if (!id) {
    throw new ApiError(404, "UserId not found");
  }

  const user = await Auth.findById(id);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const accessToken = user.generatingAccessToken();
  const refreshToken = user.generatingRefreshToken();

  if (!accessToken || !refreshToken) {
    throw new ApiError(401, "Tokens are not generating");
  }

  return { accessToken, refreshToken };
};
