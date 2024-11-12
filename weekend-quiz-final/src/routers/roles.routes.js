import express from 'express';
import { roleController } from "../controllers/roles.controllers.js";
const router = express.Router();

router.post('/', roleController.addRole);
router.get('/', roleController.getRole);
router.get('/:id', roleController.getRoleById);
router.put('/:id', roleController.updateRole);
router.delete('/:id',  roleController.deleteRole);

export default router;