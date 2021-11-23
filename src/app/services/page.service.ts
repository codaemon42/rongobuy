import { PageRes } from './../models/page.model';
import { environment } from './../../environments/environment';
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
    return this.http.get<PageRes>(`${environment.url.base}/single-page/${slug}`).pipe(
      take(1),
      tap((pageRes)=>{
        this._page.next(pageRes.data);
      })
    );
  }
}
