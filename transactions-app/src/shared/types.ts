import { CurrencyCode } from "./constants";

export interface OtherParty {
  name: string;
  iban: string;
}

export interface LocalTransaction {
  id: number;
  timestamp: string;
  amount: number;
  currencyCode: CurrencyCode.EUR;
  description: string;
  otherParty?: OtherParty;
}

export interface ForeignTransaction {
  id: number;
  timestamp: string;
  amount: number;
  currencyCode: CurrencyCode.USD;
  currencyRate: number;
  description: string;
  otherParty?: OtherParty;
}

export type Transaction = LocalTransaction | ForeignTransaction;

export interface Day {
  id: string;
  transactions: Transaction[];
}

export interface TransactionData {
  days: Day[];
}
