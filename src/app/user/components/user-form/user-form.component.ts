import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { Component, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface UserFormData {
  isCreateForm: boolean;
  user: User;
}

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnDestroy {

  private destroy$: Subject<boolean> = new Subject<boolean>();

  Origines: string[] = [
    'YuGiOh', 
    'YuGiOh Gx', 
    'YuGiOh 5ds', 
    'YuGiOh Arc-V', 
    'YuGiOh Zexal'
  ];

  userForm = this.fb.group({
    id: [0, [Validators.required]],
    name: ['', [Validators.required]],
    origine: ['', [Validators.required]],
    userUrl: ['', [Validators.required]]
  });

  constructor(public dialogRef: MatDialogRef<UserFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserFormData, private fb: FormBuilder, 
    private userService : UserService, 
    private _snackBar: MatSnackBar) {

      if(!data.isCreateForm){
        this.setUserForm(data.user);
      }

      this.userForm.get('origine')?.valueChanges.subscribe(value => {
        switch(value){
          case 'YuGiOh':
            this.userForm.get('userUrl')?.setValue('url_magie');
            break;
          case 'YuGiOh Gx':
            this.userForm.get('userUrl')?.setValue('url_piege');
            break;
          case 'YuGiOh 5ds':
            this.userForm.get('userUrl')?.setValue('url_monstre');
            break;
          default:
            this.userForm.get('userUrl')?.setValue('url');
            break;
        }
      });

  }
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  setUserForm(user: User) {
    this.userForm.setValue({
      id: user.id,
      name: user.name,
      origine: user.origine,
      userUrl: user.userUrl
    });
  }

  get title(){
    if(this.data.isCreateForm){
      return 'Formulaire de création';
    }
    return 'Formulaire de modification';
  }

  get submitBtnName(){
    if(this.data.isCreateForm){
      return 'Ajouter';
    }
    return 'Modifier';
  }

  onSubmit(){
    if(this.userForm.valid){
      if(this.data.isCreateForm){
        this.userForm.value.id = Date.now() + Math.random();
        this.userService.create(this.userForm.value as User)
        .pipe(takeUntil(this.destroy$))
        .subscribe(result => {
          this._snackBar.open(result, '', {
            duration: 2000,
            panelClass: ['bg-success']
          });

          this.dialogRef.close(true);
        });
      }else{
        this.userService.update(this.userForm.value as User)
        .pipe(takeUntil(this.destroy$))
        .subscribe(result => {
          this._snackBar.open(result, '', {
            duration: 2000,
            panelClass: ['bg-success']
          });
          this.dialogRef.close(true);
        });
      }
    }
  }
}
