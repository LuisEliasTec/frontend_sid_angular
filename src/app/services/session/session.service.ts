import { Injectable } from '@angular/core';
import { User } from 'src/app/types/user.type';
import { Base64Decode } from 'src/app/utils/base64';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private _token: string;
  private _user: User;
  private _userConfig: any;

  private _tokenName = 'nk';
  private _userName = '0r4q105';
  private _userConfigName = 'u3rsc0ig';
  private _userInfo = '0r4q105';
  private _permissionKey = 'cGVybWlzc2lvbnM=';
  private base64: Base64Decode;

  constructor(private router: Router) {
    this.base64 = new Base64Decode();
  }

  saveToken(token: string) {
    this._token = token;
    localStorage.setItem(this._tokenName, this._token);
  }

  saveUser(user: User) {
    this._user = user;
    localStorage.setItem(this._userInfo, JSON.stringify(this._user));
  }

  saveUserConfig(config: any) {
    this._userConfig = config;
    localStorage.setItem(this._userConfigName, JSON.stringify(this._userConfig));
  }

  updatePermissions(newPermissions: any) {
    const userInfo = JSON.parse(localStorage.getItem(this._userInfo));
    userInfo[this._permissionKey] = this.base64.encode(JSON.stringify(newPermissions));
    localStorage.setItem(this._userInfo, JSON.stringify(userInfo));
  }

  logout() {
    localStorage.removeItem(this._tokenName);
    localStorage.removeItem(this._userName);
    localStorage.removeItem(this._userConfigName);
    localStorage.removeItem(this._userInfo);

    this.router.navigate(['/login']);
  }

  getToken(): string {
    return localStorage.getItem(this._tokenName);
  }

  getUser(): any {
    const encrypt = JSON.parse(localStorage.getItem(this._userInfo));
    return {
      name: this.base64.decode(encrypt['bmFtZQ==']),
      email: this.base64.decode(encrypt['ZW1haWw=']),
      role: this.base64.decode(encrypt['cm9sZV9uYW1l'])
    };
  }

  getUserId(): number {
    const base64Url = this.getToken().split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    return Number(new Base64Decode().decodeToJSON(base64).sub);
  }

  getUserConfig(): any {
    return JSON.parse(localStorage.getItem(this._userConfigName));
  }

  check(): boolean {
    const user = localStorage.getItem(this._userInfo);
    return user ? true : false;
  }

  checkRole(): boolean {
    const roleName = JSON.parse(localStorage.getItem(this._userInfo))['cm9sZV9uYW1l'];  // rolename
    const roleNameDecoded = JSON.parse(this.base64.decode(roleName));
    const roleSpecial = this.base64.decode(JSON.parse(localStorage.getItem(this._userInfo))['c3BlY2lhbA==']);
    return roleNameDecoded.indexOf('sysadmin') >= 0 || roleSpecial === 'all-access';
  }

  canSee(permission: string, action: string): boolean {
    const permissions = this.base64.decodeToJSON(JSON.parse(localStorage.getItem(this._userInfo))[this._permissionKey]);
    const search = permission + '.' + action;
    if (permissions === null) {
      return true; // sysadmin
    } else {
      return permissions.find(element => {
        return search === element;
      });
    }
  }

  permitedUser(): boolean {
    const user = this.base64.decode(JSON.parse(localStorage.getItem(this._userInfo))['bmFtZQ==']);
    return user === "Soporte Tecnico " ? true : false;
  }
}
