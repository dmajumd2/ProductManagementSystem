import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  regform : any = {};

  constructor(private _route: Router, private _authService : AuthService) { }

  signUp(){
    //console.log(this.regform);
    this._authService.registration(this.regform);
    //this._route.navigate(['/login']);
  }

  ngOnInit() {
  }

}
