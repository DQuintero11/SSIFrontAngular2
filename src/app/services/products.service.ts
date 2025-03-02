
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductsTax } from '../models/products';

@Injectable({
  providedIn: 'root' 
})
export class ProductsService {
  private apiUrl = 'https://localhost:7093/api/Products';
  private http = inject(HttpClient); 

  constructor() {}

  getProducts(): Observable<ProductsTax[]> {
    this.apiUrl = `https://localhost:7093/api/Products`;
    return this.http.get<ProductsTax[]>(this.apiUrl);
  }

  getProductsById(id: any): Observable<ProductsTax[]> {
    this.apiUrl = `https://localhost:7093/api/Products/${id}`;
    return this.http.get<ProductsTax[]>(this.apiUrl);
  }
}