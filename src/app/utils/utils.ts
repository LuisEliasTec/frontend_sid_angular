import swal from 'sweetalert2';

export class Utils {

  // show success toast
  public static showToast() {
    swal({
      toast: true,
      showConfirmButton: false,
      position: 'top-end',
      type: 'success',
      title: 'Acción realizada correctamente',
      timer: 3000
    });
  }

  // show eror toast
  public static showErrorToast(text: string) {
    swal({
      type: 'error',
      title: 'Atención!',
      text: text,
      footer: 'Error'
    });
  }

  public static showWarningToast(text: string) {
    swal({
      toast: true,
      showConfirmButton: false,
      position: 'top-end',
      type: 'warning',
      title: text,
      timer: 3000
    });
  }

  // get confirm swal object
  public static getConfirm(): any {
    return {
      title: 'Atención!',
      text: '¿Esta seguro de realizar esta acción?',
      type: 'question',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      // buttonsStyling: false
    };
  }

}
