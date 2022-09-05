import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductGroupsModel } from 'src/app/models/product-groups.model';
import { ProductGroupsService } from 'src/app/services/product-groups.service';
import { ErrorFieldService } from 'src/app/shared/services/error-field.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';


@Component({
  selector: 'app-product-groups-dialog',
  templateUrl: './product-groups-dialog.component.html',
  styleUrls: ['./product-groups-dialog.component.css']
})
export class ProductGroupsDialogComponent implements OnInit {

  id : number = 0
  formLogin : FormGroup
  updating = false
  errors : any = []
  errorMessage = ""
  headerContains: any= {}

  constructor(@Inject(MAT_DIALOG_DATA) public data: ProductGroupsModel, public dialogRef: MatDialogRef<ProductGroupsDialogComponent>,
          private formBuilder: FormBuilder, private _snack : SnackbarService,
          private _errorMessage : ErrorFieldService,
          private _serviceProductGroup : ProductGroupsService) {
      this.id = data.id
      this.formLogin = this.formBuilder.group ({
          description: ['',Validators.minLength(3)],
      })
      this.formLogin.setValue ({
        description : data.description,
      })
  }

  formSubmit() {
    this.updating = true
    // let userId = getUser() ver que devuelve
    let productGroupDTO = new  ProductGroupsModel (this.id,this.formLogin.value.description,
            1)
    console.log("DTO: ", productGroupDTO, " ID: ", this.id)
    this._serviceProductGroup.saveProductGroups(productGroupDTO).subscribe((resp:any) => {
        console.log("RESP ",resp)
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
    this.headerContains = { 'title1' : (this.id == 0 ? 'Crear' : 'Editar')  + " Grupo ",
        'subTitle1': '', 'title2' : '' , 'subTitle2' : '',
        'title3' : '', 'subTitle3' : '',
        'listForm' : false, 'errorMessage' : this.errorMessage }
  }

  ngOnInit(): void {
    this.generateHeader()
  }

}
