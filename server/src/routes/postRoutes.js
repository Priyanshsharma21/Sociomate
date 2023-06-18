import express from 'express'
import {posting,posts} from '../controllers/posts.js';
import { isLoggesIn} from '../middlewares/index.js';

const router = express.Router()


router.post('/posting',isLoggesIn,posting);
router.get('/getPosts',posts);


export default router