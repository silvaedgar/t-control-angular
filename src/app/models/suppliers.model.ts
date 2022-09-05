export class SuppliersModel {
  
  constructor (id: number, documentType: string, document: string, name: string, contact: string, address: string, phone: string, userId: number ) {
      this.id = id;
      this.documentType = documentType
      this.document = document
      this.name = name
      this.contact = contact
      this.address = address
      this.phone = phone
      this.userId = userId
    }

    id = 0
    documentType :string = "";
    document :string = "";
    name :string = "";
    contact :string = "";
    address :string = "";
    phone :string = "";
    userId = 0

}
