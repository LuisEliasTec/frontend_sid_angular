import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
} from 'date-fns';
import { Subject } from 'rxjs';
// import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import { AppointmentScheduleDialogComponent } from './appointment-schedule-dialog/appointment-schedule-dialog.component';
import { MatDialog, MatTableDataSource, MatSort, MatPaginator, MatSnackBar } from '@angular/material';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { CrudService } from 'src/app/services/services.index';
import { REQUEST } from 'src/app/utils/enums/request.enum';
import { Utils } from 'src/app/utils/utils';
import { WaitiningListDialogComponent } from '../waitining-list/waitining-list-dialog/waitining-list-dialog.component';
import { SnackbarComponent } from 'src/app/shared/snackbar/snackbar.component';
import swal from 'sweetalert2';
import { ClassGetter } from '@angular/compiler/src/output/output_ast';
import * as moment from 'moment';
import { TimeFormat } from 'src/app/utils/timeFormat';
import { elementEnd } from '@angular/core/src/render3';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

@Component({
  selector: 'app-appointment-schedule',
  templateUrl: './appointment-schedule.component.html',
  styleUrls: ['./appointment-schedule.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  // encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class AppointmentScheduleComponent implements OnInit {

  @ViewChild('modalContent') modalContent: TemplateRef<any>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  // MatTable
  displayedColumns = ['name', 'last_name_f', 'last_name_m', 'procedure_type', 'procedure',
    'appointment_type', 'appointment_modality', 'status_waitining_list', 'actions'];
  dataSource = new MatTableDataSource();

  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.appointmentScheduleEdit(event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.deleteAppointmentSchedule(event.id);
      },
    },
  ];

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [
  ];

  moment = moment;

  // events: CalendarEvent[] = [
  //   {
  //     start: subDays(startOfDay(new Date()), 1),
  //     end: addDays(new Date(), 1),
  //     title: 'A 3 day event',
  //     color: colors.red,
  //     actions: this.actions,
  //     allDay: true,
  //     resizable: {
  //       beforeStart: true,
  //       afterEnd: true,
  //     },
  //     draggable: true,
  //   },
  //   {
  //     start: startOfDay(new Date()),
  //     title: 'An event with no end date',
  //     color: colors.yellow,
  //     actions: this.actions,
  //   },
  //   {
  //     start: subDays(endOfMonth(new Date()), 3),
  //     end: addDays(endOfMonth(new Date()), 3),
  //     title: 'A long event that spans 2 months',
  //     color: colors.blue,
  //     allDay: true,
  //   },
  //   {
  //     start: addHours(startOfDay(new Date()), 2),
  //     end: addHours(new Date(), 2),
  //     title: 'A draggable and resizable event',
  //     color: colors.yellow,
  //     actions: this.actions,
  //     resizable: {
  //       beforeStart: true,
  //       afterEnd: true,
  //     },
  //     draggable: true,
  //   },
  // ];

  activeDayIsOpen: boolean = true;
  locale: string = 'es';
  public _activeValue = "";

  constructor(
    public dialog: MatDialog,
    private httpService: CrudService,
    private _snackBar: MatSnackBar
  ) {
    this.getWaitiningList();
    this.getAppointmentSchedules();
  }

  ngOnInit() { }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getAppointmentSchedules(offset = 0, pagesize?: number) {
    try {
      this.httpService.getAll(REQUEST.APPOINTMENT_SCHEDULE).subscribe((res: any) => {
        if (res.code === 200) {
          console.log(res.data);
          let appointment_schedules_mapped = res.data.map(element => {
            const backDate = new Date(element.appointment_date);
            const resultDate = new TimeFormat().setDate(backDate, element.appointment_time);
            return {
              start: resultDate,
              title: element.patient.name + ' ' + element.patient.last_name_f + ' ' + element.patient.last_name_m + ' | ' + element.procedure.name + ' | ' + element.appointment_time,
              color: colors.red,
              actions: this.actions,
              allDay: false,
              resizable: {
                beforeStart: true,
                afterEnd: true,
              },
              draggable: true,
              id: element.id,
              procedure_type: element.procedure_type,
              procedure: element.procedure,
              status_appointment_schedule: element.status_appointment_schedule,
              appointment_type: element.appointment_type,
              appointment_modality: element.appointment_modality,
            };
          })
          this.events = appointment_schedules_mapped;
          this.refresh.next();
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

  getWaitiningList(offset = 0, pagesize?: number) {
    try {
      this.httpService.getAll(REQUEST.WAITINING_LIST).subscribe((res: any) => {
        if (res.code === 200) {
          this.dataSource.data = res.data;
          console.log('lista de espera', res.data);
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

  waitiningListCreate() {
    this.openWaitiningListDialog(false, 'Agregar a lista de espera', REQUEST.WAITINING_LIST);
  }

  waitiningListEdit(event) {
    this.httpService.getBy(REQUEST.WAITINING_LIST, event.id).subscribe((res: any) => {
      if (res.code === 200) {
        const result = res.data;
        this.openWaitiningListDialog(true, 'Editar lista de espera', REQUEST.WAITINING_LIST, result);
      } else {
        this.openSnackBar('Ocurrió un error.', 'error');
      }
    }, err => {
      this.openSnackBar('Ocurrió un error.', 'error');
    });
  }

  deleteWaitiningList(id) {
    swal(Utils.getConfirm()).then(t => {
      if (t.value) {
        this.httpService.delete(REQUEST.WAITINING_LIST, id).subscribe(
          (res: any) => {
            if (res.code === 200) {
              this.getWaitiningList();
              this.openSnackBar('Registro eliminado exitosamente.', 'success');
            } else {
              this.openSnackBar('Ocurrió un error.', 'error');
            }
          },
          error => {
            this.openSnackBar('Ocurrió un error.', 'error');
          }
        );
      }
    }).catch();
  }

  appointmentCreate() {
    this.openAppointmentDialog(false, 'Agendar cita', REQUEST.APPOINTMENT_SCHEDULE, false);
  }

  appointmentCreateContextMenu(date: object) {
    this.openAppointmentDialog(false, 'Agendar cita', REQUEST.APPOINTMENT_SCHEDULE, false, date);
  }

  appointmentCreateByWaitiningList(event) {
    this.httpService.getBy(REQUEST.WAITINING_LIST, event.id).subscribe((res: any) => {
      if (res.code === 200) {
        const result = res.data;
        this.openAppointmentDialog(false, 'Agendar cita', REQUEST.APPOINTMENT_SCHEDULE, true, result);
      } else {
        this.openSnackBar('Ocurrió un error.', 'error');
      }
    }, err => {
      this.openSnackBar('Ocurrió un error.', 'error');
    });
  }

  appointmentScheduleEdit(event) {
    console.log(event);
    this.httpService.getBy(REQUEST.APPOINTMENT_SCHEDULE, event.id).subscribe((res: any) => {
      if (res.code === 200) {
        const result = res.data;
        console.log(res.data);
        this.openAppointmentDialog(true, 'Editar cita', REQUEST.APPOINTMENT_SCHEDULE, false, result);
      } else {
        this.openSnackBar('Ocurrió un error.', 'error');
      }
    }, err => {
      this.openSnackBar('Ocurrió un error.', 'error');
    });
  }

  deleteAppointmentSchedule(id) {
    console.log(id);
    swal(Utils.getConfirm()).then(t => {
      if (t.value) {
        this.httpService.delete(REQUEST.APPOINTMENT_SCHEDULE, id).subscribe(
          (res: any) => {
            if (res.code === 200) {
              this.getAppointmentSchedules();
              this.openSnackBar('Registro eliminado exitosamente.', 'success');
            } else {
              this.openSnackBar('Ocurrió un error.', 'error');
            }
          },
          error => {
            this.openSnackBar('Ocurrió un error.', 'error');
          }
        );
      }
    }).catch();
  }

  openWaitiningListDialog(edit: boolean, title: string, path: any, data?: any) {
    const dialogRef = this.dialog.open(WaitiningListDialogComponent, {
      width: '50%',
      data: {
        edit: edit,
        data: data,
        title: title,
        path: path
      }
    });
    dialogRef.afterClosed().subscribe((res: any) => {
      this.getWaitiningList();
    });
  }

  openAppointmentDialog(edit: boolean, title: string, path: any, fromWaitiningList: boolean, data?: any) {
    const dialogRef = this.dialog.open(AppointmentScheduleDialogComponent, {
      // width: '50%',
      height: '500px',
      width: '700px',
      // margin: '0 auto',
      disableClose: true,
      hasBackdrop: true,
      data: {
        edit: edit,
        data: data,
        title: title,
        path: path,
        fromWaitiningList: fromWaitiningList
      }
    });
    dialogRef.afterClosed().subscribe((res: any) => {
      this.getAppointmentSchedules();
    });
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
  }

  addAppointmentEvent(): void {
    this.events = [
      ...this.events,
      {
        title: 'New event',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        color: colors.red,
        draggable: true,
        actions: this.actions,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ];
  }

  //////////////////////  ANGULAR CALENDAR  //////////////////////////

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    // this.modal.open(this.modalContent, { size: 'lg' });
    console.log(this.modalData);
    this.openAppointmentDialog(true, 'Cita', '', false, this.modalContent,);
  }

  addEvent(): void {
    this.events = [
      ...this.events,
      {
        title: 'New event',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        color: colors.red,
        draggable: true,
        actions: this.actions,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ];
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  addEventContextMenu(event) {
    console.log(event);
    const date_object = {
      appointment_date: event
    };
    this.appointmentCreateContextMenu(date_object);
  }

  onChange(event, group) {
    if (this._activeValue === event.value) {
      // make unchecked
      this._activeValue = "";
    } else {
      this._activeValue = event.value;
    }
  }

}
