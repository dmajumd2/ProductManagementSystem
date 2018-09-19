import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private _http : HttpClient, private _authService: AuthService) { }

  getProducts(){
    var token =  this._authService.checkUserStatus();
    return this._http.get('http://localhost:3000/getproducts', {
      headers: new HttpHeaders().set('authtoken', token)
    });
  }

  addProducts(productDetails: any){
    this._http.post('http://localhost:3000/addproducts', productDetails).subscribe((data: any)=>{
       console.log(data);
      });
  }
}
