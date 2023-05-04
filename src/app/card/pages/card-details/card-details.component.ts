import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardService } from '../../services/card.service';
import { Card } from '../../models/card';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'app-card-details',
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.scss']
})
export class CardDetailsComponent implements OnInit{

  cardId: number;
  card$: Observable<Card>

  constructor(private route: ActivatedRoute, private cardService: CardService, private location: Location){
    /* route.params.subscribe(params => {
      this.cardId = params['id'];
    });*/

    this.cardId = +this.route.snapshot.paramMap.get('id') ;
  }

  ngOnInit(): void {
    if(this.cardId){
      this.card$ = this.cardService.getById(this.cardId);
    }
  }

  goBack() {
    this.location.back()
  }

  showReceivedValue(value: boolean) {
    console.log(value);
  }
}
