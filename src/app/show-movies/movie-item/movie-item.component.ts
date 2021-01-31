import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MovieService} from '../../movie.service';

@Component({
  selector: 'app-movie-item',
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.css']
})
export class MovieItemComponent implements OnInit {
  @Input() info: any;
  constructor(private router: Router,
              private moviesService: MovieService,
             ) {
  }

  ngOnInit() {
  }

  showDetails(item: any): void {
    this.moviesService.currentMovie = item;
    this.router.navigate(['/movie-details']);
  }
}
