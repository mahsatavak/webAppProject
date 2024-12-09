import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../app/models/task';
import { TaskService } from '../../app/service/task.service';

@Component({
  selector: 'app-others-tasks',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './others-tasks.component.html',
  styleUrl: './others-tasks.component.scss'
})
export class OthersTasksComponent implements OnInit {
  othertasks : Task[] =[];
  @Output() editTaskEvent = new EventEmitter<Task>(); // EventEmitter für die Bearbeitung
  constructor(private taskService: TaskService) {}


  ngOnInit(): void {
    this.loadTasks();

  }

  loadTasks(): void {
    this.taskService.getOthersTasks().subscribe({
      next: (data) => {
        this.othertasks = data;
      },
      error: (err) => {
        console.error('Error fetching othertasks:', err);
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


