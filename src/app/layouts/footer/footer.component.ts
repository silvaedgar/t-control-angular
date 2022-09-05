import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(private _serviceLogin : LoginService) { }

  ngOnInit(): void {
  }

  closeSession() {
   if (this._serviceLogin.logout())
      window.location.href = "main"
  }

}
