import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CoinsModel } from 'src/app/models/coins.model';
import { CoinsService } from 'src/app/services/coins.service';
import { LoginService } from 'src/app/services/login.service';
import { ErrorFieldService } from 'src/app/shared/services/error-field.service';
import { CoinsDialogComponent } from './coins-dialog/coins-dialog.component';

@Component({
  selector: 'app-coins',
  templateUrl: './coins.component.html',
  styleUrls: ['./coins.component.css']
})
export class CoinsComponent implements OnInit {

  coins: any =[]
  loading = false
  errorMessage = ''
  headerContains: any = {}

  constructor(public modal: MatDialog, private _serviceCoins: CoinsService,
      private _errorMessage: ErrorFieldService, private _serviceLogin : LoginService) {}

  displayedColumns: string[] = ['item', 'name', 'symbol', 'actions'];

  dataSource!: MatTableDataSource<CoinsModel>;

  @ViewChild(MatTableDataSource) table!:MatTableDataSource<CoinsModel>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  openDialog(element:any) {
    const configDialog = new MatDialogConfig();
    configDialog.disableClose =true
    configDialog.autoFocus = true
    configDialog.data = {
      id : (element == 0 ? 0 : element.id),
      name : (element == 0 ? '' : element.name),
      symbol : (element == 0 ? '' : element.symbol),
      userId : (element == 0 ? 0 : 1),
    }

    let respDialog = this.modal.open(CoinsDialogComponent, configDialog);
    respDialog.afterClosed().subscribe ((resp) => {
      if (resp)
        this.loadCoins()
    })

  }

  ngOnInit() {
    if (this._serviceLogin.isLoggedIn())
      this.loadCoins();
    else
      window.location.href = "login"
  }

  loadCoins() {
    this.loading = true
    this.errorMessage = ''
    this._serviceCoins.loadCoins().subscribe( (resp:any) => {
      this.coins = resp.data
      this.dataSource = new MatTableDataSource(this.coins)
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
    this.headerContains = { 'title1' : "Listado de Monedas",
        'subTitle1': 'Crear Monedas', 'title2' : '' , 'subTitle2' : '',
        'title3' : '', 'subTitle3' : '',
        'listForm' : true, 'errorMessage' : this.errorMessage }
  }
}
