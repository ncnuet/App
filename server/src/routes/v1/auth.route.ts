import express from 'express'
import AuthControler from "@/controllers/auth.controller"
import { checkJWT } from '@/middlewares/checkJWT.middler';
import { checkReset } from '@/middlewares/checkReset.middler';
import { checkRole } from '@/middlewares/checkRole.middler';
import { upload } from '@/middlewares/multer.middler';

const router = express.Router();
const StrictRole = ["admin", "bod", "head"];

router.post('/login', AuthControler.login);
router.post('/logout', [checkJWT], AuthControler.logout);
router.post('/reset', AuthControler.requestReset)
router.get('/reset', [checkReset], AuthControler.verifyReset)
router.put('/reset', [checkReset], AuthControler.resetPassword)

router.post('/', [checkJWT, checkRole.bind({ role: StrictRole })], AuthControler.createUser); // người tạo là quản lý
router.patch('/:id', [checkJWT, checkRole.bind({ role: StrictRole })], AuthControler.updateUser); //người chỉnh sửa là quản lý 
router.patch('/:id/password', [checkJWT, checkRole.bind({ role: StrictRole })], AuthControler.updatePassword); //người chỉnh sửa là quản lý 
router.patch('/:id/avatar', [checkJWT, checkRole.bind({ role: StrictRole })], AuthControler.updateAvatar); //người chỉnh sửa là quản lý 
router.delete('/:id', checkJWT, AuthControler.deleteUser);
router.patch('/:id/active', [checkJWT, checkRole.bind({ role: StrictRole })], AuthControler.updateActive);

router.patch('/avatar', checkJWT, upload.single("avatar"), AuthControler.updateSelfAvatar); // tụ bản thân chỉnh sửa
router.patch('/', checkJWT, AuthControler.updateSelfInfo); // tụ bản thân chỉnh sửa
router.patch('/username', checkJWT, AuthControler.updateSelfUserName); // tụ bản thân chỉnh sửa

router.get('/created-people', checkJWT, AuthControler.getCreatedPerson);

export default router;