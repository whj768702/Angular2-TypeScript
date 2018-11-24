import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

import {Hero} from '../../hero';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {HeroService} from '../../services/hero.service';

@Component({
  selector: 'sg-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit {
  heroes: Observable<Hero[]>;
  private searchTerms = new Subject<string>();

  constructor(
    private router: Router,
    private heroService: HeroService) {
  }

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.heroes = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.heroService.searchHeroes(term))
    );
    // this.heroes = this.searchTerms
    //     .debounceTime(300)        // wait for 300ms pause in events
    //     .distinctUntilChanged()   // ignore if next search term is same as previous
    //     .switchMap(term => term   // switch to new observable each time
    //         return the http search observable
    // ? this.heroSearchService.search(term)
    // or the observable of empty heroes if no search term
    // : Observable.of<Hero[]>([]))
    // .catch(error => {
    //     TODO: real error handling
    // console.log(error);
    // return Observable.of<Hero[]>([]);
    // });
  }

  gotoDetail(hero: Hero): void {
    const link = ['/detail', hero.id];
    this.router.navigate(link);
  }
}
