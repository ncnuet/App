import express, { Router } from 'express'
import AuthControl from "@/controllers/auth.controller"
import { checkJWT } from '@/middlewares/checkJWT.middle';
import passport from "passport";

const router: Router = express.Router();

router.post('/', AuthControl.loginByPassword);
router.post('/refresh', AuthControl.resfreshToken);
router.put('/changePassword', [checkJWT], AuthControl.changePassword);
router.post('/requestReset', AuthControl.requestReset)
router.post('/resetPassword', [checkJWT.bind({ type: "reset" })], AuthControl.resetPassword);
router.post('/logout', AuthControl.logout);
router.post('/create', AuthControl.createAccount);

// router.get('/checkJWT', [checkJWTReset], Login.resetPassword);

router.get('/federated/facebook', passport.authenticate('facebook'));
router.get('/redirect/facebook',
    passport.authenticate('facebook', { failureRedirect: '/' }),
    AuthControl.loginByProvider);

export default router;