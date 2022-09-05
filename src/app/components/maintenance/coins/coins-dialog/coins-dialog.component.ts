import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoinsModel } from 'src/app/models/coins.model';
import { CoinsService } from 'src/app/services/coins.service';
import { ErrorFieldService } from 'src/app/shared/services/error-field.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

@Component({
  selector: 'app-coins-dialog',
  templateUrl: './coins-dialog.component.html',
  styleUrls: ['./coins-dialog.component.css']
})
export class CoinsDialogComponent implements OnInit {

  id : number = 0
  formLogin : FormGroup
  updating = false
  errors = []
  errorMessage = ""
  headerContains : any = {}

  constructor(@Inject(MAT_DIALOG_DATA) public data: CoinsModel,
          public dialogRef: MatDialogRef<CoinsDialogComponent>, private _errorMessage: ErrorFieldService,
          private formBuilder: FormBuilder, private _snack : SnackbarService,
          private _serviceCoins : CoinsService ) {
      this.id = data.id
      this.formLogin = this.formBuilder.group ({
          coinName: ['',Validators.maxLength(50)],
          coinSymbol: ['',Validators.maxLength(3)]
      })
      this.formLogin.setValue ({
        coinName : data.name,
        coinSymbol : data.symbol
      })
  }

  formSubmit() {
    this.updating = true
    this.errorMessage = ''
    let userId = 1
    // let userId = getUser() ver que devuelve
    let coinDTO = new CoinsModel(this.id,this.formLogin.value.coinSymbol,
                this.formLogin.value.coinName,userId)
    this._serviceCoins.saveCoin(coinDTO).subscribe((resp:any) => {
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
    this.headerContains = { 'title1' : (this.id == 0 ? 'Crear' : 'Editar')  + " Moneda",
        'subTitle1': '', 'title2' : '' , 'subTitle2' : '',
        'title3' : '', 'subTitle3' : '',
        'listform' : "false", 'errorMessage' : this.errorMessage }
  }


  ngOnInit(): void {
    this.generateHeader()
  }

}
