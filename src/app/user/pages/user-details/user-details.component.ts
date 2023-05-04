import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';
import { Card } from 'src/app/card/models/card';
import { CardService } from 'src/app/card/services/card.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit{

  userId: number;
  user$: Observable<User>
  cards$: Observable<Card[]>

  constructor(private route: ActivatedRoute, private userService: UserService, private location: Location, private cardService: CardService){
    /* route.params.subscribe(params => {
      this.userId = params['id'];
    });*/

    this.userId = +this.route.snapshot.paramMap.get('id') ;

  }

  ngOnInit(): void {
    if(this.userId){
      this.user$ = this.userService.getById(this.userId);
      this.cards$ = this.cardService.getByUser(this.userId);
    }
  }

  goBack() {
    this.location.back()
  }

  showReceivedValue(value: boolean) {
    console.log(value);
  }
}
