import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Card } from '../../models/card';

@Component({
  selector: 'app-card-card',
  templateUrl: './card-card.component.html',
  styleUrls: ['./card-card.component.scss']
})
export class CardCardComponent implements OnInit{

  @Input() selectedCard: Card;

  @Output() received: EventEmitter<boolean> = new EventEmitter<boolean>()

  ngOnInit(): void {
        this.received.emit(true);
  }

}
