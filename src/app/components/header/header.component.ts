import { Component, OnInit } from '@angular/core';

import {CurrencyService} from "../../services/currency.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  usdValue = 0;
  eurValue = 0;
  isUsdValueLoading = true;
  isEurValueLoading = true;

  constructor(private currencyService: CurrencyService) { }

  ngOnInit(): void {
    this.currencyService.getCurrencies('USD', ['UAH']).subscribe((data) => {
      this.usdValue = data.rates['UAH'];
      this.isUsdValueLoading = false;
    });

    this.currencyService.getCurrencies('EUR', ['UAH']).subscribe((data) => {
      this.eurValue = data.rates['UAH'];
      this.isEurValueLoading = false;
    });
  }

}
