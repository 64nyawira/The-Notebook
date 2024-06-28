import { RouterModule,Routes } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UserComponent } from './components/user/user.component';
import { AdminComponent } from './components/admin/admin.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { NotesComponent } from './components/notes/notes.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

export const routes: Routes = [
    {path:'',component:LandingComponent},
    {path:'',pathMatch:'full',redirectTo:''},
    {path:'login',component:LoginComponent},
    {path:'register',component:RegisterComponent},
    {path:'user',component:UserComponent},
    {path:'notes',component:NotesComponent},
    {path:'admin',component:AdminComponent},
    
    {path:'**',component:NotFoundComponent},
   
];
