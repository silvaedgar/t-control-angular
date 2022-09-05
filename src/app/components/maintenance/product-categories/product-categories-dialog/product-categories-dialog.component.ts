import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductCategoriesModel } from 'src/app/models/product-categories.model';
import { ProductCategoriesService } from 'src/app/services/product-categories.service';
import { ProductGroupsService } from 'src/app/services/product-groups.service';
import { ErrorFieldService } from 'src/app/shared/services/error-field.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

@Component({
  selector: 'app-product-categories-dialog',
  templateUrl: './product-categories-dialog.component.html',
  styleUrls: ['./product-categories-dialog.component.css']
})
export class ProductCategoriesDialogComponent implements OnInit {

  id : number = 0
  formLogin : FormGroup
  updating = false
  productGroups : any = []
  errors : any = []
  errorMessage = ""
  headerContains: any = {}

  constructor(@Inject(MAT_DIALOG_DATA) public data: ProductCategoriesModel,
          public dialogRef: MatDialogRef<ProductCategoriesDialogComponent>,
          private formBuilder: FormBuilder, private _snack : SnackbarService,
          private _serviceProductCategory : ProductCategoriesService, private _errorMessage : ErrorFieldService,
          private _serviceProductGroup : ProductGroupsService) {
      this.id = data.id
      this.formLogin = this.formBuilder.group ({
          description: ['',Validators.required],
          groupId : [0,Validators.min(1)]
      })
      this.formLogin.setValue ({
        description : data.description,
        groupId : data.groupId
      })
  }

  formSubmit() {
    this.updating = true
    // let userId = getUser() ver que devuelve
    let productCategoryDTO = new  ProductCategoriesModel (this.id,this.formLogin.value.description,
            this.formLogin.value.groupId,'', 1)
    this._serviceProductCategory.saveProductCategory(productCategoryDTO).subscribe((resp:any) => {
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
    this.headerContains = { 'title1' : "Listado de Categorias de Productos",
        'subTitle1': 'Crear Categoria', 'title2' : '' , 'subTitle2' : '',
        'title3' : '', 'subTitle3' : '',
        'listForm' : true, 'errorMessage' : this.errorMessage }
  }

  ngOnInit(): void {
    this._serviceProductGroup.loadProductGroups().subscribe((resp:any) => {
      this.productGroups = resp.data
    }, (error) => {
      console.log(error)
      this._snack.showSnackBar("Error de Conexion al Servidor. Verifique " + error.error.message,"Aceptar", 4000,"center","top")
      this.closeModal(false)
    })
  }

}
