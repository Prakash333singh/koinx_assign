import express, { Express, Request, Response } from "express";
import morgan from "morgan";
import { config } from "./config";
import { DBConnect } from "./database/dbConnect";
import { errorHandler } from "./middleware/errorHandler";
import tradeRoute from './routes/tradeRoute'

const app: Express = express();

// check env
const port = config.PORT || 3000;

// database connection
DBConnect.connect();


app.use(morgan("dev"));
app.use(express.json());

// routes
app.use("/api/v1/trades", tradeRoute);

app.use(errorHandler);


app.all("*", (req: Request, res: Response) => {
  res.status(404).json({
    message: "Invalid route",
  });
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server Listening  on port ${port}`);
});
