import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { APPOINTMENT_TYPE, APPOINTMENT_MODALITY, STATUS_APPOINTMENT_SCHEDULE, PROCEDURE_TYPE } from 'src/app/utils/enums/appointment_parameters.enum';
import { CrudService, NotyfService } from 'src/app/services/services.index';
import { MatSnackBar, ThemePalette } from '@angular/material';
import { SnackbarComponent } from 'src/app/shared/snackbar/snackbar.component';
import { REQUEST } from 'src/app/utils/enums/request.enum';
import { GENDER } from 'src/app/utils/enums/genders.enum';
import { MARITAL_STATUS } from 'src/app/utils/enums/marital_status.enum';
import { AmazingTimePickerService } from 'amazing-time-picker'; // this line you need
import * as moment from 'moment';
import { TimeFormat } from 'src/app/utils/timeFormat';
import { NgControl } from '@angular/forms';

@Component({
  selector: 'app-appointment-schedule-dialog',
  templateUrl: './appointment-schedule-dialog.component.html',
  styleUrls: ['./appointment-schedule-dialog.component.scss']
})
export class AppointmentScheduleDialogComponent implements OnInit {

  // Date
  date: Date;
  minDate = moment();

  // Boolean
  filterOdd: boolean;
  is_therapy = false;

  // Form groups
  formGroup: FormGroup;

  // Form controls
  newPatientFormControl = new FormControl(false);

  // Strings
  dialog_title = '';
  public selectedTime = '';
  public procedure_type_therapy = PROCEDURE_TYPE.TERAPIA;

  // Objects
  appointment_types = [
    { value: APPOINTMENT_TYPE.VALORACION },
    { value: APPOINTMENT_TYPE.SEGUIMIENTO }
  ];
  appointment_modalities = [
    { value: APPOINTMENT_MODALITY.PRESENCIAL },
    { value: APPOINTMENT_MODALITY.ONLINE },
  ];
  status_appointment_schedule = [
    { value: STATUS_APPOINTMENT_SCHEDULE.PENDIENTE },
    { value: STATUS_APPOINTMENT_SCHEDULE.ASISTIO },
    { value: STATUS_APPOINTMENT_SCHEDULE.NO_ASISTIO },
    { value: STATUS_APPOINTMENT_SCHEDULE.CANCELO }
  ];
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
  procedure_types = [];
  procedures = [];
  patients = [];

  // moment
  moment = moment;

  constructor(
    public dialogRef: MatDialogRef<AppointmentScheduleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private httpService: CrudService,
    private _snackBar: MatSnackBar,
    private atp: AmazingTimePickerService,
    private notyf: NotyfService) {
    this.formGroup = new FormGroup({
      name: new FormControl(null, [Validators.maxLength(255)]),
      last_name_f: new FormControl(null, [Validators.maxLength(255)]),
      last_name_m: new FormControl(null, [Validators.maxLength(255)]),
      gender: new FormControl(null, []),
      phone_number: new FormControl(null, []),
      optional_phone_number: new FormControl(null, []),
      email: new FormControl(null, [Validators.maxLength(255)]),
      optional_email: new FormControl(null, [Validators.maxLength(255)]),
      marital_status: new FormControl(null, []),
      number_children: new FormControl(null, []),
      who_recomend: new FormControl(null, []),
      comments: new FormControl(null, []),
      procedure_type: new FormControl(null, [Validators.required]),
      procedure: new FormControl(null, [Validators.required]),
      appointment_type: new FormControl(null, []),
      appointment_modality: new FormControl(null, []),
      status_appointment_schedule: new FormControl(null, []),
      appointment_date: new FormControl(null, [Validators.required]),
      appointment_time: new FormControl(null, [Validators.required]),
      patient_id: new FormControl(null, []),
      from_waitining_list: new FormControl(null, [])
    });
    this.dialog_title = dialogData.title;
    this.getProcedureTypes();
    this.getAllPatients();

  }

  ngOnInit() {
    if (this.dialogData.data) {
      this.formGroup.get('procedure').enable();
      const appointment_date_moment = moment(this.dialogData.data.appointment_date).format();

      if (this.dialogData.edit) {
        // Editar
        this.formGroup.get('who_recomend').setValue(this.dialogData.data.who_recomend);
        this.formGroup.get('comments').setValue(this.dialogData.data.comments);
        this.formGroup.get('procedure_type').setValue(this.dialogData.data.procedure_type_id);
        this.selectProcedureType(this.dialogData.data.procedure_type_id);
        if (this.procedures) {
          this.formGroup.get('procedure').setValue(this.dialogData.data.procedure_id);
        }
        this.formGroup.get('appointment_type').setValue(this.dialogData.data.appointment_type);
        this.formGroup.get('appointment_modality').setValue(this.dialogData.data.appointment_modality);
        this.formGroup.get('status_appointment_schedule').setValue(this.dialogData.data.status_appointment_schedule);
        this.formGroup.get('patient_id').setValue(this.dialogData.data.patient_id);
        this.formGroup.get('appointment_date').setValue(appointment_date_moment);
        this.formGroup.get('appointment_time').setValue(this.dialogData.data.appointment_time);
      } else {
        if (this.dialogData.fromWaitiningList) {
          // Agendar desde lista de espera
          this.formGroup.get('name').setValue(this.dialogData.data.patient.name);
          this.formGroup.get('last_name_f').setValue(this.dialogData.data.patient.last_name_f);
          this.formGroup.get('last_name_m').setValue(this.dialogData.data.patient.last_name_m);
          this.formGroup.get('who_recomend').setValue(this.dialogData.data.who_recomend);
          this.formGroup.get('comments').setValue(this.dialogData.data.comments);
          this.formGroup.get('procedure_type').setValue(this.dialogData.data.procedure_type.id);
          this.selectProcedureType(this.dialogData.data.procedure_type.id);
          if (this.procedures) {
            this.formGroup.get('procedure').setValue(this.dialogData.data.procedure.id);
          }
          this.formGroup.get('appointment_type').setValue(this.dialogData.data.appointment_type);
          this.formGroup.get('appointment_modality').setValue(this.dialogData.data.appointment_modality);
          this.formGroup.get('status_appointment_schedule').setValue(STATUS_APPOINTMENT_SCHEDULE.PENDIENTE);
          this.formGroup.get('patient_id').setValue(this.dialogData.data.patient.id);

          this.formGroup.get('name').disable();
          this.formGroup.get('last_name_f').disable();
          this.formGroup.get('last_name_m').disable();
          // this.formGroup.get('status_appointment_schedule').disable();

          this.formGroup.get('from_waitining_list').setValue(this.dialogData.data.id); 
        } else {
          // Context menu
          const hour = moment(this.dialogData.data.appointment_date).format('HH:mm');
          // this.formGroup.get('appointment_date').setValue(moment(this.dialogData.data.appointment_date).format('YYYY-MM-DD'));
          this.formGroup.get('appointment_date').setValue(appointment_date_moment);
          this.formGroup.get('status_appointment_schedule').setValue(STATUS_APPOINTMENT_SCHEDULE.PENDIENTE);

          if (hour !== '00:00') {
            this.formGroup.get('appointment_time').setValue(moment(this.dialogData.data.appointment_date).format('HH:mm'));
          }
        }
      }

    } else {
      // this.formGroup.get('status_appointment_schedule').disable();
      this.formGroup.get('status_appointment_schedule').setValue(STATUS_APPOINTMENT_SCHEDULE.PENDIENTE);
      this.formGroup.controls['patient_id'].setValidators([Validators.required]);
      this.formGroup.get('procedure').disable();
    }
  }

  isEdit() {
    if (this.dialogData.data) {
      if (!this.dialogData.edit) {
        this.save();
      } else {
        this.update();
      }
    } else {
      this.save();
    }
  }

  save() {
    const data = this.formGroup.value;
    data.address_id = 1;
    data.appointment_date = moment(data.appointment_date).format('YYYY-MM-DD');
    this.httpService.create(this.dialogData.path, this.formGroup.value).subscribe((res: any) => {
      if (res.code === 200) {
        this.dialogRef.close();
        this.notyf.setSuccess();
      } else if (res.code === 400) {
        this.notyf.setWarningWithMessage(res.message);
      } else {
        this.notyf.setErrorWithMessage(res.message);
      }
    }, err => {
      this.notyf.setError();
    });
  }

  update() {
    const data = this.formGroup.value;
    data.address_id = 1;
    this.httpService.update(this.dialogData.path, this.dialogData.data.id, this.formGroup.value).subscribe(
      (res: any) => {
        if (res.code === 200) {
          this.dialogRef.close();
          this.notyf.setSuccess();
        } else {
          this.notyf.setErrorWithMessage(res.message);
        }
      },
      error => {
        this.notyf.setError();
      }
    );
  }

  getProcedureTypes() {
    try {
      this.httpService.getAll(REQUEST.PROCEDURE_TYPES_LIST).subscribe((res: any) => {
        if (res.code === 200) {
          this.procedure_types = res.data;
          if (this.dialogData.data) {
            // if (this.procedure_types.length > 0) {
            //   console.log('this.dialogData.data.procedure_type_id', this.dialogData.data.procedure_type_id);
            // }
            this.isTherapy(this.dialogData.data.procedure_type_id);
          }

        } else {
          this.notyf.setErrorWithMessage(res.message);
        }
      }, err => {
        this.notyf.setError();
      });
    } catch (error) {
      this.notyf.setError();
    }
  }

  selectProcedureType(event) {
    try {
      this.httpService.getAll(REQUEST.PROCEDURES_BY_PROCEDURE_TYPE, {
        procedure_type_id: event.value ? event.value : event
      }).subscribe((res: any) => {
        if (res.code === 200) {
          this.formGroup.get('procedure').enable();
          this.procedures = res.data;

          if (!this.dialogData.data) {
            this.formGroup.get('procedure').reset();
          }
        } else {
          this.notyf.setErrorWithMessage(res.message);
        }
      }, err => {
        this.notyf.setError();
      });
    } catch (error) {
      this.notyf.setError();
    }
  }

  getAllPatients() {
    try {
      this.httpService.getAll(REQUEST.PATIENTS_LIST).subscribe((res: any) => {
        if (res.code === 200) {
          this.patients = res.data;
        } else {
          this.notyf.setErrorWithMessage(res.message);
        }
      }, err => {
        this.notyf.setError();
      });
    } catch (error) {
      this.notyf.setError();
    }
  }

  patientSelected(event) {
    try {
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
          this.notyf.setErrorWithMessage(res.message);
        }
      }, err => {
        this.notyf.setError();
      });
    } catch (error) {
      this.notyf.setError();
    }
  }

  open() {
    const amazingTimePicker = this.atp.open({
      time: this.selectedTime,
      theme: 'dark',
      arrowStyle: {
        background: 'red',
        color: 'white'
      },
      // rangeTime: {
      //   start: '15:30',
      //   end: '18:45'
      // },
    });
    amazingTimePicker.afterClose().subscribe(time => {
      this.selectedTime = time;
    });
  }

  changeNewPatientToggle(event) {
    this.formGroupPatientReset();

    if (!this.dialogData.fromWaitiningList) {
      if (!this.newPatientFormControl.value) { // Paciente existente
        this.formGroupPatientRequired(false);
      } else { // Nuevo paciente
        this.formGroupPatientRequired(true);
      }
    }

  }

  testForm() {
    console.log(this.formGroup.value);
    console.log(this.formGroup.valid);
  }

  formGroupPatientReset() {
    this.formGroup.get('patient_id').reset();
    this.formGroup.get('name').reset();
    this.formGroup.get('last_name_f').reset();
    this.formGroup.get('last_name_m').reset();
    this.formGroup.get('gender').reset();
    this.formGroup.get('phone_number').reset();
    this.formGroup.get('optional_phone_number').reset();
    this.formGroup.get('email').reset();
    this.formGroup.get('optional_email').reset();
    this.formGroup.get('marital_status').reset();
    this.formGroup.get('number_children').reset();
  }

  formGroupPatientRequired(flag: boolean) {
    if (flag) {
      this.formGroup.controls['patient_id'].setValidators(null);
      this.formGroup.controls['patient_id'].updateValueAndValidity();
      this.formGroup.controls['name'].setValidators([Validators.required]);
      this.formGroup.controls['last_name_f'].setValidators([Validators.required]);
      this.formGroup.controls['last_name_m'].setValidators([Validators.required]);
      this.formGroup.controls['gender'].setValidators([Validators.required]);
      this.formGroup.controls['phone_number'].setValidators([Validators.required]);
      // this.formGroup.controls['optional_phone_number'].setValidators([Validators.required]);
      this.formGroup.controls['email'].setValidators([Validators.required]);
      // this.formGroup.controls['optional_email'].setValidators([Validators.required]);
      this.formGroup.controls['marital_status'].setValidators([Validators.required]);
      this.formGroup.controls['number_children'].setValidators([Validators.required]);

      this.formGroup.controls['patient_id'].updateValueAndValidity();
      this.formGroup.controls['name'].updateValueAndValidity();
      this.formGroup.controls['last_name_f'].updateValueAndValidity();
      this.formGroup.controls['last_name_m'].updateValueAndValidity();
      this.formGroup.controls['gender'].updateValueAndValidity();
      this.formGroup.controls['phone_number'].updateValueAndValidity();
      // this.formGroup.controls['optional_phone_number'].updateValueAndValidity();
      this.formGroup.controls['email'].updateValueAndValidity();
      // this.formGroup.controls['optional_email'].updateValueAndValidity();
      this.formGroup.controls['marital_status'].updateValueAndValidity();
      this.formGroup.controls['number_children'].updateValueAndValidity();
    } else {
      this.formGroup.controls['patient_id'].setValidators([Validators.required]);
      this.formGroup.controls['name'].setValidators([]);
      this.formGroup.controls['last_name_f'].setValidators([]);
      this.formGroup.controls['last_name_m'].setValidators([]);
      this.formGroup.controls['gender'].setValidators([]);
      this.formGroup.controls['phone_number'].setValidators([]);
      this.formGroup.controls['optional_phone_number'].setValidators([]);
      this.formGroup.controls['email'].setValidators([]);
      this.formGroup.controls['optional_email'].setValidators([]);
      this.formGroup.controls['marital_status'].setValidators([]);
      this.formGroup.controls['number_children'].setValidators([]);

      this.formGroup.controls['patient_id'].updateValueAndValidity();
      this.formGroup.controls['name'].updateValueAndValidity();
      this.formGroup.controls['last_name_f'].updateValueAndValidity();
      this.formGroup.controls['last_name_m'].updateValueAndValidity();
      this.formGroup.controls['gender'].updateValueAndValidity();
      this.formGroup.controls['phone_number'].updateValueAndValidity();
      // this.formGroup.controls['optional_phone_number'].updateValueAndValidity();
      this.formGroup.controls['email'].updateValueAndValidity();
      // this.formGroup.controls['optional_email'].updateValueAndValidity();
      this.formGroup.controls['marital_status'].updateValueAndValidity();
      this.formGroup.controls['number_children'].updateValueAndValidity();
    }
  }

  isTherapy(id) {
    if (id && this.procedure_types) {
      const is_therapy = this.procedure_types.filter(
        element => element.id == id);
      this.is_therapy = is_therapy[0].name === PROCEDURE_TYPE.TERAPIA;
    }
  }

}
