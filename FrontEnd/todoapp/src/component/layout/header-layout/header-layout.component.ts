import { Component } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { AuthUserService } from '../../../app/service/auth-user.service';

@Component({
  selector: 'app-header-layout',
  standalone: true,
  imports: [MatTabsModule ,MatToolbarModule , MatButtonModule, RouterModule],
  templateUrl: './header-layout.component.html',
  styleUrl: './header-layout.component.scss'
})
export class HeaderLayoutComponent {

  navLinks = [{ path: '/todo', label: 'To Do' },
    { path: '/done', label: 'Done' },
    { path: '/other', label: 'Others Responsibilities' }];
  activeLink = this.navLinks[1];
  background = 'primary';
  constructor(private authService: AuthUserService, private router: Router) {}

  onLogout(): void {
    this.authService.logout().subscribe({
      next: () => {
        alert('Logout successful!');
        this.router.navigate(['']); // Zur Login-Seite umleiten
      },
      error: (err) => {
        console.error('Logout failed', err);
      },
    });
  }
}
