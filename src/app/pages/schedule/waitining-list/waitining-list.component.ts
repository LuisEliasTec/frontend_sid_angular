import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CrudService } from 'src/app/services/services.index';
import { MatTableDataSource, MatSort, MatDialog, MatSnackBar, MatPaginator } from '@angular/material';
import swal from 'sweetalert2';
import { Utils } from 'src/app/utils/utils';
import { SnackbarComponent } from 'src/app/shared/snackbar/snackbar.component';
import { REQUEST } from 'src/app/utils/enums/request.enum';
import { WaitiningListDialogComponent } from './waitining-list-dialog/waitining-list-dialog.component';

@Component({
  selector: 'app-waitining-list',
  templateUrl: './waitining-list.component.html',
  styleUrls: ['./waitining-list.component.scss']
})
export class WaitiningListComponent implements OnInit {

  // MatTable
  displayedColumns = ['name', 'last_name_f', 'last_name_m', 'phone_number', 'email', 'procedure_type', 'procedure',
    'appointment_type', 'appointment_modality', 'status_waitining_list', 'comments', 'who_recomend', 'actions'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private httpService: CrudService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {
    this.getWaitiningList();
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
    this.dataSource.filter = filterValue.trim().toLowerCase();

    // if (this.dataSource.paginator) {
    //   this.dataSource.paginator.firstPage();
    // }
  }

  getWaitiningList(offset = 0, pagesize?: number) {
    try {
      this.httpService.getAll(REQUEST.WAITINING_LIST).subscribe((res: any) => {
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
    this.openDialog(false, 'Agregar a lista de espera', REQUEST.WAITINING_LIST);
  }

  edit(event) {
    this.httpService.getBy(REQUEST.WAITINING_LIST, event.id).subscribe((res: any) => {
      if (res.code === 200) {
        const result = res.data;
        console.log(result);
        this.openDialog(true, 'Editar lista de espera', REQUEST.WAITINING_LIST, result);
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

  openDialog(edit: boolean, title: string, path: any, data?: any) {
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
