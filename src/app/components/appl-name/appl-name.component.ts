import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-appl-name',
  templateUrl: './appl-name.component.html',
  styleUrls: ['./appl-name.component.scss'],
})
export class ApplNameComponent implements OnInit {

  @Input() visible:boolean = true;
  
  userId:number = +localStorage.getItem("userId")
  
  constructor(private router: Router,
              private loginService:LoginService
              ) { }

  ngOnInit() {}

  logOut()
  {
    this.loginService.logOut();
  }

}
