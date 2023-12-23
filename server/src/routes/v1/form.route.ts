import FormController from "@/controllers/form.controller";
import { checkJWT } from "@/middlewares/checkJWT.middler";
import { checkRole } from "@/middlewares/checkRole.middler";
import express, { Router } from "express";

const router: Router = express.Router();

router.post('/', checkJWT, checkRole.bind({ role: ["admin", "trans_staf", "gathe_staf"] }),FormController.create);
router.patch('/:id', checkJWT, checkRole.bind({ role: ["admin", "trans_staf", "gathe_staf"] }), FormController.updateReciverOrType);
router.patch('/:id/add-item', checkJWT, checkRole.bind({ role: ["admin", "trans_staf", "gathe_staf"] }), FormController.addItemForm);
router.delete('/:id', checkJWT, checkRole.bind({ role: ["admin", "trans_staf", "gathe_staf"] }), FormController.deleteForm);
router.patch('/:id/delete-item', checkJWT, checkRole.bind({ role: ["admin", "trans_staf", "gathe_staf"] }), FormController.deleteItemForm );
router.patch(':id/update-comfirm', checkJWT, checkRole.bind({ role: ["admin", "trans_staf", "gathe_staf"] }), FormController.updateItemForm);


export default router;

