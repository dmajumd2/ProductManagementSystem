import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  products : any = [];
  productDetails: any; 
  productCode: any;

  constructor(private _activatedRoute : ActivatedRoute,
               private _route: Router,
              private _productService: ProductsService) { }

  ngOnInit() {

        ///Grabing URL Paramater as product ID
        this._activatedRoute.params.subscribe((data)=>{
            this.productCode = data;
           
        });

        
       this._productService.getProducts().subscribe((data: any)=>{
          this.products = data.data;
          //console.log(this.products);
          for(var i = 0; i < this.products.length; i++){
            if(this.products[i].productCode == this.productCode.pCode){
                 //console.log("Inside get product details");
                 this.productDetails = this.products[i];
                 console.log(this.productDetails);
                
            }
        }

        
      });

    //console.log(this.productCode.pCode);
        
      
        
        //console.log(this.productDetails);
  }

  backToList(){
    this._route.navigate(['/products']);
  }

}
