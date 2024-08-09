// tradeParser.ts
import moment from 'moment';
import { isValidDate } from '../utils/validators';

interface ParsedTrade {
    UTC_Time: Date;
    Operation: string;
    Market: string;
    BuySellAmount: number;
    Price: number;
    BaseCoin: string;
    QuoteCoin: string;
}

export const parseTradeRow = (row: any): ParsedTrade => {
    const { UTC_Time, Operation, Market, "Buy/Sell Amount": BuySellAmount, Price } = row;

    if (!UTC_Time || !Operation || !Market || !BuySellAmount || !Price) {
        throw new Error("Missing required fields");
    }
    if (parseFloat(BuySellAmount) <= 0 || parseFloat(Price) <= 0) {
        throw new Error("Buy/Sell Amount and Price must be positive numbers");
    }

    const dateFormat = isValidDate(UTC_Time);
    if (!dateFormat) {
        throw new Error("Invalid date format");
    }

    const validOperations = ["BUY", "SELL"];
    if (!validOperations.includes(Operation.toUpperCase())) {
        throw new Error("Invalid operation type");
    }

    const [BaseCoin, QuoteCoin] = Market.split("/");
    if (!BaseCoin || !QuoteCoin) {
        throw new Error("Invalid Market format");
    }

    const truncatedDate = moment(UTC_Time, dateFormat)
        .seconds(0)
        .milliseconds(0)
        .toDate();

    return {
        UTC_Time: truncatedDate,
        Operation: Operation.toUpperCase(),
        Market,
        BuySellAmount: parseFloat(BuySellAmount),
        Price: parseFloat(Price),
        BaseCoin,
        QuoteCoin,
    };
};

