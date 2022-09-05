import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ClientsModel } from 'src/app/models/clients.model';
import { ClientsService } from 'src/app/services/clients.service';
import { CoinsService } from 'src/app/services/coins.service';
import { LoginService } from 'src/app/services/login.service';
import { ErrorFieldService } from 'src/app/shared/services/error-field.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

clients: any = [];
loading = false
errorMessage = ''
dataCoinCalc: any = {}
headerContains : any = {}
stringCoin = ''

constructor(private _clients: ClientsService, private _errorMessage: ErrorFieldService,
    private _login: LoginService, private _coin : CoinsService) {}

displayedColumns: string[] = ['item', 'document', 'names', 'balance', 'actions'];
dataSource!: MatTableDataSource<ClientsModel>;

@ViewChild(MatTableDataSource) table!:MatTableDataSource<ClientsModel>
@ViewChild(MatPaginator) paginator!: MatPaginator
@ViewChild(MatSort) sort!: MatSort;

ngOnInit() {
  if (this._login.isLoggedIn())
    this.loadClients();
  else
    window.location.href = "/login"
    // this._routes.navigateByUrl("/login")
}

loadClients() {
    this.loading = true
    this.errorMessage = ""
    this._clients.loadClients(0).subscribe( (resp:any) => {
      this.clients = resp.data
      this.dataSource = new MatTableDataSource(this.clients)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.loading = false
      this.loadDataCoin()
    },
    (error) => {
        this.errorMessage = this._errorMessage.messageErrorConection(error.status)
        this.loading =false;
        this.generateHeader()
    })
}

loadDataCoin() {
    this._coin.generateDataCoin("Sale").subscribe((resp: any) =>{
      if (resp.status == "OK")
        this.dataCoinCalc = resp.data;
      else
        this.errorMessage = resp.message
      this.loading = false
      this.generateHeader()
    },(error) => {
      this.loading =false;
      this.errorMessage = this._errorMessage.messageErrorConection(error.status)
      this.generateHeader()
    })
}

openForm() {
  // this._routes.navigateByUrl("/suppliers/suppliers-forms/0")
  window.location.href = "/clients/clients-forms/0"
}

strCoins(row : any) {
  this.stringCoin = this.dataCoinCalc.baseCoin.symbol
  if (row.countInBs == 'S')
    return this.stringCoin

  this.stringCoin = " " + this.dataCoinCalc.calcCoin.symbol
  if (this.dataCoinCalc.calcCoin.id != this.dataCoinCalc.baseCoin.id ) {
    let mountConvert = row.balance * this.dataCoinCalc.rate[0].sale_price
    this.stringCoin += " -- " + mountConvert.toFixed(2)  + this.dataCoinCalc.baseCoin.symbol
  }
  return this.stringCoin
}

applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  generateHeader() {
    this.headerContains = { 'title1' : "Listado de Clientes",
        'subTitle1': 'Crear Cliente', 'title2' : '' , 'subTitle2' : '',
        'title3' : '', 'subTitle3' : '',
        'listForm' : true, 'errorMessage' : this.errorMessage }
  }

}
