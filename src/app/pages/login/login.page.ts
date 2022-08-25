import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ResponseDTO } from 'src/app/model/DTO/response-dto';
import { UserDTO } from 'src/app/model/DTO/user-dto';
import { AlertService } from 'src/app/services/alert.service';
import { LoginService } from '../../services/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm:FormGroup;
  
  showPassword:boolean = false;
  passwordToggleIcon = "eye-outline"

  constructor(private fb:FormBuilder, 
              private loginservice:LoginService, 
              public alertController: AlertController, 
              private router:Router,
              private alertService: AlertService) 
  {
    this.loginForm = this.fb.group 
    ({
      email: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required],
    })
  }
  
  ngOnInit() {}

  login()
  {
    this.loginservice.logIn(this.loginForm.value.email, this.loginForm.value.password).subscribe
    (response=>{
      const r:ResponseDTO = response as ResponseDTO;
      if(r.code == 200)
      {
        const utente:UserDTO = r.data as UserDTO;
        localStorage.setItem("userId", utente.id.toString());
        this.router.navigate(['/home']);
      }
      else
      {
        this.alertService.showAlert('Ooops', 'Something went wrong', r.message , this.alertController)
      }    
    },
      error=>
      {
        this.alertService.showAlert('Ooops', 'Something went wrong', error.error.message , this.alertController)
      })
  }

  togglePassword():void
  {
    this.showPassword = !this.showPassword;

    if (this.passwordToggleIcon === "eye-outline")
    {
      this.passwordToggleIcon = "eye-off-sharp"
    }
    else{
      this.passwordToggleIcon = "eye-outline"
    }
  }

}
