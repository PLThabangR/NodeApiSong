import express from "express";
import  router  from "./routes/bookRoutes";

//create express app instance
const app = express();
//middleware to allow json
app.use(express.json());
//use routes to handle requests
app.use(router);

//start server
app.listen(3000, () => console.log("Server is running!"));