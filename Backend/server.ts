import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { Transaction } from "types";
import { TransactionData } from "types";

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

app.get(
  "/api/transactions/:dayId/:transactionId",
  (
    req: Request<{ dayId?: string; transactionId?: string }>,
    res: Response<Transaction | string>
  ) => {
    const { dayId, transactionId } = req.params;

    if (!dayId || !transactionId) {
      res.status(400).send("Day and id are required");
      return;
    }

    const day = transactions.days.find((day) => day.id === dayId);
    const matchingTransaction = day?.transactions.find(
      (transaction) => transaction.id === parseInt(transactionId)
    );

    if (matchingTransaction) {
      res.send(matchingTransaction);
    } else {
      res.status(404).send("Transaction not found");
    }
  }
);

app.get("/api/transactions", (req: Request, res: Response<TransactionData>) => {
  const sortedTransactions = transactions.days.sort((dayA, dayB) => {
    return new Date(dayB.id).getDate() - new Date(dayA.id).getDate();
  });

  res.send({ days: sortedTransactions });
});

app.listen(8080, () => {
  console.log("Express app listening on port 8080!");
});
