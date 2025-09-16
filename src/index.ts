import express from "express";
import  router  from "./routes/bookRoutes";
import  authorRouter  from "./routes/authorRoutes";

//create express app instance
const app = express();
//middleware to allow json
app.use(express.json());
//use routes to handle requests
app.use(router);
app.use(authorRouter);

//start server
app.listen(3000, () => console.log("Server is running!"));