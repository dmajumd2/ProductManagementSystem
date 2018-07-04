import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  constructor(private _activatedRoute : ActivatedRoute, private _route: Router) { }

  ngOnInit() {
    this._activatedRoute.params.subscribe((data)=>{
        console.log(data);
    });
  }

  backToList(){
    this._route.navigate(['/products']);
  }

}
