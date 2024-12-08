import { Routes } from '@angular/router';
import { LoginComponent } from '../component/login/login.component';
import { SignupComponent } from '../component/signup/signup.component';
import { CreatEditTaskComponent } from '../component/creat-edit-task/creat-edit-task.component';
import { TodoComponent } from '../component/pages/todo/todo.component';
import { DoneComponent } from '../component/pages/done/done.component';
import { CommunityComponent } from '../component/pages/community/community.component';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },

 {
  path: 'task',
  component: CreatEditTaskComponent,
},

{
  path: 'todo',
  component: TodoComponent,
},
{
  path: 'done',
  component: DoneComponent,
},
{
  path: 'community',
  component: CommunityComponent,
}

];
