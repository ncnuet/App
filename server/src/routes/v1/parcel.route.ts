import ParcelController from '@/controllers/parcel.controller';
import { checkJWT } from '@/middlewares/checkJWT.middler';
import { checkRole } from '@/middlewares/checkRole.middler';
import express, { Router } from 'express'

const router: Router = express.Router();

router.post('/', [checkJWT, checkRole.bind({ role: ["staff", "admin"] })], ParcelController.create);
router.delete('/:id', [checkJWT, checkRole.bind({ role: ["staff", "admin"] })], ParcelController.delete);
router.put('/:id', [checkJWT, checkRole.bind({ role: ["staff", "admin"] })], ParcelController.update);

export default router;