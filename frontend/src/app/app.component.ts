import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from "./components/login/login.component";
import { LandingComponent } from "./components/landing/landing.component";
import { AdminComponent } from './components/admin/admin.component';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, RegisterComponent, LoginComponent,
       LoginComponent, LandingComponent,AdminComponent]
})
export class AppComponent {
  title = 'ceeProjects';
}
