import { OnInit, Component, ViewChild} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator} from '@angular/material/paginator';
import { MatSort} from '@angular/material/sort';
import { MatTableDataSource} from '@angular/material/table';
import { ProductCategoriesModel } from 'src/app/models/product-categories.model';
import { LoginService } from 'src/app/services/login.service';
import { ProductCategoriesService } from 'src/app/services/product-categories.service';
import { ErrorFieldService } from 'src/app/shared/services/error-field.service';
import { ProductCategoriesDialogComponent } from './product-categories-dialog/product-categories-dialog.component';

@Component({
  selector: 'app-product-categories',
  templateUrl: './product-categories.component.html',
  styleUrls: ['./product-categories.component.css']
})
export class ProductCategoriesComponent implements OnInit {

  productCategories: any =[]
  loading = false
  errorMessage = ""
  headerContains:any = {}

  constructor(public modal: MatDialog, private _productCategories: ProductCategoriesService,
      private _errorMessage: ErrorFieldService, private _login : LoginService) {}


  displayedColumns: string[] = ['item', 'description', 'group','actions'];

  dataSource!: MatTableDataSource<ProductCategoriesModel>;

  @ViewChild(MatTableDataSource) table!:MatTableDataSource<ProductCategoriesModel>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  openDialog(element:any) {
    const configDialog = new MatDialogConfig();
    configDialog.disableClose =true
    configDialog.autoFocus = true
    configDialog.data = {
      id : (element == 0 ? 0 : element.id),
      description : (element == 0 ? '' : element.description),
      userId : (element == 0 ? 0 : 1),
      groupId : (element == 0 ? 0 : element.productGroup.id),
    }

    let respDialog = this.modal.open(ProductCategoriesDialogComponent, configDialog);
    respDialog.afterClosed().subscribe ((resp) => {
      if (resp)
        this.loadProductCategories()
    })

  }

  ngOnInit() {
    this._login.isLoggedIn() ? this.loadProductCategories() : window.location.href = "login";
  }

  loadProductCategories() {
    this.loading = true
    this.errorMessage = ""
    this._productCategories.loadProductCategories().subscribe( (resp:any) => {
      this.productCategories = resp.data
      this.dataSource = new MatTableDataSource(this.productCategories)
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
    this.headerContains = { 'title1' : "Listado de Categorias de Productos",
        'subTitle1': 'Crear Categoria', 'title2' : '' , 'subTitle2' : '',
        'title3' : '', 'subTitle3' : '',
        'listForm' : true, 'errorMessage' : this.errorMessage }
  }

}
