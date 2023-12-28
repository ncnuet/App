import FormController from "@/controllers/form.controller";
import { checkJWT } from "@/middlewares/checkJWT.middler";
import { checkRole } from "@/middlewares/checkRole.middler";
import express, { Router } from "express";

const router: Router = express.Router();

router.post('/to-user', checkJWT, checkRole.bind({ role: ["admin", "trans_staf", "gathe_staf"] }),FormController.createFormToUser);
router.post('/to-customer', checkJWT, checkRole.bind({ role: ["admin", "trans_staf"] }),FormController.createFormToCustomer);
router.put('/:id/to-user', checkJWT, checkRole.bind({ role: ["admin", "trans_staf", "gathe_staf"] }), FormController.updateReciverOrType);
router.put('/:id/to-customer', checkJWT, checkRole.bind({ role: ["admin", "trans_staf", "gathe_staf"] }), FormController.updateReciverOrType);
router.put('/:id/add-item', checkJWT, checkRole.bind({ role: ["admin", "trans_staf", "gathe_staf"] }), FormController.addItemForm);
router.delete('/:id', checkJWT, checkRole.bind({ role: ["admin", "trans_staf", "gathe_staf"] }), FormController.deleteForm);
router.put('/:id/delete-item', checkJWT, checkRole.bind({ role: ["admin", "trans_staf", "gathe_staf"] }), FormController.deleteItemForm );
router.put(':id/comfirm-item', checkJWT, checkRole.bind({ role: ["admin", "trans_staf", "gathe_staf"] }), FormController.comfirmItemForm);
router.put(':id/add-items', checkJWT, checkRole.bind({ role: ["admin", "trans_staf", "gathe_staf"] }), FormController.addItemsForm);

export default router;

