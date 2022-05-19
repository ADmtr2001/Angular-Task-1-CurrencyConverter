import {Component, Input, OnInit} from '@angular/core';
import {faRepeat} from '@fortawesome/free-solid-svg-icons';
import {CurrencyService} from "../../services/currency.service";


@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss']
})
export class ConverterComponent implements OnInit {
  @Input() currencies!: any;
  @Input() isCurrenciesLoading!: boolean;

  faRepeat = faRepeat;
  fromValue = '';
  fromCurrency = 'UAH';
  toValue = '';
  toCurrency = 'USD';

  requestTimer: ReturnType<typeof setTimeout> | null = null;

  constructor(private currencyService: CurrencyService) {
  }


  ngOnInit(): void {
  }

  switchCurrencies(event: any): void {
    event.preventDefault();

    [this.fromCurrency, this.toCurrency] = [this.toCurrency, this.fromCurrency];

    if (this.requestTimer) {
      clearTimeout(this.requestTimer);
    }
    this.requestTimer = setTimeout(() => {
      if (this.fromValue) {
        this.currencyService.convertCurrency(this.fromValue, this.fromCurrency, this.toCurrency).subscribe((data) => {
          this.toValue = data.result.toString();
        });
      }
    }, 250);
  }

  onValueChange(event: any): void {
    const name = event.target.name as string;

    if (!event.target.value) {
      this.fromValue = '0';
      this.toValue = '0';
      return;
    }

    if (name === 'fromValue') {
      this.fromValue = event.target.value;
      if (this.requestTimer) {
        clearTimeout(this.requestTimer);
      }
      this.requestTimer = setTimeout(() => {
        if (this.fromValue) {
          this.currencyService.convertCurrency(this.fromValue, this.fromCurrency, this.toCurrency).subscribe((data) => {
            this.toValue = data.result.toString();
          });
        }
      }, 250);
    }
    if (name === 'toValue') {
      this.toValue = event.target.value;
      if (this.requestTimer) {
        clearTimeout(this.requestTimer);
      }
      this.requestTimer = setTimeout(() => {
        if (this.toValue) {
          this.currencyService.convertCurrency(this.toValue, this.toCurrency, this.fromCurrency).subscribe((data) => {
            this.fromValue = data.result.toString();
          });
        }
      }, 250);
    }
  }

  onCurrencyChange(event: any): void {
    const name = event.target.name;
    if (name === 'fromCurrency') {
      this.fromCurrency = event.target.value;
      if (this.requestTimer) {
        clearTimeout(this.requestTimer);
      }
      this.requestTimer = setTimeout(() => {
        if (this.fromValue) {
          this.currencyService.convertCurrency(this.fromValue, this.fromCurrency, this.toCurrency).subscribe((data) => {
            this.toValue = data.result.toString();
          });
        }
      }, 250);
    }
    if (name === 'toCurrency') {
      this.toCurrency = event.target.value;
      if (this.requestTimer) {
        clearTimeout(this.requestTimer);
      }
      this.requestTimer = setTimeout(() => {
        if (this.toValue) {
          this.currencyService.convertCurrency(this.toValue, this.toCurrency, this.fromCurrency).subscribe((data) => {
            this.fromValue = data.result.toString();
          });
        }
      }, 250);
    }
  }
}
