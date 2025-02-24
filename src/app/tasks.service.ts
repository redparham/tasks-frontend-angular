import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TasksService {
    constructor(private http: HttpClient) { }

    getTasks(): Observable<Task[]> {
        return this.http
            .get<Task[]>('https://tasks-backend-7480.onrender.com/tasks');
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