import path from "path";
import fs from "fs";
import csv from "csv-parser";
import { Request, Response } from "express";
import Trade from "../models/tradeModel";
import { parseTradeRow } from "../lib/tradeCronService"

export const uploadTrades = (req: Request, res: Response): void => {
  if (!req.file) {
    res.status(400).json({ error: "No file uploaded" });
    return;
  }

  const fileExtension = path.extname(req.file.originalname).toLowerCase();
  if (fileExtension !== ".csv") {
    fs.unlinkSync(req.file.path);
    res.status(400).json({ error: "Invalid file type. Please upload a CSV file." });
    return;
  }

  const filePath = req.file.path;
  const trades: any[] = [];
  let validTradesCount = 0;
  let invalidRowsCount = 0;

  fs.createReadStream(filePath)
    .pipe(csv())
    .on("data", (row: any) => {
      try {
        const trade = parseTradeRow(row);
        trades.push(trade);
        validTradesCount++;
      } catch (error) {
        invalidRowsCount++;
        console.error(`Error processing row: ${JSON.stringify(row)}, Error: ${(error as Error).message}`);
      }
    })
    .on("end", async () => {
      try {
        if (validTradesCount === 0) {
          res.status(400).json({ error: "No valid trade data found in the file" });
          return;
        }

        for (const trade of trades) {
          try {
            await Trade.updateOne(
              { UTC_Time: trade.UTC_Time, Market: trade.Market },
              { $set: trade },
              { upsert: true }
            );
          } catch (error) {
            console.error(`Error upserting trade: ${JSON.stringify(trade)}, Error: ${(error as Error).message}`);
          }
        }

        res.status(200).json({
          message: `File uploaded. Valid trades processed: ${validTradesCount}. Invalid rows skipped: ${invalidRowsCount}.`,
        });
      } catch (error) {
        console.error(`Error storing data in database: ${(error as Error).message}`);
        res.status(500).json({ error: "Error storing data in database" });
      } finally {
        fs.unlinkSync(filePath);
      }
    })
    .on("error", (error: Error) => {
      console.error(`Error reading the file: ${error.message}`);
      res.status(500).json({ error: "Error reading the file" });
    });
};

export const getBalances = async (req: Request, res: Response): Promise<void> => {
  const { timestamp } = req.body;

  if (!timestamp) {
    res.status(400).json({ error: "Timestamp is required" });
    return;
  }

  const date = new Date(timestamp);
  if (isNaN(date.getTime())) {
    res.status(400).json({ error: "Invalid timestamp format" });
    return;
  }

  try {
    const trades = await Trade.find({ UTC_Time: { $lt: date } });

    if (trades.length === 0) {
      res.status(200).json({
        message: "No trades found before the given timestamp",
        balances: {},
      });
      return;
    }

    const balances = trades.reduce((acc: Record<string, number>, trade) => {
      const { BaseCoin, Operation, BuySellAmount } = trade;
      if (!acc[BaseCoin]) {
        acc[BaseCoin] = 0;
      }

      if (Operation === "BUY") {
        acc[BaseCoin] += BuySellAmount;
      } else if (Operation === "SELL") {
        acc[BaseCoin] -= BuySellAmount;
      }

      return acc;
    }, {});

    res.status(200).json(balances);
  } catch (error) {
    console.error(`Error calculating balances: ${(error as Error).message}`);
    res.status(500).json({ error: "Error calculating balances" });
  }
};