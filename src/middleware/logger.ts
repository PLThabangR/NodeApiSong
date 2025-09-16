///Logic for logger
import { Request, Response,NextFunction } from "express";


export const logger = (req: Request, res: Response, next: NextFunction) => {
    console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);
    //move to the next middleware
    next();
};