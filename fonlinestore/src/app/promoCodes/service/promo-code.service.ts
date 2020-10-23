import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from '../../products/model/product';
import {PromoCode} from '../model/promo-code';

@Injectable({
  providedIn: 'root'
})
export class PromoCodeService {
  private promoCodeUrl: string;

  constructor(private http: HttpClient) {
    this.promoCodeUrl = 'http://localhost:8080/promo';
  }

  public findAll(): Observable<PromoCode[]> {
    return this.http.get<PromoCode[]>(this.promoCodeUrl);
  }

  // tslint:disable-next-line:typedef
  public save(promoCode: PromoCode) {
    return this.http.post<PromoCode>(this.promoCodeUrl, promoCode);
  }

  // tslint:disable-next-line:typedef
  public update(promoCode: PromoCode) {
    return this.http.put<PromoCode>(this.promoCodeUrl, promoCode);
  }

  // tslint:disable-next-line:typedef
  public delete(id: number) {
    return this.http.delete(`${this.promoCodeUrl}/${id}`);
  }
  public getById(id: number): Observable<any> {
    return this.http.get(`${this.promoCodeUrl}/${id}`);
  }
}
