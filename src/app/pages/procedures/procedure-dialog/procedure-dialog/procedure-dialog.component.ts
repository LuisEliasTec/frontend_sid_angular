import { Component, OnInit, Inject, InjectionToken, Output, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CrudService } from 'src/app/services/services.index';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SnackbarComponent } from 'src/app/shared/snackbar/snackbar.component';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { REQUEST } from 'src/app/utils/enums/request.enum';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-procedure-dialog',
  templateUrl: './procedure-dialog.component.html',
  styleUrls: ['./procedure-dialog.component.scss']
})
export class ProcedureDialogComponent implements OnInit {

  // Form groups
  formGroup: FormGroup;

  // Strings
  dialog_title = '';

  // Arrays
  procedure_types = [];
  consulting_rooms = [];

  // Booleans
  is_therapy: boolean; 

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private httpService: CrudService,
    public dialogRef: MatDialogRef<ProcedureDialogComponent>,
    private _snackBar: MatSnackBar
  ) {
    this.formGroup = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.maxLength(255)]),
      description: new FormControl(null, []),
      price: new FormControl(null, []),
      procedure_type: new FormControl(null, [Validators.required]),
      consulting_room: new FormControl(null, [])
    });
    this.dialog_title = dialogData.title;
    this.getProcedureTypes();
    this.getConsultingRooms();
  }

  ngOnInit() {
    if (this.dialogData.data) {
      this.formGroup.get('name').setValue(this.dialogData.data.name);
      this.formGroup.get('description').setValue(this.dialogData.data.description);
      this.formGroup.get('price').setValue(this.dialogData.data.price);
      this.formGroup.get('procedure_type').setValue(this.dialogData.data.procedure_type_id);
      this.formGroup.get('consulting_room').setValue(this.dialogData.data.consulting_rooms);
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
    this.httpService.create(this.dialogData.path, this.formGroup.value).subscribe((res: any) => {
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
    this.httpService.update(this.dialogData.path, this.dialogData.data.id, this.formGroup.value).subscribe(
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

  getProcedureTypes() {
    try {
      this.httpService.getAll(REQUEST.PROCEDURE_TYPES_LIST).subscribe((res: any) => {
        if (res.code === 200) {
          this.procedure_types = res.data;
        } else {
          this.openSnackBar('Ocurrió un error.', 'success');
        }
      }, err => {
        this.openSnackBar('Ocurrió un error.', 'error');
      });
    } catch (error) {
      this.openSnackBar('Ocurrió un error.', 'error');
    }
  }

  getConsultingRooms() {
    try {
      this.httpService.getAll(REQUEST.CONSULTING_ROOMS_LIST).subscribe((res: any) => {
        if (res.code === 200) {
          this.consulting_rooms = res.data;
        } else {
          this.openSnackBar('Ocurrió un error.', 'success');
        }
      }, err => {
        this.openSnackBar('Ocurrió un error.', 'error');
      });
    } catch (error) {
      this.openSnackBar('Ocurrió un error.', 'error');
    }
  }

  isTherapy(event) {
    console.log(this.consulting_rooms);
    const result = this.procedure_types.filter(procedure_type =>
      procedure_type.id === this.formGroup.get("procedure_type").value);

    if (result[0].name === 'Terapia') {
      this.is_therapy = true;
    } else {
      this.is_therapy = false;
    }
  }

}
