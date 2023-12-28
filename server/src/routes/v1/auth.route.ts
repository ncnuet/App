import express, { Router } from "express";
import AuthControler from "@/controllers/auth.controller";
import { checkJWT } from "@/middlewares/checkJWT.middler";
import { checkReset } from "@/middlewares/checkReset.middler";
import userModel from "@/models/user.model";
import { checkRole } from "@/middlewares/checkRole.middler";
import { upload } from "@/middlewares/multer.middler";

const router: Router = express.Router();

router.post("/login", AuthControler.login);
router.post("/logout", [checkJWT], AuthControler.logout);
router.post("/reset", AuthControler.requestReset);
router.get("/reset", [checkReset], AuthControler.verifyReset);
router.put("/reset", [checkReset], AuthControler.resetPassword);

// router.put('/changePassword', [checkJWT], AuthControler.changePassword);
// router.post('/create', AuthControler.createAccount);

router.post(
  "/",
  [checkJWT, checkRole.bind({ role: ["admin", "bod", "head"] })],
  AuthControler.createUser
); // người tạo là quản lý
router.put(
  "/:id",
  [checkJWT, checkRole.bind({ role: ["admin", "bod", "head"] })],
  AuthControler.updateUser
); //người chỉnh sửa là quản lý
router.put(
  "/:id/password",
  [checkJWT, checkRole.bind({ role: ["admin", "bod", "head"] })],
  AuthControler.updatePassword
); //người chỉnh sửa là quản lý
router.put(
  "/:id/avatar",
  [checkJWT, checkRole.bind({ role: ["admin", "bod", "head"] })],
  AuthControler.updateAvatar
); //người chỉnh sửa là quản lý
router.delete("/:id", checkJWT, AuthControler.deleteUser);
router.put(
  "/:id/active",
  [checkJWT, checkRole.bind({ role: ["admin", "bod", "head"] })],
  AuthControler.updateActive
);

router.put(
  "/avatar",
  checkJWT,
  upload.single("avatar"),
  AuthControler.updateSelfAvatar
); // tụ bản thân chỉnh sửa
router.put("/", checkJWT, AuthControler.updateSelfInfo); // tụ bản thân chỉnh sửa
router.put("/username", checkJWT, AuthControler.updateSelfUserName); // tụ bản thân chỉnh sửa

router.get("/created-people", checkJWT, AuthControler.getCreatedPerson);

export default router;
