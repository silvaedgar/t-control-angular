import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from '../base-url';
import { PaymentFormsModel } from '../models/payment-forms.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentFormsService {

constructor(private httpClient : HttpClient) { }

  URL:string= baseUrl + "payment-forms/"

  public loadPaymentForms() {
    return this.httpClient.get(this.URL);
  }

  public savePaymentForm(paymentFormDTO : PaymentFormsModel) {
    return this.httpClient.post(this.URL,paymentFormDTO);
  }
}
