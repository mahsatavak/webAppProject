import { Component, OnInit } from '@angular/core';
import { HeaderLayoutComponent } from "../../layout/header-layout/header-layout.component";
import { Task } from '../../../app/models/task';
import { TaskService } from '../../../app/service/task.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-done',
  standalone: true,
  imports: [HeaderLayoutComponent,CommonModule],
  templateUrl: './done.component.html',
  styleUrl: './done.component.scss'
})
export class DoneComponent implements OnInit{
  tasks : Task[] =[];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadList();
  }

  deleteTask(id: string): void
  {if (confirm('Are you sure you want to delete this task?')) {
    this.taskService.deleteTask(id).subscribe({
      next: () => {
        alert('Task deleted successfully!');
        this.loadList(); // Aufgaben neu laden
      },
      error: (err) => console.error('Error deleting task:', err),
    });
  }
}

loadList(): void {
  this.taskService.getCompleteTasks().subscribe({
    next: (data) => {
      this.tasks = data;
    },
    error: (err) => {
      console.error('Error fetching tasks:', err);
    },
  });
}
}

