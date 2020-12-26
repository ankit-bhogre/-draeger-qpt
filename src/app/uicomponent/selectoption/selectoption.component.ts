import { Component, OnInit } from '@angular/core';
import {ApiservicesService} from '../../_services/apiservices.service';
import {constant} from '../../_services/constant'; 
import {FormGroup,FormBuilder,Validators} from '@angular/forms';
import {Router} from '@angular/router';
@Component({
  selector: 'app-selectoption',
  templateUrl: './selectoption.component.html',
  styleUrls: ['./selectoption.component.css']
})
export class SelectoptionComponent implements OnInit {
  submitted = false;
  newQuote:FormGroup;
  dummmy_loginid = localStorage.getItem('loginid');
  QuoteCreateMsg;
  existQuoteid;
  existuserid;
  existQuotename;
  hidePencilIcon = true;
  TogpancilIcon = () => {this.hidePencilIcon = !this.hidePencilIcon}
  // below arry will show api data list
  // existQuotes = ['AdvnSix-PA0252020','AdvnSix-PA0252021','AdvnSix-PA0252022','AdvnSix-PA0252023','AdvnSix-PA0252024'];
  existQuotes = [];
  excerpt: Array<any> = []; // this array used for toggle selected item
  constructor(private fb:FormBuilder,private apiservices:ApiservicesService,private router: Router) { }

  ngOnInit(): void {
   this.newQuote = this.fb.group({
      quotename:['',[Validators.required]]
    })
   
    // get quote api
    this.apiservices.get(constant.getquote+this.dummmy_loginid).subscribe((res:any)=>{
      console.log('my data', res);
      if(res && res.status == false){
      
    }else{
      res.map(val=>{
        this.existQuotes.push(val);
      })
    }
      console.log('my data', this.existQuotes);
    })
  }

       // remove Quote here 
       
       onQuoteremove(quoteid,Quotename,indexs){
        console.log('remove quote by id',quoteid);
        var removeQuote = new FormData(); 
        removeQuote.append('user_id',this.dummmy_loginid);
        removeQuote.append('quote_id', quoteid);
        this.apiservices.post(constant.deleteQuote,removeQuote).subscribe((res:any)=>{
          console.log('remove Quote',res);
          if(res){
                // get quote api
            this.apiservices.get(constant.getquote+this.dummmy_loginid).subscribe((res:any)=>{
              console.log('my data -------------', res);
              if(res && res.status == false){
              if(res.error == "No record found."){
                this.excerpt = [];
                // this.excerpt[indexs] = !this.excerpt[indexs];
                this.existQuotes = [];
                this.apiservices.sharePdf('Quote Name');
              }
            }else{
              this.excerpt = []
              // this.excerpt[indexs] = !this.excerpt[indexs];
              this.existQuotes = [];
              res.map(val=>{
                this.existQuotes.push(val);
              })
              
              let qtName = localStorage.getItem('quotename');
              console.log('my new val', qtName,Quotename);
              // if(qtName == Quotename){ console.log('entered'); this.apiservices.sharePdf('Quote Name');}
              // ++++++++++++++++++++++++
              var changeQuotename = new FormData(); 
              changeQuotename.append('user_id',this.dummmy_loginid);
              this.apiservices.post(constant.previousquote,changeQuotename).subscribe((res:any)=>{
                // console.log('data trunck 99999', res);
                if(res && res.status == true){
                  this.apiservices.sharePdf(res.quote_name);
                  }
              })
              // ++++++++++++++++++++++++
            }
              console.log('my data', this.existQuotes);
            })
          }

        })
      }
   
  get quotevalidate(){return this.newQuote.controls}
 slicify = (i) => {
                  this.excerpt[i] = !this.excerpt[i];
                  this.excerpt.map((value,index)=>{ if(index != i){this.excerpt[index] = false;} })
                  if(this.excerpt[i] == true){ 
                   
                    this.apiservices.sharePdf(this.existQuotes[i].quote_name);
                    this.existQuoteid = this.existQuotes[i].quote_id;
                    // this.existuserid  = this.existQuotes[i].user_id;
                    this.existQuotename = this.existQuotes[i].quote_name;
                  }
                    
                  }


 selectQuote(){
  this.QuoteCreateMsg = "";
  this.submitted = true;
  if( this.newQuote.invalid){  console.log('entered',this.newQuote.value);return}
  // if(this.excerpt.indexOf(true) == -1){ 
    this.apiservices.sharePdf(this.newQuote.value.quotename)
    var formData = new FormData(); 
    formData.append('user_id',this.dummmy_loginid);
    formData.append('quote_name', this.newQuote.value.quotename);
    console.log('data res ++',this.dummmy_loginid,this.newQuote.value.quotename);
    this.apiservices.post(constant.createquote,formData).subscribe((res:any)=>{
   
      if(res && res.status == true){
        this.apiservices.shareCartdata(null);

        console.log('data res true',res);
        this.router.navigate(['/mergepdf'], { queryParams: { user: this.dummmy_loginid,quote:res.quote_id }}); 
      }else{
        this.QuoteCreateMsg = res.error;
        console.log('data res false',res);
      }
    })
  // }
  // else{console.log('please uncheck selected name')}
//  this.router.navigate(['/mergepdf']);
  //  console.log('form submitted',this.newQuote.value)
  }
  selectexistQuote(){ 
    
    if(this.excerpt.indexOf(true) != -1)
    { 
      var formData = new FormData(); 
      formData.append('user_id',this.dummmy_loginid);
      formData.append('quote_id',this.existQuoteid);
      formData.append('quote_name', this.existQuotename);
      this.apiservices.post(constant.updateQuote,formData).subscribe((res:any)=>{
      console.log('selected res here',res);
      if(res && res.status == true){
        //  run api for already selected quote 
        var selectedVal = new FormData(); 
        selectedVal.append('user_id',this.dummmy_loginid);
        selectedVal.append('quote_id',this.existQuoteid);
        this.apiservices.post(constant.cartdata,selectedVal).subscribe((res:any)=>{
          console.log('check val of res', res); 
          if(res && res.status == true && res.error == "No record found."){
            this.apiservices.shareCartdata(null);
            this.router.navigate(['/mergepdf'],{ queryParams: { user: this.dummmy_loginid,quote: this.existQuoteid }});
          }else if(res ){
      
            this.apiservices.shareCartdata(res);
            this.router.navigate(['/mergepdf'],{ queryParams: { user: this.dummmy_loginid,quote: this.existQuoteid }});
          }
        })
        // this.router.navigate(['/mergepdf'],{ queryParams: { user: this.dummmy_loginid,quote: this.existQuoteid }});
        
        // console.log('check val', this.excerpt.indexOf(true)); 
      }
      })
    
    
    }

  }
}
