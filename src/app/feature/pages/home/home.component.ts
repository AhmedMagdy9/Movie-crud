import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AllMoviesService } from '../../../core/services/allMovies/all-movies.service';
import { Movie } from '../../../shared/envairment/movie';
import { AlertService } from '../../../core/services/alerts/alert.service';
import { RouterLink } from '@angular/router';




@Component({
  selector: 'app-home',
  imports: [ReactiveFormsModule , FormsModule  ,RouterLink   ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
showModal:WritableSignal<boolean> = signal(false)
searchWord:WritableSignal<string> = signal('')
UpdBtn:WritableSignal<boolean> = signal(false)
allMoviesHome:WritableSignal<Movie[]>= signal([])
selectImgName = signal<any | null>(null);
selectedMovie = signal<Movie | null>(null);
private allMoviesService = inject(AllMoviesService)
private alertService = inject(AlertService)

 movieForm = new FormGroup({
    id: new FormControl(crypto.randomUUID() ), 
    name: new FormControl('',  [Validators.required ,Validators.pattern(/^[\u0600-\u06FFa-zA-Z0-9\s]+$/)] ,),
    posterUrl: new FormControl('', [Validators.required, Validators.pattern(/^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))$/i)]),
    movieUrl: new FormControl('', [ Validators.required, Validators.pattern(/^https?:\/\/.+$/)]),
    type: new FormControl('', Validators.required),
    rating: new FormControl(0, [ Validators.required, Validators.min(0), Validators.max(10) ,  Validators.pattern(/^\d+(\.\d{1,2})?$/)  ]),
    watched: new FormControl(false)
  });


  ngOnInit(): void {
    this.read()
  }

  //                c   r  u   d                    //


// create object
  create() {
    if (this.movieForm.valid) {
     console.log(this.movieForm.value);
     const formValue = this.movieForm.value;
     const newMovie: Movie = {
      id: crypto.randomUUID(), 
      name: formValue.name!,
      posterUrl: formValue.posterUrl!,
      movieUrl: formValue.movieUrl!,
      type: formValue.type!,
      rating: +formValue.rating!,
      watched:  false
    };
    this.allMoviesService.allMovies.update(movies => [...movies, newMovie]);
    this.allMoviesService.saveStorge()
   this.alertService.success('تم اضافة الفيلم بنجاح')
    this.read()
    this.showModal.set(false)
    
    }
  
  }
// Display objects
  read(){
    this.allMoviesHome.set(this.allMoviesService.allMovies())
    console.log(this.allMoviesHome())
  }
// رفع البيانات الي ال form
  onEdit(movie: Movie) {
    this.movieForm.patchValue({
    name:movie.name,
    movieUrl:movie.movieUrl,
    posterUrl: movie.posterUrl,
    type:movie.type,
    rating:+movie.rating,
    })

  this.showModal.set(true)
  this.UpdBtn.set(true)
  this.selectedMovie.set(movie);
  }

// حفظ التعديلات 
 saveChanges() {
  if (this.selectedMovie()) {
    Object.assign(this.selectedMovie()!, this.movieForm.value);
    this.allMoviesService.saveStorge()
    this.alertService.success('تم تعديل الفيلم بنجاح')
    this.showModal.set(false)
  }
 }
// حذف ال object
  delete(id: string) {
  this.allMoviesService.allMovies.update(movies => movies.filter(movie => movie.id !== id));
 this.allMoviesService.saveStorge()
 this.read()
this.alertService.success('تم حذف الفيلم بنجاح')
  }

// اخفاء واظهار ال form
toggleModal(){
  this.showModal.set(!this.showModal());
  this.movieForm.reset();  
  this.selectedMovie.set(null);
  this.UpdBtn.set(false)
}
// عرض وغلق الصوره والاسم 
openImg(movie:object){
   this.selectImgName.set(movie) ;
}

closeImg(){
  this.selectImgName.set(null) ;
}

// شاهدت الفيلم ام لا 
markAsWatched(id: string) {
  const movie = this.allMoviesHome().find(m => m.id === id);
  if (movie) {
    movie.watched = !movie.watched;
     this.allMoviesService.saveStorge()

  }
}


}
