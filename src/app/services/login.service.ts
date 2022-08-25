import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginCommand } from 'src/app/model/command/login-command';
import { UserDTO } from '../model/DTO/user-dto';

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

  saveUser(user:UserDTO)
  {
    localStorage.setItem("userId", user.id.toString());
    localStorage.setItem("userMail", user.email);
    localStorage.setItem("userPassword", user.passwordHash);
  }

  logOut()
  {
    localStorage.removeItem("userId");
    localStorage.removeItem("userMail");
    localStorage.removeItem("userPassword");
  }

}
