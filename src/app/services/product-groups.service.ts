import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from '../base-url';
import { ProductGroupsModel } from '../models/product-groups.model';

@Injectable({
  providedIn: 'root'
})
export class ProductGroupsService {

  constructor(private httpClient : HttpClient) { }

  URL:string= baseUrl

  public loadProductGroups() {
    return this.httpClient.get(this.URL+"product-groups/");
  }

  public saveProductGroups(productGroupDTO : ProductGroupsModel) {
    return this.httpClient.post(this.URL+"product-groups/",productGroupDTO);
  }

}
