import { Schema, model, Document } from "mongoose";

// Define a TypeScript interface for the Trade document
interface ITrade extends Document {
    UTC_Time: Date;
    Operation: "BUY" | "SELL";
    Market: string;
    BuySellAmount: number;
    Price: number;
    BaseCoin: string;
    QuoteCoin: string;
}

// Create the schema using the TypeScript interface
const tradeSchema = new Schema<ITrade>(
    {
        UTC_Time: {
            type: Date,
            required: [true, "UTC Time is required"],
            validate: {
                validator: (v: Date) => !isNaN(Date.parse(v.toString())),
                message: (props: { value: string }) => `${props.value} is not a valid date`,
            },
        },
        Operation: {
            type: String,
            required: [true, "Operation is required"],
            enum: ["BUY", "SELL"],
            uppercase: true,
        },
        Market: {
            type: String,
            required: [true, "Market is required"],
            match: /^[A-Z]+\/[A-Z]+$/,
        },
        BuySellAmount: {
            type: Number,
            required: [true, "Buy/Sell Amount is required"],
            min: [0, "Amount must be a positive number"],
        },
        Price: {
            type: Number,
            required: [true, "Price is required"],
            min: [0, "Price must be a positive number"],
        },
        BaseCoin: {
            type: String,
            required: [true, "Base Coin is required"],
            uppercase: true,
        },
        QuoteCoin: {
            type: String,
            required: [true, "Quote Coin is required"],
            uppercase: true,
        },
    },
    { timestamps: true }
);

// Create an index on UTC_Time and Market fields with uniqueness
tradeSchema.index({ UTC_Time: 1, Market: 1 }, { unique: true });

// Export the Mongoose model
const Trade = model<ITrade>("Trade", tradeSchema);

export default Trade;















// import mongoose, { Schema, Document } from 'mongoose';

// export interface Trade extends Document {
//     userId: string;
//     utcTime: Date;
//     operation: 'Buy' | 'Sell';
//     market: string;
//     baseCoin: string;
//     quoteCoin: string;
// }

// export interface TradeInput {
//     userId: string;
//     utcTime: Date;
//     operation: 'Buy' | 'Sell';
//     market: string;
//     baseCoin: string;
//     quoteCoin: string;
// }

// const tradeSchema = new Schema({
//     userId: { type: String, required: true },
//     utcTime: { type: Date, required: true },
//     operation: { type: String, required: true, enum: ['Buy', 'Sell'] },
//     market: { type: String, required: true },
//     baseCoin: { type: String, required: true },
//     quoteCoin: { type: String, required: true },
// });

// export default mongoose.model<Trade>('Trade', tradeSchema);