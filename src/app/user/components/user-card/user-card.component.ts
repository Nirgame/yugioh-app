import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '../../models/user';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit{

  @Input() selectedUser: User;

  @Output() received: EventEmitter<boolean> = new EventEmitter<boolean>()

  ngOnInit(): void {
        this.received.emit(true);
  }

}
