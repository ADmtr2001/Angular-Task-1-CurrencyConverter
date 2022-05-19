import {Component, OnInit} from '@angular/core';
import {CurrencyService} from "./services/currency.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  currencies: any = [['USD', '1'], ['EUR', '2'], ['UAH', '3']];
  isCurrenciesLoading = false;

  constructor(private currencyService: CurrencyService) {
  }

  ngOnInit(): void {
    this.currencyService.getCurrencyNames().subscribe((currenciesData) => {
      this.currencies = Array.from(Object.entries(currenciesData.symbols));
      this.isCurrenciesLoading = false;
    });
  }
}
