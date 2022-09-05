export class ClientsModel {

  constructor (id:number, documentType: string, document: string, name: string, 
          address:string, userId:number, countInBs: string) {
    this.id = id;
    this.documentType = documentType;
    this.document = document;
    this.names = name;
    this.address = address;
    this.userId = userId;
    this.countInBs = countInBs; 
  }

    id = 0;
    documentType = '';
    document = '';
    names = '';
    address = '';
    userId = 0;
    countInBs = "N";
}
