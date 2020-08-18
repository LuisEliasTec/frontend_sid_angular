import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CrudService } from 'src/app/services/services.index';
import { MatTableDataSource, MatSort, MatDialog, MatSnackBar, MatPaginator } from '@angular/material';
import swal from 'sweetalert2';
import { Utils } from 'src/app/utils/utils';
import { SnackbarComponent } from 'src/app/shared/snackbar/snackbar.component';
import { REQUEST } from 'src/app/utils/enums/request.enum';
import { ProcedureTypesDialogComponent } from './procedure-types-dialog/procedure-types-dialog.component';

@Component({
  selector: 'app-procedure-types',
  templateUrl: './procedure-types.component.html',
  styleUrls: ['./procedure-types.component.scss']
})
export class ProcedureTypesComponent implements OnInit {

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
    this.getProcedureTypes();
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

  getProcedureTypes(offset = 0, pagesize?: number) {
    try {
      // this.filtros.offset = (offset > 0) ? offset - 1 : offset;
      this.httpService.getAll(REQUEST.PROCEDURE_TYPES).subscribe((res: any) => {
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
    this.openDialog(false, 'Crear nuevo tipo de procedimiento', REQUEST.PROCEDURE_TYPES);
  }

  edit(event) {
    this.httpService.getBy(REQUEST.PROCEDURE_TYPES, event.id).subscribe((res: any) => {
      // this.resultsLength = res.data.total;
      if (res.code === 200) {
        const result = res.data;
        this.openDialog(true, 'Editar tipo de procedimiento', REQUEST.PROCEDURE_TYPES, result);
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
        this.httpService.delete(REQUEST.PROCEDURE_TYPES, id).subscribe(
          (res: any) => {
            if (res.code === 200) {
              this.getProcedureTypes();
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
    const dialogRef = this.dialog.open(ProcedureTypesDialogComponent, {
      data: {
        edit: edit,
        data: data,
        title: title,
        path: path
      }
    });
    dialogRef.afterClosed().subscribe((res: any) => {
      this.getProcedureTypes();
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
