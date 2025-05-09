import express from "express";
import { AdminController } from "./admin.controller";
import validateRequest from "../../middleware/validateRequest";
import { updateAdminValidationSchema } from "./admin.validatin";
const router = express.Router();

router.get("/", AdminController.getAllAdmins);
router.get("/:id", AdminController.getSingleAdmin);
router.patch(
  "/:id",
  validateRequest(updateAdminValidationSchema),
  AdminController.updateAdmin
);

router.delete("/:id", AdminController.deleteAdmin);

export const AdminRoutes = router;
