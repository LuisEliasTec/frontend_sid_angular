import { Injectable } from '@angular/core';
import { Notyf } from 'notyf';

@Injectable()
export class NotyfService {

    // Create an instance of Notyf
    notyf = new Notyf({
        position: {
            x: 'right',
            y: 'top',
        },
        duration: 5000,
        ripple: true,
        dismissible: true
    });

    constructor() { }

    setInfo(string: string) {
        this.notyf.open({
            type: 'info',
            message: string,
            background: '#008ECC',
            icon: {
                className: 'material-icons',
                tagName: 'i',
                text: 'info',
                color: 'white'
            }
        });
    }

    setSuccess() {
        this.notyf.open({
            type: 'success',
            message: 'Acción realizada correctamente',
            background: 'green',
            icon: {
                className: 'material-icons',
                tagName: 'i',
                text: 'check_circle',
                color: 'white'
            }
        });
    }

    setWarning(string: string) {
        this.notyf.open({
            type: 'warning',
            message: string,
            background: '#FFC400',
            icon: {
                className: 'material-icons',
                tagName: 'i',
                text: 'warning',
                color: 'white'
            },
            className: 'notyf-text-color'
        });
    }

    setError() {
        this.notyf.open({
            type: 'error',
            message: 'Ocurrió un error',
            background: '#FF5252',
            icon: {
                className: 'material-icons',
                tagName: 'i',
                text: 'highlight_off',
                color: 'white'
            }
        });
    }

    setErrorWithMessage(string: string) {
        this.notyf.open({
            type: 'error',
            message: string,
            background: '#FF5252',
            icon: {
                className: 'material-icons',
                tagName: 'i',
                text: 'highlight_off',
                color: 'white'
            }
        });
    }

}