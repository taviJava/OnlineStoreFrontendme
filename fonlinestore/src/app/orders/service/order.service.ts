import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Order} from '../model/order';
import {Orderline} from '../model/orderline';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private orderUrl: string;

  constructor(private http: HttpClient) {
    this.orderUrl = 'http://localhost:8080/orders';
  }

  public findAll(): Observable<Order[]> {
    return this.http.get<Order[]>(this.orderUrl);
  }
  public saveBegin(order: Order): Observable<Order>{
    return this.http.post<Order>('http://localhost:8080/orders', order);
  }
  // tslint:disable-next-line:typedef
  public updateQuantity(quantity: number, id: number, orderline: Orderline){
  return this.http.put<Orderline>(`${this.orderUrl}/${quantity}/${id}`, orderline);
  }
  // tslint:disable-next-line:typedef
  public save(username: string, id: number, orderline: Orderline){
    return this.http.post<Orderline>(`${this.orderUrl}/${username}/${id}`, orderline);
  }
  // tslint:disable-next-line:typedef
  public update(order: Order, id: number, address: string, comment: string) {
    return this.http.put<Order>(`${this.orderUrl}/${id}/${address}/${comment}`, order);
  }

  public getById(id: number): Observable<any> {
    return this.http.get(`${this.orderUrl}/${id}`);
  }

  // tslint:disable-next-line:typedef
  public delete(id: number) {
    return this.http.delete(`${this.orderUrl}/${id}`);
  }
  // tslint:disable-next-line:typedef
  public deleteOrdLn(id: number){
    return this.http.delete(`${this.orderUrl}/OrdLn/${id}`);
  }
  public getByUserName(username: string): Observable<any> {
    return this.http.get(`${this.orderUrl}/${username}/find`);
  }
  // @PostMapping("/ordersPromo/{code}/{id}")
  // tslint:disable-next-line:typedef
  public getPromoCode(promoCode: string, id: number, order: Order){
    return this.http.post<Order>(`${this.orderUrl}Promo/${promoCode}/${id}`, order);
  }
  // @PutMapping("/ordersPurchase")
  // tslint:disable-next-line:typedef
  public purchase(order: Order) {
    return this.http.post<Order>(`http://localhost:8080/ordersPurchase`, order);
  }
  public findOrdersByUsername(username: string): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.orderUrl}/${username}/orders`);
  }
}
