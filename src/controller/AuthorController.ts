import { Request, Response } from "express";
import { Author } from "./authors";

let AuthorArray : Author[] = [
    {
        id: 1,
        name: "F. Scott Fitzgerald",
       },
        {
        id: 2,
        name: "Harper Lee",
       },
        {
        id: 3,
        name: "J.K Rowling",
       },
]

export const getAuthors = (req: Request, res:Response) => {
       try {
         res.json(AuthorArray);
       } catch (error) {
        return res.status(500).json({message:(error as Error).message});
       }
    };

    //create author
export const addAuthor = (req: Request, res:Response) => {
        const { name } = req.body;
        try {
            //defensive programming
            if(!name){
                throw new Error("Name is required");
            };
            //check if id is valid
          
            //create new Author: Firstname Lastname
        const newAuthor = { id: Number(AuthorArray.length + 1), name };
        //push new author to array
        AuthorArray.push(newAuthor);
        //return new author
        res.json(newAuthor);
        } catch (error:any) {
            return res.status(500).json({message:(error as Error).message});  
        }
}


export const getAuthorById = (req: Request, res:Response) => {
        const { id } = req.params;
     try {
           //Check if id is valid
        if(!id){
            throw new Error("Invalid id");
        }
            //the find method returns the first element in the array 
        const author = AuthorArray.find((author) => author.id === parseInt(id));
        //Check if author is found if not return error message
        if(!author){
            throw new Error("Author not found");
        }
            //return author;
        res.json(author);
        
     } catch (error:any) {
        return res.status(500).json({message:(error as Error).message});
     }
    };

    //update author
    export const updateAuthor = (req: Request, res:Response) => {
        //destructure from body 
        const { name } = req.body;
        //destructure id from params
        const { id } = req.params;
        try {
            // Check if id is valid or provided
            if(!id){
                throw new Error("Invalid id");
            }
            //convert id to number 
            const authorID = parseInt(id);
            //Check if author is found 
            const author = AuthorArray.find((author) => author.id === authorID)
            //if not throw with error message
            if(!author){
                throw new Error("Author not found");
            }
           
            //Use map to find author with similair id and update
            const updatedAuthorArry= AuthorArray.map((author:Author) =>
                //use ternary operator to update author with similair id 
                author.id === authorID? {...author,name} : author) 
                

            //updated the Author array
            AuthorArray = updatedAuthorArry
        //give feedback to usr
          res.json(AuthorArray);
                
            
        } catch (error:any) {
            return res.status(500).json({message:(error as Error).message});
        }
    }

    //Delete author
    export const deleteAuthor = (req: Request, res:Response) => {
        //destructure id from body
        const { id } = req.params;
        try {
            // Check if id is valid
            if(!id){
                throw new Error("Invalid id");
            }
            //Check if author is found 
            const author = AuthorArray.find((author) => author.id === parseInt(id))
            //if not throw with error message
            if(!author){
                throw new Error("Author not found");
            }
            //Use filter to find author with similair id and  remove it
            const updatedAuthorArry = AuthorArray.filter((author:Author) => author.id !== parseInt(id));
            //return updated array without deleted author
            AuthorArray = updatedAuthorArry
            res.json(AuthorArray);
        } catch (error:any) {
            return res.status(500).json({message:(error as Error).message});
        }
    }