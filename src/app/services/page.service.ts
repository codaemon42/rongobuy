import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { Page } from '../models/page.model';

@Injectable({
  providedIn: 'root'
})
export class PageService {

  _page = new BehaviorSubject<Page>(null);

  constructor(
    private http: HttpClient
  ) { }

  get page() {
    return this._page.asObservable();
  }

  fetchPage(slug){
    return this.http.get(`http://public.rongobuy.com/api/v1/details/Bags-and-Travel`).pipe(
      take(1),
      tap((resData)=>{
        const newPage = {
          id: 2,
          slug: slug,
          title: slug,
          content: `<h3>This is the ${slug} page content</h3>`,
          mainImage: 'mainImage'
        };
        console.log('newPage : ', newPage);
        this._page.next(newPage);
      })
    );
  }
}
