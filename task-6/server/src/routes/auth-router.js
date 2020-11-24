import { Router } from 'express';
import * as controller from '../controllers';

const router = new Router();

router.post('/login', controller.logIn);
router.post('/register', controller.register);
router.get('/refresh', controller.refresh);

export default router;
