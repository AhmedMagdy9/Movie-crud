import { AuthenService } from './../../../core/services/auth/authen.service';
import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { User } from '../../../shared/envairment/users';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertService } from '../../../core/services/alerts/alert.service';

@Component({
  selector: 'app-register',
  imports: [RouterLink , ReactiveFormsModule ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  private authenService = inject(AuthenService)
  private alertService = inject(AlertService)
  private router = inject(Router)


  registerForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  

     register() {
  if (this.registerForm.valid) {
    const newUser: User = {
      name: this.registerForm.value.name!,
      email: this.registerForm.value.email!,
      password: this.registerForm.value.password!,
    };

    let users = this.authenService.users();
    const userExists = users.some(user => user.email === newUser.email);

    if (userExists) {
      this.alertService.error('المستخدم موجود بالفعل ❌');
      return;
    }

    // تحديث الـ array محليًا
    users = [...users, newUser];

    // تحديث الـ service
    this.authenService.users.update(() => users);

    // حفظ في localStorage
    localStorage.setItem('users', JSON.stringify(users));

    this.registerForm.reset();
    this.alertService.success('تم التسجيل بنجاح ✅');
    this.router.navigate(['/login']);
  }
}


}
