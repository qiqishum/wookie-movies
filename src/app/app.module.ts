import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {ShowMoviesComponent} from './show-movies/show-movies.component';
import {MovieService} from './movie.service';
import {NavBarComponent} from './nav-bar/nav-bar.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {LandingPageComponent} from './landing-page/landing-page.component';
import { AppRoutingModule } from './app-routing.module';
import { MovieDetailsComponent } from './show-movies/movie-details/movie-details.component';
import { MovieItemComponent } from './show-movies/movie-item/movie-item.component';

@NgModule({
  declarations: [
    AppComponent,
    ShowMoviesComponent,
    NavBarComponent,
    LandingPageComponent,
    MovieDetailsComponent,
    MovieItemComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: '', component: LandingPageComponent},
      {path: 'show-movies', component: ShowMoviesComponent},
      {path: 'movie-details', component: MovieDetailsComponent}

      ]),
    AppRoutingModule,
    RouterModule,
  ],
  providers: [MovieService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
