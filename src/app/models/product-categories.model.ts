export class ProductCategoriesModel {

  constructor (id:number, description:string, groupId: number, groupDescription: string, userId:number) {
    this.id = id;
    this.description = description;
    this.userId = userId;
    this.groupId = groupId;
    this.groupDescription = groupDescription
  }

  id=0;
  description:string = "";
  userId = 0;
  groupId = 0;
  groupDescription = ''
}
