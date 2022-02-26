import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { ApiServiceService } from '../service/api-service.service';
import { Observable } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { inject } from '@angular/core/testing';
@Component({
  selector: 'app-dialoge',
  templateUrl: './dialoge.component.html',
  styleUrls: ['./dialoge.component.scss']
})
export class DialogeComponent implements OnInit {
  productForm!: FormGroup;
  actionBtn: string = 'Save';
  constructor(private fb:FormBuilder,
    private api:ApiServiceService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef:MatDialogRef<DialogeComponent>) { }
  ngOnInit(): void {
    this.productForm = this.fb.group({
      ProductDetail:['', Validators.required],
      ProductFirstName: ['', Validators.required],
      ProductLastName: ['',Validators.required],
      ProductAddress:['', Validators.required],
      ProductCatagory:['',Validators.required],
      ProductPrice:['',Validators.required],
      ProductCity:['',Validators.required],
      ProductState:['',Validators.required],
      date:['',Validators.required]

    });
    
      console.log(this.editData);
  if(this.editData){
    this.productForm.controls['ProductFirstName'].setValue(this.editData.ProductFirstName);
    this.productForm.controls['ProductLastName'].setValue(this.editData.ProductLastName);
    this.productForm.controls['ProductDetail'].setValue(this.editData.ProductDetail);
    this.productForm.controls['ProductAddress'].setValue(this.editData.ProductAddress);
    this.productForm.controls['ProductCatagory'].setValue(this.editData.ProductCatagory);
    this.productForm.controls['ProductCity'].setValue(this.editData.ProductCity);
    this.productForm.controls['ProductPrice'].setValue(this.editData.ProductPrice);
    this.productForm.controls['ProductState'].setValue(this.editData.ProductState);
    this.productForm.controls['date'].setValue(this.editData.date);
    this.actionBtn = "Update";
  }
    }
  addProduct(){
    console.log(this.productForm.value);
    if(!this.editData){ 
      if(this.productForm.valid){
        this.api.postproduct(this.productForm.value)
        .subscribe({
        next:(res)=>{
          alert('Procuct is added sucessfully');
          this.productForm.reset();
          this.dialogRef.close("save");
        },
        error:(err)=>{
          alert('Error while add');
        }
      })
      }
    }
    else{
      this.updateProduct();
    }
  }
  updateProduct() {
    this.api.putProduct(this.productForm.value, this.editData.id)
    .subscribe({
      next: (res)=>{ 
        alert('form is updated');
        this.productForm.reset();
        this.dialogRef.close("Updated");
      },
      error:(err)=>{
        alert('form is not submitted!');
      }
    })
  }
}
