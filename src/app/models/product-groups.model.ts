export class ProductGroupsModel {

  constructor (id:number, description:String,userId:number) {
    this.id = id;
    this.description = description;
    this.userId = userId;
  }

  id=0;
  description:String = "";
  userId = 0;
}
