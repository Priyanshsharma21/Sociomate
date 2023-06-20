import express from 'express'
import {posting,posts,postsByQuery,connections,postUpdate,removePost,postByUser} from '../controllers/posts.js';
import { isLoggesIn } from '../middlewares/index.js';

const router = express.Router()

router.post('/posting',isLoggesIn,posting);
router.get('/getPosts',isLoggesIn,posts);
router.get('/postbyuser/:userId',isLoggesIn,postByUser);
router.get('/findPost',isLoggesIn,postsByQuery);
router.get('/mutuals/:userId/:connectionId',isLoggesIn,connections);
router.put('/postUpdate',isLoggesIn,postUpdate);
router.delete('/removePost',isLoggesIn,removePost);

export default router