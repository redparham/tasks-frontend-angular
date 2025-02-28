import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import { Task, TasksService, TaskStatus } from './tasks.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CdkDropList, CdkDrag, MatProgressSpinnerModule, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'tasks-frontend-angular';

  todo: Task[] = [];
  inprogress: Task[] = [];
  done: Task[] = [];

  loading = false;

  constructor(private tasksService: TasksService) {}
  
  ngOnInit(): void {
    this.loading = true;
    var tasks = this.tasksService.getTasks()
      .subscribe(tasks => {
        this.todo = tasks.filter(task => task.status === TaskStatus.TODO);
        this.inprogress = tasks.filter(task => task.status  as TaskStatus === TaskStatus.INPROGRESS);
        this.done = tasks.filter(task => task.status  as TaskStatus === TaskStatus.DONE);
        this.loading=false;
      });
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
