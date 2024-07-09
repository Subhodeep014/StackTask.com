import express from 'express'
import { signup, test , signin, signout} from '../controllers/auth.controller.js';
const router = express.Router();
router.get('/test', test)
router.post('/signup', signup)
router.post('/signin', signin)
router.post('/signout', signout)
export default router
