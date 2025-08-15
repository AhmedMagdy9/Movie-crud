import { inject, Injectable, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import { Movie } from '../../../shared/envairment/movie';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AllMoviesService {
allMovies:WritableSignal<Movie[]>= signal([])
private platformID = inject(PLATFORM_ID)

  constructor(){
  if (isPlatformBrowser(this.platformID)) {
     const storedMovies = localStorage.getItem('movies')
   if (storedMovies) {
    const parsedMovies = JSON.parse(storedMovies);
    this.allMovies.set(parsedMovies);
    
   }
  }
  }



  saveStorge(){
    localStorage.setItem('movies' , JSON.stringify(this.allMovies()))
  }

}
