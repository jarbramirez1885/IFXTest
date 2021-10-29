import { Component, OnInit, ViewChild, Inject, Input } from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  @Input()
  icon: string = '';

  @Input()
  message: string = '';

  @Input()
  cancelVisible: boolean = false;

  @ViewChild('btnOK', { static: false }) btnOK!: MatButton;
  @ViewChild('btnCancel', { static: false }) btnCancel!: MatButton;

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.data = data;
  }

  ngOnInit(): void {
    this.icon = this.data.icon;
    this.message = this.data.message;
    this.cancelVisible = this.data.opc;
  }

  clickOk() {
    this.dialogRef.close(true);
  }

  clickCancel() {
    this.dialogRef.close(false);
  }

}
