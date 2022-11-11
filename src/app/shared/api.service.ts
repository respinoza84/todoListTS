import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { todoList } from '../shared/todoList';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
  })

  export class ApiService { 
    //Api
   todoURL = 'https://jsonplaceholder.typicode.com';
   constructor(private httpService: HttpClient){}

   getToDoList(): Observable<todoList> {
    return this.httpService
      .get<todoList>(this.todoURL + '/todos')
      .pipe(map((el) => el.slice(0, 15)), retry(1), catchError(this.handleError));
  }

  // HttpClient API get() method => Fetch todoList
  getToDoListById(id: any): Observable<todoList> {
    return this.httpService
      .get<todoList>(this.todoURL + '/todos/' + id)
      .pipe(retry(1), catchError(this.handleError));
  }
  // Error handling
  handleError(error: any) {
    let errorMessage = 'Something Wrong';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }



  }