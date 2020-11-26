import express from 'express';
import * as controller from '../controllers/index.js';

const router = new express.Router();

router.post('/login', controller.logIn);
router.post('/register', controller.register);
router.get('/refresh', controller.refresh);

export default router;
