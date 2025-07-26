import { UserRolesEnum } from "../constant";
import { Announcement } from "../models/announcement.model";
import { Auth, IRequestAuth } from "../models/auth.model";
import { ApiError, APiResponse, asyncHandler } from "../utils";
import { Request, Response } from "express";

const createAnnouncement = asyncHandler(
  async (req: IRequestAuth, res: Response) => {
    if (!req.user || !req.user._id) {
      throw new ApiError(401, "Unauthorised user");
    }

    const id = req.user._id;
    const { title, description, content } = req.body;

    const user = await Auth.findById(id);

    if (!user) {
      throw new ApiError(404, "user not found");
    }

    if (user.role === UserRolesEnum.Student) {
      throw new ApiError(
        403,
        "ERROR: ACCESS DENIED, You don't have permit to access this page",
      );
    }

    if (!title || !description || !content) {
      throw new ApiError(400, "Please fill the all required field");
    }

    const existedAnnouncement = await Announcement.findOne({ title });

    if (existedAnnouncement) {
      throw new ApiError(409, "This announcement already exist");
    }

    const announcement = await Announcement.create({
      title,
      description,
      content,
      user: req?.user,
    });

    const createdAnnouncement = await Announcement.findById(announcement?._id);

    if (!createAnnouncement) {
      throw new ApiError(500, "Internal server error, Please try again!");
    }

    return res
      .status(201)
      .json(
        new APiResponse(
          201,
          "Announcement create successfully",
          createdAnnouncement,
        ),
      );
  },
);

const getAllAnnouncement = asyncHandler(async (req: Request, res: Response) => {
  const announcement = await Announcement.find({});

  if (!announcement) {
    throw new ApiError(404, "No announcement available");
  }

  return res
    .status(200)
    .json(new APiResponse(200, "Fetched all announcement", announcement));
});

export { createAnnouncement, getAllAnnouncement };
