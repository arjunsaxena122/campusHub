import { AvailableUserRolesEnum, UserRolesEnum } from "../constant";
import { Auth, IRequestAuth } from "../models/auth.model";
import { Result } from "../models/result.model";
import { ApiError, APiResponse, asyncHandler } from "../utils";
import type { Request, Response } from "express";

const createResult = asyncHandler(async (req: IRequestAuth, res: Response) => {
  const {
    studentId,
    studentName,
    fatherName,
    motherName,
    courseName,
    branchName,
    gender,
    semester,
    status,
    subject,
    grade,
    totalMarks,
    cgpa,
  } = req.body;

  if (!req.user || !req.user?._id) {
    throw new ApiError(401, "Unauthorsied user");
  }

  const id = req.user?._id;

  const user = await Auth.findById(id);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  if (user?.role !== UserRolesEnum.ADMIN) {
    throw new ApiError(
      403,
      "ERROR : ACCESS DENIED, Result upload by Only Admin",
    );
  }

  const existedResult = await Result.findOne({
    $and: [{ studentId }, { semester }],
  });

  if (existedResult) {
    throw new ApiError(409, "result already exist");
  }

  const result = await Result.create({
    studentId,
    studentName,
    fatherName,
    motherName,
    courseName,
    branchName,
    gender,
    semester,
    status,
    subject,
    grade,
    totalMarks,
    cgpa,
  });

  const createdResult = await Result.findById(result?._id);

  if (!createdResult) {
    throw new ApiError(500, "Internal server error, Please try again");
  }

  return res
    .status(201)
    .json(new APiResponse(201, "Result upload successfully", createResult));
});

const getResultByStudentId = asyncHandler(
  async (req: IRequestAuth, res: Response) => {
    if (!req.user || !req.user?._id) {
      throw new ApiError(401, "Unauthorsied user");
    }

    const id = req.user?._id;
    const { sid } = req.params;

    const user = await Auth.findById(id);

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    if (!AvailableUserRolesEnum.includes(user?.role)) {
      throw new ApiError(
        403,
        "ERROR: ACCESS DENIED, You don't have permit to access",
      );
    }

    if (!sid) {
      throw new ApiError(404, "StudentId not found");
    }

    const result = await Result.findById(sid);

    if (!result) {
      throw new ApiError(404, "No result available");
    }

    return res
      .status(200)
      .json(new APiResponse(200, `${result?.studentName} your result`, result));
  },
);

const getResultByAllStudent = asyncHandler(
  async (req: IRequestAuth, res: Response) => {
    if (!req.user || !req.user._id) {
      throw new ApiError(401, "Unauthrosied user");
    }

    const id = req?.user?._id;

    const user = await Auth.findById(id).select("-password -refreshToken");

    if (!user) {
      throw new ApiError(404, "user not found");
    }

    if (user?.role === UserRolesEnum.STUDENT) {
      throw new ApiError(
        403,
        "ERROR: ACCESS DENIED, You don't have permit to access",
      );
    }

    const result = await Result.find({});

    if (!result) {
      throw new ApiError(404, "No result available");
    }

    return res
      .status(200)
      .json(new APiResponse(200, "Fetched all student result", result));
  },
);

export { createResult, getResultByStudentId, getResultByAllStudent };
