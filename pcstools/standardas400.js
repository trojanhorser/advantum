
as400system='ANY';
as400dataodbc=''; 
as400pcstoolsodbc='pcstools'; 
connpcstools=''; 

function as400Connect() {
   
try {

   if (!globaldialogparm.fso) {
       fso = new ActiveXObject("Scripting.FileSystemObject");
       globaldialogparm.fso=fso;
       WshShell = new ActiveXObject("WScript.Shell"); 
       globaldialogparm.WshShell=WshShell;
   }
   else {
       fso=globaldialogparm.fso;
       WshShell = globaldialogparm.WshShell; 
   }


   if (!globaldialogparm.environment) {
       if (window.location.href.split(':')[0]=='file') {
           globaldialogparm.environment='intranet';
           conn = new ActiveXObject ("ADODB.Connection"); 
           conn.open (as400dataodbc, "RMTACCESS", "RMTACCESS");
           globaldialogparm.conn=conn;
           connpcstools = new ActiveXObject ("ADODB.Connection"); 
           connpcstools.open (as400pcstoolsodbc, "RMTACCESS", "RMTACCESS");
           globaldialogparm.connpcstools=connpcstools;
       }
       else {
           globaldialogparm.environment='internet';
       }
   }

   if (globaldialogparm.environment=='intranet') {
       conn=globaldialogparm.conn;
       connpcstools=globaldialogparm.connpcstools;
   }
   else {   
      sqlselecttype='php';
      submitsqlodbc=as400dataodbc;
      submitsqlpath="../pcstools/phpsqlas400.php";
   }

 } 
 catch (e) {
   alert(e.message); return false;
 }
 
 return true;
 
}


function as400Transfer() {
  this.directive='';
  this.usrnam=username;
  this.file='';
  this.job='';
  this.jobnbr='';
  this.spnbr='';
  this.rtnrpttyp='pdf';
  this.data='';
  this.importfile='';
} 


function sndRcvAs400(obj) {
  if (!obj.directive) {
      alert('A directive is necessary');
      return false;
  }
  var rslt=false;
  if (globaldialogparm.environment=='internet') {
      submitsqlodbc=as400pcstoolsodbc;
  }
  try {
      rslt=doSndRcvAs400(obj); 
  } 
  catch(e) {alert(e.message)} 
  if (globaldialogparm.environment=='internet') {
      submitsqlodbc=as400dataodbc;
  }
  return rslt;
}

function doSndRcvAs400(obj) {

  as400seqnbr=''+timeStamp()+(Math.floor(Math.random() * (9999 - 1)) + 1); 
  as400seqnbr=as400seqnbr.trim(); 
  
  if (obj.importfile) {
      var i=0;
      var ForReading = 1;
      var f = fso.OpenTextFile(obj.importfile, ForReading);
      var senddata=new Array();
      var alldata=f.ReadAll().split('\n');
      f.Close();
      var uselen=alldata.length; 

      if (isBlank(alldata[alldata.length-1])) {uselen=uselen-1}
      for (i=0; i<uselen; i++) {
            if (globaldialogparm.environment=='internet') {
                senddata[i]=alldata[i].sqlWrap();
            }
            else {
                senddata[i]=alldata[i];
            } 
      }
      if (globaldialogparm.environment=='internet') {
          senddata=senddata.join('!!');
          var parms='seqnbr='+as400seqnbr+'&data='+escape(senddata);
          var pgm='../pcstools/phpSendFileToas400.php';
          ajaxCall(pgm,parms); 
          if (ajaxerror) {
              alert(ajaxresponse);
              return false; 
          } 
          var checkerr=ajaxresponse.split('~^~');
          if (checkerr[0]=='ERR' && checkerr.length>1) {
              alert('Error:\n'+ajaxresponse.split('~^~')[1]);
              return false;
          } 
      }
      else { 
        var outobj=new Object;
        outobj.seqnbr=as400seqnbr;
        outobj.directive=obj.directive
        for (i=0; i<uselen; i++) {
             outobj.data=senddata[i];
             outobj.seqnbr2=i;
             if (!sqlInsert('stdrmtout',outobj,connpcstools)) {
                 alert('ERROR:\n'+sqlerr+'\n\n'+sqlcommand);
                 return false;
             }
        } 
      }
  }


  var where="seqnbr="+as400seqnbr.sqlWrap();
  var newobj=clone(obj);
  delete newobj.importfile;
  newobj.seqnbr=as400seqnbr;
  newobj.system=as400system; 
  if (!sqlInsert('stdrmtin',newobj,connpcstools)) {
      alert('ERROR:\n'+sqlerr+'\n\n'+sqlcommand);
      return false;
  }
  sqlDelete('stdrmtin',where,connpcstools);
  
  var sqltxt="Select * from stdrmtout where seqnbr="+as400seqnbr.sqlWrap()+" order by seqnbr2";
  if (!sqlSelect(sqltxt,'$as400',999999999,connpcstools)) {
      alert('ERROR:\n'+sqlerr+'\n\n'+sqlcommand);
      return false;
  }
 
  sqlDelete('stdrmtout',where,connpcstools);
  return $as400;
}


function exportAs400Data($s,outfile,openfile) {
  if ($s.rcdcnt==0) {
     alert('no record in output');
     return false; 
  }
  if (fso.FileExists(outfile)) {
     if (!window.confirm('File '+outfile+' already exists\n\n Do you wish to replace it?')) {
        return false;
     }
  }
  var txt='';
  var i=0;
  var s=fso.CreateTextFile(outfile, true); 
  for (i=0; i<$s.rcdcnt; i++) {
      txt = $s.data[i].trim();
      try {
        s.WriteLine(txt);
      }
      catch(e) {
        alert('Error converting text:\n\n'+txt);
        break; 
      }
  }
  s.Close(); 

  if (openfile) {
      try {
          var WshShell = new ActiveXObject("WScript.Shell"); 
          eval('WshShell.Run("'+outfile+'",3,true)');
      }
      catch(e) {
         alert('Unable to open file '+outfile+'\n\n'+e.message);
         return false;
      }
  }
  else {
        alert('File '+outfile+' created');  
  }

  return true;  

}