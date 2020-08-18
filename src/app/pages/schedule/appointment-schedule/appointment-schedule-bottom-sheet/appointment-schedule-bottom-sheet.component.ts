import { Component, OnInit } from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { STATUS_APPOINTMENT_SCHEDULE } from 'src/app/utils/enums/appointment_parameters.enum';

@Component({
  selector: 'app-appointment-schedule-bottom-sheet',
  templateUrl: './appointment-schedule-bottom-sheet.component.html',
  styleUrls: ['./appointment-schedule-bottom-sheet.component.scss']
})
export class AppointmentScheduleBottomSheetComponent implements OnInit {

  status_appointment_schedule = [
    { value: STATUS_APPOINTMENT_SCHEDULE.PENDIENTE },
    { value: STATUS_APPOINTMENT_SCHEDULE.ASISTIO },
    { value: STATUS_APPOINTMENT_SCHEDULE.NO_ASISTIO },
    { value: STATUS_APPOINTMENT_SCHEDULE.CANCELO }
  ];

  constructor(private _bottomSheetRef: MatBottomSheetRef<AppointmentScheduleBottomSheetComponent>) {
    console.log(this._bottomSheetRef.containerInstance.bottomSheetConfig);
   }

  ngOnInit() {
  }

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }

  onSelectedStatus(event) {
    console.log(event);
    const received: any = this._bottomSheetRef.containerInstance.bottomSheetConfig;
    const data = {
      appointment_schedule_id: received.id,
      new_apointment_status: event.value
    }
    this._bottomSheetRef.dismiss(data);
  }

}
