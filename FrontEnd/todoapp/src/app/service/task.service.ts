import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TaskRequest } from '../models/task-request';
import { Response } from '../models/response';
import { CookieService } from 'ngx-cookie-service';
import { Task } from '../models/task';
import { AuthUserService } from './auth-user.service';


const Task_API = 'http://localhost:8081/api/todos/';

@Injectable({
  providedIn: 'root'
})
export class TaskService {



  constructor(private http: HttpClient,private auhthService :AuthUserService) {

   }


  createTask(req: TaskRequest): Observable<Task> {
    return this.http.post<Task>(Task_API + 'task',
      req
      ,{withCredentials: true}
    );
  }

  getMyTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(Task_API + 'my-tasks',{
      withCredentials: true
    });
  }

  getOthersTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(Task_API + 'other',{
      withCredentials: true
    });
  }

  updateTask(task: Task): Observable<Task> {
    return this.http.put<Task>(`${Task_API}${task._id}`, task, { withCredentials: true});
  }

  deleteTask(id: string): Observable<string> {
    console.log(`${Task_API}${id}`);
    return this.http.delete<string>(`${Task_API}${id}`);
  }

  getCompleteTasks() {
    return this.http.get<Task[]>(Task_API + 'done',{
      withCredentials: true
    });
  }
}
