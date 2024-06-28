import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { LandingComponent } from "../landing/landing.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormnavbarComponent } from "../formnavbar/formnavbar.component";

@Component({
    selector: 'app-register',
    standalone: true,
    templateUrl: './register.component.html',
    styleUrl: './register.component.css',
    imports: [RouterLink, LandingComponent, FormsModule, CommonModule, FormnavbarComponent]
})
export class RegisterComponent {

}
