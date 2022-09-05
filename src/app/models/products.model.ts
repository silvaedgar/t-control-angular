export class ProductsModel {

  constructor (id: number, code: string, name: string, costPrice:  number, salePrice:  number,
                      categoryId: number, taxId: number,  userId: number ) {
      this.id = id;
      this.code = code
      this.taxId = taxId
      this.name = name
      this.costPrice = costPrice
      this.salePrice = salePrice
      this.categoryId = categoryId
      this.userId = userId
    }

    id = 0
    code :string = "";
    name :string = "";
    costPrice = 0;
    salePrice = 0;
    categoryId = 0;
    taxId = 0;
    userId = 0
}
