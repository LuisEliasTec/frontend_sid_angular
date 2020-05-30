import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CrudService } from 'src/app/services/services.index';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatTableDataSource, MatSort, MatDialog, MatSnackBar, MatPaginator } from '@angular/material';
import { ProcedureDialogComponent } from './procedure-dialog/procedure-dialog/procedure-dialog.component';
import swal from 'sweetalert2';
import { Utils } from 'src/app/utils/utils';
import { SnackbarComponent } from 'src/app/shared/snackbar/snackbar.component';

@Component({
  selector: 'app-procedures',
  templateUrl: './procedures.component.html',
  styleUrls: ['./procedures.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class ProceduresComponent implements OnInit, AfterViewInit {

  // MatTable
  displayedColumns = ['description', 'actions'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private httpService: CrudService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {
    this.getProcedures();
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

  getProcedures(offset = 0, pagesize?: number) {
    try {
      // this.filtros.offset = (offset > 0) ? offset - 1 : offset;
      this.httpService.getAll('pages/procedimientos').subscribe((res: any) => {
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
    this.openDialog(false, 'Crear nuevo procedimiento');
  }

  edit(event) {
    this.httpService.getBy('pages/procedimientos', event.id).subscribe((res: any) => {
      // this.resultsLength = res.data.total;
      if (res.code === 200) {
        const result = res.data;
        this.openDialog(true, 'Editar procedimiento', result);
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
        this.httpService.delete('pages/procedimientos', id).subscribe(
          (res: any) => {
            if (res.code === 200) {
              this.getProcedures();
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

  openDialog(edit: boolean, title: string, data?: any) {
    const dialogRef = this.dialog.open(ProcedureDialogComponent, {
      data: {
        edit: edit,
        data: data,
        title: title
      }
    });
    dialogRef.afterClosed().subscribe((res: any) => {
      this.getProcedures();
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
