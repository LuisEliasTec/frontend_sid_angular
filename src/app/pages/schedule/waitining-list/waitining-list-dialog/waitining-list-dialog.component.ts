import { Component, OnInit, Inject, InjectionToken } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CrudService } from 'src/app/services/services.index';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SnackbarComponent } from 'src/app/shared/snackbar/snackbar.component';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { GENDER } from "src/app/utils/enums/genders.enum";
import { APPOINTMENT_TYPE, APPOINTMENT_MODALITY, PROCEDURE_TYPE, STATUS_WAITINING_LIST } from "src/app/utils/enums/appointment_parameters.enum";
import { MARITAL_STATUS } from "src/app/utils/enums/marital_status.enum";
import { REQUEST } from 'src/app/utils/enums/request.enum';

@Component({
  selector: 'app-waitining-list-dialog',
  templateUrl: './waitining-list-dialog.component.html',
  styleUrls: ['./waitining-list-dialog.component.scss']
})
export class WaitiningListDialogComponent implements OnInit {

  // Form groups
  formGroup: FormGroup;

  // Strings
  dialog_title = '';

  // Objects
  genders = [
    { value: GENDER.MASCULINO },
    { value: GENDER.FEMENINO },
  ];
  appointment_types = [
    { value: APPOINTMENT_TYPE.VALORACION },
    { value: APPOINTMENT_TYPE.SEGUIMIENTO }
  ];
  appointment_modalities = [
    { value: APPOINTMENT_MODALITY.PRESENCIAL },
    { value: APPOINTMENT_MODALITY.ONLINE },
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
  status_waitining_list = [
    { value: STATUS_WAITINING_LIST.SIN_AGENDAR },
    { value: STATUS_WAITINING_LIST.AGENDADA },
    { value: STATUS_WAITINING_LIST.CANCELADA }
  ];

  // Arrays
  procedure_types = [];
  procedures = [];
  patients = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private httpService: CrudService,
    public dialogRef: MatDialogRef<WaitiningListDialogComponent>,
    private _snackBar: MatSnackBar
  ) {
    this.formGroup = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.maxLength(255)]),
      last_name_f: new FormControl(null, [Validators.required, Validators.maxLength(255)]),
      last_name_m: new FormControl(null, [Validators.required, Validators.maxLength(255)]),
      gender: new FormControl(null, [Validators.required]),
      phone_number: new FormControl(null, [Validators.required]),
      optional_phone_number: new FormControl(null, []),
      email: new FormControl(null, [Validators.required, Validators.maxLength(255)]),
      optional_email: new FormControl(null, [Validators.maxLength(255)]),
      marital_status: new FormControl(null, [Validators.required]),
      number_children: new FormControl(null, []),
      who_recomend: new FormControl(null, []),
      comments: new FormControl(null, []),
      procedure_type: new FormControl(null, [Validators.required]),
      procedure: new FormControl(null, [Validators.required]),
      appointment_type: new FormControl(null, [Validators.required]),
      appointment_modality: new FormControl(null, [Validators.required]),
      status_waitining_list: new FormControl(null, []),
    });
    this.dialog_title = dialogData.title;
    this.getProcedureTypes();
    this.getAllPatients();
  }

  ngOnInit() {
    if (this.dialogData.data) {
      this.formGroup.get('name').setValue(this.dialogData.data.patient.name);
      this.formGroup.get('last_name_f').setValue(this.dialogData.data.patient.last_name_f);
      this.formGroup.get('last_name_m').setValue(this.dialogData.data.patient.last_name_m);
      this.formGroup.get('gender').setValue(this.dialogData.data.patient.gender);
      this.formGroup.get('phone_number').setValue(this.dialogData.data.patient.phone_number);
      this.formGroup.get('optional_phone_number').setValue(this.dialogData.data.patient.optional_phone_number);
      this.formGroup.get('email').setValue(this.dialogData.data.patient.email);
      this.formGroup.get('optional_email').setValue(this.dialogData.data.patient.optional_email);
      this.formGroup.get('marital_status').setValue(this.dialogData.data.patient.marital_status);
      this.formGroup.get('number_children').setValue(this.dialogData.data.patient.number_children);
      this.formGroup.get('who_recomend').setValue(this.dialogData.data.who_recomend);
      this.formGroup.get('comments').setValue(this.dialogData.data.comments);
      this.formGroup.get('procedure_type').setValue(this.dialogData.data.procedure_type.id);
      this.selectProcedureType(this.dialogData.data.procedure_type.id);
      if (this.procedures) {
        this.formGroup.get('procedure').setValue(this.dialogData.data.procedure.id);
      }
      this.formGroup.get('appointment_type').setValue(this.dialogData.data.appointment_type);
      this.formGroup.get('appointment_modality').setValue(this.dialogData.data.appointment_modality);
      this.formGroup.get('status_waitining_list').setValue(this.dialogData.data.status_waitining_list);
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
    data.status_waitining_list = STATUS_WAITINING_LIST.SIN_AGENDAR;
    this.httpService.create(this.dialogData.path, this.formGroup.value).subscribe((res: any) => {
      if (res.code === 200) {
        this.dialogRef.close();
        this.openSnackBar('Registro exitoso.', 'success');
      } else {
        this.openSnackBar(res.message, 'error');
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

  selectProcedureType(event) {
    try {
      this.httpService.getAll(REQUEST.PROCEDURES_BY_PROCEDURE_TYPE, {
        procedure_type_id: event.value ? event.value : event
      }).subscribe((res: any) => {
        if (res.code === 200) {
          this.procedures = res.data;
          if (!this.dialogData.data) {
            this.formGroup.get('procedure').reset();
          }
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

  getAllPatients() {
    try {
      this.httpService.getAll(REQUEST.PATIENTS_LIST).subscribe((res: any) => {
        if (res.code === 200) {
          this.patients = res.data;
          console.log(this.patients);
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

  patientSelected(event) {
    try {
      console.log(event);
      this.httpService.getBy(REQUEST.PATIENTS, event.value).subscribe((res: any) => {
        if (res.code === 200) {
          this.formGroup.get('name').setValue(res.data.name);
          this.formGroup.get('last_name_f').setValue(res.data.last_name_f);
          this.formGroup.get('last_name_m').setValue(res.data.last_name_m);
          this.formGroup.get('gender').setValue(res.data.gender);
          this.formGroup.get('phone_number').setValue(res.data.phone_number);
          this.formGroup.get('optional_phone_number').setValue(res.data.optional_phone_number);
          this.formGroup.get('email').setValue(res.data.email);
          this.formGroup.get('optional_email').setValue(res.data.optional_email);
          this.formGroup.get('marital_status').setValue(res.data.marital_status);
          this.formGroup.get('number_children').setValue(res.data.number_children);
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

}
