import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CdkDropList, CdkDrag],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'tasks-frontend-angular';

  todo: string[] = ['Task A', 'Task B', 'Task C', 'Task D'];
  inprogress: string[] = [];
  done: string[] = [];

  drop(event: CdkDragDrop<string[]>) {
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
