import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from '../base-url';
import { CoinsModel } from '../models/coins.model';

@Injectable({
  providedIn: 'root'
})
export class CoinsService {

constructor(private httpClient : HttpClient) { }

  URL:string= baseUrl + "coins/"

  public loadCoins() {
    return this.httpClient.get(this.URL);
  }

  public saveCoin(coinDTO : CoinsModel) {
    return this.httpClient.post(this.URL,coinDTO);
  }

  public generateDataCoin(option : String) {
    return this.httpClient.get(this.URL + "generate-data-coin/" + option);
  }

  public loadCoinBase() {
    return this.httpClient.get(this.URL + "get-coin-base");
  }

  public loadCoinBaseCalc(option: string) {
    return this.httpClient.get(this.URL + "get-coin-calc/" + option);
  }

}

