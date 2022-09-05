import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PaymentFormsModel } from 'src/app/models/payment-forms.model';
import { PaymentFormsService } from 'src/app/services/payment-forms.service';
import { ErrorFieldService } from 'src/app/shared/services/error-field.service';
import { PaymentFormsDialogComponent } from './payment-forms-dialog/payment-forms-dialog.component';

@Component({
  selector: 'app-payment-forms',
  templateUrl: './payment-forms.component.html',
  styleUrls: ['./payment-forms.component.css']
})
export class PaymentFormsComponent implements OnInit {

  paymentForms: any =[]
  loading = false
  errorMessage = ''
  headerContains : any = {}

  constructor(public modal: MatDialog, private _servicePaymentForms: PaymentFormsService,
      private _errorMessage: ErrorFieldService) {}


  displayedColumns: string[] = ['item', 'paymentForm', 'description', 'actions'];

  dataSource!: MatTableDataSource<PaymentFormsModel>;

  @ViewChild(MatTableDataSource) table!:MatTableDataSource<PaymentFormsModel>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  openDialog(element:any) {
    const configDialog = new MatDialogConfig();
    configDialog.disableClose =true
    configDialog.autoFocus = true
    configDialog.data = {
      id : (element == 0 ? 0 : element.id),
      description : (element == 0 ? '' : element.description),
      paymentForm : (element == 0 ? '' : element.paymentForm),
      userId : (element == 0 ? 0 : 1),
    }

    let respDialog = this.modal.open(PaymentFormsDialogComponent, configDialog);
    respDialog.afterClosed().subscribe ((resp) => {
      if (resp)
        this.loadPaymentForms()
    })

  }

  ngOnInit() {
    this.loadPaymentForms();
  }

  loadPaymentForms() {
    this.loading = true
    this.errorMessage = ''
    this._servicePaymentForms.loadPaymentForms().subscribe( (resp:any) => {
      this.paymentForms = resp.data
      this.dataSource = new MatTableDataSource(this.paymentForms)
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
    this.headerContains = { 'title1' : "Listado de Formas de Pago",
        'subTitle1': 'Crear Forma de Pago', 'title2' : '' , 'subTitle2' : '',
        'title3' : '', 'subTitle3' : '',
        'listForm' : true, 'errorMessage' : this.errorMessage }
  }
}
