import { Component, OnDestroy, OnInit } from '@angular/core';
import { Card } from '../../models/card';
import { CardService } from '../../services/card.service';
import { Observable, Subject, takeUntil } from 'rxjs';
import { GenericPopupComponent } from 'src/app/shared/components/generic-popup/generic-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CardFormComponent } from '../../components/card-form/card-form.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss'],
  
})
export class CardListComponent implements OnInit, OnDestroy {
  
  private destroy$: Subject<boolean> = new Subject<boolean>();

  displayedColumns: string[] = ['cardName', 'cardType', 'cardDescription', 'utilisateur', 'update', 'delete'];

  cards$: Observable<Card[]>;
 
  constructor(private cardService: CardService, 
    private dialog: MatDialog, 
    private _snackBar: MatSnackBar, 
    private router: Router){
 
 
  }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.cards$ = this.cardService.get();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  openCardForm(card?: Card) {
    const dialogRef = this.dialog.open(CardFormComponent, {
      height: '85%',
      width: '60%',
      data: {
        isCreateForm: card ? false : true,
        card: card ? card : undefined
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
          this.cardService.delete(id)
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

  showCardDetails(cardId: number){
    this.router.navigate(['/cards/'+cardId])
  }
 
  }
