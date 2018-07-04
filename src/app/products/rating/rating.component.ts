import { Component, OnInit, Input, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {

   @Input() rating: number;
   @Output() ratingToParent: EventEmitter<string> = new EventEmitter();
   rating_arr : any = [];

  constructor() { }

  ngOnInit() {
    this.rating_arr =  Array(Math.round(this.rating)).fill(Math.round(this.rating));
  }

  sendRatingToParent(){
    this.ratingToParent.emit("Rating value = " +this.rating);
  }

}
