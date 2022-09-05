import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginDTO = {
    username : '',
    email : '',
    password : '',
    usernameOrEmail : ''
  }

  formLogin : FormGroup;
  loading = false;
  isLogin = true;

  constructor(private formBuilder: FormBuilder, private _snack : SnackbarService,
    private _loginService: LoginService) {
      this.formLogin = this.formBuilder.group ({
      email: ['',Validators.required],
      password: ['',Validators.required]
    })
  }

  formSubmit() {
    this.loginDTO.email = this.formLogin.value.email;
    this.loginDTO.password = this.formLogin.value.password;
    this.loginDTO.usernameOrEmail = this.loginDTO.email;

    if (this.loginDTO.email.trim() =='' || this.loginDTO.password.trim() == '') {
      if (this.loginDTO.email.trim() == '') {
        this._snack.showSnackBar('El usuario es Requerido ','Aceptar',4000,'center','top')
      }
      if (this.loginDTO.password.trim() == '') {
        this._snack.showSnackBar('Ingrese el Password','Aceptar',4000,'center','top')
      }
      return
    }
    this.loading = true;
    this._loginService.generateToken(this.loginDTO).subscribe(
      (data:any) =>  {
        console.log("Token Obtenido", data);
        this._loginService.loginUser(data.accessToken);
        this._loginService.getCurrentUser().subscribe(
          (user:any) => {
            this._loginService.setUser(user);
              this._snack.showSnackBar('Hola ' + user.username + ". Haz Ingresado al Modulo T-Control",'Aceptar',4000,'center','top')
              window.location.href = "main"
          },
          (error) => {
            console.log(error)
            this.loading =false;
            this._snack.showSnackBar('Error Verificando datos de usuario. ' + error.message,'Aceptar',4000,'center','top')
          })
      }, (error) => {
        this.loading =false;
        this.isLogin = false
        this._snack.showSnackBar('Datos no aceptados. ' + error.message,'Aceptar',4000,'center','top')
      });
  }

  ngOnInit(): void {
  }

}
