import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';
import { LoginCommand } from 'src/app/model/command/login-command';
import { ResponseDTO } from '../model/DTO/response-dto';
import { UserDTO } from '../model/DTO/user-dto';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient,
              private router: Router) { }

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

  async logOut()
  {
    localStorage.removeItem("userId");
    localStorage.removeItem("userMail");
    localStorage.removeItem("userPassword");
    await this.router.navigate(['/login']);
  }

  async checkResponse(r:ResponseDTO)
  {
    if(r.code == 401)
    {
      await this.logOut();
      return false;
    }
    return true;
  }

}
