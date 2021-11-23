import { take, tap } from 'rxjs/operators';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Homepage, HomepageRes } from 'src/app/models/homepage.model';

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

  fetchHomePage() {
    return this.http.get<HomepageRes>(`${environment.url.base}/homepage`).pipe(
      take(1),
      tap(res => {
        console.log('homepage : ', res);
        this._homepage.next(res.data);
      })
    );
  }
}
