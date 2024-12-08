import { Component ,ViewChild } from '@angular/core';
import { HeaderLayoutComponent } from '../../../component/layout/header-layout/header-layout.component';
import { CreatEditTaskComponent } from '../../creat-edit-task/creat-edit-task.component';
import { MyTaskComponent } from "../../my-task/my-task.component";
import { Task } from '../../../app/models/task';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [HeaderLayoutComponent, CreatEditTaskComponent, MyTaskComponent],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss'
})
export class TodoComponent {
  @ViewChild(MyTaskComponent) myTaskComponent!: MyTaskComponent;
  @ViewChild(CreatEditTaskComponent) createEditComponent!: CreatEditTaskComponent;


  onTaskCreated(): void {
    this.myTaskComponent.loadTasks(); // Aufgabenliste aktualisieren
  }

  onTaskEdit(task: Task): void {
    this.createEditComponent.loadTaskForEditing(task); // Aufgabe zum Bearbeiten an `app-create-edit-task` senden
  }
}
