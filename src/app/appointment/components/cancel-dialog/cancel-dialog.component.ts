import { Component, Inject } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogContent,
  MatDialogActions,
  MatDialogTitle
} from '@angular/material/dialog';
import {MatIcon} from "@angular/material/icon";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {MatInput} from "@angular/material/input";
import {MatButton, MatIconButton} from "@angular/material/button";
import {NgIf} from "@angular/common";


@Component({
  selector: 'app-cancel-dialog',
  standalone: true,
  imports: [
    MatIcon,
    MatDialogContent,
    MatFormField,
    MatDialogActions,
    FormsModule,
    MatInput,
    MatButton,
    MatLabel,
    MatIconButton,
    MatDialogTitle,
    MatError,
    NgIf
  ],
  templateUrl: './cancel-dialog.component.html',
  styleUrl: './cancel-dialog.component.css'
})
export class CancelDialogComponent {
  reason: string = '';

  constructor(
    public dialogRef: MatDialogRef<CancelDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }

  onConfirm(): void {
    this.dialogRef.close(this.reason);
  }

}
