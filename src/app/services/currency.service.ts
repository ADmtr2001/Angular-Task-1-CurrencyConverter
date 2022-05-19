import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from 'rxjs';

import {ConvertCurrencyResponse, GetCurrenciesResponse, GetCurrencyNamesResponse} from "../models/Currency";

import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  constructor(private http: HttpClient) {
  }

  getCurrencyNames(): Observable<GetCurrencyNamesResponse> {
    return this.http.get<GetCurrencyNamesResponse>(`https://api.apilayer.com/fixer/symbols?apikey=${environment.apiKey}`);
  }

  getCurrencies(base: string, symbols?: string[]): Observable<GetCurrenciesResponse> {
    return this.http.get<GetCurrenciesResponse>(`${environment.apiURL}latest?apikey=${environment.apiKey}&base=${base}${symbols ? `&symbols=${symbols.join(',')}` : ''}`);
  }

  convertCurrency(amount: string, from: string, to: string): Observable<ConvertCurrencyResponse> {
    return this.http.get<ConvertCurrencyResponse>(`https://api.apilayer.com/fixer/convert?apikey=${environment.apiKey}&amount=${amount}&from=${from}&to=${to}`);
  }
}
