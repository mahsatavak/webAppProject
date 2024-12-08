import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../app/models/task';
import { TaskService } from '../../app/service/task.service';

@Component({
  selector: 'app-my-task',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-task.component.html',
  styleUrl: './my-task.component.scss'
})
export class MyTaskComponent  implements OnInit {
  tasks : Task[] =[];
  @Output() editTaskEvent = new EventEmitter<Task>(); // EventEmitter für die Bearbeitung
  constructor(private taskService: TaskService) {}


  ngOnInit(): void {
    this.loadTasks();

  }

  loadTasks(): void {
    this.taskService.getMyTasks().subscribe({
      next: (data) => {
        this.tasks = data;
      },
      error: (err) => {
        console.error('Error fetching tasks:', err);
      },
    });
  }

    editTask(task: Task): void {
      this.editTaskEvent.emit(task); // Aufgabe weitergeben
    }

  deleteTask(id: string): void
  {if (confirm('Are you sure you want to delete this task?')) {
    this.taskService.deleteTask(id).subscribe({
      next: () => {
        alert('Task deleted successfully!');
        this.loadTasks(); // Aufgaben neu laden
      },
      error: (err) => console.error('Error deleting task:', err),
    });
  }
}

}
