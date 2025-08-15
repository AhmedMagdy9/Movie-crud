import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { DarkModeService } from '../../../core/services/darkMode/dark-mode.service';
import { isPlatformBrowser } from '@angular/common';
import { AuthenService } from '../../../core/services/auth/authen.service';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
private darkModeService = inject(DarkModeService)
private router = inject(Router)
private authenService = inject(AuthenService)
private platformID = inject(PLATFORM_ID)
 isLoggedIn$:boolean = false






ngOnInit(): void {
  this.isLogin()
  if (isPlatformBrowser(this.platformID)) {
    this.dark()
  }
  
}

// لمعرفة حالة التسجيل
isLogin(){
    this.authenService.isLoggedIn$.subscribe(status => {
    this.isLoggedIn$ = status;
  });
}

// لمعرفة الدارك مود
  dark(){
    this.darkModeService.initializeDarkMode
  }

// لتغيير الدارك مود
    toogileMode(){
 
    this.darkModeService.toggleDarkMode()
  }

  // تسجيل خروج
   logUot(){
    localStorage.removeItem('currentUser')
     this.authenService.updateLoginStatus(false);
    this.router.navigate(['/login']);
  }

 
}
