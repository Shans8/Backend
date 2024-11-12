import express from 'express';
import { profileController } from "../controllers/profiles.controllers.js";
import { authentication } from "../middlewares/authentication.js";
import { authorization } from "../middlewares/authorization.js";
const router = express.Router();

router.post('/', authentication, profileController.addProfile);
router.get('/', profileController.getProfile);
router.get('/:id', profileController.getProfileId);
router.put('/:id',authentication, authorization, profileController.updateProfile);
router.delete('/:id', authentication, authorization, profileController.deleteProfile);

export default router;