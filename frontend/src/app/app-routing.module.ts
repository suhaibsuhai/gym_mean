import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { BmiComponent } from './bmi/bmi.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { WorkoutComponent } from './my-workouts/my-workouts.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { TaskRoomComponent } from './task-room/task-room.component';


const routes: Routes = [
  // Set the login page as the default route
  { path: '', component: LoginComponent },

  // Separate layout for the main pages with header and footer
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'bmi', component: BmiComponent },
      { path: 'about-us', component: AboutUsComponent },
      { path: 'contact-us', component: ContactUsComponent },
      { path: 'my-workouts', component: WorkoutComponent },
      { path: 'task-room', component: TaskRoomComponent}
      // other routes that should include header and footer
    ],
  },

  // Register route
  { path: 'register', component: RegisterComponent },

  // Wildcard route to redirect any unknown paths to the login page
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
