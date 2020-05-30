import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Base64Decode } from 'src/app/utils/base64';
import { Router, ActivatedRoute } from '@angular/router';
// import { SWALTOAST } from 'src/app/pages/pages.componentsconfig';
import swal from 'sweetalert2';
// import { AlertMessage } from 'src/app/utils/alert-messages';
// import { BsModalRef, BsModalService } from 'ngx-bootstrap';
// import { ResetpasswordComponent } from '../resetpassword/resetpassword.component';
// import { Handler } from 'src/app/utils/handler';
import { Title } from '@angular/platform-browser';
import { CrudService, SessionService } from 'src/app/services/services.index';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  base64: Base64Decode;
  // modalRef: BsModalRef;
  loading = false;

  constructor(
    // private handler: Handler,
    private session: SessionService,
    private httpService: CrudService,
    private router: Router,
    // private modalService: BsModalService,
    private titleService: Title,
    private activatedRoute: ActivatedRoute
  ) {
    if (this.session.check()) {
      this.router.navigate(['/sp/dashboard']);
    }
    this.titleService.setTitle('LOGIN');
    this.base64 = new Base64Decode;
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required])
    });
  }

  ngOnInit() { }

  // restorePassword() {
  //   const bsModalRef = this.modalService.show(ResetpasswordComponent, {
  //     initialState: {
  //       email: this.loginForm.get('email').value
  //     }
  //   });
  // }

  login() {
    const credentials = new FormData();
    credentials.append('email', this.loginForm.get('email').value);
    credentials.append('password', this.loginForm.get('password').value);
    credentials.append('remember_me', '1');

    this.loading = true;
    this.httpService.login(credentials).subscribe((res: any) => {
      this.loading = false;

      if (res.code === 200) {
        this.session.saveToken(res.data.access_token);
        this.session.saveUser(res.data.extra_data);
        this.session.saveUserConfig(res.data.user_config);
        // this.router.navigate([res.data.user_config.url]);
        this.router.navigate(['/dashboard']);
      } else {
        // this.handler.error(res.code, res.message);
        console.log(res.code + ' ' + res.message);
      }
    }, err => {
      console.log(err);
      this.loading = false;
      // this.handler.error(err.status, err.error);
      console.log(err.status + ' ' + err.error);
    });
  }

}
