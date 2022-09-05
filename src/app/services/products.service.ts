import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from '../base-url';
import { ProductsModel } from '../models/products.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

constructor(private httpClient : HttpClient) { }

  URL:string= baseUrl + "products/"

  public loadProducts(id: number) {
    return this.httpClient.get(this.URL+(id != 0 ? id : ''));
  }

  public saveProduct(productDTO : ProductsModel) {
    return this.httpClient.post(this.URL,productDTO);
  }
}
