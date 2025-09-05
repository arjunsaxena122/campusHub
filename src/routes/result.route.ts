import { Router } from "express";
import {
  createResult,
  getResultByAllStudent,
  getResultByStudentId,
} from "../controllers/result.controller";
import rbac from "../middlewares/rbac.middleware";
import { UserRolesEnum } from "../constant";
import { validate } from "../middlewares/validate.middleware";
import { createResultValidaton, getResultByAllStudentValidation, getResultByStudentIdValidation } from "../validators/result.validator";

const router: Router = Router();

router
  .route("/")
  .post(
    validate(createResultValidaton, ["body", "params"]), rbac([UserRolesEnum.ADMIN, UserRolesEnum.FACULTY]), createResult);
router
  .route("/student/:sid")
  .get(
    validate(getResultByStudentIdValidation, ["params"]),
    rbac([UserRolesEnum.ADMIN, UserRolesEnum.FACULTY, UserRolesEnum.STUDENT]),
    getResultByStudentId,
  );
router
  .route("/all-student")
  .get(
    validate(getResultByAllStudentValidation, ["params"]),
    rbac([UserRolesEnum.ADMIN, UserRolesEnum.FACULTY]),
    getResultByAllStudent,
  );

export default router;
