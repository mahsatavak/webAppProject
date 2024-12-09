import { Component, OnInit, ViewChild } from '@angular/core';
import { HeaderLayoutComponent } from '../../../component/layout/header-layout/header-layout.component';
import { Task } from '../../../app/models/task';
import { TaskService } from '../../../app/service/task.service';
import { MyTaskComponent } from '../../my-task/my-task.component';
import { CreatEditTaskComponent } from '../../creat-edit-task/creat-edit-task.component';

@Component({
  selector: 'app-community',
  standalone: true,
  imports: [HeaderLayoutComponent],
  templateUrl: './community.component.html',
  styleUrl: './community.component.scss'
})
export class CommunityComponent {
  @ViewChild(MyTaskComponent) otherTaskComponent!: MyTaskComponent;
  @ViewChild(CreatEditTaskComponent) createEditComponent!: CreatEditTaskComponent;


  onTaskCreated(): void {
    this.otherTaskComponent.loadTasks(); // Aufgabenliste aktualisieren
  }

  onTaskEdit(task: Task): void {
    this.createEditComponent.loadTaskForEditing(task); // Aufgabe zum Bearbeiten an `app-create-edit-task` senden
  }




}
