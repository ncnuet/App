import FormController from "@/controllers/form.controller";
import { checkJWT } from "@/middlewares/checkJWT.middler";
import { checkRole } from "@/middlewares/checkRole.middler";
import express, { Router } from "express";

const router: Router = express.Router();

router.post('/', checkJWT, checkRole.bind({ role: ["admin", "trans_staf", "gathe_staf"] }),FormController.createFormToUser);
// router.post('/to-customer', checkJWT, checkRole.bind({ role: ["admin", "trans_staf"] }),FormController.createFormToCustomer);
router.put('/:id/', checkJWT, checkRole.bind({ role: ["admin", "trans_staf", "gathe_staf"] }), FormController.updateReciverOrType);
// router.put('/:id/to-customer', checkJWT, checkRole.bind({ role: ["admin", "trans_staf", "gathe_staf"] }), FormController.updateType);

router.put('/:id/add-item', checkJWT, checkRole.bind({ role: ["admin", "trans_staf", "gathe_staf"] }), FormController.addItemForm);
router.put('/:id/add-items', checkJWT, checkRole.bind({ role: ["admin", "trans_staf", "gathe_staf"] }), FormController.addItemsForm);

router.delete('/:id', checkJWT, checkRole.bind({ role: ["admin", "trans_staf", "gathe_staf"] }), FormController.deleteForm);

router.put('/:id/delete-item', checkJWT, checkRole.bind({ role: ["admin", "trans_staf", "gathe_staf"] }), FormController.deleteItemForm );
router.put('/:id/delete-items', checkJWT, checkRole.bind({ role: ["admin", "trans_staf", "gathe_staf"] }), FormController.deleteItemForms );

router.put('/:id/confirm-item', checkJWT, checkRole.bind({ role: ["admin", "trans_staf", "gathe_staf"] }), FormController.confirmItemForm);
router.put('/:id/confirm-items', checkJWT, checkRole.bind({ role: ["admin", "trans_staf", "gathe_staf"] }), FormController.confirmItemForms);


export default router;

