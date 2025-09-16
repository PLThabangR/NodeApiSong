import { Book} from "./book";
import { Request, Response } from "express";
import { Author } from './authors';
import { AuthorArray } from "./AuthorController";

//create array of books
export let BookArray : Book[] = [
    {
        id: 1,
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        AuthorId: 1
       },
        {
        id: 2,
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        AuthorId: 2
       },
     

]

//Add new book
const addBook = (req: Request, res:Response) => {
    //destructure from body
        const {  authorID, title } = req.body;

        if(!authorID) return res.status(404).json({message:" AuthorId is required"});    


if(!title) return res.status(404).json({message:"Title and author are required"});

//find author by id
const author = AuthorArray.find((author:Author) => author.id === parseInt(authorID));
//if not return error message
if(!author) return res.status(404).json({message:"Author not found"});

        //create new bookobject
        const newBook = { id: BookArray.length + 1, title,author: author.name, AuthorId: author.id };
        //push new book to array
        BookArray.push(newBook);
        //return new book
        res.json(newBook);
    };

//Get all books
const getBooks = (req: Request, res:Response) => {
    //create copy of book array 
    let results = [...BookArray]
       
        if(req.query.search){
            //convert search term to lowercase
            const searchTerm = String(req.query.search).toLowerCase();
            //filter books by search term 
            results = results.filter((book:Book) => book.title.toLowerCase().includes(searchTerm));
        }

        res.json({
            count: results.length,
            results,
            BookArray});
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
        if(!id)return res.status(404).json({message:"Invalid id"});

            //convert id to number 
          const bookID = parseInt(id);
        //Check if book is found 
        const book = BookArray.find((book) => book.id === bookID)
        //if not return error message
        if(!book) return res.status(404).json({message:"Book not found"})

        //Use map to find book with similair id and update it
        const updatedBookArry= BookArray.map((book:Book) =>
            //use ternary operator to update book with similair id 
            book.id === bookID? {...book,title, author} : book) 
        
            //updated the Book arry
            BookArray = updatedBookArry
        //return updated array
        res.json(updatedBookArry);
    };

const deleteBook = (req: Request, res:Response) => {
    //destructure id from body
        const { id } = req.params;
        // Check if id is valid
        if(!id)return res.status(404).json({message:"id not found"});

         //Check if book is found 
        const book = BookArray.find((book) => book.id === parseInt(id))
        //if not return error message
        if(!book) return res.status(404).json({message:"Book not found"})
        //Use filter to find book with similair id and  remove it
        const updatedBookArry = BookArray.filter((book:Book) => book.id !== parseInt(id));
        //return updated array without deleted book
        BookArray = updatedBookArry
        res.json(BookArray);
    };

   




    export {
        addBook,
        getBooks,
        getBookById,
        updateBook,
        deleteBook
    }


