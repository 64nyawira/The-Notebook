import { Component } from '@angular/core';
import { RouterLink, Router} from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { LandingComponent } from "../landing/landing.component";
import { CommonModule } from '@angular/common';
import { UserComponent } from '../user/user.component';
import { FormnavbarComponent } from "../formnavbar/formnavbar.component";

@Component({
    selector: 'app-login',
    standalone: true,
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
    imports: [RouterLink, FormsModule, LandingComponent, CommonModule, FormnavbarComponent]
})
export class LoginComponent {
  constructor(private router:Router){}

  navigateToUser(details:any){
    console.log(details)
  }
}
