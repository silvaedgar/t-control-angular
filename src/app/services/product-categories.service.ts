import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from '../base-url';
import { ProductCategoriesModel } from '../models/product-categories.model';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoriesService {

  constructor(private httpClient : HttpClient) { }

  URL:string= baseUrl + "product-categories/"

  public loadProductCategories() {
    return this.httpClient.get(this.URL);
  }

  public saveProductCategory(productCategoryDTO : ProductCategoriesModel) {
    return this.httpClient.post(this.URL,productCategoryDTO);
  }

}
