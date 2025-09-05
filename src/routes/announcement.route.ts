import { Router } from "express";
import {
  createAnnouncement,
  getAllAnnouncement,
} from "../controllers/announcement.controller";
import rbac from "../middlewares/rbac.middleware";
import { AvailableUserRolesEnum, UserRolesEnum } from "../constant";
import { validate } from "../middlewares/validate.middleware";
import { createAnnouncementValidation } from "../validators/announcement.validator";

const router: Router = Router();

router
  .route("/create-announcement")
  .post(validate(createAnnouncementValidation, ["body", "params"]), rbac([UserRolesEnum.ADMIN, UserRolesEnum.FACULTY]), createAnnouncement);
router
  .route("/get-announcement")
  .get(rbac(AvailableUserRolesEnum), getAllAnnouncement);

export default router;
