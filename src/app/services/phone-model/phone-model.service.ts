import { HttpClient } from '@angular/common/http';
import { PhoneModel, PhoneModelRes } from './../../models/phoneModels.model';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PhoneModelService {

  _phoneModels = new BehaviorSubject<PhoneModel[]>([]);

  _selectedModel = new BehaviorSubject<PhoneModel>(null);

  constructor(
    private http: HttpClient
  ) { }

  get phoneModel() {
    return this._phoneModels.asObservable();
  }

  get selectedModel(){
    return this._selectedModel.asObservable();
  }

  addSelectedModel(phoneModel: PhoneModel) {
    this._selectedModel.next(phoneModel);
  }

  fetchPhoneModels() {
    return this.http.get<PhoneModelRes>(`${environment.url.base}/phonemodel/all`).pipe(
      take(1),
      tap(modelsRes=>{
        console.log('phone models : ', modelsRes);
        this._phoneModels.next(modelsRes.data.data);
      })
    );
  }
  // https://public.rongobuy.com/api/v1/phonemodel/all
}
