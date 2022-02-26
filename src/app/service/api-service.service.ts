import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseURL } from '../Share/baseurl';
import { Observable } from 'rxjs';
@Injectable ({
  providedIn: 'root'
})
export class ApiServiceService {

  constructor(private http: HttpClient) { }
  postproduct(data: any):Observable<any>{
    return this.http.post<any>(baseURL +'productList/', data );
  }
  getproduct():Observable<any>{
    return this.http.get<any>(baseURL +'productList/');
  }
  putProduct(data: any, id: number):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.patch<any>(baseURL + 'productList/'+id , data);
  }
  deleteProduct(id: number):Observable<any>{
    return this.http.delete<any>(baseURL + 'productList/'+id);
  }
}
