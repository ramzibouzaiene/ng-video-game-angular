import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { env } from 'process';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { APIResponse, Game } from '../models';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  BASE_URL=environment.BASE_URL;

  constructor(private http:HttpClient) { }

  getGameList(
    ordering: string,
    search?: string,
  ):Observable<APIResponse<Game>>{
    let params = new HttpParams().set('ordering', ordering);

    if(search) {
      params = new HttpParams().set('ordering', ordering).set('search', search);
    }

    return this.http.get<APIResponse<Game>>(`${this.BASE_URL}/games`, {
      params : params,
    });
  }

  getGameDetails(id: string){
    const gameInfoRequest = this.http.get(`${this.BASE_URL}/games/${id}`);
    const gameTrailersRequest = this.http.get(`${this.BASE_URL}/games/${id}/movies`);
    const gameScreenshotsRequest = this.http.get(`${this.BASE_URL}/games/${id}/screenshots`);

    return forkJoin({
      gameInfoRequest,
      gameTrailersRequest,
      gameScreenshotsRequest
    }).pipe(
      map((resp: any) => {
        return {
          ...resp['gameInfoRequest'],
          screenshots: resp['gameScreenshotsRequest']?.results,
          trailers: resp['gameTrailersRequest']?.results,
        };
      })
    );
  }
}
