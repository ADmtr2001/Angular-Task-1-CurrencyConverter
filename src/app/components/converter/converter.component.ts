import { Component, OnInit } from '@angular/core';
import { faRepeat } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss']
})
export class ConverterComponent implements OnInit {
  faRepeat = faRepeat;
  fromValue = '';
  fromCurrency = 'UAH';
  toValue = '';
  toCurrency = 'USD';

  constructor() { }

  currencies: string[] = ['USD', 'EUR', 'RUB', 'UAH'];

  ngOnInit(): void {
  }

  switchValues(event: any): void {
    event.preventDefault();

    [this.fromValue, this.toValue] = [this.toValue, this.fromValue];
    [this.fromCurrency, this.toCurrency] = [this.toCurrency, this.fromCurrency];

    // recalculate toCurrency value;
  }

  onValueChange(event: any): void {
    const name = event.target.name as string;
    if (name === 'fromValue') {
      this.fromValue = event.target.value;
      // Change toValue
    }
    if (name === 'toValue') {
      this.toValue = event.target.value;
      // Change fromValue
    }
  }

  onCurrencyChange(event: any): void {
    const name = event.target.name;
    if (name === 'fromCurrency') {
      this.fromCurrency = event.target.value;
      // Change toValue
    }
    if (name === 'toCurrency') {
      this.toCurrency = event.target.value;
      // Change fromValue
    }
  }
}
