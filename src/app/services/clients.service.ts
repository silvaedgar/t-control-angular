import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from '../base-url';
import { ClientsModel } from '../models/clients.model';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  constructor(private httpClient : HttpClient) { }

  URL:string= baseUrl + "clients/"

  public loadClients(id : number) {
    return this.httpClient.get(this.URL+(id != 0 ? id : ''));
  }

  public saveClient(clientsDTO : ClientsModel) {
    console.log("URL: ",this.URL)
    return this.httpClient.post(this.URL,clientsDTO);
  }}
