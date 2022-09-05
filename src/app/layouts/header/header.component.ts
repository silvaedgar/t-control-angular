import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private _loginService: LoginService) { }

  isClient = false;
  isAdmin = false;

  ngOnInit(): void {
    this.isClient = this._loginService.getUserRole("Client");
    this.isAdmin = this._loginService.getUserRole("Admin");
  }

}
