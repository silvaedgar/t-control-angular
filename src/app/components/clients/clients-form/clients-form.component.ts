import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientsModel } from 'src/app/models/clients.model';
import { ClientsService } from 'src/app/services/clients.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

@Component({
  selector: 'app-clients-form',
  templateUrl: './clients-form.component.html',
  styleUrls: ['./clients-form.component.css']
})
export class ClientsFormComponent implements OnInit {

  updating = false;
  id = 0;
  countInBs = "N"
  message = "Cargando Datos ..."
  errorMessage = ''
  headerContains: any = {}

  formData = this.formBuilder.group ({
      documentType : '',
      document : new FormControl('',[Validators.maxLength(10), Validators.minLength(5)]),
      names : new FormControl('',[Validators.minLength(5),Validators.maxLength(50)]),
      address : ''
  })


  constructor(private _router: ActivatedRoute, private _routes: Router, private formBuilder: FormBuilder,
      private _client: ClientsService, private _snack : SnackbarService ) {}

  formSubmit() {
    this.updating = true;
    this.message = "Grabando ..."
    let userId = 1
    let client = new ClientsModel(this.id, this.formData.value.documentType, this.formData.value.document,
      this.formData.value.names,  this.formData.value.address, userId, this.countInBs)
    this._client.saveClient(client).subscribe((resp:any) => {
        console.log("RESP GRABAR",resp);
        this.updating = false
        this._snack.showSnackBar(resp.message,"Aceptar", 4000,"center","top")
        this.formClose();
    }, (error) => {
      this.updating = false
      this._snack.showSnackBar(error.error.message,"Aceptar", 4000,"center","top")
    })
  }

  formClose() {
    this._routes.navigateByUrl("/clients")
  }

  ngOnInit(): void {
    this.id = this._router.snapshot.params.id;
    if (this.id != 0) {
      this.updating = true
      this._client.loadClients(this.id).subscribe((resp:any) => {
        this.formData.setValue({
          documentType : resp.data.documentType,
          document : resp.data.document,
          names : resp.data.names,
          address : resp.data.address
        })
        this.countInBs = resp.data.countInBs
        this.updating = false
        this.generateHeader()
      }, (error) => {
        this.updating = false
        this._snack.showSnackBar(error.error.message,"Aceptar", 4000,"center","top")
        this.generateHeader()
      })
    }
    else
        this.generateHeader()
  }

  generateHeader() {
    this.headerContains = { 'title1' : (this.id == 0 ? 'Crear' : 'Editar')  + " Cliente",
        'subTitle1': '', 'title2' : '' , 'subTitle2' : '',
        'title3' : '', 'subTitle3' : '',
        'listform' : "false", 'errorMessage' : this.errorMessage }
  }

}
