import { Component, OnInit } from '@angular/core';
import { HeaderLayoutComponent } from '../../../component/layout/header-layout/header-layout.component';
import { Task } from '../../../app/models/task';
import { TaskService } from '../../../app/service/task.service';

@Component({
  selector: 'app-community',
  standalone: true,
  imports: [HeaderLayoutComponent],
  templateUrl: './community.component.html',
  styleUrl: './community.component.scss'
})
export class CommunityComponent {}
