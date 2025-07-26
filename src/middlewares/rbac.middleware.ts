import type { Response, NextFunction } from "express";
import { ApiError } from "../utils";
import { Auth, IRequestAuth } from "../models/auth.model";

const roleBaseAccessControl =
  (roles: string[] = []) =>
  async (req: IRequestAuth, res: Response, next: NextFunction) => {
    try {
      if (!req.user || !req.user._id) {
        throw new ApiError(404, "Request userId not found");
      }

      const id = req.user._id;

      const user = await Auth.findById(id);

      if (!user) {
        throw new ApiError(401, "ERROR: Unauthorised user");
      }

      if (!roles.includes(user?.role)) {
        throw new ApiError(
          403,
          `ERROR: You don't have permission, This Access by ${user?.role}`,
        );
      }

      next();
    } catch (error) {
      next(
        new ApiError(
          403,
          "ERROR: ACCESS DENIED, You don't have permission to access this context",
        ),
      );
    }
  };

export default roleBaseAccessControl;
