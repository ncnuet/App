import express, { Router } from 'express'
import Profile from "@/controllers/profile.controller"

const router: Router = express.Router();

router.get('/', Profile.getProfile);

export default router;