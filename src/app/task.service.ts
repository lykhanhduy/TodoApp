import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { Task } from './task';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable()
export class TaskService {

  constructor(private http: HttpClient) { }
   // Make the HTTP request:
  getTasks (): Observable<Task[]> {
    return this.http.get<Task[]>('http://localhost:3000/api/task')
      .pipe(
        tap(task => console.log(task)),
        catchError(this.handleError('getTasks', []))
      );
  }

  taskIsCompleted(checked: boolean, task: Task) {
    if (checked) {
      task.completed = true;
    }else {
      task.completed = false;
    }
    return this.http.put<Task>('http://localhost:3000/api/task/' + task._id, task, httpOptions).pipe(
      tap(_ => console.log('update ' + task.title)),
      catchError(this.handleError<any>('updateTask'))
    );
  }

   private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  addTask(task: Task) {
    return this.http.post<Task>('http://localhost:3000/api/task/', task, httpOptions).pipe(
      tap(_ => console.log('add ' + task.title)),
      catchError(this.handleError<any>('addTask'))
    );
  }
  delete(id: string) {
    return this.http.delete<Task>('http://localhost:3000/api/task/' + id, httpOptions).pipe(
      tap(_ => console.log('delete ' + id)),
      catchError(this.handleError<any>('deleteTask'))
    );
  }
  updateTask(task: Task) {
    return this.http.post<Task>('http://localhost:3000/api/task/' + task._id, task, httpOptions).pipe(
      tap(_ => console.log('update ' + task.title)),
      catchError(this.handleError<any>('updateTask'))
    );
  }
}
