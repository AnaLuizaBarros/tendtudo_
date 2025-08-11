import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../../models/user.model';
import { environment } from '../../environments/environment';
import { handleError } from '../../utils/error-handler';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  register(userData: User): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}/users/add`, userData)
      .pipe(catchError(handleError));
  }
}
