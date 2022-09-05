import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private _serviceLogin:LoginService) { }

  isLogged = false

  ngOnInit(): void {
    this.isLogged = this._serviceLogin.isLoggedIn()
  }

}
