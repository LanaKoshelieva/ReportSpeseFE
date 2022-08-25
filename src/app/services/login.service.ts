import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginCommand } from 'src/app/model/command/login-command';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  logIn(email:string, password:string)
  {
    const loginModel = new LoginCommand();
    loginModel.email = email;
    loginModel.password = password;
    return this.http.post("http://localhost:8080/my_expenses_manager/api/login", loginModel)
  }
}
