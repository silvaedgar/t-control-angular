import { OnInit, Component, ViewChild} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ProductGroupsModel } from 'src/app/models/product-groups.model';
import { LoginService } from 'src/app/services/login.service';
import { ProductGroupsService } from 'src/app/services/product-groups.service';
import { ErrorFieldService } from 'src/app/shared/services/error-field.service';
import { ProductGroupsDialogComponent } from './product-groups-dialog/product-groups-dialog.component';

@Component({
  selector: 'app-product-groups',
  templateUrl: './product-groups.component.html',
  styleUrls: ['./product-groups.component.css']
})
export class ProductGroupsComponent implements OnInit {

  productGroups: any =[]
  loading = false
  errorMessage = ''
  headerContains: any = {}

  constructor(public modal: MatDialog, private _productGroup: ProductGroupsService,
      private _errorMessage: ErrorFieldService, private _login: LoginService) {}


  displayedColumns: string[] = ['item', 'description', 'actions'];

  dataSource!: MatTableDataSource<ProductGroupsModel>;

  @ViewChild(MatTableDataSource) table!:MatTableDataSource<ProductGroupsModel>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  openDialog(element:any) {
    const configDialog = new MatDialogConfig();
    configDialog.disableClose =true
    configDialog.autoFocus = true
    configDialog.data = {
      id : (element == 0 ? 0 : element.id),
      description : (element == 0 ? '' : element.description),
      userId : (element == 0 ? 0 : element.userId)
    }

    let respDialog = this.modal.open(ProductGroupsDialogComponent, configDialog);
    respDialog.afterClosed().subscribe ((resp) => {
      if (resp)
        this.loadProductGroups()
    })

  }

  ngOnInit() {
    if (this._login.isLoggedIn())
      this.loadProductGroups();
    else
      window.location.href = "login"
  }

  loadProductGroups() {
    this.loading = true
    this.errorMessage = ''
    this._productGroup.loadProductGroups().subscribe( (resp:any) => {
      this.productGroups = resp.data
      this.dataSource = new MatTableDataSource(this.productGroups)
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
    this.headerContains = { 'title1' : "Listado de Grupos de Productos",
        'subTitle1': 'Crear Grupo', 'title2' : '' , 'subTitle2' : '',
        'title3' : '', 'subTitle3' : '',
        'listForm' : true, 'errorMessage' : this.errorMessage }
  }

}

