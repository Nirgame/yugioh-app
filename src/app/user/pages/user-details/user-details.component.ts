import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit{

  userId: number;
  user$: Observable<User>

  constructor(private route: ActivatedRoute, private userService: UserService, private location: Location){
    /* route.params.subscribe(params => {
      this.userId = params['id'];
    });*/

    this.userId = +this.route.snapshot.paramMap.get('id') ;
  }

  ngOnInit(): void {
    if(this.userId){
      this.user$ = this.userService.getById(this.userId);
    }
  }

  goBack() {
    this.location.back()
  }

  showReceivedValue(value: boolean) {
    console.log(value);
  }
}
