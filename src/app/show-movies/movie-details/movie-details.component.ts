import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MovieService} from '../../movie.service';
import {Movies} from '../../movies';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {
  // @Input() selectedMovie: Movies;
  public info: any;

  constructor(private movieServer: MovieService) {
  }

  ngOnInit() {
    this.info = this.movieServer.currentMovie;
  }

  goBack() {
    window.history.back();
  }
}
