import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Manufacturer} from '../../manufacturers/model/manufacturer';
import {HttpClient} from '@angular/common/http';
import {User} from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userUrl: string;

  constructor(private http: HttpClient) {
    this.userUrl = 'http://localhost:8080/user';
  }

  public findAll(): Observable<User[]> {
    return this.http.get<User[]>(this.userUrl);
  }

  // tslint:disable-next-line:typedef
  public save(user: User) {
    return this.http.post<User>(this.userUrl, user);
  }

  // tslint:disable-next-line:typedef
  public update(user: User) {
    return this.http.put<User>(this.userUrl, user);
  }

  public getById(id: number): Observable<any> {
    return this.http.get(`${this.userUrl}/${id}`);
  }

  // tslint:disable-next-line:typedef
  public delete(id: number) {
    return this.http.delete(`${this.userUrl}/${id}`);
  }
}
