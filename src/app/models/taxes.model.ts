export class TaxesModel {
  
  constructor (id:number, percentage: number, description:String, userId:number) {
      this.id = id;
      this.description = description;
      this.percent = percentage
      this.userId = userId;
    }

    id=0;
    description:String = "";
    userId = 0;
    percent = 0.0;
}
