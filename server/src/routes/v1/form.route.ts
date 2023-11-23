import formModel from "@/models/form.model";
import express, { Router } from "express";

const router: Router = express.Router();

router.post('/create', formModel.createNewForm);

export default router;