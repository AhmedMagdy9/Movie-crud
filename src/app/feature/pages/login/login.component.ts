import { AlertService } from './../../../core/services/alerts/alert.service';
import { AuthenService } from './../../../core/services/auth/authen.service';
import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { User } from '../../../shared/envairment/users';

@Component({
  selector: 'app-login',
  imports: [RouterLink , ReactiveFormsModule ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
private authenService = inject(AuthenService)
private router = inject(Router)
private alertService = inject(AlertService)


   loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

//  تسجيل دخول 
  login(){
    if(this.loginForm.valid){
       const formValues = this.loginForm.getRawValue();
        const storedUsers = this.authenService.users();
         const matchedUser = storedUsers.find(
        (u) => u.email === formValues.email && u.password === formValues.password );
          if (matchedUser) {
        localStorage.setItem('currentUser', JSON.stringify(matchedUser));
       this.router.navigate(['/home']);
       this.alertService.success(`مرحبا بك ${matchedUser.name}`)
        this.authenService.updateLoginStatus(true);
        this.loginForm.reset({ email: '', password: '' });
      }else {
        this.alertService.error('❌ البريد أو الباسورد غير صحيح');
      }

    }
  }


}
