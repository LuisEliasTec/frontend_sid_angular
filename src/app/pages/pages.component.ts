import { Component, OnInit, Output, EventEmitter, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { Router, Event, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs';
import { SessionService, CrudService } from '../services/services.index';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {

  constructor(
    private crudService: CrudService,
    private sessionService: SessionService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  logout() {
    this.crudService.getAll('auth/logout').subscribe(res => {
      if (res.code === 200) {
        this.sessionService.logout();
      } else {
        // this.handler.error(res.code, res.message);
        console.log(res.code + ' ' + res.message);
      }
    }, err => {
      // this.handler.error(err.status, err.error);
      console.log(err.status + ' ' + err.error);

    });
  }

}
