import { Router } from 'express';
import * as usersController from '../controllers/users';
import * as validators from '../validators';

const router = Router();

router.get('/users/all', usersController.getAllUsers);
router.get('/users/auto-suggest', usersController.getAutoSuggestUsers);
router.get('/users/:id', usersController.getUserById);
router.put('/users/create', validators.validateCreateUser, usersController.createUser);
router.patch('/users/update', validators.validateUpdateUser, usersController.updateUser);
router.delete('/users/remove/:id', usersController.removeUser);

export default router;
