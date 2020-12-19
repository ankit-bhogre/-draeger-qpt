import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router,NavigationEnd } from '@angular/router';
import {ApiservicesService} from '../../_services/apiservices.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
headerTrue = true;
urlroute;
filename ;

  constructor(private routes:Router,private apiservice:ApiservicesService) {
    this.apiservice.castUser.subscribe(res=>{
      // this.filename = res;
      this.filename = localStorage.getItem('quotename')
      console.log('liquid component header', localStorage.getItem('quotename'));
    })
   }

  ngOnInit(): void {
    this.routes.events.subscribe(event=>{
      if(event instanceof NavigationEnd){
        this.urlroute = event.url;
         if(event.url == '/login' || event.url =='/'){
          this.headerTrue = false;
         }else{
          this.headerTrue = true;
          
         }
      }
     
    })
  }
  logOut(){
    
this.apiservice.dummyLogout()
  }
}
