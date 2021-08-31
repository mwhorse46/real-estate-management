import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { headerDict } from '../shared/utility';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../shared/interface/user';
import { StorageService } from '../shared/services/storage/storage.service';

const url = environment.api.url;
const requestOptions = {
  headers: new HttpHeaders(headerDict),
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public user$: Observable<User>;
  private readonly userSub = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient, private storage: StorageService) {
    this.user$ = this.userSub.asObservable();
    // Access Stored User
    this.storage.init().then(() => {
      this.storage.getUser().then(user => {
        if (user) {
          this.updateUser(user);
        }
      });
    });
  }

  public get user(): User {
    return this.userSub.getValue();
  }

  public token(): string {
    return this.userSub.getValue().accessToken;
  }

  public async signOut() {
    this.userSub.next(null);
    this.storage.removeUser();
  }

  public async signIn(email: string, password: string) {
    try {
      const result = await this.http.post<User>(url + 'auth/signin', {
        email,
        password
      }, requestOptions).toPromise();
      await this.updateUser(result);
      return result;
    } catch (error) {
      console.log('err', error);
      return error;
    }
  }

  public async register(fullName: string, email: string, password: string) {
    try {
      const result = await this.http.post<User>(url + 'auth/register', {
        fullName,
        email,
        password
      }, requestOptions).toPromise();
      await this.updateUser(result);
      return result;
    } catch (error) {
      console.log('error', error);
      return error;
    }
  }

  private async updateUser(user: User) {
    this.userSub.next(user);
    await this.storage.setUser(user);
  }
}
