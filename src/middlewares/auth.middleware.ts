import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils";
import { env } from "../config/config";
import { Auth, IRequestAuth } from "../models/auth.model";

const authVerifyJwt = async (
  req: IRequestAuth,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token =
      req?.cookies?.accessToken ||
      req?.headers["authorization"]?.replace("Bearer", "").trim();

    if (!token) {
      throw new ApiError(401, "ERROR: ACCESS DENIED, Tokens aren't found");
    }

    const decodeToken = jwt.verify(
      token,
      env.ACCESS_TOKEN_KEY,
    ) as jwt.JwtPayload;

    if (!decodeToken) {
      throw new ApiError(
        401,
        "ERROR: ACCESS DENIED, Your don't have permission",
      );
    }

    const user = await Auth.findById(decodeToken?.id).select(
      "_id username fullname email isVerifiedEmail",
    );

    if (!user) {
      throw new ApiError(401, "ERROR: ACCESS DENIED, Unauthorised user ");
    }

    req.user = user;
    next();
  } catch (error) {
    next(
      new ApiError(
        403,
        "ERROR: ACCESS DENIED, You don't permit to access this context",
      ),
    );
  }
};

export { authVerifyJwt };
