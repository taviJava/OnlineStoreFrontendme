import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Product} from '../../products/model/product';
import {HttpClient} from '@angular/common/http';
import {Manufacturer} from '../model/manufacturer';

@Injectable({
  providedIn: 'root'
})
export class ManufacturerService {
 private stringUrl: string;
  constructor(private http: HttpClient) {
    this.stringUrl = 'http://localhost:8080/manufacturer';
  }
  public findAll(): Observable<Manufacturer[]> {
    return this.http.get<Manufacturer[]>(this.stringUrl);
  }
  // tslint:disable-next-line:typedef
  public save(manufacturer: Manufacturer) {
    return this.http.post<Manufacturer>(this.stringUrl, manufacturer);
  }
  // tslint:disable-next-line:typedef
  public update(manufacturer: Manufacturer) {
    return this.http.put<Manufacturer>(this.stringUrl, manufacturer);
  }
  public getById(id: number): Observable<any> {
    return this.http.get(`${this.stringUrl}/${id}`);
  }
  // tslint:disable-next-line:typedef
  public delete(id: number) {
    return this.http.delete(`${this.stringUrl}/${id}`);
  }
}
