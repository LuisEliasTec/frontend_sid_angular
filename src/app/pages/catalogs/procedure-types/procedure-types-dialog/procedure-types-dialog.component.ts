import { Component, OnInit, Inject, InjectionToken } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CrudService } from 'src/app/services/services.index';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SnackbarComponent } from 'src/app/shared/snackbar/snackbar.component';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { ProcedureTypesComponent } from '../procedure-types.component';

@Component({
  selector: 'app-procedure-types-dialog',
  templateUrl: './procedure-types-dialog.component.html',
  styleUrls: ['./procedure-types-dialog.component.scss']
})
export class ProcedureTypesDialogComponent implements OnInit {

  // Form groups
  form_group: FormGroup;

  // Strings
  dialog_title = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private httpService: CrudService,
    public dialogRef: MatDialogRef<ProcedureTypesComponent>,
    private _snackBar: MatSnackBar
  ) {
    this.form_group = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.maxLength(255)])
    });
    this.dialog_title = dialogData.title;
  }

  ngOnInit() {
    if (this.dialogData.data) {
      this.form_group.get('name').setValue(this.dialogData.data.name);
    }
    console.log(this.dialogData)
  }

  isEdit() {
    if (this.dialogData.data) {
      this.update();
    } else {
      this.save();
    }
  }

  save() {
    this.httpService.create(this.dialogData.path, this.form_group.value).subscribe((res: any) => {
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
    this.httpService.update(this.dialogData.path, this.dialogData.data.id, this.form_group.value).subscribe(
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
