import { Component, OnInit,ViewChild,ElementRef ,ViewChildren,QueryList,AfterViewInit} from '@angular/core';
import {constant,upload,mergepdf,checkbox_url} from '../../_services/constant'; 
import {ApiservicesService} from '../../_services/apiservices.service';
import { SafeResourceUrl, DomSanitizer} from '@angular/platform-browser';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {Router, ActivatedRoute} from '@angular/router'
import * as $ from 'jquery'; 
@Component({
  selector: 'app-dr-airliquid',
  templateUrl: './dr-airliquid.component.html',
  styleUrls: ['./dr-airliquid.component.css']
})

export class DrAirliquidComponent implements OnInit {
//  coverLetter = null;
//  budgetaryQuote = null;
aside_covername = "Cover letter";
aside_budgetarname = "Budgetary quote"
asideReference = "";
asideDrawing = "";
disabletab = false;
 ModPdfs;
 pdfFiles = [];
 checkboxfiles = [];
 asidename = [];
 newValue = false;
 pdfErr = false;
 pdfErrMsg;
 srcs:any;
 urlSafe: SafeResourceUrl;
 isChecked : boolean;
 model: any = {};
 asideCross = true;
 mainfiles = [] // get
 slicify = () => {this.asideCross = !this.asideCross}
arraySeq = [];
isMarged = false;
hitMergeApi = true;
previreloader = true;
isProcess = false;
storeUploadpdf = [];
userId;
quoteId;
norecorMsg = "";
managestate = 0;
stateAvailable = "usedcart"; //(newcart,usedcart)
userdata;
availdatalength;
newuniquenumber;
updateuniquenumber;
uistatus = 0;
//  *********************************************************

onDrop(event: CdkDragDrop<string[]>) {
  if (event.previousContainer === event.container) {
    moveItemInArray(event.container.data,
      event.previousIndex,
      event.currentIndex);
  } else {
    transferArrayItem(event.previousContainer.data,
      event.container.data,
      event.previousIndex, event.currentIndex);
  }
  console.log('mytodo',this.pdfFiles)
}
// ***********************************************************

/** Get handle on cmp tags in the template */
@ViewChildren('optionalinputFile') myInputVariable:QueryList<any>;
@ViewChildren('documentinputFile') docInputVariable:QueryList<any>;
 removeAside(checkid,index,identifyname,orignalname){
  if(identifyname == "optionalpdf"){
       if(checkid >2){
        let uploadinpdfIndex = this.uploadpdfField.findIndex(x=>x.unid == checkid);
        console.log('insider testing',orignalname );
        if(!!orignalname){
          // this.myInputVariable.toArray()[uploadinpdfIndex].nativeElement.value = '';
          this.pdfFiles.splice(index,1);
          console.log('insider testing ++',this.pdfFiles );
          this.uistatus = 1;
          // this.managestate = 2
        }
        else{
          
          this.myInputVariable.toArray()[uploadinpdfIndex].nativeElement.value = '';
        this.pdfFiles.splice(index,1);
        console.log('insider testing --',this.pdfFiles );
        this.uistatus = 1;
        // this.managestate = 2
         }
        // 
       }
  }
  if(identifyname == "checkbox"){
    console.log('my index 0000000', this.pdfFiles[index].mainid);
    $('#tid'+this.pdfFiles[index].mainid).trigger('click');
    this.uistatus = 1;
    // this.managestate = 2;
  }
 }
  // Select third-party data sheets
newpdfdocs = [
  {"section_type":"","mainsection_id":"","main_modules":[]},
  {"section_type":"","mainsection_id":"","main_modules":[]}
]

uploadmainField = [{"unid":1,"name":"Cover letter"},{"unid":2,"name":"Budgetary quote"}]
uploadpdfField  = [{"unid":3,"name":"Reference material"},{"unid":4,"name":"Drawing"}]

  constructor(private router:Router,private apiservices:ApiservicesService,public sanitizer:DomSanitizer,private activatedRoute: ActivatedRoute) {
    this.urlSafe= this.sanitizer.bypassSecurityTrustResourceUrl(' ');
  }
 
   checkCheckBoxvalue(pdf_id,pdf_type,checkfilename,checkfoldername,checkid){

    console.log('my check box ++', pdf_id,pdf_type,checkfilename,checkfoldername,checkid);
    // state: true,
    let mainobject = {"mainid":checkid,"original_pdf_name":checkfilename,"pdffullpath":checkbox_url+checkfoldername+'/'+checkfilename,"pdf_id":pdf_id,"pdf_type":pdf_type}
    let stateIndex =  this.pdfFiles.findIndex(x => x.mainid === checkid);
    console.log('is checked', stateIndex);
    if(stateIndex == -1){
      console.log('not is checked', stateIndex);
      this.pdfFiles.push(mainobject);
      this.uistatus = 1;
    }else{
      this.pdfFiles.splice(stateIndex,1);
      this.uistatus = 1;
    }
    console.log('check box value', this.pdfFiles);
   
   }

  //  for additional field
oninsertfield(){
  let newid_index = this.uploadpdfField.length -1;
  let newid = this.uploadpdfField[newid_index].unid;
  newid++;
    let fielddata = {
      "unid":newid,
      "name":"PDF Document"
    }
    this.uploadpdfField.push(fielddata);
    console.log('m new arr', this.uploadpdfField);
  }


  // for uploading pdf "Upload PDF document" section
  requiredInput(uniqueid,index,file){
    console.log('check file name *-*',uniqueid,file[0]);
    if(file[0] === undefined){ 
      console.log('check 1111',this.userdata);
      if(this.userdata == "datanotavail"){
     this.pdfFiles.map((val,index)=>{

      if(val.id && (val.id == 1)){
        this.aside_covername = "Cover letter";
      }else if(val.id && (val.id == 2)){
        this.aside_budgetarname = "Budgetary quote"
      }

      if(val.id && (val.id == uniqueid)){
        this.pdfFiles.splice(index,1)
        this.uistatus = 1;
      }
    })
     }else{
       if(uniqueid == 1 ){
         
        this.aside_covername =  this.pdfFiles[0].original_pdf_name;
       this.pdfFiles.map((v,i)=>{
         if(i == 0){
        // delete v.original_pdf_name;
        // delete v.pdf_id;
        // delete v.pdf_type;
        delete v.filename;
         }
       })
       this.uistatus = 1;
      }
       else if(uniqueid == 2 ){
         this.aside_budgetarname =  this.pdfFiles[1].original_pdf_name;
       this.pdfFiles.map((v,i)=>{
        if(i == 1){
      //  delete v.original_pdf_name;
      //  delete v.pdf_id;
      //  delete v.pdf_type;
       delete v.filename;
        }
      })
      this.uistatus = 1;
      }
      // ------------------- +++++++++++ testing +++++++ ----------------------------
      this.pdfFiles.map((val,index)=>{
        if(val.id && (val.id == 100+uniqueid)){
          this.pdfFiles.splice(index,1)
          this.uistatus = 1;
        }
      })
     }
    console.log('check file undefined *-**' ,this.pdfFiles); 
  }else{
    console.log('check 22222');
  // for changing name of cover latter and budgetry quote on aside section 
  // this.asidename.push(file[0].name);
  if(uniqueid == 1){this.aside_covername = file[0].name; this.uistatus = 1;}
  else if(uniqueid == 2){this.aside_budgetarname = file[0].name; this.uistatus = 1;}

 if(this.pdfFiles.length == 0){
  console.log('check 3333');
  let uniquevalue = {
    id:uniqueid,
    filename:file,
    pdf_name:"",
    pdf_type:"",
    pdf_id:""
  }
  this.pdfFiles.push(uniquevalue);
  this.uistatus = 1;
  console.log('check one //',this.pdfFiles); 
 }else{
  console.log('check 4444');
 
  console.log('check ****ind',index,uniqueid);
 if(this.userdata == "datanotavail"){
  let index = this.pdfFiles.findIndex(x => x.id == uniqueid);
  if( index === -1){
    console.log('check 555555');
    console.log('check ur +++++1 ');
   
    let uniquevalue = {
      id:uniqueid,
      filename:file,
      pdf_name:"",
      pdf_type:"",
      pdf_id:""
    }
    this.pdfFiles.push(uniquevalue);
    this.uistatus = 1;
    console.log('check 666666',this.pdfFiles);
  }
  // now new code
  else{
    console.log('check 777777');
    console.log('+++ check file name *-* new file',this.pdfFiles);
      if(this.pdfFiles[index].filename || (this.pdfFiles[index].id == 1 || this.pdfFiles[index].id == 2)){  console.log('check 8888888');
      this.pdfFiles[index].filename = file;
      this.uistatus = 1;
    }
      else{  
          console.log('--- check file name *-* new file',this.pdfFiles);
          let uniquevalue = {
            id:uniqueid,
            filename:file,
            pdf_name:"",
            pdf_type:"",
            pdf_id:""
          }
          this.pdfFiles.push(uniquevalue);
          this.uistatus = 1;
      // }
    }
  }
 }else{
  //  ----------------------------------------------------------------------
  let elseindex = this.pdfFiles.findIndex(x => x.pdf_type == uniqueid);
  let elseuniindex = this.pdfFiles.findIndex(x => x.id == this.updateuniquenumber+uniqueid);
  console.log('-------------------- check my index --',uniqueid,elseindex,elseuniindex);
if(elseindex == 0){ this.pdfFiles[0].filename = file; this.uistatus = 1;}
else if(elseindex == 1){this.pdfFiles[1].filename = file;  this.uistatus = 1;}
else{ 
  if(elseuniindex == -1){
    let uniquevalue = {
      id:this.updateuniquenumber+uniqueid,
      filename:file,
      pdf_name:"",
      pdf_type:"",
      pdf_id:""
    }
    this.pdfFiles.push(uniquevalue); 
    this.uistatus = 1;
  }else{
    this.pdfFiles[elseuniindex].filename = file;
    this.uistatus = 1;
  }
}
console.log('-------------------- check dataevil --',this.pdfFiles);
  // ------------------------------------------------------------------------
 
 }
  // new code close
      }
    }
    // console.log('check file name *-* new file',this.pdfFiles);
  }


   arraymove(arr, fromIndex, toIndex) {
    var element =  this.pdfFiles[fromIndex];
    arr.splice(fromIndex, 1);
    arr.splice(toIndex, 0, element);
}

  submitPdf(){
  
    this.isMarged = true;
    // let index = this.pdfFiles.findIndex(x => x.id === uniqueid);
    this.pdfErr = false;
    // this.pdfFiles.length == 0; 
    // let coverletter =  this.pdfFiles.findIndex(x => x.id === 1);
    // let budgetaryquote = this.pdfFiles.findIndex(x => x.id === 2);

    // if ( this.pdfFiles.length == 0){ this.pdfErr = true; this.pdfErrMsg = "Please upload required pdf file";  this.isMarged = false; console.log('blank',this.pdfFiles);}
    // else if(coverletter == -1 && budgetaryquote == -1){ this.pdfErr = true; this.pdfErrMsg = "Cover latter and Budgetary quote can not be blank"; this.isMarged = false; console.log('select one',this.pdfFiles);}
    // else if(coverletter == -1 ){this.pdfErr = true; this.pdfErrMsg = "Cover latter can not be blank"; this.isMarged = false; console.log('select coverletter',this.pdfFiles); }
    // else if(budgetaryquote == -1 ){this.pdfErr = true; this.pdfErrMsg = "Budgetary quote can not be blank"; this.isMarged = false; console.log('select budgetaryquote',this.pdfFiles); }
    // else {
      // used function for arrange coverletter and budgetaryquote on o and 1 index 
      // this.arraymove(this.pdfFiles,coverletter,0);
      // this.arraymove(this.pdfFiles,budgetaryquote,1);
   
      // ========================
      // this.pdfErr = false; 
      this.arraySeq = [];
      let arrayUrl = [];
      
      var formData = new FormData(); 
      formData.append('user_id', this.userId);
      formData.append('quote_id',this.quoteId);
      let testindexid = []
      console.log('our array',this.pdfFiles);

      // if(  this.userdata = "datanotavail"){
      this.pdfFiles.map((val,index)=>{
        console.log('our array 66',val.filename);
      if(val.filename){ 
        if(val.id == 1){  
        testindexid.push(index)
        formData.append('fd_cover_letter', val.filename[0]);
           }
        else if(val.id == 2){
          testindexid.push(index)
          formData.append('fd_price', val.filename[0]);
          }
          else if(val.id > 2){
             var otherpdf = []
             otherpdf.push(val.filename[0])
             testindexid.push(index)
            formData.append('pdf_file[]', val.filename[0])
          }
       }
      });
    // }  
    // else{
      
    //   this.pdfFiles.map((val,index)=>{
    //     console.log('our array 66',val.filename);
    //   if(val.filename){ 
    //     if(val.id == 1){  
    //     testindexid.push(index)
    //     formData.append('fd_cover_letter', val.filename[0]);
    //        }
    //     else if(val.id == 2){
    //       testindexid.push(index)
    //       formData.append('fd_price', val.filename[0]);
    //       }
    //       else if(val.id > 2){
    //          var otherpdf = []
    //          otherpdf.push(val.filename[0])
    //          testindexid.push(index)
    //         formData.append('pdf_file[]', val.filename[0])
    //       }
    //    }
    //   });
    
    // }
 
      this.apiservices.post(constant.submitpdf,formData).subscribe((res:any)=>{
        console.log('state array ----- ++++++ ****** ', res);
        if(res && res[0].status == true){
          console.log('get test array',testindexid, res);
          testindexid.map((val,index)=>{ 
            this.pdfFiles[val].pdf_name =  res[0].pdf_data[index].pdf_name;
            this.pdfFiles[val].pdf_type =  res[0].pdf_data[index].pdf_type;
            this.pdfFiles[val].pdf_id   =  res[0].pdf_data[index].pdf_id;
           })
           console.log('state array', this.pdfFiles);
            // this.managestate = 1;
            this.isMarged = false; // loader on save btn
            this.isProcess = false;
            this.hitMergeApi = false;
            this.disabletab = false;
            this.uistatus = 0;
            // this.uploadpdfField.map((val,index)=>{ this.myInputVariable.toArray()[index].nativeElement.value = '';})
         }else if(res && res[0].status == false){
          console.log('state array++++++ ****** ', res[0].error);
          this.pdfErr = true;
          this.pdfErrMsg = res[0].error;
          this.isMarged = false;
         
         }  
        
       });
      //  }
    }
 // this.urlSafe= this.sanitizer.bypassSecurityTrustResourceUrl('http://127.0.0.1:8080/'+res.result);
    switchTab(){
      this.norecorMsg = "";
      console.log('manage state here',this.managestate)
      if(this.uistatus == 0){
      if(this.hitMergeApi == false){
           this.previreloader = true;
            this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(' ');
          
        let sortedarray = []
        console.log('final arrya is ++ :-',this.pdfFiles)
        this.pdfFiles.map(val=>{
          if(val.id){  sortedarray.push({"sid":val.id,"smid":0,"pdf_type":val.pdf_type,"pdf_id":val.pdf_id})}
          else if(val.mainid){  sortedarray.push({"sid":0,"smid":val.mainid,"pdf_type":val.pdf_type,"pdf_id":val.pdf_id})}
        })
      
        console.log('final arrya is :-',sortedarray)
       

        var mergeformData = new FormData(); 
        mergeformData.append('user_id',this.userId);
        mergeformData.append('quote_id',this.quoteId);
        mergeformData.append('pdfs_data', JSON.stringify(sortedarray));
 
        
        this.apiservices.post(constant.mergepdf,mergeformData).subscribe((res:any)=>{
         console.log('merged final data ----',res);
         if(res && res.status == true){
         this.urlSafe= this.sanitizer.bypassSecurityTrustResourceUrl(res.pdf_preview_link);
         this.hitMergeApi = true;
         this.previreloader = false;
         }
        });
      }else if(this.hitMergeApi == true){
         var formData = new FormData(); 
        formData.append('user_id',this.userId);
        formData.append('quote_id',this.quoteId)
        this.apiservices.post(constant.showpdf,formData).subscribe((res:any)=>{
          if(res && res.status == true){
          this.urlSafe= this.sanitizer.bypassSecurityTrustResourceUrl(res.pdf_preview_link);
          console.log('merged final data 9999*****////+++***',res);
          this.previreloader = false;
          }else if(res && res.status == false){
            this.previreloader = false;
            this.norecorMsg = "No Record Found";
          }
        });
      }
    }
    else{
      this.previreloader = false;
      this.norecorMsg = "For saving changes, please click on Save button.";
    }
      // else {
      //   this.norecorMsg = "check and back";
      // }
     
    }
    
  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.userId = params['user'];
      this.quoteId = params['quote'];
    });
    // this.apiservices.get(constant.pdf_modules).subscribe((res:any)=>{
    //   this.ModPdfs = res;
    //   console.log('main mod',this.ModPdfs);
    // res.map(val=>{

    //   if(val.section_id == 1){
    //     this.newpdfdocs[0].section_type = "Select Third-party Data Sheets",
    //     this.newpdfdocs[0].mainsection_id = "se1",
    //     this.newpdfdocs[0].main_modules.push(val)
    //   }
    //   if(val.section_id == 2){
    //     this.newpdfdocs[1].section_type = "Select Product Information Documents",
    //     this.newpdfdocs[1].mainsection_id = "se2",
    //     this.newpdfdocs[1].main_modules.push(val)
    //   }
    
    // })
    // })
    console.log('main mod',this.userId,this.quoteId);
    var pdfmoduledata = new FormData(); 
    pdfmoduledata.append('user_id',this.userId);
    pdfmoduledata.append('quote_id',this.quoteId);
 
    this.apiservices.post(constant.pdf_modules,pdfmoduledata).subscribe((result:any)=>{
      console.log('main mod',result);
         this.ModPdfs = result;
    
      result.map(val=>{

      if(val.section_id == 1){
        this.newpdfdocs[0].section_type = "Select Third-party Data Sheets",
        this.newpdfdocs[0].mainsection_id = "se1",
        this.newpdfdocs[0].main_modules.push(val)
      }

      if(val.section_id == 2){
        this.newpdfdocs[1].section_type = "Select Product Information Documents",
        this.newpdfdocs[1].mainsection_id = "se2",
        this.newpdfdocs[1].main_modules.push(val)
      }

    })
    })


    // this.newpdfdocs[1].main_modules.map((val,index)=>{
    //   console.log('my main module',  val.module_pdfs)
    //   $('#tid'+30).trigger('click');
    //    });
    // $('#tid'+this.pdfFiles[index].mainid).trigger('click');

  // 
 this.apiservices.cartupdate.subscribe(data=>{
  console.log('res of null here-', data);

  if(data == null){
    this.pdfFiles = [];
    this.userdata = "datanotavail";
    console.log('null here-', data);
  }
  else if(data == 0){ 
    this.userdata = "datanotavail";
    this.router.navigate(['']);
   }
  else{
    // newuniquenumber
    this.pdfFiles = [];
    data.map(val=>{
      if(val.sid && val.sid != 0){
        this.pdfFiles.push( {"id":val.sid,"original_pdf_name":val.file_name,"pdf_id":val.pdf_id,"pdf_type":val.pdf_type})
      }
      if(val.smid && val.smid != 0){
        this.pdfFiles.push( {"mainid":val.smid,"original_pdf_name":val.file_name,"pdf_id":val.pdf_id,"pdf_type":val.pdf_type})
      }
      console.log('+++++++++ null here-', val);
      if(val.pdf_type == 1){
        console.log('55550 +++++++++ null here-', val);
        this.aside_covername = val.file_name;}
      if(val.pdf_type == 2){
        console.log('50202 +++++++++ null here-', val); 
        this.aside_budgetarname = val.file_name;}
    })
   this.newuniquenumber = Math.max(... data.map(o => o.sid));
    this.userdata = "dataavail";
    // this.availdatalength = data.length;
    this.updateuniquenumber = 100 + this.newuniquenumber;
    console.log('user finest number -', this.updateuniquenumber,this.pdfFiles.length);
  }

  console.log('user received data here null hre-', this.pdfFiles);
})
// 

    

  }
 
}
