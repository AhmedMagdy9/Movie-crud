import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { User } from '../../../shared/envairment/users';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenService {
private platformID = inject(PLATFORM_ID)

  private isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
  isLoggedIn$ = this.isLoggedInSubject.asObservable(); 

  users = signal<User[]>([]);


  constructor() {
    if (isPlatformBrowser(this.platformID)) {
      if (localStorage.getItem('users')) {
        this.users.set(JSON.parse(localStorage.getItem('users')!))
      }
      
      
    }
   }

    private hasToken(): boolean {
    if (isPlatformBrowser(this.platformID)) {
      return !!localStorage.getItem('currentUser');
    }else{
       return false;
    }

    
  }

  updateLoginStatus(isLoggedIn: boolean) {
  this.isLoggedInSubject.next(isLoggedIn);
}

}
