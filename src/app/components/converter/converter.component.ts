import {Component, Input, OnInit} from '@angular/core';

import {CurrencyService} from "../../services/currency.service";

import {faRepeat} from '@fortawesome/free-solid-svg-icons';

import {Symbols} from "../../models/Currency";

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss']
})
export class ConverterComponent implements OnInit{
  faRepeat = faRepeat;

  currencies: Array<Array<string>> = [];
  isCurrenciesLoading =  true;

  fromValue = '';
  toValue = '';
  fromCurrency = 'USD';
  toCurrency = 'UAH';

  requestDelayTimer: ReturnType<typeof setTimeout> | null = null;

  constructor(private currencyService: CurrencyService) {
  }

  ngOnInit(): void {
    this.currencyService.getCurrencyNames().subscribe((currenciesData) => {
      this.currencies = Array.from(Object.entries(currenciesData.symbols)) ;
      this.isCurrenciesLoading = false;
    });
  }

  convert(type: 'from-to' | 'to-from') {
    if (this.requestDelayTimer) {
      clearTimeout(this.requestDelayTimer);
    }


    if (type === 'from-to') {
      if (!this.fromValue) return;

      this.requestDelayTimer = setTimeout(() => {
        this.currencyService.convertCurrency(this.fromValue, this.fromCurrency, this.toCurrency).subscribe((data) => {
          this.toValue = data.result.toFixed(2).toString();
        });
      }, 300);
    }

    if (type === 'to-from') {
      if (!this.toValue) return;

      this.requestDelayTimer = setTimeout(() => {
        this.currencyService.convertCurrency(this.toValue, this.toCurrency, this.fromCurrency).subscribe((data) => {
          this.fromValue = data.result.toFixed(2).toString();
        });
      }, 300);
    }
  }

  switchCurrencies(event: any): void {
    event.preventDefault();

    [this.fromCurrency, this.toCurrency] = [this.toCurrency, this.fromCurrency];

    this.convert('from-to');
  }

  // TODO: Add Event Type
  onValueChange(event: any): void {
    const name = event.target.name as string;

    if (!event.target.value || event.target.value < 0) {
      this.fromValue = '';
      this.toValue = '';

      if (this.requestDelayTimer) {
        clearTimeout(this.requestDelayTimer);
      }

      return;
    }

    if (name === 'fromValue') {
      this.fromValue = event.target.value;
      this.convert('from-to');
    }

    if (name === 'toValue') {
      this.toValue = event.target.value;
      this.convert('to-from');
    }
  }

  // TODO: Add Event Type
  onCurrencyChange(event: any): void {
    const name = event.target.name;

    if (name === 'fromCurrency') {
      this.fromCurrency = event.target.value;
      this.convert('from-to');
    }

    if (name === 'toCurrency') {
      this.toCurrency = event.target.value;
      this.convert('from-to');
    }
  }
}
