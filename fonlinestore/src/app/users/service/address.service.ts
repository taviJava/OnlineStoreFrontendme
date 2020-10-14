import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Address} from '../model/address';


@Injectable({
  providedIn: 'root'
})
export class AddressService {
  private addressUrl: string;

  constructor(private http: HttpClient) {
    this.addressUrl = 'http://localhost:8080/address';
  }


  public findAll(): Observable<Address[]> {
    return this.http.get<Address[]>(this.addressUrl);
  }

  // tslint:disable-next-line:typedef u
  public save(address: Address) {
    return this.http.post<Address>(this.addressUrl, address);
  }

  // tslint:disable-next-line:typedef
  public update(address: Address) {
    return this.http.put<Address>(this.addressUrl, address);
  }

  public getById(id: number): Observable<any> {
    return this.http.get(`${this.addressUrl}/${id}`);
  }

  // tslint:disable-next-line:typedef
  public delete(id: number) {
    return this.http.delete(`${this.addressUrl}/${id}`);
  }
}
