import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Order} from '../model/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private orderUrl: string;

  constructor(private http: HttpClient) {
    this.orderUrl = 'http://localhost:8080/';
  }

  public findAll(): Observable<Order[]> {
    return this.http.get<Order[]>(this.orderUrl);
  }
  // @PostMapping("/orders/{username}/{id}")
  // tslint:disable-next-line:typedef
  // public save(order: Order, username: string, id: number) {
  //   return this.http.post<Order>(`${this.orderUrl}/${username}/${id}`, order);
  // }

  public saveBegin(order: Order): Observable<Order>{
    console.log(order.username);
    return this.http.put<Order>('', order);
  }
  // tslint:disable-next-line:typedef
  public update(order: Order) {
    return this.http.put<Order>(this.orderUrl, order);
  }

  public getById(id: number): Observable<any> {
    return this.http.get(`${this.orderUrl}/${id}`);
  }

  // tslint:disable-next-line:typedef
  public delete(id: number) {
    return this.http.delete(`${this.orderUrl}/${id}`);
  }
}
