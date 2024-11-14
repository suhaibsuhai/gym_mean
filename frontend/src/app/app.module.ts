import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { provideHttpClient, withFetch } from '@angular/common/http'; // Import provideHttpClient and withFetch

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { BmiComponent} from './bmi/bmi.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { WorkoutComponent } from './my-workouts/my-workouts.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { TaskRoomComponent } from './task-room/task-room.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    BmiComponent,
    AboutUsComponent,
    ContactUsComponent,
    WorkoutComponent,
    MainLayoutComponent,
    HeaderComponent,
    FooterComponent,
    TaskRoomComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule // No need for HttpClientModule anymore as we use provideHttpClient
  ],
  providers: [
    provideClientHydration(), // For server-side rendering
    provideHttpClient(withFetch()) // Configure HttpClient with fetch
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
