import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import { Observable } from 'rxjs';

@Injectable(

)
export class UserService {

  constructor(private http: HttpClient) { }


 get() : Observable<User[]>{
  return this.http.get<User[]>(environment.iutApiBaseUrl+"/users");
 }

 delete(id: number): Observable<string>{
  return this.http.delete<string>(environment.iutApiBaseUrl+"/users/"+id);
 }

 update(user: User): Observable<string>{
  return this.http.put<string>(environment.iutApiBaseUrl+"/users/"+user.id, user);
}

create(user: User): Observable<string>{
  return this.http.post<string>(environment.iutApiBaseUrl+"/users", user);
}

getById(id: number): Observable<User>{
  return this.http.get<User>(environment.iutApiBaseUrl+"/users/"+id)
}
}
