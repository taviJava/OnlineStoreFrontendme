import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Role} from '../model/role';
import {Privilege} from '../model/privilege';

@Injectable({
  providedIn: 'root'
})
export class PrivlegesService {
  private privilegeUrl: string;
  constructor(private http: HttpClient) {
    this.privilegeUrl = 'http://localhost:8080/privilege';
  }

  public findAll(): Observable<Privilege[]> {
    return this.http.get<Privilege[]>(this.privilegeUrl);
  }
  // tslint:disable-next-line:typedef
  public save(privilege: Privilege) {
    return this.http.post<Privilege>(this.privilegeUrl, privilege);
  }
  // tslint:disable-next-line:typedef
  public update(privilege: Privilege) {
    return this.http.put<Role>(this.privilegeUrl, privilege);
  }
  public getById(id: number): Observable<any> {
    return this.http.get(`${this.privilegeUrl}/${id}`);
  }
  // tslint:disable-next-line:typedef
  public delete(id: number) {
    return this.http.delete(`${this.privilegeUrl}/${id}`);
  }
}
