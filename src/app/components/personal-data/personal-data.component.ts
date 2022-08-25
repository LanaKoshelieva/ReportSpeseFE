import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, IonInput, ModalController } from '@ionic/angular';
import { ResponseDTO } from 'src/app/model/DTO/response-dto';
import { UserDTO } from 'src/app/model/DTO/user-dto';
import { ProfileService } from 'src/app/services/profile.service';
import { AlertService } from 'src/app/services/alert.service';
import { UserCommand } from 'src/app/model/command/user-command';
import { CustomValidators } from 'src/app/utilities/custom-validator';
import { format, parseISO } from 'date-fns';
import { LoginService } from 'src/app/services/login.service';


@Component({
  selector: 'app-personal-data',
  templateUrl: './personal-data.component.html',
  styleUrls: ['./personal-data.component.scss'],
})
export class PersonalDataComponent implements OnInit {
 
  @Input() id:number = null;

  user: UserDTO = null;
  userId:number = +localStorage.getItem("userId")

  link:string = "/login" 
  question: string = "Have an account?" ;
  action: string = "Sign in"; 

  profilePage: boolean = true;
  showPicker = false;
  dateValue = format(new Date(), 'dd-MM-yyyy')  + 'T09:00:00.000Z'; 

  profileForm:FormGroup;
  buttonText:string = "Edit profile";

  visible: boolean = true;
  match:boolean = true;
  hidden:boolean = false;
  loading:boolean = false;

  showPassword:boolean = false;
  showConfirm:boolean = false;
  eyeIcon1 ="eye-outline";
  eyeIcon2 ="eye-outline";


  constructor(private fb: FormBuilder, 
              private profileService: ProfileService,
              private alertService: AlertService,
              private alertController: AlertController,
              private modalController: ModalController,
              private router: Router,
              private userService: ProfileService, 
              private loginService: LoginService             
              )
              {}

  ngOnInit() 
  {
    if (this.id === null || this.id === undefined)
    {
      this.buttonText = "Register"
      this.id = null;
      this.hidden = false;
      this.profilePage = false;

      this.profileForm = this.fb.group
      ({
        name: ['', Validators.required],
        surname: ['', Validators.required],
        bDay: ['', Validators.required],
        gender: ['', Validators.required],
        email: ['', [Validators.email, Validators.required]],
        password: ['', [Validators.required, Validators.pattern("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,20}$")]],
        confirmPassword: ['', [Validators.required, Validators.pattern("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,20}$")]],
      },   
      [CustomValidators.MatchValidator('password', 'confirmPassword')])
    }
    else 
    {
      this.hidden = true;
      this.visible = false;
      this.profileForm = this.fb.group
      ({
        name: ['', Validators.required],
        surname: ['', Validators.required],
        bDay: ['', Validators.required],
        gender: ['', Validators.required],
        email: ['', [Validators.email, Validators.required]],
        password: [''],
        confirmPassword: [''],
      })
    }
    
    this.getData();
  }

  togglePassword():void
  {
    this.showPassword = !this.showPassword;    
    if (this.eyeIcon1 === "eye-outline")
    {
      this.eyeIcon1 = "eye-off-outline";
    }
    else{
      this.eyeIcon1 = "eye-outline";
    }
  }

  toggleConfirm():void
  {
    this.showConfirm = !this.showConfirm;    
    if (this.eyeIcon2 === "eye-outline")
    {
      this.eyeIcon2 = "eye-off-outline";
    }
    else{
      this.eyeIcon2 = "eye-outline";
    }
  }


  async dateChanged(value)
  {
    this.dateValue = value;
    const formattedDate = format(parseISO(value), 'yyyy-MM-dd');
    await this.profileForm.patchValue({bDay:formattedDate});
    this.profileForm.updateValueAndValidity();
    this.showPicker = false;
  } 


  getData()
  {
    if (this.id == null)
    {
      return
    }
    this.loading = true;
    this.profileService.getProfile(this.id).subscribe
    (async response =>
      {
        this.loading = false;
        const r:ResponseDTO = response as ResponseDTO;
        if(await this.loginService.checkResponse(r) == false)
        {
          return
        }
        
        if(r.code == 200)
        {
        
          const utente:UserDTO = r.data as UserDTO;
          this.profileForm.patchValue({name:utente.name});
          this.profileForm.patchValue({surname:utente.surname});
          this.profileForm.patchValue({email:utente.email});
          this.profileForm.patchValue({gender:utente.sex});
          this.profileForm.patchValue({bDay:utente.birthDate});
        }
        else
        {
          this.alertService.showAlert('Ooops', 'Something went wrong', r.message , this.alertController)
        }    
      },
        error=>
        {
          this.loading = false;
          this.alertService.showAlert('Ooops', 'Something went wrong', error.error.message , this.alertController)
        }) 
  }

  onClick()
  {
    let user:UserCommand = new UserCommand;
    user.id = this.id;

    if(user.id == null)
        {
          user.password = this.profileForm.value.password;
        }
        user.name = this.profileForm.value.name;
        user.surname = this.profileForm.value.surname;
        user.email = this.profileForm.value.email;
        user.birthDate = this.profileForm.value.bDay;
        user.sex = this.profileForm.value.gender; 

        this.loading = true;   
        this.profileService.editCreateProfile(user).subscribe
        (async response =>
          {
            this.loading = false;

            const r:ResponseDTO = response as ResponseDTO;
            if(await this.loginService.checkResponse(r) == false)
            {
              return
            }
            
            if(r.code == 200)
            {
              if(user.id == null)
              {
                this.alertService.showAlert("Ok", "Successful registration", "Please login to access", this.alertController)
                this.router.navigate(['login']);
              }
              else
              {
                this.alertService.showAlert("Ok", "Changes saved successfully", "User updated", this.alertController)         
              }          
            }
            else
            {
              this.alertService.showAlert('Ooops', 'Something went wrong', r.message , this.alertController);
            }
          }, 
          error =>
          {
            console.log(error)
            this.loading = false
            this.alertService.showAlert('Ooops', 'Something went wrong', error.error.message , this.alertController);
          }   
        )
  }

  controlPasswords()
  {
    let password:string = this.profileForm.value.password;
    let confirmPassword:string = this.profileForm.value.confirmPassword;

    if(password !== null && password.length > 0 
      && confirmPassword !== null && confirmPassword.length > 0
      && confirmPassword !== password)
    {
      this.match = false;
    }
    else
    {
      this.match = true;
    }
  }

  async confirmAlert()
  {
    const alert = await this.alertController.create
    ({
      header: 'Are you sure you want to delete your profile?',
      cssClass: 'custom-alert',
      buttons: [
        {
          text: 'No',
          cssClass: 'alert-button-cancel',
          role: 'cancel' 
        },
        {
          text: 'Yes',
          cssClass: 'alert-button-confirm',
          handler: () => {          
            this.deleteProfile();
          }
        },
      ],
    });

    await alert.present();
  }

  deleteProfile()
  {
    this.loading = true;   
    this.userService.deleteProfile(this.userId).subscribe
    (async response =>
      {
        this.loading = false;
        const r:ResponseDTO = response as ResponseDTO;
        if(await this.loginService.checkResponse(r) == false)
        {
          return
        }
        
        if(r.code == 200)
        {
          await this.loginService.logOut();
          this.alertService.showAlert("Ok", "Profile deleted", "Stay safe", this.alertController);       
        }
        else
        {
          this.alertService.showAlert('Ooops', 'Houston we have a problem', r.message , this.alertController);
    
        }
      }, 
      error =>
      {
        console.log(error)
        this.loading = false
        this.alertService.showAlert('Ooops', 'Houston we have a problem', error.error.message , this.alertController);
      }       
    ) 
  }


  cancel() {
    return this.modalController.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalController.dismiss(null, 'confirm');
  }
  
}

