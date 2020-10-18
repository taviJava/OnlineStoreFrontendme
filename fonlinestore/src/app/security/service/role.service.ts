import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from '../../products/model/product';
import {Role} from '../model/role';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private roleUrl: string;
  constructor(private http: HttpClient) {
    this.roleUrl = 'http://localhost:8080/role';
  }

  public findAll(): Observable<Role[]> {
    return this.http.get<Role[]>(this.roleUrl);
  }
  // tslint:disable-next-line:typedef
  public save(role: Role) {
    return this.http.post<Role>(this.roleUrl, role);
  }
  // tslint:disable-next-line:typedef
  public update(role: Role) {
    return this.http.put<Role>(this.roleUrl, role);
  }
  public getById(id: number): Observable<any> {
    return this.http.get(`${this.roleUrl}/${id}`);
  }
  // tslint:disable-next-line:typedef
  public delete(id: number) {
    return this.http.delete(`${this.roleUrl}/${id}`);
  }
}
