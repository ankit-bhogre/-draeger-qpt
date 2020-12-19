const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const bodyParser = require('body-parser');
const request = require("request-promise-native");
const merge = require('easy-pdf-merge');
var http = require('http');
var https = require('https');
// var fs = require('fs');
const { pipeline } = require('stream');


const { promises: fs } = require("fs");
const combinePdfs = require("combine-pdfs");
// const morgan = require('morgan');
// const _ = require('lodash');


const PDFMerger = require('pdf-merger-js');
// var merger = new PDFMerger();
const app = express();

// enable files upload
app.use(fileUpload({
    createParentPath: true
}));

//add other middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// app.use(morgan('dev'));

//start app 
const port = process.env.PORT || 3000;

app.listen(port, () => 
  console.log(`App is listening on port ${port}.`)
);


app.post('/uploadpdf', async (req, res) => {
  console.log('mu pic',req.body.pdfpath);
  try {
    // ++++++++++++++++++++
    // req.body.pdfpath.map(urldata => {
    //   addpdf(urldata);
    // })
    // function addpdf(urldata){
    //   uniquefilename = Date.now() + Math.random() + "file";
    //   const file = fs.createWriteStream('./uploads/'+uniquefilename+'.pdf');
    //   https.get(urldata, response => {
    //       pipeline(
    //         response,
    //         file,
    //         err => {
    //           if (err)
    //             console.error('Pipeline failed.', err);
    //           else
    //             console.log('Pipeline succeeded.');
    //         }
    //       );
    //   });
    
    // }

    // const pdfs = ['./uploads/1606456725192.249file.pdf','./uploads/1606456725197.783file.pdf'] // array of PDF buffers

    // pdftk
    //   .input(pdfs)
    //   .output()
    //   .then(buf => {
    //     res.type('application/pdf');
    //     res.send(buf);
    //   });
    await fs.writeFile("./uploads/newoutput.pdf", await combinePdfs([
      await fs.readFile("./uploads/abc1.pdf"),
      await fs.readFile("./uploads/200.pdf")
  ]));
   
  
    // +++++++++++++++++++
      if(!req.files) {
          res.send({
              status: false,
              message: 'No file uploaded'
          });
      } 
      else {
        
        // *************************************************
      
       
       
        
        uniquefilename = Date.now() + Math.random() + "file";
        var merger = new PDFMerger();
        
        // let myphoto = testarr[0];
        // myphoto.mv('./uploads/' + 'test');
        // testarr.map( val=>{
        //   console.log('mu pic *-',val);
        //   merger.add(val)
        //   let photo = val;
        //   move photo to uploads directory
        //   photo.mv('./uploads/' + 'test');

        // })
          (async () => {
           

            // testarr.map( val=>{
            //   console.log('mu pic *-',val);
            //   merger.add(val)
           
            // })
            // console.log('my array of url data',req.body.pdfpath[0])
            // https://eprocessdevelopment.com/Draeger/QPT/PDFS/Apollo/Apollo Heat Detector 55000-138APO.pdf
            // https://eprocessdevelopment.com/Draeger/QPT/PDFS/FederalSignal/Federal Signal 27XST Strobe.pdf
            // https://www.learningcontainer.com/wp-content/uploads/2019/09/sample-pdf-file.pdf

            // let pdfBuffer1 = await request.get({uri:'https://www.myshoetips.com/PDFS/A.pdf',encoding: null});
            // let pdfBuffer2 = await request.get({uri:'https://www.myshoetips.com/PDFS/B.pdf',encoding: null});
            // merger.add('./uploads/a1.pdf');
            // merger.add('./uploads/a2.pdf');
        //     merger.add('./uploads/1606456725204.719file.pdf');
            
        //  await merger.save('./uploads/'+uniquefilename+'test.pdf'); 
        
        //  console.log('my result',uniquefilename+'.pdf');
        //  res.send({
        //     status: true,
        //     result:uniquefilename+'.pdf',
        //     message: 'success',
        // });
           })();
        //************************************************** 
        // uniquefilename = Date.now() + Math.random() + "file";
        // var merger = new PDFMerger();
        //   (async () => {
        //     req.files.pdffiles.map(val=>{
        //       console.log('mu pic',val.data);
        //       merger.add(val.data)
        //     })
        //  await merger.save('./uploads/'+uniquefilename+'.pdf'); 
        //  console.log('my result',uniquefilename+'.pdf');
        //  res.send({
        //     status: true,
        //     result:uniquefilename+'.pdf',
        //     message: 'success',
        // });
        //    })();
      }
  } catch (err) {
      res.status(500).send(err);
  }
});




