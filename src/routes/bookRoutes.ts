import express ,{ Express } from "express";
import { addBook, deleteBook, getBookById, getBooks, updateBook } from "../controller/BookController";

//create router instance
const router = express.Router();

//create routes for crud oprations
router.get("/books",getBooks);
router.get("/books/:id",getBookById);
router.post("/books",addBook);
router.delete("/books/:id",deleteBook);
router.put("/books/:id",updateBook);


export default router