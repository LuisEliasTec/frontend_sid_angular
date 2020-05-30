import { ApiService } from './api.service';
import { Injectable } from '@angular/core';

@Injectable()
export class CrudService {

  constructor(private api: ApiService) { }

  getAll(path: string, params?: any) {
    return this.api.get(path, params);
  }

  getBy(path: string, id: string, params?: any) {
    return this.api.get(`${path}/${encodeURI(id)}`, params);
  }

  getWithURLParams(path: string, params: any) {
    for (const k in params) {
      if (params[k]) {
        path += `/${encodeURI(params[k])}`;
      }
    }
    return this.api.get(path);
  }

  create(path: string, body: any) {
    return this.api.post(`${path}`, body);
  }

  update(path: string, id?: string, body?: any) {
    return this.api.put(`${path}/${encodeURI(id)}`, body);
  }

  delete(path: string, id: string) {
    return this.api.delete(`${path}/${encodeURI(id)}`);
  }

  stepDelete(path: string, id: string, confirm: string) {
    return this.api.delete(`${path}/${encodeURI(id)}/${confirm}`);
  }

  login(body: any) {
    return this.api.post('auth/login', body);
  }

  getUserInfo() {
    return this.api.get('auth/user');
  }

  updatePass(path: string, body: any) {
    return this.api.post(`${path}`, body);
  }

  stream(path: string, body: any) {
    return this.api.getStream(path, body);
  }
}
