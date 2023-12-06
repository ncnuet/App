import OfficeController from '@/controllers/office.controller';
import { checkJWT } from '@/middlewares/checkJWT.middler';
import { checkRole } from '@/middlewares/checkRole.middler';
import express, { Router } from 'express'

const router: Router = express.Router();

router.post('/', [checkJWT, checkRole.bind({ role: ["dob", "admin"] })], OfficeController.create);
router.delete('/:id', [checkJWT, checkRole.bind({ role: ["dob", "admin"] })], OfficeController.delete);
router.put('/:id', [checkJWT, checkRole.bind({role: ["dob", "admin"] })], OfficeController.update);

export default router;