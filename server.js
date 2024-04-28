import 'dotenv/config';
import express from "express";
import morgan from "morgan";
// import taskRouter from "./src/routers/taskRouter.js";
import { conectMongo } from "./src/config/mongoDBConfig.js";
import cors from 'cors';

const app = express();

const PORT = process.env.PORT || 8000;

app.use(cors())

conectMongo();

/*    MiddleWares       */
app.use(morgan("dev"));
app.use(express.json());

// app.use("/api/v1/tasks", taskRouter);

//run the server

app.listen(PORT, (error) => {
  error ? console.log(error) : console.log(`Server is running`);
});