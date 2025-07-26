import { Router } from "express";
import {
  createAnnouncement,
  getAllAnnouncement,
} from "../controllers/announcement.controller";
import rbac from "../middlewares/rbac.middleware";
import { AvailableUserRolesEnum, UserRolesEnum } from "../constant";

const router: Router = Router();

router
  .route("/create-announcement")
  .post(rbac([UserRolesEnum.ADMIN, UserRolesEnum.FACULTY]), createAnnouncement);
router
  .route("/get-announcement")
  .get(rbac(AvailableUserRolesEnum), getAllAnnouncement);

export default router;
