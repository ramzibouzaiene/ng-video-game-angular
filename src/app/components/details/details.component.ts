import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { Game } from 'src/app/models';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, OnDestroy {
  gameRating:any = 0;
  gameId: string;
  routeSub: Subscription;
  gameSub: Subscription;
  game: Game;

  constructor(
    private activatedRoute: ActivatedRoute,
    private httpService: HttpService
  ) { }

  ngOnInit() {
    this.routeSub = this.activatedRoute.params.subscribe((params: Params) =>{
      this.gameId = params['id'];
      this.getGameDetails(this.gameId)
    })
  }

  getColor(value: number): any{
    if(value > 75 ){
      return '#5ee432';
    }else if(value > 50){
      return '#fffa50';
    }else if(value > 30){
      return '#f7aa38';
    }else {
      return '#ef4655';
    }
  }

  getGameDetails(id: string): any{
    this.gameSub = this.httpService.getGameDetails(id).subscribe((gameResp: Game) =>{
      this.game = gameResp;

      setTimeout(() => {
        this.gameRating = this.game.metacritic;
      }, 1000)
    })
  }

  ngOnDestroy(): void {
    if(this.routeSub){
      this.routeSub.unsubscribe()
    }

    if(this.gameSub){
      this.gameSub.unsubscribe()
    }
  }

}
