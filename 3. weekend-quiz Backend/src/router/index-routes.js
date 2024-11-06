import express from 'express';
import {bookController } from '../controller/bookController.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.send("JavaScript Developer Class");
})

router.get("/books", bookController.getBook);
router.get("/books/:id", bookController.findBook);

export default router;