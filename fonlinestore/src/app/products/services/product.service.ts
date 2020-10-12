import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
private productUrl: string

  // @ts-ignore
  constructor(private http: HttpClient) {
  this.productUrl = 'http://localhost:8080/product';
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
}
