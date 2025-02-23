import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class TasksService {
    constructor() { }

    getTasks(): Task[] {
        return [
            {
                id: 1,
                name: 'Task A',
                status: TaskState.TODO
            },
            {
                id: 2,
                name: 'Task B',
                status: TaskState.TODO
            },
            {
                id: 3,
                name: 'Task C',
                status: TaskState.INPROGRESS
            },
            {
                id: 4,
                name: 'Task D',
                status: TaskState.TODO
            },
            {
                id: 5,
                name: 'Task E',
                status: TaskState.DONE
            }
        ];
    }

}

export interface Task {
    id: number;
    name: string;
    status: TaskState
}

export enum TaskState {
    TODO, INPROGRESS, DONE
}