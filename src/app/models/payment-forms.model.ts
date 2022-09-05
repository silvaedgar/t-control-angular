export class PaymentFormsModel {

  constructor (id:number, paymentForm: string, description:string, userId:number) {
    this.id = id;
    this.description = description;
    this.paymentForm = paymentForm;
    this.userId = userId;
  }

  id=0;
  description:string = "";
  userId = 0;
  paymentForm: string=""  
}
