import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError,Observable,Subject,BehaviorSubject } from 'rxjs';
import { retry,catchError,map } from 'rxjs/operators';
import {Router} from '@angular/router';
import {constant} from '../_services/constant'; 
@Injectable({
  providedIn: 'root'
})
export class ApiservicesService {
 

   private user = new BehaviorSubject<any>('');
   castUser = this.user.asObservable();

   private cartval = new BehaviorSubject<any>(0);
   cartupdate = this.cartval.asObservable();

  constructor(private http:HttpClient, private router: Router) { }
  // headers = new HttpHeaders();
  
  // post(url,data):Observable<any>{
  //   let headers = new HttpHeaders()
  //   headers=headers.append('loggeduserid','uploadbase'+'15');
  //   headers=headers.append('userpdfdir','mergebase'+'15');
  //   return this.http.post<any>(url,data,{'headers':headers}).pipe( map( res=>{ if (!!res) { return res;} return false }), catchError(this.handleError))
  // }
  post(url,data):Observable<any>{
    // let headers = new HttpHeaders()
    // headers=headers.append('loggeduserid','uploadbase'+'15');
    // headers=headers.append('userpdfdir','mergebase'+'15');
    return this.http.post<any>(url,data).pipe( map( res=>{ if (!!res) { return res;} return false }), catchError(this.handleError))
  }
  get(url):Observable<any>{
    return this.http.get<any>(url).pipe( map( res=>{ if (!!res) { return res;} return false }), catchError(this.handleError))
  }
   
  dummyLogin(credential){
    if(credential.username == "admin" && credential.password == "123456"){
      let dummytoken = Math.floor(100000 + Math.random() * 900000);
      let loginId = 1;
      localStorage.setItem('usertoken',JSON.stringify(dummytoken));
      localStorage.setItem('loginid',JSON.stringify(loginId));
      var formData = new FormData(); 
      formData.append('user_id',JSON.stringify(loginId));
      this.post(constant.previousquote,formData).subscribe((res:any)=>{
        console.log('data trunck', res);
        if(res && res.status == true){
           this.user.next(localStorage.setItem('quotename',res.quote_name)) 
          }
      })
      this.router.navigate(['']);
      return true }
    else { return false }
  }
  dummyLogout(){
    this.router.navigate(['/login']);
    localStorage.clear();
  }
   // for handle unknown error  
   handleError(error) {
    console.log('err name 000 ++++', error)
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
        // client-side error
        // errorMessage = 'Something wrong with selected PDF.'
        console.log('err name 1', error)
        if(error.error.type == "error"){ errorMessage = `Error: ${error.error.message}`;}else{ errorMessage = "PDF format is not correct"}
       
       
        
    } else {
        // server-side error
        // errorMessage = 'Something wrong with selected PDF.'
        console.log('err name 2', error)
        if(error.error.type == "error"){  errorMessage = error.error.error;}else{ errorMessage = "PDF format is not correct"}
       
        
    }
    console.log('err name 3 ++++', error)
  
      window.alert(errorMessage);
      return throwError(errorMessage);
      }
      // ***************************Data Sharing close*******************************************

    sharePdf(pdfname){ 
      // this.user.next(pdfname);
     this.user.next(localStorage.setItem('quotename',pdfname));
     console.log('test name', pdfname)
    }
      // ***************************Data Sharing close*******************************************
      shareCartdata(data){
         this.cartval.next(data);
          }
    
    }
     
    