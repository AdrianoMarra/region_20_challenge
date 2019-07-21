import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Subject } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  public resultsObservable = new Subject();
  public loaddingObservable = new Subject();
  public pagingObservable = new Subject();

  constructor(public http: HttpClient) {}

  search(query) {
    return this.http.get(environment.API_URL, {
      params: new HttpParams({
        fromObject: query
      })
    });
  }

  getStudent(id) {
    return this.http.get(environment.API_URL + id);
  }

  updateStudent(query) {
    return this.http.put(environment.API_URL + query.id, query);
  }

  addStudent(query) {
    return this.http.post(environment.API_URL, query);
  }

  deleteStudent(id) {
    return this.http.delete(environment.API_URL + id);
  }

  emitResults(val) {
    this.resultsObservable.next(val);
  }

  emitLoadding(val) {
    this.loaddingObservable.next(val);
  }

  emitPage(val) {
    this.pagingObservable.next(val);
  }
}
