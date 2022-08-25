import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-appl-name',
  templateUrl: './appl-name.component.html',
  styleUrls: ['./appl-name.component.scss'],
})
export class ApplNameComponent implements OnInit {

  @Input() visible:boolean = true;
  
  userId:number = +localStorage.getItem("userId")
  
  constructor(private router: Router) { }

  ngOnInit() {}

  ionViewWillEnter() 
  {
    this.showLogout();
  }

  logOut()
  {
    localStorage.removeItem("userId");
    this.router.navigate(['/login']);
  }

  showLogout()
  {
    
  }

}
