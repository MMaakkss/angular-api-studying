import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUserData } from '../../Models/user';

@Injectable({
  providedIn: 'root',
})
export class UsersServices {
  constructor(private http: HttpClient) {}

  getUsers(): Observable<IUserData> {
    return this.http.get<IUserData>('https://randomuser.me/api', {
      params: new HttpParams({
        fromObject: {
          results: '12',
        },
      }),
    });
  }
}
