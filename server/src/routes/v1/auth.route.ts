import express, { Router } from 'express'
import AuthControler from "@/controllers/auth.controller"
import { checkJWT } from '@/middlewares/checkJWT.middler';

const router: Router = express.Router();

router.post('/login', AuthControler.loginByPassword);
router.post('/logout', [checkJWT], AuthControler.logout);
// router.put('/changePassword', [checkJWT], AuthControler.changePassword);
// router.post('/requestReset', AuthControler.requestReset)
// router.post('/resetPassword', [checkJWT.bind({ type: "reset" })], AuthControler.resetPassword);
// router.post('/create', AuthControler.createAccount);

// router.get('/checkJWT', [checkJWTReset], Login.resetPassword);

export default router;