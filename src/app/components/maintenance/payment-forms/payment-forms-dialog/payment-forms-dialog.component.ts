import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PaymentFormsModel } from 'src/app/models/payment-forms.model';
import { PaymentFormsService } from 'src/app/services/payment-forms.service';
import { ErrorFieldService } from 'src/app/shared/services/error-field.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

@Component({
  selector: 'app-payment-forms-dialog',
  templateUrl: './payment-forms-dialog.component.html',
  styleUrls: ['./payment-forms-dialog.component.css']
})
export class PaymentFormsDialogComponent implements OnInit {

  id : number = 0
  formLogin : FormGroup
  updating = false
  errors : any = []
  errorMessage = ""
  headerContains : any = {}

  constructor(@Inject(MAT_DIALOG_DATA) public data: PaymentFormsModel,
          public dialogRef: MatDialogRef<PaymentFormsDialogComponent>,
          private formBuilder: FormBuilder, private _snack : SnackbarService,
          private _servicePaymentForm : PaymentFormsService, private _errorMessage : ErrorFieldService ) {
      this.id = data.id
      this.formLogin = this.formBuilder.group ({
          description: ['',Validators.required],
          paymentForm: ['',Validators.minLength(3)],
      })
      this.formLogin.setValue ({
        description : data.description,
        paymentForm : data.paymentForm
      })
  }

  formSubmit() {
    this.updating = true
    this.errorMessage = ""
    // let userId = getUser() ver que devuelve
    let paymentFormDTO = new PaymentFormsModel(this.id,this.formLogin.value.paymentForm,this.formLogin.value.description,1)
    this._servicePaymentForm.savePaymentForm(paymentFormDTO).subscribe((resp:any) => {
        this.updating = false
        this._snack.showSnackBar(resp.message,"Aceptar", 4000,"center","top")
        this.closeModal(true)
    }, (error) => {
      this.updating = false
      if (error.status != 400)
        this.errorMessage = this._errorMessage.messageErrorConection(error.status)
      else
        this.errors = error.error.errors
    })
  }

  messageError(field: string) {
      return this._errorMessage.findFieldIfError(field,this.errors);
  }

  closeModal(updated : boolean) {
    this.dialogRef.close(updated);
  }

  generateHeader() {
    this.headerContains = { 'title1' : (this.id == 0 ? 'Crear' : 'Editar')  + " Forma de Pago",
        'subTitle1': '', 'title2' : '' , 'subTitle2' : '',
        'title3' : '', 'subTitle3' : '',
        'listform' : "false", 'errorMessage' : this.errorMessage }
  }

  ngOnInit(): void {
    this.generateHeader()
  }

}
