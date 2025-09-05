import { Router } from "express";
import {
  createCourse,
  createMaterial,
  getAllCourses,
  getAllMaterial,
  getAllMaterialById,
} from "../controllers/course.controller";
import rbac from "../middlewares/rbac.middleware";
import { UserRolesEnum } from "../constant";
import { validate } from "../middlewares/validate.middleware";
import { createCourseValidation, createMaterialValidation, getAllCoursesValidation, getAllMaterialByIdValidation, getAllMaterialValidation } from "../validators/course.validator";

const router: Router = Router();

router
  .route("/")
  .get(
    validate(getAllCoursesValidation, ["params"]),
    rbac([UserRolesEnum.ADMIN, UserRolesEnum.FACULTY, UserRolesEnum.STUDENT]),
    getAllCourses,
  )
  .post(validate(createCourseValidation, ["body", "params"]), rbac([UserRolesEnum.ADMIN]), createCourse);
router
  .route("/:cid")
  .get(
    validate(getAllCoursesValidation, ["params"]),
    rbac([UserRolesEnum.ADMIN, UserRolesEnum.FACULTY, UserRolesEnum.STUDENT]),
    getAllCourses,
  );

// ! Material

router
  .route("/:cid/material")
  .get(
    validate(getAllMaterialValidation, ["params"]),
    rbac([UserRolesEnum.ADMIN, UserRolesEnum.FACULTY, UserRolesEnum.STUDENT]),
    getAllMaterial,
  )
  .post(
    validate(createMaterialValidation, ["body", "params"]),
    rbac([UserRolesEnum.FACULTY]),
    createMaterial,
  );
router
  .route("/:cid/material/:mid")
  .get(
    validate(getAllMaterialByIdValidation, ["params"]),
    rbac([UserRolesEnum.ADMIN, UserRolesEnum.FACULTY, UserRolesEnum.STUDENT]),
    getAllMaterialById,
  );

export default router;
