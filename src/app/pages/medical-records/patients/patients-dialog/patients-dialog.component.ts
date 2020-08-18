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
  is_mexico: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private httpService: CrudService,
    public dialogRef: MatDialogRef<PatientsDialogComponent>,
    private _snackBar: MatSnackBar
  ) {
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
    if (this.dialogData.data) {
      console.log('dialogData', this.dialogData.data);

      this.formGroup.get('name').setValue(this.dialogData.data.name);
      this.formGroup.get('last_name_f').setValue(this.dialogData.data.last_name_f);
      this.formGroup.get('last_name_m').setValue(this.dialogData.data.last_name_m);
      this.formGroup.get('birth_date').setValue(this.dialogData.data.birth_date);
      this.formGroup.get('age').setValue(this.dialogData.data.age);
      this.formGroup.get('gender').setValue(this.dialogData.data.gender);
      this.formGroup.get('phone_number').setValue(this.dialogData.data.phone_number);
      this.formGroup.get('optional_phone_number').setValue(this.dialogData.data.optional_phone_number);
      this.formGroup.get('email').setValue(this.dialogData.data.email);
      this.formGroup.get('optional_email').setValue(this.dialogData.data.optional_email);
      this.formGroup.get('marital_status').setValue(this.dialogData.data.marital_status);
      this.formGroup.get('number_children').setValue(this.dialogData.data.number_children);
      this.formGroup.get('country').setValue(this.dialogData.data.address.country_id);
      if (this.dialogData.data.address.country_id) {
        this.getStatesByCountry(this.dialogData.data.address.country_id);
      }
      console.log('this.dialogData.data.address.state_id', this.dialogData.data.address.state_id);

      if (this.dialogData.data.address.state_id == null) {
        console.log('es null');
        this.formGroup.get('state').setValue(this.dialogData.data.address.state);
        // this.formGroup.get('state').setValue('Ñañañaña');
        this.is_mexico = false;
      } else {
        console.log('es null');
        this.formGroup.get('state').setValue(this.dialogData.data.address.state_id);
        this.is_mexico = true;
      }
      this.formGroup.get('city').setValue(this.dialogData.data.address.city);
      this.formGroup.get('address').setValue(this.dialogData.data.address.address);
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
          this.countries = res.data;
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
    console.log('getStatesByCountry', event);

    this.isMexico();

    // this.is_mexico = event.value.name === 'Mexico' ? true : false;
    // this.formGroup.get('is_mexico').setValue(this.is_mexico);
    this.httpService.getBy(REQUEST.STATES, event).subscribe(
      (res: any) => {
        if (res.code === 200) {
          if (res.data.length > 0) {
            this.states = res.data;
          } else {
            // this.formGroup.get('state').reset();
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

  isMexico() {
    console.log('inicio en isMexico', this.formGroup.get('country').value);

    if (this.formGroup.get('country').value) {
      const result = this.countries.filter(country =>
        country.id == this.formGroup.get("country").value);

      if (result.length > 0) {
        if (result[0].name === 'Mexico') {
          this.is_mexico = true;
        } else {
          this.is_mexico = false;
        }
      }

      console.log('isMexico boolean', this.is_mexico);
      console.log('isMexico result', result);

      // if (this.dialogData.data) {
      //   if (this.is_mexico) {
      //     this.formGroup.get('state').setValue(this.dialogData.data.address.state_id);
      //   } else {
      //     this.formGroup.get('state').setValue(this.dialogData.data.address.state);
      //   }
      // }

      this.formGroup.get('is_mexico').setValue(this.is_mexico);
    }
  }

  resetStateForm() {
    this.formGroup.get('state').reset();
  }

}
