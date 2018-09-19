import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

 

  loginform : any = {};

  constructor(private _router: Router, private _authService : AuthService) { }

  login(){
    console.log(this.loginform);
    this._authService.login(this.loginform);
    //this._router.navigate(['/home']);
  }

  ngOnInit() {
  }

}
