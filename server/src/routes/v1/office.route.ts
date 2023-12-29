import OfficeController from '@/controllers/office.controller';
import { checkJWT } from '@/middlewares/checkJWT.middler';
import { checkRole } from '@/middlewares/checkRole.middler';
import express, { Router } from 'express'

const router: Router = express.Router();

router.post('/', [checkJWT, checkRole.bind({ role: ["bod", "admin"] })], OfficeController.create);
router.delete('/:id', [checkJWT, checkRole.bind({ role: ["bod", "admin"] })], OfficeController.delete);
router.put('/:id', [checkJWT, checkRole.bind({role: ["bod", "admin"] })], OfficeController.update);
router.get("/gather", OfficeController.getOfficeGather);

export default router;