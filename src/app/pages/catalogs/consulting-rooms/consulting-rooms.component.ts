import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CrudService } from 'src/app/services/services.index';
import { MatTableDataSource, MatSort, MatDialog, MatSnackBar, MatPaginator } from '@angular/material';
import swal from 'sweetalert2';
import { Utils } from 'src/app/utils/utils';
import { SnackbarComponent } from 'src/app/shared/snackbar/snackbar.component';
import { REQUEST } from 'src/app/utils/enums/request.enum';
import { ConsultingRoomsDialogComponent } from './consulting-rooms-dialog/consulting-rooms-dialog.component';

@Component({
  selector: 'app-consulting-rooms',
  templateUrl: './consulting-rooms.component.html',
  styleUrls: ['./consulting-rooms.component.scss']
})
export class ConsultingRoomsComponent implements OnInit {

  // MatTable
  displayedColumns = ['name', 'actions'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private httpService: CrudService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {
    this.getConsultingRooms();
  }

  ngOnInit() {
    // this.dataSource.sort = this.sort;
    // this.dataSource.paginator = this.paginator;
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(filterValue: string) {
    console.log(filterValue);
    this.dataSource.filter = filterValue.trim().toLowerCase();

    // if (this.dataSource.paginator) {
    //   this.dataSource.paginator.firstPage();
    // }
  }

  getConsultingRooms(offset = 0, pagesize?: number) {
    try {
      this.httpService.getAll(REQUEST.CONSULTING_ROOMS).subscribe((res: any) => {
        if (res.code === 200) {
          this.dataSource.data = res.data;
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

  create() {
    this.openDialog(false, 'Crear nuevo consultorio', REQUEST.CONSULTING_ROOMS);
  }

  edit(event) {
    this.httpService.getBy(REQUEST.CONSULTING_ROOMS, event.id).subscribe((res: any) => {
      if (res.code === 200) {
        const result = res.data;
        this.openDialog(true, 'Editar consultorio', REQUEST.CONSULTING_ROOMS, result);
      } else {
        this.openSnackBar('Ocurrió un error.', 'error');
      }
    }, err => {
      this.openSnackBar('Ocurrió un error.', 'error');
    });
  }

  delete(id) {
    swal(Utils.getConfirm()).then(t => {
      if (t.value) {
        this.httpService.delete(REQUEST.CONSULTING_ROOMS, id).subscribe(
          (res: any) => {
            if (res.code === 200) {
              this.getConsultingRooms();
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

  openDialog(edit: boolean, title: string, path: any, data?: any) {
    const dialogRef = this.dialog.open(ConsultingRoomsDialogComponent, {
      // width: '40%',
      data: {
        edit: edit,
        data: data,
        title: title,
        path: path
      }
    });
    dialogRef.afterClosed().subscribe((res: any) => {
      this.getConsultingRooms();
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

}
