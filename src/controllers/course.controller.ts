import { AvailableUserRolesEnum, UserRolesEnum } from "../constant";
import { Auth, IRequestAuth } from "../models/auth.model";
import { Course } from "../models/course.model";
import { Material } from "../models/material.model";
import { ApiError, ApiResponse, asyncHandler } from "../utils";
import { Response } from "express";

// ! Courses

const getAllCourses = asyncHandler(async (req: IRequestAuth, res: Response) => {
  if (!req.user || !req.user._id) {
    throw new ApiError(401, "Unauthrosied user");
  }

  const id = req?.user?._id;

  const user = await Auth.findById(id);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  if (!AvailableUserRolesEnum.includes(user.role)) {
    throw new ApiError(
      403,
      "ERROR: ACCESS DENIED, You don't have permit to access",
    );
  }

  const course = await Course.find({});

  if (!course) {
    throw new ApiError(404, "No course available");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "Fetched all courses", course));
});

const getAllCoursesById = asyncHandler(
  async (req: IRequestAuth, res: Response) => {
    if (!req.user || !req.user._id) {
      throw new ApiError(401, "Unauthrosied user");
    }

    const id = req?.user?._id;
    const cid = req.params;

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

    const course = await Course.findById(cid);

    if (!course) {
      throw new ApiError(404, "No Course available here");
    }

    return res
      .status(200)
      .json(new ApiResponse(200, "Fetched all courses", course));
  },
);

const createCourse = asyncHandler(async (req: IRequestAuth, res: Response) => {
  if (!req.user || !req.user._id) {
    throw new ApiError(401, "Unauthorised user");
  }

  const id = req.user?._id;

  const user = await Auth.findById(id);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  if (user?.role !== UserRolesEnum.ADMIN) {
    throw new ApiError(
      403,
      "ERROR : ACCESS DENIED, Only Admin can make course",
    );
  }

  // ? Cover Image logic is pending
  const { title, description, status, price } = req.body;

  if (!title || !description || !status || !price) {
    throw new ApiError(400, "Please fill all the required fields");
  }

  const existedCourse = await Course.findOne({ title });

  if (existedCourse) {
    throw new ApiError(409, "Course alread exist");
  }

  const course = await Course.create({
    title,
    description,
    status,
    price,
    user: req.user?._id,
  });

  const createdCourse = await Course.findById(course?._id);

  if (!createdCourse) {
    throw new ApiError(500, "Internal server error, Please try again");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, "Course add successfully", createdCourse));
});

// ! Material

const getAllMaterial = asyncHandler(
  async (req: IRequestAuth, res: Response) => {
    if (!req.user || !req.user._id) {
      throw new ApiError(401, "Unauthrosied user");
    }

    const id = req?.user?._id;

    const user = await Auth.findById(id).select("-password -refreshToken");

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    if (user?.role !== UserRolesEnum.ADMIN) {
      throw new ApiError(
        403,
        "ERROR: ACCESS DENIED, You don't have permit to access",
      );
    }

    const material = await Material.find({});

    if (!material) {
      throw new ApiError(404, "No material available");
    }

    return res
      .status(201)
      .json(new ApiResponse(200, "Fetched all material", material));
  },
);

const getAllMaterialById = asyncHandler(
  async (req: IRequestAuth, res: Response) => {
    if (!req.user || !req.user._id) {
      throw new ApiError(401, "Unauthrosied user");
    }

    const id = req?.user?._id;

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

    const { mid } = req.params;

    if (!mid) {
      throw new ApiError(404, "materialId not found");
    }

    const material = await Material.findById(mid);

    if (!material) {
      throw new ApiError(404, "No material found");
    }

    return res
      .status(200)
      .json(new ApiResponse(200, `${material?.title} material`, material));
  },
);

const createMaterial = asyncHandler(
  async (req: IRequestAuth, res: Response) => {
    if (!req.user || !req.user._id) {
      throw new ApiError(401, "Unauthrosied user");
    }

    const id = req?.user?._id;

    const user = await Auth.findById(id);

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    if (user?.role !== UserRolesEnum.FACULTY) {
      throw new ApiError(
        403,
        "ERROR: ACCESS DENIED, Only faculty can make material",
      );
    }

    const { title, description, content, status } = req.body;
    const { cid } = req.params;

    if (!cid) {
      throw new ApiError(404, "courseId isn't found");
    }

    if (!title || !description || !content || !status) {
      throw new ApiError(400, "Please fill the all required fields");
    }

    const existedMaterial = await Material.findOne({ title });

    if (existedMaterial) {
      throw new ApiError(409, "material already exist");
    }

    const material = await Material.create({
      title,
      description,
      content,
      status,
      course: cid,
    });

    const createdMaterial = await Material.findById(material?._id);

    if (!createdMaterial) {
      throw new ApiError(500, "Internal server error, Please try again!");
    }

    return res
      .status(201)
      .json(new ApiResponse(201, "Material add successfully", createdMaterial));
  },
);

export {
  getAllCourses,
  getAllCoursesById,
  createCourse,
  getAllMaterial,
  getAllMaterialById,
  createMaterial,
};
