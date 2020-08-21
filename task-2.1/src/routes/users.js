import { Router } from 'express';
import * as usersController from '../controllers/users';

const router = Router();

router.get('/users/all', usersController.getAllUsers);
router.get('/users/auto-suggest', usersController.getAutoSuggestUsers);
router.get('/users/:id', usersController.getUserById);
router.put('/users/create', usersController.createUser);
router.patch('/users/update', usersController.updateUser);
router.delete('/users/delete', usersController.removeUser);

export default router;
