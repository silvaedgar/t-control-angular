import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SuppliersModel } from 'src/app/models/suppliers.model';
import { SuppliersService } from 'src/app/services/suppliers.service';
import { ErrorFieldService } from 'src/app/shared/services/error-field.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

@Component({
  selector: 'app-suppliers-form',
  templateUrl: './suppliers-form.component.html',
  styleUrls: ['./suppliers-form.component.css']
})
export class SuppliersFormComponent implements OnInit {

  formLogin: FormGroup ;
  id = 0
  updating = false
  message = ''
  errorMessage = ''
  errors = []
  headerContains: any= {}

  constructor(private route:ActivatedRoute, private _supplier: SuppliersService,
      private formBuilder: FormBuilder,
      private _snack: SnackbarService, private _errorMessage : ErrorFieldService) {
        this.id = 0
        this.formLogin = this.formBuilder.group({
          documentType : '',
          document : ['',Validators.maxLength(10)],
          name : ['',Validators.maxLength(60)],
          contact : '',
          address : '',
          phone : ''
        })
      }


  ngOnInit(): void {
    this.id = this.route.snapshot.params.id
    if (this.id != 0) {
      this.updating = true
      this.message = "Leyendo Datos ... "
      this.errorMessage = '';
      this._supplier.loadSuppliers(this.id).subscribe((resp:any) => {
        this.formLogin.setValue({
          documentType : resp.data.documentType,
          document : resp.data.document,
          name : resp.data.name,
          contact : resp.data.contact,
          address : resp.data.address,
          phone : resp.data.phone
        })
        this.updating = false
        this.generateHeader()
      }, (error) => {
        this.updating = false
        if (error.status != 400)
          this.errorMessage = this._errorMessage.messageErrorConection(error.status)
        else
          this.errors = error.error.errors
        this.generateHeader()
      })
    }
    else
      this.generateHeader()
  }

  formSubmit() {
    this.updating = true
    this.errorMessage = ""
    this.message = "Grabando  Datos ... "
    let userId = 1
    // let userId = getUser() ver que devuelve
    let supplierDTO = new SuppliersModel(this.id,this.formLogin.value.documentType,this.formLogin.value.document,
                this.formLogin.value.name,this.formLogin.value.contact,this.formLogin.value.address,
                this.formLogin.value.phone,userId)
    this._supplier.saveSupplier(supplierDTO).subscribe((resp:any) => {
        this.updating = false
        this._snack.showSnackBar(resp.message,"Aceptar", 4000,"center","top")
        this.closeForm()
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

  closeForm() {
      window.location.href = "/suppliers"
      // this.routes.navigateByUrl ("/suppliers")

  }

  generateHeader() {
    this.headerContains = { 'title1' : (this.id == 0 ? 'Crear' : 'Editar')  + " Proveedor",
        'subTitle1': '', 'title2' : '' , 'subTitle2' : '',
        'title3' : '', 'subTitle3' : '',
        'listform' : "false", 'errorMessage' : this.errorMessage }
  }
}
