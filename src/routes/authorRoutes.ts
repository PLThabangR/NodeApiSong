
import express ,{ Express } from "express";
import { addAuthor, deleteAuthor, getAuthorById, getAuthors, getBooksByAuthorID, updateAuthor } from "../controller/AuthorController";

//create router instance
const router = express.Router();

//create routes for crud oprations
router.get("/authors",getAuthors);
router.get("/authors/:id",getAuthorById);
router.post("/authors",addAuthor);
router.delete("/authors/:id",deleteAuthor);
router.put("/authors/:id",updateAuthor);
router.get("/authors/books/:AuthorID",getBooksByAuthorID);


export default router