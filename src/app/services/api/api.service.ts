import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { config } from './app.config';
import { SessionService } from '../session/session.service';
import 'rxjs/add/operator/map';
import { Base64Decode } from 'src/app/utils/base64';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url = config.host.test;
  httpOptions = {
    headers: new HttpHeaders({
      // 'Access-Control-Allow-Origin': '*'
      // 'Content-Type':  'application/json',
      // 'Authorization': 'my-auth-token'
    }),
    params: new HttpParams()
  };

  constructor(private http: HttpClient, private session: SessionService) { }

  login(endpoint: string, body: any) {
    this.httpOptions.headers =
      this.httpOptions.headers.set('Content-Type', 'application/json');
    this.httpOptions.headers.append('Accept', 'application/json');
    return this.http.post(this.url + endpoint, body, this.httpOptions);
  }

  get(endpoint: string, params?: any) {
    this.httpOptions.params = new HttpParams();
    this.httpOptions.headers =
      this.httpOptions.headers.set('Authorization', 'Bearer ' + this.session.getToken());
    if (params) {
      // tslint:disable-next-line:forin
      for (const k in params) {
        this.httpOptions.params =
          this.httpOptions.params.set(k, params[k]);
      }
    }
    return this.http.get(this.url + endpoint, this.httpOptions).map((res: any) => {
      if (typeof (res.data) === 'string') {
        res.data = new Base64Decode().decodeToJSON(res.data);
      }
      if (res.data === null) {
        res.data = [];
      } else {
        if (res.data.length === 0) {
          res.data = {
            data: []
          };
        }
      }
      return res;
    });
  }

  post(endpoint: string, body: any) {
    this.httpOptions.params = new HttpParams();
    this.httpOptions.headers =
      this.httpOptions.headers.set('Authorization', 'Bearer ' + this.session.getToken());
    return this.http.post(this.url + endpoint, body, this.httpOptions).map((res: any) => {
      if (typeof (res.data) === 'string') {
        res.data = new Base64Decode().decodeToJSON(res.data);
      }
      return res;
    });
  }

  put(endpoint: string, body: any) {
    this.httpOptions.params = new HttpParams();
    this.httpOptions.headers =
      this.httpOptions.headers.set('Authorization', 'Bearer ' + this.session.getToken());
    return this.http.put(this.url + endpoint, body, this.httpOptions).map((res: any) => {
      if (typeof (res.data) === 'string') {
        res.data = new Base64Decode().decodeToJSON(res.data);
      }
      return res;
    });
  }

  delete(endpoint: string) {
    this.httpOptions.params = new HttpParams();
    this.httpOptions.headers =
      this.httpOptions.headers.set('Authorization', 'Bearer ' + this.session.getToken());
    return this.http.delete(this.url + endpoint, this.httpOptions);
  }

  patch(endpoint: string, body: any) {
    // this.httpOptions.headers =
    // this.httpOptions.headers.set('Authorization', 'my-new-auth-token');
    return this.http.put(this.url + endpoint, body, this.httpOptions);
  }

  getStream(endpoint: string, body: any) {
    this.httpOptions.headers =
      this.httpOptions.headers.set('Authorization', 'Bearer ' + this.session.getToken());
    return this.http.post(this.url + endpoint, body, {
      headers: this.httpOptions.headers,
      responseType: 'arraybuffer'
    });
  }
}
