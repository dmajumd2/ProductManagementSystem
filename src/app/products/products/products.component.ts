import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  providers : [ProductsService]
})
export class ProductsComponent implements OnInit {

  pageTitle: string = "Products list";
  products : any = [];
  filterBy : string;

  showHideImg : boolean = true;

  constructor(private _productService : ProductsService) { }

  toggleImage(){
    this.showHideImg = !this.showHideImg;
  }

  ratingFnParent(data: string){
    console.log(data);
  }

  ngOnInit() {
    this._productService.getProducts().subscribe((data: any)=>{
      //console.log(data.data);
       this.products = data.data;
       console.log("In product list");
       console.log(this.products);
    });
  }

}
