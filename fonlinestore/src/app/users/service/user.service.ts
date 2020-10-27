import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Manufacturer} from '../../manufacturers/model/manufacturer';
import {HttpClient, HttpEvent, HttpRequest} from '@angular/common/http';
import {User} from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userUrl: string;
  private photoUrl: string;

  constructor(private http: HttpClient) {
    this.userUrl = 'http://localhost:8080/user';
    this.photoUrl = 'http://localhost:8080/photos';
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

  public upload(photo: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('photo', photo);
    const req = new HttpRequest('POST', this.photoUrl, formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }
  getPhoto(): Observable<any> {
    return this.http.get(this.photoUrl);
  }
  getUserPhoto(id: number): Observable<any>{
    return this.http.get(`http://localhost:8080/photo/${id}`);
  }

  // tslint:disable-next-line:typedef
  public getByUsername(userName: string): Observable<any> {
    return this.http.get(`${this.userUrl}/getbyusername/${userName}`);
  }

  // tslint:disable-next-line:typedef
  public getRolesByUsername(userName: string): Observable<any> {
    return this.http.get(`${this.userUrl}/privileges/${userName}`);
  }

  // tslint:disable-next-line:typedef
  public deletePhoto(id: string) {
    return this.http.delete(`${this.userUrl}/${id}/photo`);
  }
}
