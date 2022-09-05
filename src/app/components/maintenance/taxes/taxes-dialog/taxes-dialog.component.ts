import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaxesModel } from 'src/app/models/taxes.model';
import { TaxesService } from 'src/app/services/taxes.service';
import { ErrorFieldService } from 'src/app/shared/services/error-field.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

@Component({
  selector: 'app-taxes-dialog',
  templateUrl: './taxes-dialog.component.html',
  styleUrls: ['./taxes-dialog.component.css']
})
export class TaxesDialogComponent implements OnInit {

  id : number = 0
  formLogin : FormGroup
  updating = false
  errors = []
  errorMessage = ""
  headerContains : any={}

  constructor(@Inject(MAT_DIALOG_DATA) public data: TaxesModel,
          public dialogRef: MatDialogRef<TaxesDialogComponent>,
          private formBuilder: FormBuilder, private _snack : SnackbarService,
          private _tax : TaxesService, private _errorMessage: ErrorFieldService) {
      this.id = data.id
      this.formLogin = this.formBuilder.group ({
          description: ['',Validators.maxLength(20)],
          percent : [0]
      })
      this.formLogin.setValue ({
        description : data.description,
        percent : data.percent
      })
  }

  formSubmit() {
    this.updating = true
    let userId = 1
    // let userId = getUser() ver que devuelve
    let taxDTO = new  TaxesModel (this.id,this.formLogin.value.percent,
            this.formLogin.value.description,userId);
    this._tax.saveTax(taxDTO).subscribe((resp:any) => {
        this.updating = false
        this._snack.showSnackBar(resp.message,"Aceptar", 4000,"center","top")
        this.closeModal(true)
    }, (error) => {
      if (error.status != 400)
        this.errorMessage = this._errorMessage.messageErrorConection(error.status)
      else
        this.errors = error.error.errors
    })
  }

  closeModal(updated : boolean) {
    this.dialogRef.close(updated);
  }

  messageError(field: string) {
    return this._errorMessage.findFieldIfError(field,this.errors);
  }

  generateHeader() {
    this.headerContains = { 'title1' : (this.id == 0 ? 'Crear' : 'Editar')  + " Impuesto",
        'subTitle1': '', 'title2' : '' , 'subTitle2' : '',
        'title3' : '', 'subTitle3' : '',
        'listForm' : false, 'errorMessage' : this.errorMessage }
  }

  ngOnInit(): void {
    this.generateHeader()
  }

}
