import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Card } from '../models/card';
import { Observable } from 'rxjs';

@Injectable(

)
export class CardService {

  constructor(private http: HttpClient) { }


 get() : Observable<Card[]>{
  return this.http.get<Card[]>(environment.iutApiBaseUrl+"/cards");
 }

 delete(id: number): Observable<string>{
  return this.http.delete<string>(environment.iutApiBaseUrl+"/cards/"+id);
 }

 update(card: Card): Observable<string>{
  return this.http.put<string>(environment.iutApiBaseUrl+"/cards/"+card.id, card);
}

create(card: Card): Observable<string>{
  return this.http.post<string>(environment.iutApiBaseUrl+"/cards", card);
}

getById(id: number): Observable<Card>{
  return this.http.get<Card>(environment.iutApiBaseUrl+"/cards/"+id)
}
}
