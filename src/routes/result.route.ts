import { Router } from "express";
import {
  createResult,
  getResultByAllStudent,
  getResultByStudentId,
} from "../controllers/result.controller";
import rbac from "../middlewares/rbac.middleware";
import { UserRolesEnum } from "../constant";

const router: Router = Router();

router
  .route("/")
  .post(rbac([UserRolesEnum.ADMIN, UserRolesEnum.FACULTY]), createResult);
router
  .route("/student/:sid")
  .get(
    rbac([UserRolesEnum.ADMIN, UserRolesEnum.FACULTY, UserRolesEnum.STUDENT]),
    getResultByStudentId,
  );
router
  .route("/all-student")
  .get(
    rbac([UserRolesEnum.ADMIN, UserRolesEnum.FACULTY]),
    getResultByAllStudent,
  );

export default router;
