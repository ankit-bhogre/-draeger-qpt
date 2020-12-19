import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,Validators} from '@angular/forms';
import {ApiservicesService} from '../../_services/apiservices.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup;
  submit = false;
  invalidloginMsg; 
  constructor(private fb:FormBuilder,private apiservice:ApiservicesService,private router: Router) {
    let userToken = localStorage.getItem('usertoken');
      let userRole = localStorage.getItem('loginid');
      if(userToken && userRole){
        this.router.navigate(['']);
      }
   }
 
  ngOnInit(): void {
    this.invalidloginMsg = "";
    this.loginForm = this.fb.group({
      username:['',[Validators.required]],
      password:['',[Validators.required]]
    })
  }
  get loginvalidate() {return this.loginForm.controls};
  loginSubmit(){
    this.submit = true;
    this.invalidloginMsg = "";
   
    if(this.loginForm.invalid){
      this.invalidloginMsg = "";
     return;
    }
  let userlog = this.apiservice.dummyLogin(this.loginForm.value);
    if(userlog == true){}else if(userlog == false){this.invalidloginMsg = "Username or Password is invalid"}
  
    console.log(  this.apiservice.dummyLogin(this.loginForm.value));
  }
}
