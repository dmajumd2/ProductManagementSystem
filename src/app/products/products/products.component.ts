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

  ngOnInit() {
    this.products = this._productService.getProducts();
  }

}
