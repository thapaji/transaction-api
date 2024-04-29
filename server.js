import 'dotenv/config';
import express from "express";
import morgan from "morgan";
import transactions from "./src/routers/transactions.js";
import users from './src/routers/users.js'
import { conectMongo } from "./src/config/mongoDBConfig.js";
import cors from 'cors';

const app = express();

const PORT = process.env.PORT || 8000;

if (process.env.NODE_ENV !== 'production') {
  /*********     Codes to run in development environment only    *************/
  app.use(morgan("dev"));
}

/**********    MiddleWares       *****************8*/

app.use(express.json());
app.use(cors())
conectMongo();



app.use("/api/v1/transactions", transactions);
app.use("/api/v1/users", users);

/*********    run the server   ***********/

app.listen(PORT, (error) => {
  error ? console.log(error) : console.log(`Server is running`);
});