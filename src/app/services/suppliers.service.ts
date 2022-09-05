import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from '../base-url';
import { SuppliersModel } from '../models/suppliers.model';

@Injectable({
  providedIn: 'root'
})
export class SuppliersService {

constructor(private httpClient : HttpClient) { }

  URL:string= baseUrl + "suppliers/"

  public loadSuppliers(id: number) {
    return this.httpClient.get(this.URL+(id != 0 ? id : ''));
  }

  public saveSupplier(supplierDTO : SuppliersModel) {
    return this.httpClient.post(this.URL,supplierDTO);
  }
}
