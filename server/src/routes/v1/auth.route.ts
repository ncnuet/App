import express, { Router } from 'express'
import AuthControler from "@/controllers/auth.controller"
import { checkJWT } from '@/middlewares/checkJWT.middler';
import { checkReset } from '@/middlewares/checkReset.middler';
import userModel from '@/models/user.model';
import { checkRole } from '@/middlewares/checkRole.middler';
import { upload } from '@/middlewares/multer.middler';

const router: Router = express.Router();

router.post('/login', AuthControler.login);
router.post('/logout', [checkJWT], AuthControler.logout);
router.post('/reset', AuthControler.requestReset)
router.get('/reset', [checkReset], AuthControler.verifyReset)
router.put('/reset', [checkReset], AuthControler.resetPassword)

// router.put('/changePassword', [checkJWT], AuthControler.changePassword);
// router.post('/create', AuthControler.createAccount);

router.post('/', [checkJWT, checkRole.bind({ role: ["admin", "bod", "head"] })], AuthControler.createUser);
router.patch('/:id',[checkJWT, checkRole.bind({ role: ["admin", "bod", "head"] })], AuthControler.updateUser);
router.delete('/:id',checkJWT, AuthControler.deleteUser);
router.patch('/:id/active', [checkJWT, checkRole.bind({ role: ["admin", "bod", "head"] })], AuthControler.updateActive);

router.patch('/',checkJWT, upload.single("avatar"), AuthControler.updateSelfAvatar);
router.patch('/', checkJWT, AuthControler.updateSelfInfo);
router.patch('/username', checkJWT, AuthControler.updateSelfUserName)


export default router;