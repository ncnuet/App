import express from 'express'
import AuthControler from "@/controllers/auth.controller"
import { checkJWT } from '@/middlewares/checkJWT.middler';
import { checkReset } from '@/middlewares/checkReset.middler';
import { checkRole } from '@/middlewares/checkRole.middler';
import { upload } from '@/middlewares/multer.middler';

const router = express.Router();
const StrictRole = ["admin", "bod", "head"];

router.post("/login", AuthControler.login);
router.post("/logout", [checkJWT], AuthControler.logout);
router.post("/reset", AuthControler.requestReset);
router.get("/reset", [checkReset], AuthControler.verifyReset);
router.put("/reset", [checkReset], AuthControler.resetPassword);
router.get("/me", [checkJWT], AuthControler.getMe)

router.post('/', [checkJWT, checkRole.bind({ role: StrictRole })], AuthControler.createUser);
router.delete('/:id', [checkJWT, checkRole.bind({ role: StrictRole })], AuthControler.deleteUser);
router.put('/:id', [checkJWT, checkRole.bind({ role: StrictRole })], AuthControler.updateUser);
router.put('/:id/active', [checkJWT, checkRole.bind({ role: StrictRole })], AuthControler.updateActive);
router.put('/:id/avatar', [checkJWT, checkRole.bind({ role: StrictRole })], AuthControler.updateAvatar);
router.put('/:id/account', [checkJWT, checkRole.bind({ role: StrictRole })], AuthControler.updateAccount);

router.put('/avatar', checkJWT, upload.single("avatar"), AuthControler.updateSelfAvatar); // tụ bản thân chỉnh sửa

router.put('/', checkJWT, AuthControler.updateSelfInfo); // tụ bản thân chỉnh sửa
router.put('/username', checkJWT, AuthControler.updateSelfUserName); // tụ bản thân chỉnh sửa

router.get('/created-people', checkJWT, AuthControler.getCreatedPerson);

export default router;
