import express, { Router } from 'express'
import AuthControler from "@/controllers/auth.controller"
import { checkJWT } from '@/middlewares/checkJWT.middle';
import passport from "passport";

const router: Router = express.Router();

router.post('/login', AuthControler.loginByPassword);
// router.put('/changePassword', [checkJWT], AuthControler.changePassword);
// router.post('/requestReset', AuthControler.requestReset)
// router.post('/resetPassword', [checkJWT.bind({ type: "reset" })], AuthControler.resetPassword);
// router.post('/logout', AuthControler.logout);
// router.post('/create', AuthControler.createAccount);

// router.get('/checkJWT', [checkJWTReset], Login.resetPassword);

export default router;