export interface Rates {
  [index: string]: number;
}

export interface Symbols {
  [index: string]: string;
}

export interface Info {
  rate: number;
  timestamp: number;
}

export interface Query {
  amount: number;
  from: string;
  to: string;
}

export interface GetCurrenciesResponse {
  success: boolean;
  timestamp: number;
  base: string;
  date: string;
  rates: Rates;
}

export interface GetCurrencyNamesResponse {
  success: boolean;
  symbols: Symbols;
}

export interface ConvertCurrencyResponse {
  date: string;
  historical: string;
  info: Info;
  query: Query;
  result: number;
  success: boolean;
}
