import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from '../base-url';
import { TaxesModel } from '../models/taxes.model';



@Injectable({
  providedIn: 'root'
})
export class TaxesService {

  constructor(private httpClient : HttpClient) { }

  URL:string= baseUrl

  public loadTaxes() {
    return this.httpClient.get(this.URL + "taxes/");
  }

  public saveTax(taxDTO : TaxesModel) {
    return this.httpClient.post(this.URL + "taxes/",taxDTO);
  }
}
