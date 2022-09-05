import { OnInit, Component, ViewChild} from '@angular/core';
import { MatPaginator} from '@angular/material/paginator';
import { MatSort} from '@angular/material/sort';
import { MatTableDataSource} from '@angular/material/table';
import { SuppliersModel } from 'src/app/models/suppliers.model';
import { CoinsService } from 'src/app/services/coins.service';
import { LoginService } from 'src/app/services/login.service';
import { SuppliersService } from 'src/app/services/suppliers.service';
import { ErrorFieldService } from 'src/app/shared/services/error-field.service';


@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.css']
})
export class SuppliersComponent implements OnInit {

suppliers: any = [];
loading = false
errorMessage = ''
dataCoinCalc: any = {}
headerContains: any = {}

constructor(private _serviceSupplier: SuppliersService, private _errorMessage: ErrorFieldService,
    private _serviceLogin: LoginService, private _coinService : CoinsService) {}

displayedColumns: string[] = ['item', 'document', 'name', 'contact', 'balance', 'actions'];

dataSource!: MatTableDataSource<SuppliersModel>;

@ViewChild(MatTableDataSource) table!:MatTableDataSource<SuppliersModel>
@ViewChild(MatPaginator) paginator!: MatPaginator
@ViewChild(MatSort) sort!: MatSort;

ngOnInit() {
  if (this._serviceLogin.isLoggedIn())
    this.loadSuppliers();
  else
    window.location.href = "/login"
    // this._routes.navigateByUrl("/login")
}

openForm() {
  // this._routes.navigateByUrl("/suppliers/suppliers-forms/0")
  window.location.href = "/suppliers/suppliers-forms/0"
}

loadCoinBaseAndCalc() {
  this._coinService.loadCoinBaseCalc("Purchase").subscribe((resp: any) =>{
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


loadSuppliers() {
    this.loading = true
    this.errorMessage = ''
    this._serviceSupplier.loadSuppliers(0).subscribe( (resp:any) => {
      this.suppliers = resp.data
      this.dataSource = new MatTableDataSource(this.suppliers)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.loadCoinBaseAndCalc()
    },
    (error) => {
        this.loading =false;
        this.generateHeader()
        this.errorMessage = this._errorMessage.messageErrorConection(error.status)
    })
  }

  balance(balance : number) {
    return this.dataCoinCalc.symbol
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  generateHeader() {
    this.headerContains = { 'title1' : "Listado de Proveedores",
        'subTitle1': 'Crear Proveedor', 'title2' : '' , 'subTitle2' : '',
        'title3' : '', 'subTitle3' : '',
        'listForm' : true, 'errorMessage' : this.errorMessage }
  }
}
