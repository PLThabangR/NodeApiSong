import express,{ Express } from "express";
import  router  from "./routes/bookRoutes";
import  authorRouter  from "./routes/authorRoutes";
import { logger } from "./middleware/logger";
import bodyParser from "body-parser";

//create express app instance
const app:Express = express();
//middleware to allow json
app.use(express.json());
//middleware to parse json body 
app.use(bodyParser.json());
//middleware to log requests
app.use(logger);
//use routes to handle requests
app.use(router);
app.use(authorRouter);

const PORT = process.env.PORT || 3000;
//start server
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));