import { Component, computed, inject, signal, WritableSignal } from '@angular/core';
import { Movie } from '../../../shared/envairment/movie';
import { AuthenService } from '../../../core/services/auth/authen.service';
import { AllMoviesService } from '../../../core/services/allMovies/all-movies.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashbord',
  imports: [ RouterLink ],
  templateUrl: './dashbord.component.html',
  styleUrl: './dashbord.component.scss'
})
export class DashbordComponent {
  private allMoviesService = inject(AllMoviesService)
   allMoviesBord:WritableSignal<Movie[]>= signal(this.allMoviesService.allMovies())


  totalMovies = computed(() => this.allMoviesBord().length);
  watchedMovies = computed(() => this.allMoviesBord().filter(m => m.watched).length);
  comedyMovies = computed(() => this.allMoviesBord().filter(m => m.type === 'Comedy').length);
  actionMovies = computed(() => this.allMoviesBord().filter(m => m.type === 'Action').length);
  dramaMovies = computed(() => this.allMoviesBord().filter(m => m.type === 'Drama').length);
  HorrorMovies = computed(() => this.allMoviesBord().filter(m => m.type === 'Horror').length);
  SciFiMovies = computed(() => this.allMoviesBord().filter(m => m.type === 'Sci-Fi').length);




  

}
