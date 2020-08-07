import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CrudService } from 'src/app/services/services.index';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatTableDataSource, MatSort, MatDialog, MatSnackBar, MatPaginator, MatDialogConfig } from '@angular/material';
import swal from 'sweetalert2';
import { Utils } from 'src/app/utils/utils';
import { SnackbarComponent } from 'src/app/shared/snackbar/snackbar.component';
import { REQUEST } from "src/app/utils/enums/request.enum";
import { PatientsDialogComponent } from './patients-dialog/patients-dialog.component';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss']
})
export class PatientsComponent implements OnInit {

  // MatTable
  displayedColumns = ["name", "last_name_f", "last_name_m", "birth_date", "age", "gender", "phone_number", "email",
    "marital_status", "number_children", "zip_code"];
  dataSource = new MatTableDataSource();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private httpService: CrudService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {
    this.getPatients();
  }

  ngOnInit() {
    // this.dataSource.sort = this.sort;
    // this.dataSource.paginator = this.paginator;
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();

  //   if (this.dataSource.paginator) {
  //     this.dataSource.paginator.firstPage();
  //   }
  // }

  applyFilter(filterValue: string) {
    console.log(filterValue);
    this.dataSource.filter = filterValue.trim().toLowerCase();

    // if (this.dataSource.paginator) {
    //   this.dataSource.paginator.firstPage();
    // }
  }

  getPatients(offset = 0, pagesize?: number) {
    try {
      // this.filtros.offset = (offset > 0) ? offset - 1 : offset;
      this.httpService.getAll(REQUEST.PATIENTS).subscribe((res: any) => {
        // this.resultsLength = res.data.total;
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
    this.openDialog(false, 'Crear nuevo paciente', REQUEST.PATIENTS);
  }

  edit(event) {
    this.httpService.getBy(REQUEST.PATIENTS, event.id).subscribe((res: any) => {
      // this.resultsLength = res.data.total;
      if (res.code === 200) {
        const result = res.data;
        this.openDialog(true, 'Editar procedimiento', REQUEST.PATIENTS, result);
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
        this.httpService.delete(REQUEST.PATIENTS, id).subscribe(
          (res: any) => {
            if (res.code === 200) {
              this.getPatients();
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

  openDialog(edit: boolean, title: string, path?: any, data?: any) {
    const dialogRef = this.dialog.open(PatientsDialogComponent, {
      width: '800px',
      data: {
        edit: edit,
        data: data,
        title: title,
        path: path
      }
    });
    dialogRef.afterClosed().subscribe((res: any) => {
      this.getPatients();
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
