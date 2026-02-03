import { Component, OnInit } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Movie } from '../../interfaces/movie';
import { MoviesService } from '../../services/movies.service';

import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-movies-page',
  imports: [
    RouterLink,
    FormsModule,
    MatButton,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatIconModule,
  ],
  templateUrl: './movies-page.component.html',
  styleUrl: './movies-page.component.scss',
})
export class MoviesPageComponent implements OnInit {
  movies: Movie[] = [];
  filteredMovies: Movie[] = [];
  constructor(private movieService: MoviesService) {}
  ngOnInit(): void {
    this.movieService.getMovieFromApi().subscribe((data: Movie[]) => {
      this.movies = data;
      this.filteredMovies = data;
    });
  }

  searchTerm: string = '';
  filterMovies() {
    console.log('Фільтрація запущена');
    const term = this.searchTerm.trim().toLowerCase();

    this.filteredMovies = this.movies.filter((movie) =>
      movie.title.toLowerCase().includes(term)
    );
  }
  toggleFavorite(id: number) {
    this.movieService.toggleFavorite(id);
  }
}
