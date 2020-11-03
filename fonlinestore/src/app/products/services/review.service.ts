import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Review} from '../model/review';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
   reviewUrl: string;
  constructor(private http: HttpClient) {
    this.reviewUrl = 'http://localhost:8080/review';
  }
  public findAll(id: number): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.reviewUrl}/${id}`);
  }
  // tslint:disable-next-line:typedef
  public save(review: Review, id: number) {
    return this.http.post<Review[]>(`${this.reviewUrl}/${id}`, review);
  }

  // public getById(id: number): Observable<any> {
  //   return this.http.get(`${this.reviewUrl}/${id}`);
  // }

  // tslint:disable-next-line:typedef
  public delete(id: number) {
    return this.http.delete(`${this.reviewUrl}/${id}`);
  }

}
