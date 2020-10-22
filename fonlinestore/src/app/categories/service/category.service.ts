import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../model/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private categoryUrl: string;
  constructor(private http: HttpClient) {
    this.categoryUrl = 'http://localhost:8080/category';
  }

  public findAll(): Observable<Category[]> {
    return this.http.get<Category[]>(this.categoryUrl);
  }

  public findSub(): Observable<Category[]> {
    return this.http.get<Category[]>(this.categoryUrl + 'Sub');
  }

  public findSubByCatId(id: number): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.categoryUrl}SubById/${id}`);
  }
  // tslint:disable-next-line:typedef
  public save(category: Category) {
    return this.http.post<Category[]>(this.categoryUrl, category);
  }

  // tslint:disable-next-line:typedef
  public update(category: Category) {
    return this.http.put<Category>(this.categoryUrl, category);
  }

  public getById(id: number): Observable<any> {
    return this.http.get(`${this.categoryUrl}/${id}`);
  }

  // tslint:disable-next-line:typedef
  public delete(id: number) {
    return this.http.delete(`${this.categoryUrl}/${id}`);
  }
}
