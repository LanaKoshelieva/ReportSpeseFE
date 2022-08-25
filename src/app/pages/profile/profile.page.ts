import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  userId:number = +localStorage.getItem("userId")
  
  constructor(private profileService: ProfileService) { }

  ngOnInit() 
  {
    if(this.profileService.checkLogged() == false)
    {
      return;
    }
  }


}
