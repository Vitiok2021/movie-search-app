import { Routes } from '@angular/router';
import { MoviesPageComponent } from './components/movies-page/movies-page.component';
import { MovieDetailsPageComponent } from './components/movie-details-page/movie-details-page.component';
import { FavoritesPageComponent } from './favorites-page/favorites-page.component';

export const routes: Routes = [
  { path: '', redirectTo: 'movies', pathMatch: 'full' },
  { path: 'movies', component: MoviesPageComponent },
  { path: 'movies/:id', component: MovieDetailsPageComponent },
  { path: 'favorites', component: FavoritesPageComponent },
];
