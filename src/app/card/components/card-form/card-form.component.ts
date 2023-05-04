import { CardService } from '../../services/card.service';
import { Card } from '../../models/card';
import { Component, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface CardFormData {
  isCreateForm: boolean;
  card: Card;
}

@Component({
  selector: 'app-card-form',
  templateUrl: './card-form.component.html',
  styleUrls: ['./card-form.component.scss']
})
export class CardFormComponent implements OnDestroy {

  private destroy$: Subject<boolean> = new Subject<boolean>();

  cardTypes: string[] = [
    'Magie',
    'Piège',
    'Monstre'
  ];

  cardForm = this.fb.group({
    id: [0, [Validators.required]],
    cardName: ['', [Validators.required]],
    cardType: ['', [Validators.required]],
    cardDescription: ['', [Validators.required]],
    utilisateur: [0, [Validators.required]],
    cardUrl: ['', [Validators.required]]
  });

  constructor(public dialogRef: MatDialogRef<CardFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CardFormData, private fb: FormBuilder, 
    private cardService : CardService, 
    private _snackBar: MatSnackBar) {

      if(!data.isCreateForm){
        this.setCardForm(data.card);
      }

      this.cardForm.get('cardType')?.valueChanges.subscribe(value => {
        switch(value){
          case 'Magie':
            this.cardForm.get('cardUrl')?.setValue('url_magie');
            break;
          case 'Piège':
            this.cardForm.get('cardUrl')?.setValue('url_piege');
            break;
          case 'Monstre':
            this.cardForm.get('cardUrl')?.setValue('url_monstre');
            break;
          default:
            this.cardForm.get('cardUrl')?.setValue('');
            break;
        }
      });

  }
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  setCardForm(card: Card) {
    this.cardForm.setValue({
      id: card.id,
      cardName: card.cardName,
      cardType: card.cardType,
      cardDescription: card.cardDescription, 
      utilisateur: card.utilisateur, 
      cardUrl: card.cardUrl
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
    if(this.cardForm.valid){
      if(this.data.isCreateForm){
        this.cardForm.value.id = Date.now() + Math.random();
        this.cardService.create(this.cardForm.value as Card)
        .pipe(takeUntil(this.destroy$))
        .subscribe(result => {
          this._snackBar.open(result, '', {
            duration: 2000,
            panelClass: ['bg-success']
          });

          this.dialogRef.close(true);
        });
      }else{
        this.cardService.update(this.cardForm.value as Card)
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
