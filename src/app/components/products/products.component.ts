import { Component, OnInit, inject } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { ProductsTax } from '../../models/products';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-products',
  standalone: true, 
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'] 
})
export class ProductsComponent implements OnInit {

  op: ProductsTax[] = [];
  private productsService = inject(ProductsService); 
  private toastr = inject(ToastrService);
  myInput = new FormControl('');
  noData: boolean = false;



  ngOnInit(): void {
    this.productsService.getProducts().subscribe(
	    (response) => {
      if (response && response.length > 0) {
        this.op = response;
        this.noData = false;
      } else {
        this.op = [];
        this.noData = true;
      }
    },
    (error) => {
      console.error('Error:', error);
      this.noData = true;  // También muestra el mensaje si ocurre un error
    }
  );
}

  isNumeric(value: string): boolean {
    return /^[0-9]+$/.test(value);
  }

  search() {
    const value: string | null = this.myInput.value;
    const _value: string = value ?? "";

    if (_value.length > 0 && !this.isNumeric(_value)) {
      this.toastr.error('Por favor ingrese solo números', 'Error');
    } else {
      if (_value.length === 0) { 
        this.productsService.getProducts().subscribe(
          (response) => {
          if (response && response.length > 0) {
            this.op = response;
            this.noData = false;
          } else {
            this.op = [];
            this.noData = true;
          }
        },
        (error) => {
          console.error('Error:', error);
          this.noData = true;  
        }
      );
      } else {

        this.productsService.getProductsById(_value).subscribe(
          (response) => {
          if (response && response.length > 0) {
            this.op = response;
            this.noData = false;
          } else {
            this.op = [];
            this.noData = true;
          }
        },
        (error) => {
          console.error('Error:', error);
          this.noData = true;  
        }
      );
      }
    }
  }
}