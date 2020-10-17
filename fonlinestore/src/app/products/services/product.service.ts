import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../model/product';
import {HttpClient, HttpEvent, HttpRequest} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
private productUrl: string;

private photoUrl: string;


  constructor(private http: HttpClient) {
  this.productUrl = 'http://localhost:8080/product';
  this.photoUrl = 'http://localhost:8080/photop';
  }

  public findAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productUrl);
  }
  // tslint:disable-next-line:typedef
  public save(product: Product) {
    return this.http.post<Product>(this.productUrl, product);
  }
  // tslint:disable-next-line:typedef
  public update(product: Product) {
    return this.http.put<Product>(this.productUrl, product);
  }
  public getById(id: number): Observable<any> {
    return this.http.get(`${this.productUrl}/${id}`);
  }
  // tslint:disable-next-line:typedef
  public delete(id: number) {
    return this.http.delete(`${this.productUrl}/${id}`);
  }
public upload(photo: File): Observable<HttpEvent<any>> {
  const formData: FormData = new FormData();
  formData.append('photo', photo);
  const req = new HttpRequest('POST', this.photoUrl, formData, {
    reportProgress: true,
    responseType: 'json'
  });
  return this.http.request(req);
}

  getPhotos(id: number): Observable<any> {
    return this.http.get(`http://localhost:8080/photoP/${id}`);
  }

}
