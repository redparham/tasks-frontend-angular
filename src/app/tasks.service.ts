import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }

  getTasks(): Observable<Task[]> {
    return this.http
      .get<Task[]>('https://tasks-backend-7480.onrender.com/tasks')
      .pipe(catchError((error: HttpErrorResponse) => { return this.handleError(error) }));
  }

  private handleError(error: HttpErrorResponse) {
    var errorMessage;
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      errorMessage = `An error occurred: ${error.error.message}`;
    } else {
      // Backend returned an unsuccessful response code
      errorMessage = `Backend returned error`
    }
    console.error(errorMessage);
    this.snackBar.open(errorMessage, 'Dismiss', {
      duration: 10000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    })
    return throwError(() => 'Something went wrong; please try again later.');
  }

}

export interface Task {
  id: number;
  name: string;
  status: TaskStatus
}

export enum TaskStatus {
  TODO = "TODO",
  INPROGRESS = "INPROGRESS",
  DONE = "DONE"
}