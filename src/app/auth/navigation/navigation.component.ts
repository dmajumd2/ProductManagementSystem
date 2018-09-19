import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  toggleLinks : boolean = false;

  constructor(private _authService: AuthService) { }

  ngOnInit() {
    this._authService.$authObservable.subscribe((data)=>{
      this.toggleLinks = data;
      console.log(data);
    });
    console.log(this.toggleLinks);
  }

  
  logout(){
    this._authService.logout();
  }
}
