import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { Observable, Subject, takeUntil } from 'rxjs';
import { GenericPopupComponent } from 'src/app/shared/components/generic-popup/generic-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserFormComponent } from '../../components/user-form/user-form.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  
})
export class UserListComponent implements OnInit, OnDestroy {
  
  private destroy$: Subject<boolean> = new Subject<boolean>();

  displayedColumns: string[] = ['name', 'origine', 'update', 'delete'];

  users$: Observable<User[]>;
 
  constructor(private userService: UserService, 
    private dialog: MatDialog, 
    private _snackBar: MatSnackBar, 
    private router: Router){
 
 
  }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.users$ = this.userService.get();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  openUserForm(user?: User) {
    const dialogRef = this.dialog.open(UserFormComponent, {
      height: '85%',
      width: '60%',
      data: {
        isCreateForm: user ? false : true,
        user: user ? user : undefined
      }
    });

    dialogRef.afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => {
        if (result) {
          this.fetchData();
        }
      });
  }

  delete(id: number) {
    const ref = this.dialog.open(GenericPopupComponent, {
      data: {
        title: 'Confirmation de suppression',
        message: 'êtes-vous sûr de vouloir supprimer cet étudiant ?',
        typeMessage: 'none',
        yesButtonVisible: true,
        noButtonVisible: true,
        cancelButtonVisible: false,
        defaultButton: 'No',
        yesButtonLabel: 'Oui',
        noButtonLabel: 'Non',
      },
    })

    ref.afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => {
        if (result) {
          this.userService.delete(id)
            .pipe(takeUntil(this.destroy$))
            .subscribe(result => {
              this._snackBar.open(result, '', {
                duration: 2000,
                panelClass: ['bg-success']
              });
              this.fetchData();
            });
        }
      });
  }

  showUserDetails(userId: number){
    this.router.navigate(['/users/'+userId])
  }
 
  }
