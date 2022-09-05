export class CoinsModel {

  constructor (id:number, symbol: string, name:string, userId:number) {
    this.id = id;
    this.symbol = symbol;
    this.name = name;
    this.userId = userId;
  }

  id=0;
  symbol:string = "";
  userId = 0;
  name: string=""  
}
