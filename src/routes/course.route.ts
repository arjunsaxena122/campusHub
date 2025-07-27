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

const router: Router = Router();

router
  .route("/")
  .get(
    rbac([UserRolesEnum.ADMIN, UserRolesEnum.FACULTY, UserRolesEnum.STUDENT]),
    getAllCourses,
  )
  .post(rbac([UserRolesEnum.ADMIN]), createCourse);
router
  .route("/:cid")
  .get(
    rbac([UserRolesEnum.ADMIN, UserRolesEnum.FACULTY, UserRolesEnum.STUDENT]),
    getAllCourses,
  );

// ! Material

router
  .route("/:cid/material")
  .get(
    rbac([UserRolesEnum.ADMIN, UserRolesEnum.FACULTY, UserRolesEnum.STUDENT]),
    getAllMaterial,
  )
  .post(
    rbac([UserRolesEnum.FACULTY]),
    createMaterial,
  );
router
  .route("/:cid/material/:mid")
  .get(
    rbac([UserRolesEnum.ADMIN, UserRolesEnum.FACULTY, UserRolesEnum.STUDENT]),
    getAllMaterialById,
  );

export default router;
