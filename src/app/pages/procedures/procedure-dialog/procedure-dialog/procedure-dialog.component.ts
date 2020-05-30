import { Component, OnInit, Inject, InjectionToken } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CrudService } from 'src/app/services/services.index';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SnackbarComponent } from 'src/app/shared/snackbar/snackbar.component';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-procedure-dialog',
  templateUrl: './procedure-dialog.component.html',
  styleUrls: ['./procedure-dialog.component.scss']
})
export class ProcedureDialogComponent implements OnInit {

  // Form groups
  form_group: FormGroup;

  // Strings
  dialog_title = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private httpService: CrudService,
    public dialogRef: MatDialogRef<ProcedureDialogComponent>,
    private _snackBar: MatSnackBar
  ) {
    this.form_group = new FormGroup({
      description: new FormControl(null, [Validators.required, Validators.maxLength(255)])
    });
    this.dialog_title = dialogData.title;
  }

  ngOnInit() {
    if (this.dialogData.data) {
      this.form_group.get('description').setValue(this.dialogData.data.description);
    }
  }

  isEdit() {
    if (this.dialogData.data) {
      this.update();
    } else {
      this.save();
    }
  }

  save() {
    this.httpService.create('pages/procedimientos', this.form_group.value).subscribe((res: any) => {
      if (res.code === 200) {
        this.dialogRef.close();
        this.openSnackBar('Registro exitoso.', 'success');
      } else {
        this.openSnackBar('Ocurrió un error.', 'error');
      }
    }, err => {
      this.openSnackBar('Ocurrió un error.', 'error');
    });
  }

  update() {
    this.httpService.update('pages/procedimientos', this.dialogData.data.id, this.form_group.value).subscribe(
      (res: any) => {
        if (res.code === 200) {
          this.dialogRef.close();
          this.openSnackBar('Actualización exitosa.', 'success');
        } else {
          this.openSnackBar('Ocurrió un error.', 'error');
        }
      },
      error => {
        this.openSnackBar('Ocurrió un error.', 'error');
      }
    );
  }

  openSnackBar(msg, type) {
    this._snackBar.openFromComponent(SnackbarComponent, {
      data: {
        message: msg,
        type: type
      },
      duration: 5 * 1000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      // panelClass: 'background-snackbar-white'
    });

    // this._snackBar.open('Message archived', 'Undo', {
    //   duration: 3000,
    //   horizontalPosition: 'center',
    //   verticalPosition: 'top'
    // });
  }

}
