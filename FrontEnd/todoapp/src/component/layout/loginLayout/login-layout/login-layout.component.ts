import { Component    } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-login-layout',
  standalone: true,
  imports: [MatTabsModule,MatToolbarModule ,RouterModule],
  templateUrl: './login-layout.component.html',
  styleUrl: './login-layout.component.scss',

})


export class LoginLayoutComponent {
  navLinks = [{ path: '', label: 'Login' },
    { path: '/signup', label: 'signup' },
    ];
  activeLink = this.navLinks[1];
  background = 'primary';
}
