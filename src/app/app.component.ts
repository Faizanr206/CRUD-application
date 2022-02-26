import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogeComponent } from './dialoge/dialoge.component';
import { ApiServiceService } from './service/api-service.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { dateInputsHaveChanged } from '@angular/material/datepicker/datepicker-input-base';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  displayedColumns: string[] = ['date','ProductFirstName', 'ProductLastName', 'ProductDetail', 'ProductAddress','ProductCity','ProductState', 'ProductCatagory', 'ProductPrice', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog, private api: ApiServiceService){}
  ngOnInit(): void {
    this.getAllProducts();
  }
  title = 'CRUD-application';
  openDialog() {
    this.dialog.open(DialogeComponent, {
      
    }).afterClosed().subscribe(
      val=> {
        if(val == 'Save'){
            this.getAllProducts();
        }
      }
    );
  }
  getAllProducts(){
    this.api.getproduct().subscribe({
      next:(res)=>{
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error:(err)=>{console.log(err)}
    })
  }
  editProduct(row: any){
    this.dialog.open(DialogeComponent,{
      width: '40%',
      data: row
    }).afterClosed().subscribe(val=>{
      if(val == 'Update'){
        this.getAllProducts()
      }
    })
  }
  deleteProduct(id: number){
    this.api.deleteProduct(id).subscribe({
      next:(del)=>{
        alert('product is deleted!');

      },
      error:()=>{
        alert('There is error on Deleteing the Product!');
      }
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
