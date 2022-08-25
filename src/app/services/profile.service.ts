import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { UserCommand } from '../model/command/user-command';
import { requestOptions } from './header';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  editProfile(user:UserCommand)
  {
    return this.http.put("http://localhost:8080/my_expenses_manager/api/user/update", user, requestOptions())
  }

  deleteProfile(id:number)
  {
    return this.http.delete("http://localhost:8080/my_expenses_manager/api/user/delete/" + id, requestOptions())
  }

  getProfile(id:number)
  {
    return this.http.get("http://localhost:8080/my_expenses_manager/api/user/" + id, requestOptions())
  }

  createProfile(user:UserCommand)
  {
    return this.http.post("http://localhost:8080/my_expenses_manager/api/registration", user)
  }

  editCreateProfile(user:UserCommand)
  {
    if(user.id == null)
    {
      return this.createProfile(user);
    }
    else
    {
      return this.editProfile(user);
    }
  }

}

