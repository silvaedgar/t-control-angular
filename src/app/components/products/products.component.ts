import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ProductsModel } from 'src/app/models/products.model';
import { CoinsService } from 'src/app/services/coins.service';
import { LoginService } from 'src/app/services/login.service';
import { ProductsService } from 'src/app/services/products.service';
import { ErrorFieldService } from 'src/app/shared/services/error-field.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

products: any = [];
loading = false
errorMessage = ''
dataCoinCalcSale: any = {}
dataCoinCalcPurchase: any = {}
headerContains: any = {}

constructor(private _product: ProductsService, private _errorMessage: ErrorFieldService,
    private _login: LoginService, private _coin : CoinsService) {}

displayedColumns: string[] = ['item', 'code', 'name', 'group', 'category', 'pventa', 'pcosto', 'actions'];

dataSource!: MatTableDataSource<ProductsModel>;

@ViewChild(MatTableDataSource) table!:MatTableDataSource<ProductsModel>
@ViewChild(MatPaginator) paginator!: MatPaginator
@ViewChild(MatSort) sort!: MatSort;

ngOnInit() {

  if (this._login.isLoggedIn())
      this.loadProducts();
  else
    window.location.href = "/login"
    // this._routes.navigateByUrl("/login")
}

generateHeader() {
  this.headerContains = { 'title1' : "Listado de Productos",
      'subTitle1': 'Crear Producto', 'title2' : '' , 'subTitle2' : '',
      'title3' : '', 'subTitle3' : '',
      'listForm' : true, 'errorMessage' : this.errorMessage }

}

openForm() {
  // this._routes.navigateByUrl("/suppliers/suppliers-forms/0")
  window.location.href = "/products/products-forms/0"
}

loadCoinBaseAndCalc() {
  this._coin.loadCoinBaseCalc("Purchase").subscribe((resp: any) =>{
    if (resp.status == "OK") {
      this.dataCoinCalcPurchase = resp.data;
    }
    else
      this.errorMessage = resp.message

    this._coin.loadCoinBaseCalc("Sale").subscribe((resp: any) => {
      if (resp.status == "OK")
        this.dataCoinCalcSale = resp.data;
      else
        this.errorMessage = resp.message
      this.loading = false
      this.generateHeader()
    }, (error) => {
      this.loading =false;
      this.errorMessage = this._errorMessage.messageErrorConection(error.status)
      this.generateHeader()

    })
  },(error) => {
    this.loading =false;
    this.errorMessage = this._errorMessage.messageErrorConection(error.status)
    this.generateHeader()

  })
}


loadProducts() {
    this.loading = true
    this.errorMessage = ''
    this._product.loadProducts(0).subscribe( (resp:any) => {
      this.products = resp.data
      this.dataSource = new MatTableDataSource(this.products)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.loadCoinBaseAndCalc()
    },
    (error) => {
        this.loading =false;
        this.errorMessage = this._errorMessage.messageErrorConection(error.status)
        this.generateHeader()
    })
  }

  balance(balance : number) {
    return this.dataCoinCalcPurchase.symbol
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
