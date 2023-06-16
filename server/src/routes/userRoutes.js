import express from 'express'
import { signup, login, fetchUser, users, connections, profileUpdate } from '../controllers/users.js'

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/user/:userId', fetchUser);
router.get('/users', users);
router.put('/connections/:userId/:connectionId', connections);
router.put('/profileUpdate/:userId',profileUpdate)

export default router;
