import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TaxesModel } from 'src/app/models/taxes.model';
import { LoginService } from 'src/app/services/login.service';
import { TaxesService } from 'src/app/services/taxes.service';
import { ErrorFieldService } from 'src/app/shared/services/error-field.service';
import { TaxesDialogComponent } from './taxes-dialog/taxes-dialog.component';

@Component({
  selector: 'app-taxes',
  templateUrl: './taxes.component.html',
  styleUrls: ['./taxes.component.css']
})
export class TaxesComponent implements OnInit {

  taxes: any =[]
  loading = false
  errorMessage = ''
  headerContains: any = {}

  constructor(public modal: MatDialog, private _taxes: TaxesService,
      private _errorMessage: ErrorFieldService,
      private _login: LoginService) {}


  displayedColumns: string[] = ['item', 'percentage', 'description', 'actions'];

  dataSource!: MatTableDataSource<TaxesModel>;

  @ViewChild(MatTableDataSource) table!:MatTableDataSource<TaxesModel>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  openDialog(element:any) {
    const configDialog = new MatDialogConfig();
    configDialog.disableClose =true
    configDialog.autoFocus = true
    configDialog.data = {
      id : (element == 0 ? 0 : element.id),
      description : (element == 0 ? '' : element.description),
      percent : (element == 0 ? '' : element.percent),
      userId : (element == 0 ? 0 : 1),
    }

    let respDialog = this.modal.open(TaxesDialogComponent, configDialog);
    respDialog.afterClosed().subscribe ((resp) => {
      if (resp)
        this.loadTaxes()
    })

  }

  ngOnInit() {
    this._login.isLoggedIn() ? this.loadTaxes() : window.location.href = "login";
    this.generateHeader()
  }

  loadTaxes() {
    this.loading = true
    this.errorMessage = ''
    this._taxes.loadTaxes().subscribe( (resp:any) => {
      this.taxes = resp.data
      this.dataSource = new MatTableDataSource(this.taxes)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.loading = false
      this.generateHeader()
    },
    (error) => {
      this.loading =false;
      this.errorMessage = this._errorMessage.messageErrorConection(error.status)
      this.generateHeader()
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  generateHeader() {
    this.headerContains = { 'title1' : "Listado de Impuestos",
        'subTitle1': 'Crear Impuesto', 'title2' : '' , 'subTitle2' : '',
        'title3' : '', 'subTitle3' : '',
        'listForm' : true, 'errorMessage' : this.errorMessage }
  }

}
