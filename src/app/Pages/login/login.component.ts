import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  userObj: any = {
    userName: '',
    passWord: '',
  };

  constructor(private router: Router) {}

  onLogin() {
    if (
      this.userObj.userName === 'admin' &&
      this.userObj.passWord === '112233'
    ) {
      this.router.navigateByUrl('list');
      console.log('Login Successful');
    } else {
      alert('Username or Password is Incorrect');
    }
  }
}
