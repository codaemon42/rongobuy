import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Homepage, HomepageRes } from '../models/homepage.model';
import { catchError, take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HomepageService {

  private _homepage = new BehaviorSubject<Homepage[]>([]);

  constructor(
    private http: HttpClient
  ) { }

  get homepage() {
    return this._homepage.asObservable();
  }

  fetchHomepage() {
    this.http.get<HomepageRes>(`${environment.url.base}/homepage`).pipe(
      take(1),
      tap(res=>{
        this._homepage.next(res.data);
      }),
      // catchError((err=>{
      //   console.log(err);
      // })
    );
  }
}
