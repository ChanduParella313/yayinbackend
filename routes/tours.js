import express from "express";
import { createTour, deleteTour, getAllTours, getSingleTour, updateTour,getTourBySearch, getFeaturedTour, getTourCount } from "../controller/tourcontroller.js";

const router=express.Router()
import { verifyAdmin } from '../utils/verifyToken.js';
//create new Tour
router.post('/',verifyAdmin,createTour);

//update tour
router.put('/:id',verifyAdmin,updateTour);

//delete tour
router.delete('/:id',verifyAdmin,deleteTour);

//get single tour
router.get('/:id',getSingleTour);

//get all tour
router.get('/',getAllTours);

//get by search all tour
router.get('/search/getTourBySearch',getTourBySearch);

//get by featured tour
router.get('/search/getFeaturedTours',getFeaturedTour);

//get by tour count
router.get('/search/getTourCount',getTourCount);

export default router