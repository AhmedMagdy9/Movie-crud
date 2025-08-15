import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const urlGuard: CanActivateFn = (route, state) => {

  let platformid = inject(PLATFORM_ID)


  let router = inject(Router)

  if (isPlatformBrowser(platformid)) {
    
    
  if (localStorage.getItem('currentUser') != null) {

    return true
    
  }

  }
  
  router.navigate(['/login'])

  return false
};
