import express from 'express';
import { createBooking, getAllBooking, getBooking } from '../controller/bookController.js';
import { verifyAdmin, verifyUser } from '../utils/verifyToken.js';

const router=express.Router()

router.post('/:id',verifyUser,createBooking);
router.get('/:id',verifyUser,getBooking);
router.get('/',verifyAdmin,getAllBooking);

export default router