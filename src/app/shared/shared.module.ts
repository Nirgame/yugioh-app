import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { GenericPopupComponent } from './components/generic-popup/generic-popup.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';




@NgModule({
  declarations: [
    GenericPopupComponent,
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatCardModule,
    MatGridListModule
  ],
  exports: [  
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatDialogModule,
    MatOptionModule,
    MatNativeDateModule,
    MatCardModule,
    MatGridListModule
  ],
})
export class SharedModule { }
