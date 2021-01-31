import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MovieService} from '../movie.service';
import {Movies} from '../movies';
import {Subscription} from 'rxjs';
import {debounceTime, map} from 'rxjs/operators';

@Component({
  selector: 'app-show-movies',
  templateUrl: './show-movies.component.html',
  styleUrls: ['./show-movies.component.css']
})
export class ShowMoviesComponent implements OnInit {
  movie: Movies[] = [];
  notFoundSearchResult: boolean = false;
  genreType: string[] = [];
  genresMap: any;
  currentGenres: any = {};
  subscription: Subscription;
  keywords: string = '';

  constructor(private movieService: MovieService,
  ) {
    if (this.movieService.movieList && this.movieService.movieList.length > 0) {
      this.handleGenres(this.movieService.movieList);
      this.selectedGenre(this.movieService.currentGenres || 'All');
    } else {
      this.resetSearch();
    }
  }


  ngOnInit() {
  }

  handleGenres(data: Movies[]): void {
    this.movieService.movieList = JSON.parse(JSON.stringify(data));
    this.notFoundSearchResult = data.length === 0;

    const genresMap = {};
    const genresSet = {};

    data.forEach((item) => {

      const {genres} = item;
      genres.forEach((genre: string) => {
        if (!genresMap[genre]) {
          genresMap[genre] = {genre, list: []};
        }
        genresMap[genre].list.push(item);
        genresSet[genre] = genre;
      });
    });
    genresMap['All'] = {genre: 'All', list: this.movieService.movieList};
    this.genresMap = genresMap;
    this.currentGenres = genresMap['All'];
    this.genreType = Object.keys(genresSet).sort();
    this.genreType.unshift('All');

  }


  selectedGenre(genre: any): void {
    this.currentGenres = this.genresMap[genre];
    this.movieService.currentGenres = genre;

  }

  resetSearch(keyword: string = '', clearKeyword: boolean = false): void {
    if (clearKeyword) {
      this.keywords = '';
    }
    this.movieService.getMovies(keyword).subscribe((data: Movies[]) => {
      this.handleGenres(data);
      this.selectedGenre('All');

    });
  }

  getMovieByName(keyword: string) {
    this.subscription = this.movieService.getMovies(keyword)
      .pipe(debounceTime(300))
      .subscribe(result => this.resetSearch(keyword)
      );

  }
}
