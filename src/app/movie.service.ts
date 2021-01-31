import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {groupBy, pluck} from 'rxjs/operators';
import {Movies} from './movies';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  headers = new HttpHeaders({
    Authorization: 'Bearer Wookie2019',
  });
  private movie: Movies;
  public currentGenres: Movies[];
  public movieList: Movies[] = [];
  constructor(private httpClient: HttpClient) {
  }

  get currentMovie() {
    const data = window.localStorage.getItem('currentMovie');
    if (!data) {
      return null;
    }
    return JSON.parse(data);
  }

  set currentMovie(val: any) {
    this.movie = val;
    window.localStorage.setItem('currentMovie', JSON.stringify(val));
  }

  getMovies(keyword: string = null): Observable<any> {
    let url = 'https://wookie.codesubmit.io/movies';
    if (keyword) {
      url = `${url}?q=${keyword}`;
    }
    return this.httpClient.get<Movies[]>(url,
      {headers: this.headers}
    ).pipe(
      pluck('movies'),
    );
  }


}
