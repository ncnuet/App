import OfficeController from '@/controllers/office.controller';
import { checkJWT } from '@/middlewares/checkJWT.middler';
import { checkRole } from '@/middlewares/checkRole.middler';
import express, { Router } from 'express'

const router: Router = express.Router();

router.post('/', [checkJWT, checkRole.bind({ role: ["dob", "admin"] })], OfficeController.create);
// router.post('/',);

export default router;