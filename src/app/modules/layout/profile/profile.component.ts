import { Component, OnInit } from '@angular/core';
import { FULL_ROUTES } from 'src/app/constants/routes';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{

  FULL_ROUTES = FULL_ROUTES;
  userData?:any;
  data:any;
  myImgUrl:string='/assets/images/user_img.png';

  ngOnInit(){
    this.userData=localStorage.getItem('user');
    this.data= JSON.parse(this.userData);
  }
}
