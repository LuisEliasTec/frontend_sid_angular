import { Component, OnInit, Inject, InjectionToken } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CrudService } from 'src/app/services/services.index';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SnackbarComponent } from 'src/app/shared/snackbar/snackbar.component';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { GENDER } from "src/app/utils/enums/genders.enum";
import { MARITAL_STATUS } from "src/app/utils/enums/marital_status.enum";
import { REQUEST } from 'src/app/utils/enums/request.enum';

@Component({
  selector: 'app-patients-dialog',
  templateUrl: './patients-dialog.component.html',
  styleUrls: ['./patients-dialog.component.scss']
})
export class PatientsDialogComponent implements OnInit {

  // Form groups
  formGroup: FormGroup;

  // Strings
  dialog_title = '';

  // Objects
  genders = [
    { value: GENDER.MASCULINO },
    { value: GENDER.FEMENINO },
  ];

  marital_status = [
    { value: MARITAL_STATUS.CASADO },
    { value: MARITAL_STATUS.COMPROMETIDO },
    { value: MARITAL_STATUS.DIVORCIADO },
    { value: MARITAL_STATUS.EN_RELACION },
    { value: MARITAL_STATUS.NOVIAZGO },
    { value: MARITAL_STATUS.SEPARADO },
    { value: MARITAL_STATUS.SOLTERO },
    { value: MARITAL_STATUS.UNION_LIBRE },
    { value: MARITAL_STATUS.VIUDO }
  ];

  // Arrays
  countries = [];
  states = [];

  // Booleans
  is_mexico = null;

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private httpService: CrudService,
    public dialogRef: MatDialogRef<PatientsDialogComponent>,
    private _snackBar: MatSnackBar
  ) {
    console.log(dialogData);
    this.formGroup = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.maxLength(255)]),
      last_name_f: new FormControl(null, [Validators.required, Validators.maxLength(255)]),
      last_name_m: new FormControl(null, [Validators.required, Validators.maxLength(255)]),
      birth_date: new FormControl(null, [Validators.required]),
      age: new FormControl(null, [Validators.required]),
      gender: new FormControl(null, [Validators.required]),
      phone_number: new FormControl(null, [Validators.required]),
      optional_phone_number: new FormControl(null, []),
      email: new FormControl(null, [Validators.required, Validators.maxLength(255)]),
      optional_email: new FormControl(null, [Validators.maxLength(255)]),
      marital_status: new FormControl(null, [Validators.required]),
      number_children: new FormControl(null, [Validators.required]),
      // address_id: new FormControl(null, []),
      // zip_code: new FormControl(null, [])
      
      country: new FormControl(null, [Validators.required]),
      state: new FormControl(null, [Validators.required]),
      city: new FormControl(null, [Validators.required]),
      address: new FormControl(null, [Validators.required]),
      is_mexico: new FormControl(null, [])
    });
    this.dialog_title = dialogData.title;
    this.getCountries();
  }

  ngOnInit() {
    // if (this.dialogData.data) {
    //   this.formGroup.get('description').setValue(this.dialogData.data.description);
    // }
  }

  isEdit() {
    if (this.dialogData.data) {
      this.update();
    } else {
      this.save();
    }
  }

  save() {
    const data = this.formGroup.value;
    data.address_id = 1;
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

  searchByZipCodes() {
    this.httpService.getAll(REQUEST.ZIP_CODES, this.formGroup.value).subscribe(
      (res: any) => {
        if (res.code === 200) {
          console.log(res.data);
          this.openSnackBar('Acción exitosa.', 'success');
        } else {
          this.openSnackBar('Ocurrió un error.', 'error');
        }
      },
      error => {
        this.openSnackBar('Ocurrió un error.', 'error');
      }
    );
  }

  getCountries() {
    this.httpService.getAll(REQUEST.COUNTRIES).subscribe(
      (res: any) => {
        if (res.code === 200) {
          console.log(res.data);
          this.countries = res.data;
          this.openSnackBar('Acción exitosa.', 'success');
        } else {
          this.openSnackBar('Ocurrió un error.', 'error');
        }
      },
      error => {
        this.openSnackBar('Ocurrió un error.', 'error');
      }
    );
  }

  getStatesByCountry(event) {
    this.is_mexico = event.value.name === 'Mexico' ? true : false;
    this.formGroup.get('is_mexico').setValue(this.is_mexico);
    this.httpService.getAll(REQUEST.STATES, event.value).subscribe(
      (res: any) => {
        if (res.code === 200) {
          if (res.data.length > 0) {
            this.states = res.data;
          } else {
            this.formGroup.get('state').reset();
          }
        } else {
          this.openSnackBar('Ocurrió un error.', 'error');
        }
      },
      error => {
        this.openSnackBar('Ocurrió un error.', 'error');
      }
    );
  }

}
