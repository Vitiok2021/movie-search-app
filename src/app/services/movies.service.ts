import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, of, tap } from 'rxjs';
import { Movie } from '../interfaces/movie';

interface TMBDResponse {
  results: any[];
  page: number;
  total_results: number;
  total_pages: number;
}

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  movies: Movie[] = [];
  constructor() {
    const savedData = localStorage.getItem('movies_cache');

    if (savedData) this.movies = JSON.parse(savedData);
  }

  apiKey = '75f74b703457c28185faa7bd588e0f9a';
  private http = inject(HttpClient);

  getMovieFromApi(): Observable<Movie[]> {
    if (this.movies.length > 0) return of(this.movies);
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${this.apiKey}`;
    return this.http.get<TMBDResponse>(url).pipe(
      map((res) =>
        res.results.map(
          (movie: any) =>
            ({
              id: movie.id,
              title: movie.title,
              genre: movie.original_language || 'Unknown',
              description: movie.overview,
              year: movie.release_date,
              isFavorite: false,
              poster: 'https://image.tmdb.org/t/p/w342' + movie.poster_path,
            } as Movie)
        )
      ),
      tap((data: Movie[]) => (this.movies = data))
    );
  }

  getMovieByIdFromApi(id: number) {
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${this.apiKey}`;
    const cashedMovie = this.movies.find((movie) => movie.id === id);
    return this.http.get(url).pipe(
      map(
        (movie: any) =>
          ({
            id: movie.id,
            title: movie.title,
            genre: movie.original_language || 'Unknown',
            description: movie.overview,
            year: movie.release_date,
            poster: 'https://image.tmdb.org/t/p/w342' + movie.poster_path,
            isFavorite: cashedMovie ? cashedMovie.isFavorite : false,
          } as Movie)
      )
    );
  }
  // movies = [
  //   {
  //     id: 1,
  //     title: 'The Matrix',
  //     year: 1999,
  //     genre: 'Sci-Fi',
  //     description: 'Lorem...',
  //     image: 'https://picsum.photos/200/300',
  //     isFavorite: false,
  //   },
  //   {
  //     id: 2,
  //     title: 'Inception',
  //     year: 2010,
  //     genre: 'Sci-Fi',
  //     description: 'Lorem...',
  //     image: 'https://picsum.photos/200/300',
  //     isFavorite: false,
  //   },
  // ];

  getMovieById(id: number) {
    return this.movies.find((movie) => movie.id === id);
  }

  toggleFavorite(id: number) {
    const findMovie = this.movies.find((movie) => movie.id === id);
    if (findMovie) findMovie.isFavorite = !findMovie.isFavorite;
    // console.log(findMovie?.isFavorite);
    localStorage.setItem('movies_cache', JSON.stringify(this.movies));
  }
}
