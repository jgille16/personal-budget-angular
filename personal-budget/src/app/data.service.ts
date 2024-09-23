import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'http://localhost:3000/budget';
  private dataSource: any = {};
  private newDataSource: any = [];

  constructor(private http: HttpClient) { }


  getBudgetData(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getDataSource(): any {
    return this.dataSource;
  }

  getNewDataSource(): any {
    return this.newDataSource;
  }

  setDataSource(dataSource: any): void {
    this.dataSource = dataSource;
  }

  setNewDataSource(newDataSource: any): void {
    this.newDataSource = newDataSource;
  }
}
