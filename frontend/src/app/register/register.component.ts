import { Component } from '@angular/core';
import { AuthService } from '../services/auth.services';
import { User } from '../models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user: User = { username: '', email: '', password: '' };
  message: string = '';

  constructor(private authService: AuthService) { }

  register() {
    this.authService.register(this.user).subscribe({
      next: response => {
        this.message = 'Registration successful!';
      },
      error: error => {
        this.message = 'Registraion faild!';
      }
    });
  }
}
