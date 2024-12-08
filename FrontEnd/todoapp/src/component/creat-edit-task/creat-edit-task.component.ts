import { Component , OnInit,Output, EventEmitter, Input } from '@angular/core';
import { ReactiveFormsModule ,FormsModule, FormBuilder,FormGroup, Validators } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import{CommonModule}from  '@angular/common';
import { TaskRequest } from '../../app/models/task-request';
import { TaskService } from '../../app/service/task.service';
import { AuthUserService } from '../../app/service/auth-user.service';
import { Task } from '../../app/models/task';

@Component({
  selector: 'app-creat-edit-task',
  standalone: true,
  imports: [ReactiveFormsModule,MatInputModule,FormsModule,CommonModule,MatSelectModule,MatButtonModule],
  templateUrl: './creat-edit-task.component.html',
  styleUrl: './creat-edit-task.component.scss'
})
export class CreatEditTaskComponent implements OnInit {

  taskForm : FormGroup = new FormGroup({});
  statuses : string[] = ['NOT_STARTED','IN_PROGRESS','COMPLETED'];
  isAssigneeValid: boolean = true;
  request: TaskRequest = new TaskRequest;
  msg: string | undefined;
  @Output() taskCreated = new EventEmitter<void>(); // EventEmitter zum Senden der neuen Aufgabe an die Elternkomponente
  @Input() taskToEdit?: Task;

  constructor(private formBuilder: FormBuilder,private taskService: TaskService,private authService : AuthUserService){}

  ngOnInit () :void{
    this.taskForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: [''],
      status: ['', Validators.required],
      responsible: [this.authService.getUsername(),  [Validators.required]],
    })

  }

  onSave(){
    const formValue =  this.taskForm.value;

      if (this.taskToEdit) {
        // Update bestehender Task
        const updatedTask = {
          ...this.taskToEdit, // Vorhandene Werte übernehmen (einschließlich der ID)
          ...formValue, // Neue Formularwerte überschreiben
        };
        if (this.taskForm.valid) {
        this.taskService.updateTask(updatedTask).subscribe({
          next: (response) => {
            alert('Task erfolgreich aktualisiert!');
            this.taskCreated.emit(); // Aufgabenliste aktualisieren
            this.taskToEdit = undefined; // Task zurücksetzen
            this.taskForm.reset({ responsible: this.authService.getUsername() });
          },
          error: (err) => {
            console.error('Fehler beim Aktualisieren der Aufgabe:', err);
          },
        });
      }
      }
       else if (this.taskForm.valid) { {

        this.request.title=formValue.title;
        this.request.description=formValue.description;
        this.request.status=formValue.status;
        this.request.responsible=formValue.responsible;
        this.request.creator= this.authService.getUsername();

      this.taskService.createTask(this.request).subscribe({
        next: (createTask) => {
          this.taskCreated.emit(); // Emit der neuen Aufgabe
            // Erfolgreiche Antwort behandeln
            alert("Task erfolgreich erstellt: "+ createTask.title);
            this.taskForm.reset({ responsible: this.authService.getUsername() });
        },
        error: (err) => {
          if (err.status === 400) {
            console.error( err.error);
            alert('User not found');

          } else {
            alert('An unexpected error occurred');
          }
       }
    })}

    } else {
      console.log("On submit failed.");
      alert('An unexpected error occurred');
    }

    this.taskForm.reset({ responsible: this.authService.getUsername() });
  }

  loadTaskForEditing(task: Task): void {
    this.taskToEdit = task; // Aufgabe setzen
     // Formular mit den Daten neu laden
     this.taskForm = this.formBuilder.group({
      title: [this.taskToEdit?.title],
      description: [this.taskToEdit?.description],
      status: [this.taskToEdit?.status],
      responsible: [this.taskToEdit?.responsible],
    });
  }

}

