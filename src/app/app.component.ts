import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import { Task, TasksService, TaskState } from './tasks.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CdkDropList, CdkDrag],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'tasks-frontend-angular';

  // todo: string[] = ['Task A', 'Task B', 'Task C', 'Task D'];
  todo: Task[];
  inprogress: Task[] = [];
  done: Task[] = [];

  constructor(private tasksService: TasksService) {
    var tasks = tasksService.getTasks();
    this.todo = tasks.filter(task => task.status === TaskState.TODO);
    this.inprogress = tasks.filter(task => task.status === TaskState.INPROGRESS);
    this.done = tasks.filter(task => task.status === TaskState.DONE);
  }

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}
