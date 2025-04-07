import { TransactionData } from "types";
import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();

const allowedOrigins = ["http://localhost:4200"];

const transactions = require("./transactions.json") as TransactionData;

app.use(
  cors({
    origin: function (origin: any, callback: any) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        var msg =
          "The CORS policy for this site does not " +
          "allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  })
);
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: false })); // support encoded bodies

app.get("/", (req: Request, res: Response) => {
  res.send("OK");
});

app.get("/api/transactions", (req: Request, res: Response) => {
  res.send(transactions);
});

app.listen(8080, () => {
  console.log("Express app listening on port 8080!");
});
