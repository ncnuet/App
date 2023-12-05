import express, { Router } from 'express'
import AuthControler from "@/controllers/auth.controller"
import { checkJWT } from '@/middlewares/checkJWT.middler';
import { checkReset } from '@/middlewares/checkReset.middler';

const router: Router = express.Router();

router.post('/login', AuthControler.login);
router.post('/logout', [checkJWT], AuthControler.logout);
router.post('/reset', AuthControler.requestReset)
router.get('/reset', [checkReset], AuthControler.verifyReset)
router.put('/reset', [checkReset], AuthControler.resetPassword)

// router.put('/changePassword', [checkJWT], AuthControler.changePassword);
// router.post('/create', AuthControler.createAccount);

export default router;