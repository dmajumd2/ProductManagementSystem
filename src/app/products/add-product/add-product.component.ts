import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  user: any = {};
  userForm : FormGroup;
  productform: any = {} ;

  constructor(private _fb : FormBuilder, private _productService : ProductsService ) { }

  ngOnInit() {
    this.userForm = this._fb.group({
        name : ['', Validators.required],
        code : ['', Validators.required],
        description : ['', Validators.required],
        availability : ['', Validators.required],
        price : ['', Validators.required],
        starRating : ['', Validators.required]
    });

  }

  addProduct(productform){
    console.log( this.productform );
    this._productService.addProducts(this.productform);
    alert('Product saved');
  }

}
