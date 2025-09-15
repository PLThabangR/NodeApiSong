import { Book, BookArray } from "./book";
import { Request, Response } from "express";

//Add new book
const addBook = (req: Request, res:Response) => {
    //destructure from body
        const { id, title, author } = req.body;
        //create new bookobject
        const newBook = { id, title, author };
        //push new book to array
        BookArray.push(newBook);
        //return new book
        res.json(newBook);
    };

//Get all books
const getBooks = (req: Request, res:Response) => {
        res.json(BookArray);
    };

//Get single book

const getBookById = (req: Request, res:Response) => {
    const { id } = req.params;
    //Check if id is valid
    if(!id)return res.status(404).json({message:"Invalid found"});
        //the find method returns the first element in the array 
    const book = BookArray.find((book) => book.id === parseInt(id));
    //Check if book is found if not return error message
    if(!book)return res.status(404).json({message:"Book not found"})
        //return book;
    res.json(book);

  
    };

const updateBook = (req: Request, res:Response) => {
        //destructure from body 
        const { title, author } = req.body;
        //destructure id from params
        const { id } = req.params;
        // Check if id is valid
        if(!id)return res.status(404).json({message:"Invalid found"});

        //Use map to find book with similair id and update it
        const updatedBookArry= BookArray.map((book:Book) =>
            //use ternary operator to update book with similair id 
            book.id === parseInt(id)? {...book,title, author} : book) 
        
        //return updated array
        res.json(updatedBookArry);
    };

const deleteBook = (req: Request, res:Response) => {
    //destructure id from body
        const { id } = req.params;
        // Check if id is valid
        if(!id)return res.status(404).json({message:"Invalid found"});
        //Use filter to find book with similair id and  remove it
        const updatedBookArry = BookArray.filter((book:Book) => book.id !== parseInt(id));
        //return updated array without deleted book
        res.json(updatedBookArry);
    };


    export {
        addBook,
        getBooks,
        getBookById,
        updateBook,
        deleteBook
    }


