import { Component, OnInit, Input } from '@angular/core';
import {CurrencyService} from "../../services/currency.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  usdValue = 0;
  isUsdValueLoading = true;
  eurValue = 0;
  isEurValueLoading = true;

  constructor(private currencyService: CurrencyService) { }

  ngOnInit(): void {
    this.currencyService.getCurrencies('USD', ['UAH']).subscribe((currenciesData) => {
      this.usdValue = currenciesData.rates['UAH'];
      this.isUsdValueLoading = false;
    });
    this.currencyService.getCurrencies('EUR', ['UAH']).subscribe((currenciesData) => {
      this.eurValue = currenciesData.rates['UAH'];
      this.isEurValueLoading = false;
    });
  }

}
