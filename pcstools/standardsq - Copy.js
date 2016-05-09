curlookdef='';
imphtmlonb4replace='';
imphtmlonreplace=''; 
imphtmlonb4remove='';
imphtmlonremove='';
htmlimportdone=false;
sqlrcdcnt=0;
$$sqlcol=new Array();
sqlerr='';
sqlselecttype='';
submitsqlodbc='';
submitsqlpath="../pcstools/phpsql.php";
currentsqltabdef=''; 
currentsqlrow=0;
currentsqlfld='';
currentsqlobj=''; 
sqlcommand='' 
conn='';
tab$$selectcolor=new Object();
valfunctnarray=new Array();
dbasetype='as400';
optionssection='optionarea';
aft$$slt='';
querydefinitionpath='c:/';
queryfilepath='c:/'; 
lockuser='';
lockapp='';
locksession=0;
logdbtables=true;

mv$$pos=false;
r$$n=0;
function move$Col$Pos() {
  if (!mv$$pos) return;
  var tabl=tb$tb$$l;
  var newx=tex + event.clientX-ix_$pos;
  try { 
      var clmn=tabl+'$ha'+r$$n; 
      clmn=document.getElementById(clmn); 
      clmn.width=newx; 
      if (tab$sql$tot$cnt>100) {return}
      clmn=tabl+'$hb'+r$$n; 
      clmn=document.getElementById(clmn); 
      clmn.width=newx; 
      var tabdef='t$$d$_'+tabl; 
      eval(tabdef+'.width['+r$$n+']=newx'); 
  } catch(e) {}
}

function store$Col$Pos(n,tabl) {
  r$$n=n;
  tb$tb$$l=tabl;
  ix_$pos =  event.clientX;
  var clmn=tabl+'$ha'+n;
  var tabdef='t$$d$_'+tabl;
  eval('tab$sql$tot$cnt='+tabdef+'.sqltotcnt');   
  clmn=document.getElementById(clmn);
  tex = numeric(clmn.width); 
  mv$$pos=true; 
}


function up$Pos() {
 if (!mv$$pos) return;
 mv$$pos=false;
   try { 
       var tabl=tb$tb$$l;
       var tabdef='t$$d$_'+tabl; 
       if (tab$sql$tot$cnt>100) {
          var clmn=tabl+'$ha'+r$$n; 
          clmn=document.getElementById(clmn); 
          var clmn2=tabl+'$hb'+r$$n;
          clmn2=document.getElementById(clmn2);
          clmn2.width=clmn.width; 
          eval(tabdef+'.width['+r$$n+']=clmn.width'); 
       }
       try {
           eval('var fn='+tabdef+'.onresizefunction'); 
           eval(fn+'("'+tabl+'",'+tabdef+','+r$$n+')');
       }
       catch(e) {} 
   } catch(e) {}
}


//-------- Start Prototype Section ------------------------
String.prototype.sqlWrap = function(addnchar,psn) {
 var lsRegExp = /'/g;
 if (!psn) var psn='2';
 var lsName = this.replace(lsRegExp, "''");

 //psn=1:addnchar in front of string, psn=2-addnchar behind, psn=3-Addnchar in front and behind  
 if (psn=='1' || psn=='3'){
    if  (addnchar) lsName="'"+addnchar+lsName.trim();
 }
 else{  
    lsName="'"+lsName.trim(); 
 }
 if (psn=='2' || psn=='3'){
    if  (addnchar) lsName += addnchar; 
 }
 lsName += "'"; 

 return lsName; 
}


function fileLogDef() {
 this.logfile=''; 
 this.logadd=false;
 this.logchange=true;
 this.logdelete=true;
 this.keyfield=new Array();
 this.fieldtextpair=new Array();
}


function getLoggingData(connect,refresh) {
  if (!refresh) {
     if (dataLog.gotlog) {return;}
  } 
  if (!connect) {var connect=conn}
  if (sqlSelect('select * from systablog','$l',999999,connect)) {
     var obj='';
     var flds='';
     dataLog.gotlog=true;
     for (var i=0; i<sqlrcdcnt; i++) {
         eval('dataLog.'+$l.systab[i].toLowerCase()+'=new Object()');
         eval('obj=dataLog.'+$l.systab[i].toLowerCase());
         obj.logto=$l.syslogto[i].toLowerCase();
         obj.logadd=($l.syslogadd[i]=='Y'); 
         obj.logchange=($l.syslogchg[i]=='Y');
         obj.logdelete=($l.syslogdlt[i]=='Y');
         obj.keyfields=new Array();
         flds=$l.syskeyflds[i].split(',');
         for (var j=0; j<flds.length; j++) {
             obj.keyfields[j]=flds[j].toLowerCase();
         }
     }
  } 
}

 
function sqlUpdateObj() {

 buildSqlUpdateObj(this,arguments);

} 

function buildSqlUpdateObj(inobj,inargs) {
 var form='';
 var value='';
 var obj='';

 for (var i=0; i<inargs.length; i++) {
 
  var element=inargs[i].split(':');

  if (element[0]=='*form') {
     form=element[1]
     obj=document.getElementById(form);
     if (obj) {
        for (var j=0; j<obj.length; j++) {
            if ((obj[j].tagName == 'INPUT' && obj[j].type != 'button') || obj[j].tagName == 'TEXTAREA' || obj[j].tagName=='SELECT') {
               if (obj[j].className !='subdatefield') {
                  if (obj[j].className.toUpperCase().search("NUMERIC") > -1) {
                     eval("inobj."+obj[j].name+"=sqlNum(obj[j].value)");
                  }
                  else {
                     eval("inobj."+obj[j].name+"=obj[j].value"); 
                  }
               }
               else {
                   if (obj[j].name.sst(1,4)=='d1#$') {
                      var objp=obj[j].parentNode.parentNode; 
                      eval("inobj."+objp.id+"=sqlNum(valueOf(objp.id))"); 
                   }
               } 
            }
            
        }
     }
  }
  else {
       obj=document.getElementById(element[0]); 
       //if (obj && obj.className !='datefield') {
           //if (obj.name != '') {value=obj.value};
           //else {value=valueOf(obj.id)} 
           value=valueOf(element[0]); 
           if (obj.className.toUpperCase().search("NUMERIC") > -1 || element[1]=='n' || obj.className=='datefield') {
              eval("inobj."+element[0]+"=sqlNum(value)"); 
           }
           else {
              eval("inobj."+element[0]+"=value");
           }
       //}

  }

 } //end for

} 


sqlUpdateObj.prototype.addVar = function() {
  buildSqlUpdateObj(this,arguments); 
}

sqlUpdateObj.prototype.removeVar = function() {
 for (i=0; i<arguments.length; i++) {
      try {eval("delete this."+arguments[i])} catch(e) {}
 }
}

 
//-------- End Prototype Section ------------------------

function sqlSelect(sqlstring,use,rcd,useconn) {
  
  sqlerr='';
  var rpl="now() as vv0_"
  var nocomma=sqlstring.replace(/,/g," ");
  nocomma=nocomma.split('@value'); 
  for (var j=0; j<nocomma.length; j++) {
      var wrd=nocomma[j].split(':'); 
      if (wrd.length>1) {
          wrd=wrd[1].split(" "); 
          wrd=wrd[0].trim();
          var wrd2=searchForValueFunction(wrd);
          if (wrd2=='') valfunctnarray.push(wrd);
      } 
  } 
  sqlstring = sqlstring.replace(/@value:/g,rpl); 
  sqlcommand=sqlstring;
  
  if (sqlselecttype=='php') {
     return sqlSelectPhp(sqlstring,use,rcd); 
  } 

  var str='';
  var useobj='$r'
  var connect='';
  sqlrcdcnt=0;
  var rcdcnt=99999999;
  var c=0;
  $$sqlcol=new Array();
  if (use) {useobj=use}
  eval(useobj+'=new Object()');

  if ((rcd) && !isNaN(rcd)) rcdcnt=rcd;
  if (useconn) connect=useconn; else connect=conn;
  if (!connect) {sqlerr='No connection to DataBase'; return false}

  var rs = new ActiveXObject ("ADODB.Recordset");

  try {rs.Open (sqlstring, connect,0,1);}
  catch (e) {sqlerr=e.message+'\n\n'+sqlcommand; return false;}

  var nbr=rs.Fields.Count;
  eval(useobj+'.rcdcnt=0');
  for (var j=0; j<nbr; j++) {
      $$sqlcol[j]=rs.fields(j).Name.toLowerCase();
      var rplval=$$sqlcol[j].split('vv0_');
      if (rplval.length>1) {
          try {currentsqltabdef.valuefunction[j]=searchForValueFunction(rplval[1]);} catch(e) {}
      }  
      eval(useobj+'.'+$$sqlcol[j]+'=new Array()'); 
  }

  var fldval='';
  while (! rs.EOF)
  {
    for (var j=0; j<nbr; j++) { 
        try {fldval=rs.fields(j).value.trimr();} 
        catch(e) {fldval=rs.fields(j).value}
        try {if (fldval==null) fldval=' ';} catch (e) {}
        str=useobj+'.'+$$sqlcol[j]+'['+c+']=fldval';
        eval(str);
    }
    c=c+1;
    if (c==rcdcnt) break;
    rs.MoveNext ();
  }

  rs.close ();
  rs = null;
  eval(useobj+'.rcdcnt='+c);
  sqlrcdcnt=c; 
  return true;
}

function searchForValueFunction(functn) {
  functn=functn.toLowerCase().trim();
  for (var i=0; i<valfunctnarray.length; i++) {
      if (valfunctnarray[i].toLowerCase()==functn) {
         return valfunctnarray[i]; 
      } 
  }
  return '';
}

function sqlInsert(file,useobj,useconn) {
  sqlerr='';
  var c=0;
  var c2=0;
  var value="";
  var connect='';
  var splitvalue='';
  var dologging=false;
  var chklog='';
  file=file.trim().toLowerCase(); 
  file=file.split(':');
  logfile='';
    
  if ((file.length>1 && file[1]=='nolog') || !logdbtables) {dologging=false}
  else { 
     try {
         eval('var logging=dataLog.'+file[0]);
         if (logging.logadd==true) {
            dologging=true;
            logfile=logging.logto;
         }  
     } catch (e) {};
  }

  file=file[0];
  sqlcommand = "insert into "+file+"(";
  if (sqlselecttype=='') {
     if (useconn) connect=useconn; else connect=conn;
     if (!connect) {sqlerr='No connection to DataBase'; return false}
  }

  for (var property in useobj) {
       if (property != 'addVar' && property != 'removeVar') {
          c=c+1;
       }
  }

  for (var property in useobj) {
       if (property != 'addVar' && property != 'removeVar') {
          c2=c2+1;
          if (c2 != c) {sqlcommand += property+", "}; else {sqlcommand += property;}
       }
  }

  sqlcommand += ") values(";
  c2=0;
  for (var property in useobj) {
      if (property != 'addVar' && property != 'removeVar') {
         c2=c2+1;
         eval('value = useobj.'+property);
         try {
             splitvalue=value.split('$^$');
             if (splitvalue.length>1) value=splitvalue[1];
             else value=splitvalue[0].sqlWrap();
         } catch(e) {}
         if (c2 != c) {sqlcommand += value+", ";} else {sqlcommand +=value;}
      }
  }
  sqlcommand += ")"; 

  
  var rtn=true;
  if (sqlselecttype=='php') {
     rtn=sqlUpdatePhp(sqlcommand); 
  } 
  else { 
      try {connect.Execute(sqlcommand);} catch (e) {sqlerr=e.message+'\n\n'+sqlcommand; rtn=false}
  }

  if (dologging && rtn) {
     var sqlcommand2=sqlcommand; 
     try {
         var logobj=new Object();
         for (var property in useobj) {
            if (property != 'addVar' && property != 'removeVar') {
               eval('logobj.'+property+'= useobj.'+property);
            } 
         }
         logobj.tgattime='A'; logobj.tgevent='A'; 
         logobj.tgusr=username;
         logobj.tgdate=sqlNum(todayDate());
         logobj.tgtime=sqlNum(todayTime('hm'));
         sqlInsert(logfile,logobj,connect); 
      } catch(e) {};
      sqlcommand=sqlcommand2; sqlerr=''; 
  }

  return rtn;
}


function sqlUpdate(file,useobj,cond,useconn) {
  if (!cond) {sqlerr='"where" condition not specified'; return false;}
  sqlerr='';
  var c=0;
  var c2=0;
  var connect='';
  var value="";
  var where="";
  var dologging=false; 
  var logrcdcnt=0;
  var rtn=false;
  var fldar=new Array();
  var numar=new Array();
  var keyfld=new Array();
  var chklog='';
  var logfile='';
  file=file.trim().toLowerCase().split(':'); 
  if ((file.length>1 && file[1].toLowerCase()=='nolog') || !logdbtables) {dologging=false}
  else { 
     try {
         eval('var logging=dataLog.'+file[0]); 
         if (logging.logchange==true) {
            dologging=true;
            logfile=logging.logto; 
            keyfld=clone(logging.keyfields); 
         }  
     } catch (e) {};
  }

  file=file[0];
  sqlcommand = "update "+file+" SET ";
 
  if ((cond) && (cond !='*')) where=cond;

  if (sqlselecttype != 'php') {
    if (useconn) connect=useconn; else connect=conn;
    if (!connect) {sqlerr='No connection to DataBase'; return false}
  }
  for (var property in useobj) {
       if (property != 'addVar' && property != 'removeVar') {
          c=c+1;
       }
  }

  for (var property in useobj) {
      if (property != 'addVar' && property != 'removeVar') {
         c2=c2+1; 
         fldar[c2-1]=property;
         eval('value = useobj.'+property);
         var splitvalue=value.split('$^$');
         if (splitvalue.length>1) {value=splitvalue[1]; numar[c2-1]=true;}
         else {
           if (splitvalue[0].sst(1,1)==':') {value=splitvalue[0].sst(2,(splitvalue[0].length-1))}
           else {value=splitvalue[0].sqlWrap();} 
         }
         if (c2 != c) {sqlcommand += property+"="+value+", "};
         else {sqlcommand += property+"="+value};
      }
  }

  if (where != '') {sqlcommand += " "+"where "+where};

  if (dologging) {
    var sqlcommand2=sqlcommand; 
    try {
         
        var l=fldar.length;
        var l2=l-1; 
        if (!isBlank(keyfld)) {
            for (var i=0; i<keyfld.length; i++) {
               var fld=keyfld[i].split(':');
               var isnum=false;
               var matchfound=false; 
               if (fld.length>1 && fld[1].toLowerCase()=='n') {isnum=true;}
               fld=fld[0];
               for (var j=0; j<l; j++) {
                   if (fldar[j]==fld) {
                       matchfound=true; break;
                   }
               }
               if (!matchfound) {
                  l2=l2+1;
                  fldar[l2]=fld; 
                  numar[l2]=isnum;
               }
            }      
        }
        var sqltxt='select';
        for (var i=0; i<fldar.length; i++) {
            if (i != (fldar.length-1)) {sqltxt += " "+fldar[i]+","}
            else {sqltxt += ' '+fldar[i]}
        }

        if (where) {sqltxt += " from "+file+" where "+where}
        else {sqltxt += " from "+file} 
        if (sqlSelect(sqltxt,'$log',99999999,connect) && sqlrcdcnt>0) {
           logrcdcnt=sqlrcdcnt; 
        } 

    } catch(e) {}; 

    sqlcommand=sqlcommand2;
  }     
 
 

  if (sqlselecttype=='php') {
     rtn=sqlUpdatePhp(sqlcommand); 
  } 
  else { 
       rtn=true;
       try {connect.Execute(sqlcommand);} catch (e) {sqlerr=e.message+'\n\n'+sqlcommand; rtn=false}; 
  }
  

  if (logrcdcnt >0 && rtn) {
     var tdat=sqlNum(todayDate());
     var ttim=sqlNum(todayTime('hm')); 
     var logobj=new Object; 
     var logobj2=new Object;
     var value2='';
     var c3=0; 
        for (var i=0; i<logrcdcnt; i++) {
          for (j=0; j<fldar.length; j++) {
              value=eval('$log.'+fldar[j]+"["+i+"]");
              if (numar[j]) {value=sqlNum(value)}; 
              else {
                    try {var v2=value.trim()}
                    catch (e) {value=sqlNum(value)}
              }
              eval('logobj.'+fldar[j]+'=value'); 
              c3=c3+1; 
              if (c3<=c2) {
                 eval('logobj2.'+fldar[j]+'=useobj.'+fldar[j]);
              }
              else {
                 eval('logobj2.'+fldar[j]+'=value'); 
              }
          }
          logobj.tgattime='B'; logobj.tgevent='U'; 
          logobj.tgusr=username;
          logobj.tgdate=tdat;
          logobj.tgtime=ttim;
          if (sqlInsert(logfile,logobj,connect)) { 
              logobj2.tgattime='A'; logobj2.tgevent='U'; 
              logobj2.tgusr=username;
              logobj2.tgdate=tdat;
              logobj2.tgtime=ttim;
              sqlInsert(logfile,logobj2,connect); 
          } 
       }
       delete $log;
       sqlcommand=sqlcommand2
       sqlerr=''; 
    }
  
  return rtn;
}


function sqlDelete(file,cond,useconn) {
  if (!cond) {sqlerr='"where" condition not specified'; return false;}
  sqlerr='';
  var connect='';
  var where="";
  var dologging=false;
  var logfile='';
  var chklog='';
  file=file.trim().toLowerCase().split(':');
    
  if ((file.length>1 && file[1].toLowerCase()=='nolog') || !logdbtables) {dologging=false}
  else { 
     try {
         eval('var logging=dataLog.'+file[0]);
         if (logging.logdelete==true) {
            dologging=true;
            logfile=logging.logto;
         }  
     } catch (e) {};
  }

  file=file[0];

  sqlcommand = "delete from "+file;
  if ((cond) && (cond !='*')) where=cond;
  if (sqlselecttype != 'php') {
     if (useconn) connect=useconn; else connect=conn;
     if (!connect) {sqlerr='No connection to DataBase'; return false}
  }
  if (where != '') {sqlcommand += " "+"where "+where}; 

  if (dologging) {
     var sqlcommand2=sqlcommand;
     try {
         if (where) {var sqltxt='select * from '+file+' where '+where;}
         else {var sqltxt='select * from '+file} 
         if (!sqlSelect(sqltxt,'$log',99999999,connect)) {dologging=false}
         else {var logcol=$$sqlcol}
     } catch (e) {dologging=false}; 
     sqlcommand=sqlcommand2;
  }

  rtn=true;
  if (sqlselecttype=='php') {
     rtn=sqlUpdatePhp(sqlcommand); 
  }  
  if (sqlselecttype=='') {  
      try {connect.Execute(sqlcommand);} catch (e) {sqlerr=e.message+'\n\n'+sqlcommand; rtn=false}
  }

  if (dologging && rtn) {
     var tdat=sqlNum(todayDate());
     var ttim=sqlNum(todayTime('hm')); 
     var sqlcommand2=sqlcommand;
     try {
         for (var i=0; i<$log.rcdcnt; i++) {
             var logobj=new Object();
             for (var j=0; j<logcol.length; j++) {
                 eval('value=$log.'+logcol[j]+'['+i+']'); 
                 try {var v2=value.trimr()} catch(e) {value=sqlNum(value)}
                 eval('logobj.'+logcol[j]+'=value');
             }
             logobj.tgattime='B'; logobj.tgevent='D'; 
             logobj.tgusr=username;
             logobj.tgdate=tdat;
             logobj.tgtime=ttim;
             if (!sqlInsert(logfile,logobj,connect)); 
         }
         delete $log;
      } catch(e) {};
      sqlcommand=sqlcommand2;
      sqlerr=''; 
  }

  return rtn;
}

function sqlNum(string) {
 //var myRegExp = /[']/g;/g;
 //string = string.replace(myRegExp, '&#39;');
  if (isBlank(string)) return '$^$0';
  if (isNaN(string)) {
     string='$^$'+numeric(string);}
  else {
  string='$^$'+string;}
  return string;
}


function sqlValueOf(fld) {
  var obj=document.getElementById(fld);
  if (!obj) return '';
  if (obj.className=='datefield') {return valueOf(fld)}
  if (obj.className=='numeric') {return numValueOf(fld)}
  return (''+valueOf(fld)).sqlWrap();
}
 
function tableDef(intype) {
  if (!intype) {this.tabletype='REGULAR';}
  else {this.tabletype=intype.toUpperCase()}
  this.tableid='tab'+(Math.floor(Math.random() * (999999 - 1)) + 1);
  this.tableonclick='';
  this.tablestyle='';
  this.height=200;
  this.headerclass='tableHead';
  this.wrapperclass="tableWrap";
  this.bodyclass="tableBody"; 
  this.header=new Array();
  this.headstyle=new Array();
  this.headonclick=new Array();
  this.headonmouseover=new Array();
  this.headonmouseout=new Array();
  this.rowselectcolor=rowselectcolor;
  this.mouseovercolor='';
  this.resizeablecolumns=false;
  this.onresizefunction='';
  this.matchonid=false;
  this.dbref=false;
  this.column=defineColumn;
  this.colprefix='';
  this.showheader=true;
  if (this.tabletype=='*LOOKUP' || this.tabletype=='LOOKUP') {
     this.oddrowcolor="#EFDEAC";
     this.evenrowcolor="#FFFFC8";
  }
  else {
     this.oddrowcolor="#effbff";
     this.evenrowcolor="#f2f2ff";
  }
  this.id=new Array();
  this.style=new Array();
  this.width=new Array();
  this.align=new Array();
  this.onclick=new Array();
  this.onmouseover=new Array();
  this.onmouseout=new Array();
  this.edit=new Array();
  this.valuefunction=new Array();
  this.type=new Array();
  this.sqlselect='';
  this.sqlrcdcnt='';
  try{this.sqlconnect=conn}
  catch(e) {this.sqlconnect=''};
  this.sqlresult='';
  this.sqlcol=new Array();
  this.sqlperpage=0;
  this.sqlstart=0;
  this.sqltotcnt=0;
  if (this.tabletype=='*LOOKUP' || this.tabletype=='LOOKUP') {
     this.tabletype='LOOKUP';
     this.dbref=false;
     this.lookupfldlen=-1;
     this.lookupfld='';
     this.lookupfldcase='UPPER';  //or MIXED
     this.lookupfldtxt='Enter portion of search field then click GO';
     this.beforelookup=''; //Function to execute before the lookup is done. If rtns false then lookup will not be done
     this.afterselect=''; //Function to execute after a selection is done
     this.oncancel=''; //Function to execute when the user cancels 
     this.lookuphtml='';
     this.returninto=new Array();
     this.top=''; //Number or "center"; 
     this.left=''; //Number or "center";
  }
     this.returnfld=new Array();
     this.refresh=false;
     this.sqlprevselect=''; 
}

function defineColumn(col) {
  try {
      if (!this[col]) {this[col]=new Object()};
      return this[col];
  } catch(e) {}
  return false;
}

function suggestDef() {
  this.sqlselect='';
  this.sqlrcdcnt=10;
  try{this.sqlconnect=conn}
  catch(e) {this.sqlconnect=''};
  this.returnfld=new Array();
  this.returninto=new Array();
  this.onclick='';
}


function applyTableDef($c,how) {
  if (how) sqlTabRoll($c,how);
  var height=$c.height;
  var tableid=$c.tableid
  var len=$c.width.length;
  var colcnt=len;
  var isodd=true;
  var quote="'";
  var dbquote='"';
  var quotereplace="!~!";
  var dbquotereplace="!~~!";
  var i=0;
  var j=0; 
  currentsqltabdef=$c;
  var tabdef='t$$d$_'+tableid;
  eval(tabdef+'=$c'); 
 
  eval('tab$$selectcolor.'+tableid+'="'+$c.rowselectcolor+'"'); 
  eval('tabrowclicked.'+tableid+'=""');   

  if ($c.header.length > len) {
     len=$c.header.length;
     colcnt=len; 
  }  

  if ($c.id.length > len) {
     len=$c.id.length;
     colcnt=len; 
  } 
 
  var txt='<SPAN class=tableHeadwrap><TABLE ID="'+tableid+'head" class="'+$c.headerclass+'"';
  if (!$c.showheader) {txt += ' style="display:none" ';}
  if ($c.resizeablecolumns) {
      //txt += ' cellspacing=0 onmouseup=up$Pos() onmousemove=move$Col$Pos('+"'"+tableid+"')";
      txt += ' cellspacing=0 onmouseup=up$Pos() onmousemove=move$Col$Pos()';
  }
  if ($c.tableheadonclick !='') {
     txt += ' onclick="'+$c.tableheadonclick+'"';
  }
  txt +='>';
  
  if ($c.sqlselect !='') {
     if ($c.sqlresult=='') {
        if (!(sqlSelect($c.sqlselect,'$r',$c.sqlrcdcnt,$c.sqlconnect))) {
           alert(sqlerr);
           return '';
        } 
        $c.sqlcol=$$sqlcol;
        $c.sqltotcnt=$r.rcdcnt;
        if ($c.sqlperpage != 0) $c.sqlresult=$r;
     } 
     else {
          $r=$c.sqlresult;
          $$sqlcol=$c.sqlcol;
     }
     colcnt=$c.sqlcol.length;
     len=colcnt;
  }
  else {
       $$sqlcol=new Array();
  }


  if ($c.matchonid) {len=$c.id.length}

//****
  
  if ($$sqlcol.length==0) {
     for (i=0; i<len; i++) {
         if ($c.header[i]) {$$sqlcol[i]=$c.header}
         else {$$sqlcol[i]="Column_"+(i+1)};
     }  
  }  
//***
 var exobj=''; 
 for (i=0; i<len; i++) {
      if (!$c.id[i]) {
          if ($c.colprefix) {
              $c.id[i]=$c.colprefix+'#'+$$sqlcol[i];
              try {$c[$c.id[i]]=$c[$$sqlcol[i]];} catch(e) {$c.id[i]=$$sqlcol[i]}
          }
          else {$c.id[i]=$$sqlcol[i]}         
      }
      if ($c[$c.id[i]]) {
          exobj=$c[$c.id[i]];
          if (exobj.header) {$c.header[i]=exobj.header}
          if (exobj.width != undefined) {$c.width[i]=exobj.width}
          if (exobj.align) {$c.align[i]=exobj.align}
          if (exobj.edit != undefined)  {
             $c.edit[i]=exobj.edit; 
             if (!exobj.edit) {$c.edit[i]='none'};
          }
          if (exobj.style) {$c.style[i]=exobj.style}
          if (exobj.type) {
            $c.type[i]=exobj.type;
            if (!$c.edit[i]) {
               if (exobj.type=='date') {$c.edit[i]=datefmt; if (!$c.align[i]) {$c.align[i]='right'}}
               if (exobj.type=='time') {$c.edit[i]=timefmt; if (!$c.align[i]) {$c.align[i]='right'}} 
               if (exobj.type=='numeric') {$c.edit[i]='j:2'; if (!$c.align[i]) {$c.align[i]='right'}}  
            }
          }
          if (exobj.valuefunction) {$c.valuefunction[i]=exobj.valuefunction}
          if (exobj.onclick) {$c.onclick[i]=exobj.onclick}
          if (exobj.onmouseover) {$c.onmouseover[i]=exobj.onmouseover}
          if (exobj.onmouseout) {$c.onmouseout[i]=exobj.onmouseout}
      }
 }
 
  if ($c.dbref==true) {
     var f='';
     var ftype=''; 
     for (i=0; i<len; i++) {
         if (typeof($c.id[i]) != 'string') {continue};
         f=$c.id[i].split('#');
         if (f.length==1) {f=f[0]} else {f=f[1]}
         f=getFieldAttr(f);
         if (!f) {continue}
         if (!$c.header[i]) {$c.header[i]=f.desc}
         if (!$c.type[i]) {ftype=f.type} else {ftype=$c.type[i]}
         if (ftype=='char') {$c.edit[i]=''}
         if (!$c.edit[i]) {
             if (ftype=='date') {$c.edit[i]=datefmt}
             if (ftype=='time') {$c.edit[i]=timefmt}
             if (ftype=='numeric') {$c.edit[i]='j:'+f.decimal} 
         }
         if ($c.width[i] == undefined) {
            //if ($c.width[i]>0) { 
                $c.width[i]=f.length*6.5;
                if ($c.edit[i] && $c.edit[i].sst(1,1).toLowerCase()=='j') {$c.width[i] += $c.width[i]/3}
                if ($c.width[i]<80) {$c.width[i]=80}
                if ($c.width[i]>380) {$c.width[i]=380} 
                if (f.type=='date') {$c.width[i]=70}
                if (f.type=='time') {$c.width[i]=60}
            //}
         }
         if (!$c.align[i]) {
            if ($c.edit[i]) {$c.align[i]='right'}; 
            if (f.length==1) {$c.align[i]='center'}
         }
     } 
  }

  for (i=0; i<len; i++) {
      if ($c.edit[0]=='none') {$c.edit[i]=''}
      if ($c.width[i]==0) $c.width[i]=-1;
      if (!$c.width[i]) $c.width[i]=132; 
      if (!$c.matchonid) {if (!$c.id[i]) $c.id[i]=tableid+'col'+i};
      else {if (!$c.id[i]) $c.id[i]=$$sqlcol[i]};
       
      if (!$c.width[i] || isNaN($c.width[i])) {
         $c.width[i]=132;
      }
  }

 for (i=0; i<len; i++) {
      var width=$c.width[i]; 
      if ($c.width[i]!=-1) {
         txt +='<col id='+tableid+'$ha'+i+' width='+width+'>';
         if ($c.resizeablecolumns) {txt += '<col width=2>'};
      }
      else {
         txt += "<col style=display:'none'>";
         if ($c.resizeablecolumns) {txt += "<col style=display:'none'>"};
         $c.headstyle[i]='';
         $c.style[i]='';
      }
      if (!($c.header[i]) && colcnt>=(i+1)) {
         if (!$c.matchonid) {$c.header[i]=$$sqlcol[i].toUpperCase();}
         else {$c.header[i]=$c.id[i].toUpperCase();}
      }
  }

  if ($c.resizeablecolumns) {txt += '<col width=17> <tr BGCOLOR=#336699>'};
  else {txt += '<col width=15> <tr BGCOLOR=#336699>'}
  
  for (i=0; i<len; i++) {
      if ($c.id[i]) {txt +='<td id="'+$c.id[i]+'" align=center';}
       else {txt +='<td align=center';}
      if ($c.headstyle[i]) {txt += ' style="'+$c.headstyle[i]+'"';}
      if ($c.headonclick[i]) {txt += ' onclick="'+$c.headonclick[i]+'"';}
      if ($c.headonmouseover[i]) {txt += ' onmouseover="'+$c.headonmouseover[i]+'"';}
      if ($c.headonmouseout[i]) {txt += ' onmouseout="'+$c.headonmouseout[i]+'"';}
      if ($c.type[i]) {txt += ' fldtype='+$c.type[i];}; 
      if ($c.header[i]) {txt +='>'+$c.header[i]+'</td>'}
      else {txt +='></td>'}
      if ($c.resizeablecolumns) { 
         txt += "<td class=columnseparator onmousedown=store$Col$Pos("+i+",'"+tableid+"')>&nbsp</td>";
      }
  }
  txt += '<td class=emptycol></td></tr></table></span>'
  txt += '<table cellpadding=0 cellspacing=0 border=0><tr><td><div id='+tableid+'$wrap class="'+$c.wrapperclass+'" style="height:'+height+'px;">'
  txt += '<TABLE ID="'+tableid+'" STYLE="table-layout:fixed';
  if ($c.tablestyle !='') {
     txt += '; '+$c.tablestyle;
  }
  txt +='"';
  if ($c.resizeablecolumns) {
     txt += ' cellspacing=0 onmouseup=up$Pos(this) onmousemove=move$Col$Pos(this,'+"'"+tableid+"')";
  } 
  if ($c.tableonclick !='') {
     txt += ' onclick="'+$c.tableonclick+'"';
  }
  txt +='>'; 
  for (i=0; i<len; i++) {
      var width=$c.width[i];
      if (!isNaN($c.width[i])) width=$c.width[i];
      if ($c.width[i]!=-1) {
         txt +='<col id='+tableid+'$hb'+i+' width='+width+'>';
         if ($c.resizeablecolumns) {txt += '<col width=2>'};
      }
      else {
        txt += "<col style='display:none'>";
        if ($c.resizeablecolumns) {txt += "<col style='display:none'>"};
      }
  }

  txt += '<tbody class="'+$c.bodyclass+'">'
  if ($c.sqlselect) {
     if (colcnt>len) colcnt=len;
     if (sqlerr !='') {alert(sqlerr); return};
     var edc=new Array();
     var edd=new Array();
     for (i=0; i<colcnt; i++) {
         if ($c.edit[i] && $c.edit[i] != 'none') {
            var edtdata=$c.edit[i].split(':');
            edc[i]=edtdata[0];
            if (edtdata.length>1) {edd[i]=edtdata[1]}
            else {edd[i]='0'};
         }
     }

     var recperpg=$c.sqlperpage;
     var stopat=$c.sqlstart+$c.sqlperpage;
     var value=''; 
     if ($c.sqlselect=='') {stopat=9999999; $c.sqlstart=0};
     if (stopat==0) stopat=9999999;
     if ($r.rcdcnt<stopat) stopat=$r.rcdcnt;
     for (j=$c.sqlstart; j<stopat; j++) {
         if (isodd) {
             txt += '<tr style="background:'+$c.oddrowcolor+'"';
             isodd=false;
         }
         else {
             txt += '<tr style="background:'+$c.evenrowcolor+'"';
             isodd=true;
         }
         if ($c.tabletype != 'LOOKUP' && $c.mouseovercolor != '') {
            txt += ' onmouseover=colorBg(this,"'+$c.mouseovercolor+'")';
            txt += ' onmouseout="'+"colorBg(this,'*dft')"+'"';
         }
         if ($c.tabletype='LOOKUP' && $c.returnfld.length != 0) {
            txt += ' onmouseover="colorBg(this)"';
            txt += ' onmouseout="'+"colorBg(this,'*dft')"+'"';
            txt += " onclick='aft$$slt="+"sqlRtnValue("; 
            for (var k=0; k<$c.returnfld.length; k++) {
                
                try {     
                    var txt2 = eval('$r.'+$c.returnfld[k]+'['+j+'].replace(/'+quote+'/g,'+'"'+quotereplace+'")');
                    txt2 = eval('txt2.replace(/'+dbquote+'/g,'+'"'+dbquotereplace+'")');
                    txt += '"'+txt2+'"'; 
                 // txt += '"' + eval('$r.'+$c.returnfld[k]+'['+j+'].replace(/'+quote+'/g,'+'"'+quotereplace+'")')+'"';
                    
                } catch (e) {txt += '"' + eval('$r.'+$c.returnfld[k]+'['+j+']')+'"';}

              
                if (k+1<$c.returnfld.length) {
                   txt += ',';
                }
            }
            txt += ");"+$c.afterselect+"'";
          }
         txt +='>'; 

         for (i=0; i<colcnt; i++) {
             txt += '<td';
             if ($c.align[i]) {txt += ' ALIGN="'+$c.align[i]+'"';}
             if ($c.style[i]) {txt += ' style="'+$c.style[i]+'"';}
             if ($c.onclick[i]) {txt += ' onclick="'+$c.onclick[i]+'"';}
             if ($c.onmouseover[i]) {txt += ' onmouseover="'+$c.onmouseover[i]+'"';}
             if ($c.onmouseout[i]) {txt += ' onmouseout="'+$c.onmouseout[i]+'"';} 
             if (!$c.matchonid) {value=eval('$r.'+$$sqlcol[i]+'['+j+']');}
             else {value=eval('$r.'+$c.id[i]+'['+j+']');}
             if ($c.valuefunction[i]) {
                try {currentsqlrow=j;
                     if (!$c.matchonid) {currentsqlfld=$$sqlcol[i];}
                     else {currentsqlfld=$c.id[i];}
                     currentsqlobj=$r;
                     try {value=eval($c.valuefunction[i]+"()")
                         if (value==undefined) {value='##VALUE##'};
                     } catch (e) {value='##UNDEFINED##'}
                } catch (e) {value='##VALUE##'}
             } 
             if (edc[i]) {
                 var edcd=edc[i].toLowerCase();
                 if (edcd=='y' || edcd=='m' || edcd=='d') {
                     value=edit(numeric(value).chgDateFmt('Y',edcd),0,edcd);
                 }
                 value=edit(value,edd[i],edc[i]); 
                 txt += ">"+value+"</td>";
             }
             else {
                  txt += ">"+value+"</td>"; 
             }
             if ($c.resizeablecolumns) {
                //txt += "<td class=columnseparator onmousedown=store$Col$Pos("+i+",'"+tableid+"')>&nbsp</td>";
                txt += "<td class=columnseparator2>&nbsp</td>"; 
             }
         }
    txt +='</tr>';
     }
  }

  txt += '</tbody></TABLE></td></div></TABLE>';   
  return txt; 
}


//---- Start SqlSelect..functions

function sqlSelectResult() {
  for (var i=0; i<arguments.length; i++) {
      var use=arguments[i];
      eval('this.'+use+'=new Array()');
  }
  this.rcdcnt=0;
}


function setSqlSelectResult(tableobj,resultobj) {
  var i=-1; 
  if (resultobj=='off' || resultobj=='*off') {
     tableobj.sqlresult='';
     if (tableobj.sqlselect=='*assign') {
        tableobj.sqlselect='';
     }
     return;      
  }

  tableobj.sqlresult=resultobj;
  if (tableobj.sqlselect=='') {
     tableobj.sqlselect='*assign';
  }
  tableobj.sqltotcnt=tableobj.rcdcnt;
  tableobj.sqlcol=new Array(); 
  for (var property in resultobj) {
      if (property != 'rcdcnt') {
          i ++;
          tableobj.sqlcol[i]=property; 
      }
  } 
} 


function addSqlSelectRow(obj) {
 var i= obj.rcdcnt;
 for (var property in obj) {
     if (property != 'rcdcnt') {
        eval('obj.'+property+'[i]=""');
     }
 } 
  obj.rcdcnt ++;
  return(i);
}


function addSqlSelectCol(obj) {
  var col='';
  var vlu;
  var newcol
  var i=0;
  for (i=1; i<arguments.length; i++) {
       vlu="";
       newcol=arguments[i].split(':');
       if (newcol.length>1) {
           vlu=newcol[1];
           newcol=newcol[0];
       }
       eval('col=obj.'+newcol);
       if (!col || col == undefined) {
          eval('obj.'+newcol+'=new Array()');
          for (var i2=0; i2<obj.rcdcnt; i2++) {
              eval('obj.'+newcol+'[i2]=vlu');
          }
       }  
  } 
}



function sortSqlSelectResult(obj) {
  var order=sortorder;
  sortorder='ascend';
  var i=0;
  var data='';
  var temp=new Array();
  var nbr=0;
  var oldobj=clone(obj);
  var oldval;
  var fld='';

  for (i=0; i<obj.rcdcnt; i++) {
       data='';
       for (var m=1; m<arguments.length; m++) {
           eval('fld = obj.'+arguments[m]+'[i]');           
           if (isNaN(fld)) {
               fld=fld.toUpperCase();
           }
           else {
               fld=edit(fld,0,'0');
               fld=''+String.fromCharCode(48 + fld.length) + fld;
           }
           data += fld+'!';
       }
       temp.push(data+' [{^'+i);
  }

  if (order !='descend') {temp.sort()}
  else {temp.sort(charOrdD)}

  for (i=0; i<obj.rcdcnt; i++) {
      nbr=temp[i].split(' [{^')[1];
      for (var property in obj) {
           if (property != 'rcdcnt') {
              eval('oldval=oldobj.'+property+'['+nbr+']');
              eval('obj.'+property+'[i]=oldval');
           }
      }
  }     
}


function copySqlSelectResult(from,to,fromnbr) {
//if "fromnbr" is not supplied then all rows will be copied
  var i=0;
  var prop=new Array();
  var match=false;
  var matchedfrom=new Object(); 
  var unmatchedto=new Object(); 

//Check for matching properties
  for (var property in from) {
      if (property != 'rcdcnt') {
          prop.push(property);
      }
  }
  for (i=0; i<prop.length; i++) {
      match=false;
      for (var property in to) {
          if (property==prop[i]) {
              match=true;
              break;
          }
       }
       if (match) {
          eval('matchedfrom.'+prop[i]+'=true');
       } 
  }

  for (var property in to) {
      if (property=='rcdcnt') {continue}
      eval('match=matchedfrom.'+property);
      if (match==undefined || !match) {
          eval('unmatchedto.'+property+'=true');
      } 
  }


  var fcount, fstart=0;

  if (fromnbr==undefined) {
      fcount=from.rcdcnt;
  }
  else {
      fstart=numeric(fromnbr);
      fcount=fstart+1;
  } 
  for (i=fstart; i<fcount; i++) {
       for (var property in unmatchedto) {
            eval('to.'+property+'[to.rcdcnt]=""');
       } 
       for (var property in matchedfrom) {
            eval('to.'+property+'[to.rcdcnt]=from.'+property+'[i]');
            eval('valuu=to.'+property+'[to.rcdcnt]');
       }
       to.rcdcnt ++;
  }

}

function sqlSelectResultToCsv(sqlrsltobj,tabledef) {

 var i=0, txt='', vlu, c=0;
 if (tabledef) {
     for (i=0; i<tabledef.header.length; i++) {
          vlu=tabledef.header[i];
          if (vlu.search(",")==-1) { 
              if (i == 0) {txt += vlu}
              else {txt += ','+vlu};
          }
          else {
              if (i == 0) {txt += '"'+vlu+'"'}
              else {txt += ',"'+vlu+'"'};
          }  
     }
     txt += "\n";
 }

 var clmn=new Array();
 for (var property in sqlrsltobj) {
      if (property != 'rcdcnt') {
          clmn.push(property);
      } 
 }

 var edc=new Array();
 var edd=new Array();
 var edtdata;

 if (tabledef) {
     for (i=0; i<clmn.length; i++) {
          if (tabledef.edit[i]) {
              edtdata=tabledef.edit[i].split(':');
              edc[i]=edtdata[0].toLowerCase();
              if (edtdata.length>1) {edd[i]=edtdata[1]}
              else {edd[i]='0'};
          }
     }
 }

 for (i=0; i<sqlrsltobj.rcdcnt; i++) {
      for (c=0; c<clmn.length; c++) {
           vlu=sqlrsltobj[clmn[c]][i];
           if (edc[c]) {
               edcd=edc[c];
               if (edcd=='y' || edcd=='m' || edcd=='d') {
                   vlu=editDate(numeric(vlu),edcd);
               }
               else {
                   vlu=edit(vlu,edd[c],edc[c]); 
               } 
           }

          if (vlu.search(",")==-1) { 
              if (c == 0) {txt += vlu}
              else {txt += ','+vlu};
          }
          else {
              if (c == 0) {txt += '"'+vlu+'"'}
              else {txt += ',"'+vlu+'"'};
          }  

           //if (c == 0) {txt += '"'+vlu+'"'}
           //else {txt += ',"'+vlu+'"'};
      }
      txt += "\n";
 }

 return txt;  
}
//---- End SqlSelect..functions

function sqlLookUp($t) {

  var refreshdone=false;
  var newrun=false
 
  if (!$t) {
     refreshdone=true;
     var $t=curlookdef;
  }
 
  var lkupform='f'+$t.tableid;
  var lkuphtmlspan='s'+$t.tableid;
  var lkupformdiv='div'+lkupform;
  var lkupdiv=lkupformdiv+'d';
  var lkupformobj=document.getElementById(lkupformdiv);

  if (lkupformobj == null) {
     var divnewform=document.createElement('div');
     divnewform.id=lkupformdiv;
     divnewform.className="window";
     divnewform.style.display="none";
     var inner='<form name="'+lkupform+'">';
     inner += '<div class="titleBar"></div>';
     inner += '<img SRC="../image/closewin_icon.gif"  alt="close"  class="ximage" onClick="closeForm(); evalSpecial('+"'"+$t.oncancel+"'"+')"></img>';
     inner += '<div id="'+lkupdiv+'"></div></form>';
     divnewform.innerHTML=inner;
     document.getElementsByTagName('body')[0].appendChild(divnewform);
     newrun=true; 
  } 
   
  if ($t.beforelookup != '' && newrun==false) {
     var rtn='' 
     try {rtn=eval($t.beforelookup)} catch(e) {alert(e.message); return}
     if (rtn==false) return;
  }
 
  if (newrun==false) try {eval('$t.lookuphtml='+lkuphtmlspan+'.innerHTML')} catch(e) {};
 
  var sqlselstmt=$t.sqlselect; 
  if ($t.refresh==true || refreshdone==true || newrun==true || $t.sqlselect != $t.sqlprevselect) {
 
     var prefix='';
     var suffix='';
     var lkfl=0;

     if ($t.lookupfldlen>=0) {
        $t.lookupfld='$$inp1'+$t.tableid;
        prefix += '<span id='+lkuphtmlspan+'>'+$t.lookuphtml+'</span>'; 
        if ($t.lookupfldlen>0) {
           prefix=$t.lookupfldtxt+'<br>';
           prefix += '<input name =' +$t.lookupfld+ ' type=text size='+$t.lookupfldlen+' value="'+valueOf($t.lookupfld)+'" onkeypress="initiateLookup()">';
        }
        prefix += '&nbsp<button onclick="exeFunction('+"'sqlLookUp()'"+')">Go</button><br><br>'; 
       // if (isBlank(valueOf($t.lookupfld)) && $t.lookupfldlen !=0) $t.sqlselect='';
        if (newrun && ($t.lookupfldlen !='' || $t.lookupfldlen == 0)) $t.sqlselect='';
     }
     if (prefix=='') {
        suffix += '<button onclick="exeFunction('+"'sqlLookUp()'"+')">Refresh</button>'
     } 

     var val=valueOf($t.lookupfld).trim(); 
     if ($t.lookupfldcase=='UPPER') val=val.toUpperCase(); 
     if (!isBlank(val)) {
        $t.sqlselect=$t.sqlselect.replace(/lookupfld/g,val);
     }

  var lhtml=prefix+applyTableDef($t)+suffix;
  $t.sqlselect=sqlselstmt;
  $t.refresh=false;
  changeContent(lkupdiv,lhtml);
  
  }

  rtnfldstring='';
  for (var i=0; i<$t.returninto.length; i++) {
      rtnfldstring += $t.returninto[i];
      if ((i+1<$t.returninto.length)) rtnfldstring += ':';
  }

  if (!refreshdone || newrun) {
     var useform=lkupform+':*abs';
     
     if ($t.top=='center' || $t.left=='center') {
         displayForm(useform);
     }
     else {
        if ($t.top) {ypos=$t.top;}
        if ($t.left) {xpos=$t.left;}
        displayForm(useform,ypos,xpos);
     }
     curlookdef=$t;
  }  else displayForm(lkupform);

  curlookdef=$t;
  $t.sqlprevselect=$t.sqlselect;
  focusOn($t.lookupfld); 
}


function initiateLookup() {
  if (enterKey()) {
   exeFunction('sqlLookUp()');
  }
}


function sqlTabRoll($t,how) {
  if (!$t) $t=curlookdef;
  if ($t.sqlselect=='' || $t.sqlperpage==0 || $t.sqlperpage>=$t.sqltotcnt) return;
  how=how.toUpperCase();
  if (how=='*NEXT' || how=='NEXT') {
     if (($t.sqlstart+$t.sqlperpage)>=$t.sqltotcnt) return;
     $t.sqlstart=$t.sqlstart+$t.sqlperpage;
     return;
  }
  if (how=='*PREVIOUS' || how=='PREVIOUS') {
     if (($t.sqlstart-$t.sqlperpage)<0) return;
     $t.sqlstart=$t.sqlstart-$t.sqlperpage;
     return;
  }
}




function sqlGetSuggest($c) {
  var ev=window.event.keyCode;
  var txt='';
  var randomid=(Math.floor(Math.random() * (999999 - 1)) + 1);
  if ($c.sqlselect=='') return;
  if (!(sqlSelect($c.sqlselect,'$r',$c.sqlrcdcnt,$c.sqlconnect))) {return;} 
  //if ((ev==37) || (ev==38) || (ev==39) || (ev==40) || (ev==45) || (ev==8) || (ev==9) || (ev==16)) return;
  if (!suggestdiv) {
     var divform=document.createElement('div');
     divform.id="divSuggestDiv"
     divform.style.display="none";
     divform.className="suggestlist";
     divform.style.height=100;
     divform.style.overflow="auto";
     document.getElementsByTagName('body')[0].appendChild(divform);
     suggestdiv=true;
  }

   rtnfldstring='';
   for (var i=0; i<$c.returninto.length; i++) {
       rtnfldstring += $c.returninto[i];
       if ((i+1<$c.returninto.length)) rtnfldstring += ':';
   } 

  divSuggestDiv.style.width=event.srcElement.offsetWidth;

  suggestfld=event.srcElement.name;
  for (var i=0; i<$r.rcdcnt; i++) {
      var txtid='t'+i+'_'+randomid;
      var value=eval('$r.'+$$sqlcol[0]+'['+i+']'); 
      value=value.trimr(); 
      if ($c.returnfld.length >0) {
         txt += "<textarea id=v"+txtid+" style='display:none'>";
         for (var k=0; k<$c.returnfld.length; k++) {
              try {txt += eval('$r.'+$c.returnfld[k]+'['+i+'].trim()');}
              catch(e) {txt += eval('$r.'+$c.returnfld[k]+'['+i+']');}  
              if (k+1<$c.returnfld.length) {
                 txt += '^';
              }

          }
      txt +="</textarea> "; 
      }
      txt += "<textarea id="+txtid+" style='display:none'>"+value+"</textarea><div class=suggestitem onmousedown='";
      if ($c.returnfld.length >0) {
         txt += "suggestRtnValue(v"+txtid+".value); ";
         
      }
      txt += "suggestThis("+txtid+".value);";
      if ($c.onclick !='') txt += '; eval("'+$c.onclick+'")';
      txt += "' onmouseover='colorBg(this)'";
      txt += ' onmouseout="'+"colorBg(this,'*dft')"+'">'+value+'</div>';
  } 
  if (txt !='') {
       changeContent('divSuggestDiv',txt);        
       popUpContent('divSuggestDiv',suggestfld); ispop=false; 
       divSuggestDiv.scrollTop=1;
  } 
  else closePopUps('divSuggestDiv');               
}

function suggestThis(value) {
//value=event.srcElement.innerHTML;
  changeVar(suggestfld,value);
  changeContent('divSuggestDiv','');
  closePopUps();
}

function suggestRtnValue() {                                    
  if (arguments.length>0) { 
    var returnvalues=arguments[0].split('^');                                
    var intoflds=rtnfldstring.split(':');                   
    for (var i=0; i<returnvalues.length; i++) {                 
        if (i>=returnvalues.length) break;                         
       try {changeVar(intoflds[i],returnvalues[i]);} catch (e) {};
    }                                                       
  }                                                         
}                                                             
        

function sqlRtnValue() { 

  if (arguments.length>0) {
    
    var intoflds=rtnfldstring.split(':');

    for (var i=0; i<intoflds.length; i++)
    {
      if (i>=arguments.length) break;
      try {
          var ttxt=arguments[i].replace(/!~!/g,"'");
          ttxt=ttxt.replace(/!~~!/g,'"'); 
          changeVar(intoflds[i],ttxt);
          var obj=document.getElementById(intoflds[i]); 
          if (obj.className == "datefield") { 
              var dte="d3#$"+intoflds[i];
              obj=document.getElementById(dte);
              if (obj.dt.sst(1,1)=='d') {
                  var fmt=obj.dt.sst(2,1);
                  changeVar(intoflds[i],numeric(ttxt).chgDateFmt('Y',fmt));
              }
          }
      } catch (e) {};
    }

   try {eval(aft$$slt)} catch(e){};
  }
closeForm();
}         


function selectList() {
  this.sqlselect='';
  this.defaultvalue='~!^';
  this.sqlrcdcnt='';
  this.nulltext='';
  //this.hidevalue=new Array(); 
  try {this.sqlconnect=conn;}
  catch(e) {this.connect=''} 
}


function applySelectList($l,sel) {

  var txtfld='';
  var obj=document.getElementById(sel);
  if (obj==null) return false;
  if (!(sqlSelect($l.sqlselect,'$r',$l.sqlrcdcnt,$l.sqlconnect))) return false; 
  var valfld=$$sqlcol[0];
   if ($$sqlcol.length>1) {
      var rplval=$$sqlcol[1].split('vv0_');
      if (rplval.length==1) {txtfld=$$sqlcol[1]}
      else {txtfld='use@function';}  
  }
  else {txtfld=valfld;} 

  var len=obj.length;
  for (var i=0; i<len; i++) { 
    try {
      obj.options[0] = null;
    } catch (e) {}
  }  

  var opt='';
  var opttxt='';
  var addopt='';

  if ($l.nulltext) {
     opttxt=$l.nulltext;
     addopt = new Option(opttxt,opt);
     obj.options[obj.length] = addopt; 
  }

  for (var i=0; i<$r.rcdcnt; i++) {
    opt='';
    opttxt='';
    try {opt=eval('$r.'+valfld+'['+i+'].trimr()');}
    catch(e) {opt=eval('$r.'+valfld+'['+i+']')}
    if (txtfld !='use@function') { 
       try {opttxt=eval('$r.'+txtfld+'['+i+'].trimr()');}
       catch(e) {opttxt=eval('$r.'+txtfld+'['+i+']')}
    }
    else {
          try {
               currentsqlrow=i;
               currentsqlfld=$$sqlcol[1];
               currentsqlobj=$r;
               try {
                    opttxt=eval(rplval[1]+"()");
                    if (opttxt==undefined) {opttxt='##VALUE##'};
               } catch (e) {opttxt='##UNDEFINED##'}
          } catch (e) {optxt='##VALUE##'}
    } 
    addopt = new Option(opttxt,opt);
    obj.options[obj.length] = addopt;
  }
  
  if ($l.defaultvalue != '~!^') {changeVar(sel,$l.defaultvalue)}
  return true; 
}


function applyColDef(state, coldef,obj,tableid,indx,type) {

  if (state=='change') {
     var edc=''; 
     var edd=0;  
     if (coldef.edit[indx]) {
        var edtdata=coldef.edit[indx].split(':');
        edc=edtdata[0];
        if (edtdata.length>1) {edd=edtdata[1]}
        edc=edc.toLowerCase(); 
        if (type && type=='*date' && (edc=='y' || edc=='m' || edc=='d')) {
            obj.innerHTML=edit(numeric(obj.innerHTML).chgDateFmt('Y',edc),0,edc);
        }
        else {obj.innerHTML=edit(obj.innerHTML,edd,edc)};     
     }
     return;
  }
 
  if (coldef.onclick[indx]) {
      eval("obj.onclick=function anonymous() {"+coldef.onclick[indx]+"}");
  }
  if (coldef.onmouseover[indx]) {
      eval("obj.onmouseover=function anonymous() {"+coldef.onmouseover[indx]+"}");
  }
  if (coldef.onmouseout[indx]) {
      eval("obj.onmouseout=function anonymous() {"+coldef.onmouseout[indx]+"}");
  }
  if (coldef.align[indx]) {
     obj.align=coldef.align[indx];     
  }
  if (coldef.style[indx]) { 
      var nobj=document.createElement("div")
      nobj.id='x__c__cx';
      try {eval("nobj.innerHTML='<div id=x___x__x_ style="+'"'+coldef.style[indx]+'"></div>'+"'")}
      catch(e) {delete nobj; return}  
      document.body.appendChild(nobj); 
      for (var property in x___x__x_.style) {
         try {
           eval('obj.style.'+property+'=x___x__x_.style.'+property); 
         } catch(e) {};
      }
      document.body.removeChild(nobj);
      delete nobj;
   }
} 


function getUsr(user,passwrd,useconn) {
  var str='$user'
  if (!useconn) {var useconn=conn}
  var sqlstring="select usrid, usrnmf,usrnml,usrpwd, usrlvl, usrgrpprf, usrpwexp from wmnuusr where usrid="+user.sqlWrap()+" and usrsts <> 'D'";
  if (!sqlSelect(sqlstring,str,1,useconn)) {return false}
  if (sqlrcdcnt==0) {return "usererror"};   
  if ($user.usrpwd[0].trim() != passwrd.trim()) {return "passworderror"};
  if (numeric($user.usrpwexp[0]) !=0 && (numeric($user.usrpwexp[0]) < numeric(todayDate()))) {return "expireerror"}
  username=user; 
  getUsrData(); 
  return true; 
}

function getUsrData(useconn) {
  var sqlstring;
  if (!useconn) {var useconn=conn}
  str='$$u';
  if ($user.usrlvl[0]!='SYSOP') {
     if (!isBlank($user.usrgrpprf[0])) {
        sqlstring="select grpid, grpdsc, grpicn, optid, optdsc, optfnc, opticn from wmnugrp, wmnuopt, wmnuusop where grpid=optgrp and optid=uooid and uouid="+$user.usrgrpprf[0].sqlWrap()+" order by grpdsc, optdsc";  
        //sqlstring="select grpid, grpdsc, grpicn, optid, optdsc, optfnc, opticn from wmnugrp, wmnuopt, wmnuusop where grpid=optgrp and optid=uooid and uouid="+$user.usrgrpprf[0].sqlWrap()+" order by grpid, optid";
     }
     else {
        sqlstring="select grpid, grpdsc, grpicn, optid, optdsc, optfnc, opticn from wmnugrp, wmnuopt, wmnuusop where grpid=optgrp and optid=uooid and uouid="+$user.usrid[0].sqlWrap()+" order by grpdsc, optdsc";
     }
  }
  else {
        sqlstring="select DISTINCT grpid, grpdsc, grpicn, optid, optdsc, optfnc, opticn from wmnugrp, wmnuopt where grpid=optgrp order by grpdsc, optdsc";
  }
  
  if (!sqlSelect(sqlstring,str,99999,useconn)) {alert(sqlerr); return false} 

  $group=new Object();
         $group.id=new Array();
         $group.desc=new Array();
         $group.icon=new Array();
  $option=new Object();
         $option.group=new Array();
         $option.id=new Array();
         $option.desc=new Array();
         $option.func=new Array();
         $option.icon=new Array();
 
   
  var group='';
  for (var i=0; i<$$u.rcdcnt; i++) {
      if ($$u.grpid[i] != group) {
         $group.id.push($$u.grpid[i]);
         $group.desc.push($$u.grpdsc[i]);
         $group.icon.push($$u.grpicn[i]);
         group=$$u.grpid[i]; 
      }
      $option.group.push($$u.grpid[i]);
      $option.id.push($$u.optid[i]);
      $option.desc.push($$u.optdsc[i]); 
      $option.func.push($$u.optfnc[i]);
      $option.icon.push($$u.opticn[i]);

  }
  delete $$u; 
  return true;
}


function buildGroupsMenu(optmnu) { 
  menuoptionarea=document.getElementById(optionssection);
  var txt='';

  if (!document.getElementById('$$groups')) {
     txt="<div id=$$groups class=groupmain></div>";
     menuoptionarea.innerHTML=txt+menuoptionarea.innerHTML;
  } 
  if (!document.getElementById('$$options')) {
     txt="<div id=$$optionshead class=optionheader></div><div id=$$options class=optionmain></div>";
     menuoptionarea.innerHTML=txt+menuoptionarea.innerHTML;
  } 
  txt='';
  var imgtxt=""; 
  for (var i=0; i<$group.id.length; i++) {
      imgtxt="<img class=groupimage src='../image/"+$group.icon[i].trim()+"'>&nbsp"; 
      txt += "<div id=$$$"+$group.id[i]+" class=groupstyle onmouseover=menuMouse('over',this,'$$groups') onmouseout=menuMouse('out',this,'$$groups') onclick='buildOptionsMenu(this,"+'"'+$group.id[i]+'")'+"'><div>"+imgtxt+$group.desc[i].trim().replace(/ /g,'&nbsp')+"</div></div>";
  } 
  changeContent('$$groups',"<hr>"+txt);
  if (optmnu && optmnu=='*first') {optmnu=$group.id[0]}
  if (optmnu) {
     try {
         document.getElementById('$$$'+optmnu.trim()).click();
     } catch(e) {}
  }
  return; 

}



function buildOptionsMenu(obj,group) {
  var imgtxt='';
  //var txt='<div class=optionheader>'+obj.innerHTML+'</div><hr>'; 
      changeContent('$$optionshead',obj.innerHTML+"<hr>"); 
  var txt='';
      for (var i=0; i<$option.id.length; i++) {
         if ($option.group[i]==group) {
            imgtxt="<img class=optionimage src='../image/"+$option.icon[i].trim()+"'>&nbsp"; 
            txt += "<div class=optionstyle onmouseover=menuMouse('over',this,'options') onmouseout=menuMouse('out',this,'options') onclick='doOption(this,"+'"'+$option.id[i]+'","'+$option.func[i]+'")'+"'>"+imgtxt+$option.desc[i].trim().replace(/ /g,'&nbsp')+"</div>";
         }
      } 
  illuminate('$$groups',obj); 
  changeContent('$$options',txt);
  $$options.scrollTop=0;
} 


function doOption(obj,optionid,fnctn) {
 
 var str='$oo';
 var sqlstring='';
 
 illuminate('$$options',obj); 

 if ($user.usrlvl[0] != 'SYSOP') { 
    if (!isBlank($user.usrgrpprf[0])) {
       //sqlstring="select uoadd, uochg, uodlt, optfnc from wmnuusop, wmnuopt where uooid=optid and uouid="+$user.usrid[0].sqlWrap()+" and uooid="+optionid.sqlWrap();
       sqlstring="select * from wmnuusop, wmnuopt where uooid=optid and uouid="+$user.usrgrpprf[0].sqlWrap()+" and uooid="+optionid.sqlWrap();
    }
    else {
       //sqlstring="select uoadd, uochg, uodlt, optfnc from wmnuusop, wmnuopt where uooid=optid and uouid="+$user.usrid[0].sqlWrap()+" and uooid="+optionid.sqlWrap();
       sqlstring="select * from wmnuusop, wmnuopt where uooid=optid and uouid="+$user.usrid[0].sqlWrap()+" and uooid="+optionid.sqlWrap();
    }
 }
 else {
    //sqlstring="select optfnc from wmnuopt where optid="+optionid.sqlWrap();
    sqlstring="select * from wmnuopt where optid="+optionid.sqlWrap();
 }
 if (!sqlSelect(sqlstring,str,1,conn)) {alert(sqlerr); return false;}  

 
 if ($user.usrlvl[0] != 'SYSOP') { 
    if (sqlrcdcnt==0) {alert('Your access to this option has been revoked'); return false}
    allowadd=false;
    allowchange=false; 
    allowdelete=false; 
    illuminate('$$options',obj);
    if ($oo.uoadd[0]=='Y') allowadd=true;
    if ($oo.uochg[0]=='Y') allowchange=true;
    if ($oo.uodlt[0]=='Y') allowdelete=true;
 }
 else {
      allowadd=true;
      allowchange=true;
      allowdelete=true;
 } 
 
 if (!isBlank($oo.optfnc)) { 
     eval("exeFunction('"+$oo.optfnc[0]+"()')");
 } 
 else {
      if ($oo.optpgm) {
          var dobj=$oo.optpgm[0].strip(".").trim()+"$$"; 
          try {eval('var diaobj='+dobj);}
          catch(e) {
              eval(dobj+'=new dialogDef()'); 
              eval('var diaobj='+dobj);
          }
           
          if (isBlank($oo.optmode[0]) || $oo.optmode[0]=='0') {
             //eval("displayIframeDialog('"+$oo.optpgm[0].trim()+"')");
             displayIframeDialog($oo.optpgm[0],$oo.optdsc[0]); 
          }
          else {
             if ($oo.optmode[0]=='1') {diaobj.type='modal'}
             else {diaobj.type='modeless'}
             if (numeric($oo.opthgt[0])>0) {diaobj.height=$oo.opthgt[0];}
             if (numeric($oo.optwdt[0])>0) {diaobj.width=$oo.optwdt[0];}
             //eval("displayDialog('"+$oo.optpgm[0].trim()+"',diaobj)");
             displayDialog($oo.optpgm[0],diaobj); 
          }
      }
 }

}


function illuminate(section,obj) {
  var secobj=document.getElementById(section).getElementsByTagName('div');
  if (secobj==null) return;
  if (section=='$$groups') {  
     for (var i=0; i<secobj.length; i++) {
        if (secobj[i].className=='groupstyle2') {secobj[i].className='groupstyle'};
     }
  obj.className='groupstyle2'; 
  }
  if (section=='$$options') {  
     for (var i=0; i<secobj.length; i++) {
        if (secobj[i].className=='optionstyle2') {secobj[i].className='optionstyle'};
     }
  obj.className='optionstyle2'; 
  }
}


function menuMouse(action,obj,section) {
 
 if (obj.className != 'groupstyle2' && obj.className != 'optionstyle2') {
  if (action=='over') {
     if (section=='$$groups') {obj.className='grouphover';}
     else {obj.className="optionhover";}
  }
  else {
     if (section=='$$groups') {obj.className='groupstyle';}
     else {obj.className="optionstyle";}
  }
 } 
}


function sqlSelectPhp(sqlselect,use,rcds) {
  var rplval; 
  sqlrcdcnt=0; 
  sqlerr='';
  var rcdcnt=99999999;
  useobj="$s"; 
  if (use) {useobj=use}
  if ((rcds) && !isNaN(rcds)) rcdcnt=rcds; 
  submitSql('select',sqlselect,rcdcnt); 
  eval(useobj+"=new Object()");
  var section=ajaxresponse.split('~^~');
  if (section[0]=="ERR") {
     sqlerr=section[1];
     return false;
  } 
  $$sqlcol=section[0].split('^^'); 
  for (var i=0; i<$$sqlcol.length; i++) {
      rplval=$$sqlcol[i].split('vv0_'); 
      if (rplval.length>1) {
          currentsqltabdef.valuefunction[i]=searchForValueFunction(rplval[1]); 
          eval(useobj+'.'+rplval[1]+"= new Array()"); 
          $$sqlcol[i]=rplval[1];
      }
      else { 
          eval(useobj+'.'+rplval[0]+"= new Array()");
      }
  } 

  var rtnrows=section[1].split('~~'); 
  var rlen=rtnrows.length-1;    
  for (var i=0; i<rlen; i++) {
      rtncolumn=rtnrows[i].split('^^'); 
      //var clen=rtncolumn.length-1;
      var clen=$$sqlcol.length;  
      for (var i2=0;i2<clen; i2++) {
          eval(useobj+"."+$$sqlcol[i2]+"[i]=rtncolumn[i2].trim()"); 
      }
  } 
  eval(useobj+'.rcdcnt='+rlen); 
  sqlrcdcnt=rlen;
  return true;  
}


function sqlUpdatePhp(sqlcommand) {
  submitSql('update',sqlcommand); 
  //useobj=new Object(); 
  var section=ajaxresponse.split('~^~');
  if (section[0]=="ERR") {
     sqlerr=section[1];
     return false;
  } 

  return true;  
}

function submitSql(sqltype, sqlstring, rcdcnt){
  submitsqlstring=sqlstring;
  DIRective=sqltype;
  if (rcdcnt==5) {rcdcnt=6;}
  submitsqlrcds=rcdcnt; 
  sndrcvSql();
}


function sndrcvSql(){
var dontwait=false;
var urlp=''
if (DIRective=='select') {
   urlp="directive="+DIRective+"&sqlodbc="+submitsqlodbc+"&sqlstring="+submitsqlstring+"&sqlrcds="+submitsqlrcds; 
} 
else {
   urlp="directive="+DIRective+"&sqlodbc="+submitsqlodbc+"&sqlstring="+submitsqlstring;
}

ajaxCall(submitsqlpath,urlp); 

}

dataDic=new Object();
dataDic.field=new Object();
dataDic.table=new Object();
 
function addDicField(data) {
//data-->field-Name:length(,decimal):description:default
 var fldtyp='';
 data=data.split(':'); 
 var name=data[0].toLowerCase();
 if (data[1]=='date') {
    fldtyp='date';
    data[1]='8,0';
 }
 if (data[1]=='time') {
    fldtyp='time'
    data[1]='4,0'
 }
 var len=data[1].split(','); 
 eval("dataDic.field."+name+"=new Object()");
 eval("var obj=dataDic.field."+name);
 obj.length=numeric(len[0]);
 if (len.length>1) {
    obj.decimal=len[1];
    obj.type='numeric'
 }
 else {
   obj.decimal='';
   obj.type='char';
 };
 if (fldtyp) {obj.type=fldtyp};

 if (data.length>2) {obj.desc=data[2]} else {obj.desc=name}
 if (data.length>3) {obj.defvalue=data[3]} 
 else {
    if (obj.decimal=='') {obj.defvalue=' '}
    else {obj.defvalue=0}
 }
}    

function dbTableDef(tname) {
 this.name=tname.toLowerCase();
 this.desc='';
 
 this.field=''; //List of fields in quotes (or double quotes) eg. "fld1,fld2,..,fldn"
 this.keyfield=''; //List of keyfields in quotes (or double quotes) eg. "key1,key2,..,keyn"

 this.view=new Array();
 //this.view[0]='Viewname:select_fields:where_cond:other_join_files:group_by_fields';

 this.index=new Array();
 //this.index[0]='Indexname:order';
 //                         keyfield {asc/desc}
}

function applyDbTableDef(dbtable) {
 eval("dataDic.table."+dbtable.name+"=new Object");
 eval("var obj=dataDic.table."+dbtable.name);
 obj.desc=dbtable.desc;
 obj.field=dbtable.field;
 obj.keyfield=dbtable.keyfield;
 obj.view=dbtable.view;
 obj.index=dbtable.index;
} 

function getFieldAttr(field) {
 var obj=false;
 try {eval("obj=dataDic.field."+field.toLowerCase());}  
 catch(e) {} 
 return obj;
}

function getDbTableAttr(table) {
 var obj=false;
 //try {eval("obj=clone(dataDic.table."+table.toLowerCase()+")");} 
 try {obj=clone(dataDic.table[table.toLowerCase()]);}  
 catch(e) {} 
 return obj;
}


function createDbTable(dbtable) {

var logcreate='N';

if (arguments.length>1) { 
    var arg2=arguments[1].split(':');
    if (arg2[0].toLowerCase()=='*tolog') {
      logcreate='logyes';
    } 
}



var  sqltxt = "select * from "+dbtable;
  sqlSelect(sqltxt,'$s',1);
  if (sqlSelect(sqltxt,'$s',1)){
     alert('Table already exists in the database');
     return false;
  }


if (logcreate=='logyes'){
    var tabattr=getDbTableAttr(arg2[1]);
}
else{
    var tabattr=getDbTableAttr(dbtable);
}


if (!tabattr) { alert('error creating table '+dbtable); return false;}

//dbasetype='sql';

connect=conn;

//Table name definition

sqlcommand = "CREATE TABLE "+dbtable+" (";
 


//include Log fields

if (logcreate=='logyes'){
  
  sqlcommand += "tgusr char(10),";

  sqlcommand += "tgdate";
     if(dbasetype =='access'){ 
        sqlcommand += " Number";
     }
     else {
           sqlcommand += " numeric(8,0)";
           if (dbasetype=='as400') {
               sqlcommand += " NOT NULL WITH DEFAULT";
           }
     } 
     if(dbasetype !='as400' && dbasetype !='access'){sqlcommand += " default 0";}
     sqlcommand += ", ";  
       
  sqlcommand += "tgtime";
     if(dbasetype =='access'){
        sqlcommand += " Number";
     }
     else {
         sqlcommand += " numeric(4,0)";
         if (dbasetype=='as400') {
             sqlcommand += " NOT NULL WITH DEFAULT";
         }
     }
     if(dbasetype !='as400' && dbasetype !='access'){ sqlcommand += " default 0";}
     sqlcommand += ", ";

     if (dbasetype !='as400') {
         sqlcommand += "tgattime char(1),";
         sqlcommand += "tgevent char(1),";
     }
     else {
         sqlcommand += "tgattime char(1) NOT NULL WITH DEFAULT,";
         sqlcommand += "tgevent char(1) NOT NULL WITH DEFAULT,";
     } 
     
}




 //Field definition
 var fieldnames=tabattr.field.split(',');

 var keyfields=tabattr.keyfield.split(',');



 for (i=0; i<fieldnames.length; i++) {
  
     //define fieldname 
     sqlcommand += fieldnames[i]+" ";

     var fldnam=fieldnames[i]; 

     //get Field attributes
     var fldattr=getFieldAttr(fldnam);
   
     if (!fldattr) { alert('error getting attributes for field '+fldnam); return false;}

                                             
         //define Type
         
         var fieldtyp="";
         var lendec="";
         if (fldattr.decimal=='') {
            fieldtyp="char";
            lendec=fldattr.length; 
         } 
         else {
            fieldtyp="numeric";
            if(dbasetype =='access') {fieldtyp="Number";}
            lendec=fldattr.length+','+fldattr.decimal;
         }

          if (fieldtyp=="Number") {sqlcommand += fieldtyp;}
          else { sqlcommand += fieldtyp+"("+lendec+")";}
    
         

          if (logcreate !='logyes' && dbasetype != 'as400'){   
 
          //If keyfield, define constraint NOT NULL

             var keyfields=tabattr.keyfield.split(',');
             for (k=0; k<keyfields.length; k++) {
                if (fieldnames[i] == keyfields[k]){
                    sqlcommand += " NOT NULL";
                    break;
                }
             }
          }
 
       
          //Default value
           if(fldattr.defvalue && dbasetype !='as400' && dbasetype !='access'){
               sqlcommand += " default ";
               sqlcommand += fldattr.defvalue;   
           }
       
     if (dbasetype =='as400') {sqlcommand += " NOT NULL WITH DEFAULT";}     

     if (i < (fieldnames.length)-1){
                sqlcommand += ", ";
     }


 } 


  sqlcommand += ")";


  try {connect.Execute(sqlcommand);} catch (e){sqlerr=e.message+'\n\n'+sqlcommand; alert(sqlerr); return false} 


    

  //define keys 
  //Add Key
  if (!isBlank(keyfields) && logcreate !='logyes'){

      sqlcommand = "ALTER table "+dbtable+" ADD PRIMARY KEY (";
  
         for (k=0; k<keyfields.length; k++) {
             sqlcommand += keyfields[k];
             
             if (k < (keyfields.length)-1){
                sqlcommand += ", ";
             }              
         }

      sqlcommand += ")";
      try {connect.Execute(sqlcommand);} catch (e){sqlerr=e.message+'\n\n'+sqlcommand; alert(sqlerr); return false} 

  }


  return true;  

}







function createDbTableView(dbtable,viewsel) {

 //this.view[0]='Viewname:select_fields:where_cond:other_join_files:group_by_fields';

connect=conn;

var tabattr=getDbTableAttr(dbtable);

if (!tabattr) { return false;}

var viewselect='';

if (arguments.length==1 || viewsel=='*ALL' || viewsel=='*all') { 
   viewselect='*ALL';
}
else{ viewselect=viewsel; }


  //Create logicals

 if (viewselect=='*ALL'){
    
    for (i=0; i<tabattr.view.length; i++) {
    
      var fieldattr=tabattr.view[i].split(':');
      var sqlcommand = buildTableViewCommand(fieldattr,dbtable);
      
      try {connect.Execute(sqlcommand);} catch (e){sqlerr=e.message+'\n\n'+sqlcommand; alert(sqlerr); return false} 

    }
 }
 else{
   
    var lglattr=viewselect.split(':');
    for (h=0; h<lglattr.length; h++) {

      for (i=0; i<tabattr.view.length; i++) {
    
          var fieldattr=tabattr.view[i].split(':');
          if (fieldattr[0] == lglattr[h]){
               sqlcommand = buildTableViewCommand(fieldattr,dbtable);
               try {connect.Execute(sqlcommand);} catch (e){sqlerr=e.message+'\n\n'+sqlcommand; alert(sqlerr); return false} 
          }   
      }

    }


 }

 
 return true; 

}


function buildTableViewCommand(fieldattr1,tablename1) {

   var fieldattr = fieldattr1;
   var tablename = tablename1;
  
      var sqlcommand1 = "CREATE VIEW "

      for (j=0; j<fieldattr.length; j++) { 

          //View name
          if (j==0) {sqlcommand1 += fieldattr[j]+" AS SELECT ";}

          //Select fields
          if (j==1) {
              var selattr=fieldattr[j].split(',');
              for (k=0; k<selattr.length; k++) { 
                  sqlcommand1 += selattr[k];
                  if (k<(numeric(selattr.length)-1)){ sqlcommand1 += ", ";}
              }
              sqlcommand1 += " FROM "+tablename;
                  
         //add join files
   
             if (fieldattr[3] && !isBlank(fieldattr[3])) {
               var jfilattr=fieldattr[3].split(',');
               for (var l=0; l<jfilattr.length; l++) { 
                  sqlcommand1 += ",";
                  sqlcommand1 += jfilattr[l];
                  
               }
         
             }

          }

          //where condition
          if (j==2 && !isBlank(fieldattr[j])) {
             sqlcommand1 += " WHERE "+fieldattr[j];
          }

          //Group By
          if (j==4 && !isBlank(fieldattr[j])) {
              sqlcommand1 += " GROUP BY ";
              var grpattr=fieldattr[j].split(',');
              for (k=0; k<grpattr.length; k++) { 
                  sqlcommand1 += grpattr[k];
                  if (k<(numeric(grpattr.length)-1)){ sqlcommand1 += ", ";}
              }   
          }

     
      }

      
   return sqlcommand1;
}



function createDbTableIndex(dbtable,indexsel) {

connect=conn;

var tabattr=getDbTableAttr(dbtable);

if (!tabattr) { return false;}

var indexselect='';

if (arguments.length==1 || indexsel=='*ALL' || indexsel=='*all') { 
   indexselect='*ALL';
}
else{ indexselect=indexsel; }


  //Create logicals

 if (indexselect=='*ALL'){
    
    for (i=0; i<tabattr.index.length; i++) {
    
      var fieldattr=tabattr.index[i].split(':');
      var sqlcommand = buildTableIndexCommand(fieldattr,dbtable);
      
      try {connect.Execute(sqlcommand);} catch (e){sqlerr=e.message+'\n\n'+sqlcommand; alert(sqlerr); return false} 

    }
 }
 else{
   
    var lglattr=indexselect.split(':');
    for (h=0; h<lglattr.length; h++) {

      for (i=0; i<tabattr.index.length; i++) {
    
          var fieldattr=tabattr.index[i].split(':');
          if (fieldattr[0] == lglattr[h]){
               sqlcommand = buildTableIndexCommand(fieldattr,dbtable);
               try {connect.Execute(sqlcommand);} catch (e){sqlerr=e.message+'\n\n'+sqlcommand; alert(sqlerr); return false} 
          }   
      }

    }


 }

 return true; 

}


function buildTableIndexCommand(fieldattr1,tablename1) {

   var fieldattr = fieldattr1;
   var tablename = tablename1;

//---- This section works on PCS's AS400 but not on SCASPA's. In the latter case the logical files had to be created manually using DDS

  //if (dbasetype=='access') {
  //      sqlcommand1=buildIndexView(fieldattr1,tablename1); //All lines within this section - except this one would have to be created for the program to run on SCASPA's AS/400
  //      return;
  // }

  //else {
  
      var sqlcommand1 = "CREATE INDEX "

      for (j=0; j<fieldattr.length; j++) { 

          //index name
          if (j==0) {sqlcommand1 += fieldattr[j]+" ON "+tablename;}

          
          //key fields
          if (j==1 && !isBlank(fieldattr[j])) {
              sqlcommand1 += " (";
              var grpattr=fieldattr[j].split(',');
              for (k=0; k<grpattr.length; k++) { 
                  sqlcommand1 += grpattr[k];
                  if (k<(numeric(grpattr.length)-1)){ sqlcommand1 += ", ";}
              } 
              sqlcommand1 += ")";  
          }

     
      }

//   }

// ---- End: This section.... 
   return sqlcommand1;
}



function buildIndexView(fieldattr1,tablename1) {

      
      var fieldattr = fieldattr1;
      var tablename = tablename1;

      var sqlcommand1 = "CREATE VIEW "

      for (j=0; j<fieldattr.length; j++) { 

          //index name
          if (j==0) {sqlcommand1 += fieldattr[j]+" AS SELECT * FROM "+tablename;}

          
          //key fields
          if (j==1 && !isBlank(fieldattr[j])) {
              sqlcommand1 += " ORDER BY ";
              var grpattr=fieldattr[j].split(',');
              for (k=0; k<grpattr.length; k++) { 
                  sqlcommand1 += grpattr[k];
                  if (k<(numeric(grpattr.length)-1)){ sqlcommand1 += ", ";}
              } 
              
          }

     
      }


   return sqlcommand1;


}




function copyDbTableDef() {
  this.fromtable='';
  this.totable='*fromtable';
  try {this.fromconnect=conn}
  catch(e) {this.fromconnect=''}
  this.toconnect='*fromconnect';
  this.filter='';
}


function copyDbTable(obj) {
  if (!obj.fromtable) {alert('"From Table" not supplied'); return false}

  var tablefrom=obj.fromtable;
  var tableto=obj.totable;
  var i=0;
  var i2=0;
 
  if (tableto=='*fromtable') {tableto=tablefrom}
  var connectfrom=obj.fromconnect;
  var connectto=obj.toconnect;
  if (connectto=='*fromconnect') {connectto=connectfrom}

  var fldlist1=getDbTableAttr(tablefrom).field;  fldlist1=fldlist1.split(',');
  var fldlist2=getDbTableAttr(tableto).field;    fldlist2=fldlist2.split(',');
  var fldlist=new Array(); 
  for (i=0; i<fldlist1.length; i++) {
       for (i2=0; i2<fldlist2.length; i2++) {
            if (fldlist1[i]==fldlist2[i2]) {
                fldlist.push(fldlist1[i]); 
                break; 
            }
       }
  }

 var sqltxt='select '+fldlist+' from '+tablefrom;
 if (obj.filter) {
     sqltxt += ' where '+obj.filter;
 }  
 if (!sqlSelect(sqltxt,'$s','',connectfrom)) {alert(sqlerr); return false}
 var updobj=new Object(); 
 for (i=0; i<$s.rcdcnt; i++) {
    for (i2=0; i2<$$sqlcol.length; i2++) {
          
          field=$$sqlcol[i2];
          if (getFieldAttr(field).type=='char') {
              eval('updobj.'+field+'= $s.'+field+'[i]');
          }
          else {
              eval('updobj.'+field+'= sqlNum($s.'+field+'[i])');
          }  
    }
    if (!sqlInsert(tableto,updobj,connectto)) {
        alert(sqlerr); return false; 
    }
 }
  
 return true;

}


function tableToCsv(tableid) {

 var i=0, i2=0, txt='', vlu;
 var tablehead=tableid+'head';
 var table=document.getElementById(tablehead);
 if (table) {
     tablerows = table.getElementsByTagName("tr"); 
     for (i=0; i<tablerows.length; i++) {
         tablecols = tablerows[i].getElementsByTagName("td"); 
         for (i2=0; i2<tablecols.length; i2++) {
              if (tablecols[i2].currentStyle.width != 'auto') {
                 vlu=tablecols[i2].innerText;
                 if (vlu.search(",")==-1) { 
                     if (i2 == 0) {txt += vlu}
                     else {txt += ','+vlu};
                 }
                 else {
                       if (i2 == 0) {txt += '"'+vlu+'"'}
                       else {txt += ',"'+vlu+'"'};
                 }  
                 //if (i2 == 0) {txt += '"'+vlu+'"'}
                 //else {txt += ',"'+vlu+'"'};
              }
         }
         txt += "\n";
     }
 }
 table=document.getElementById(tableid);
 tablerows = table.getElementsByTagName("tr"); 
 for (i=0; i<tablerows.length; i++) {
     tablecols = tablerows[i].getElementsByTagName("td"); 
     for (i2=0; i2<tablecols.length; i2++) {
         if (tablecols[i2].currentStyle.width != 'auto') {
             vlu=tablecols[i2].innerText;
             if (vlu.search(",")==-1) { 
                  if (i2 == 0) {txt += vlu}
                  else {txt += ','+vlu};
             }
             else {
                   if (i2 == 0) {txt += '"'+vlu+'"'}
                   else {txt += ',"'+vlu+'"'};
             }  
             //if (i2 == 0) {txt += '"'+vlu+'"'}
             //else {txt += ',"'+vlu+'"'};
         }
     }
     txt += "\n";
 }
 
 return txt;  
}


//---- PC File Functions

function sendToPcFile(pcfile,txt,openfile) {
  try {var f=fso}
  catch(e) {fso = new ActiveXObject("Scripting.FileSystemObject");}
  if (fso.FileExists(pcfile)) {
     if (!window.confirm('File '+pcfile+' already exists\n\n Do you wish to replace it?')) {
        return false;
     }
  }
  try {
      var s=fso.CreateTextFile(pcfile, true);
      s.WriteLine(txt);
      s.Close();

      if (openfile) {
          var WshShell = new ActiveXObject("WScript.Shell"); 
          try{
             eval('WshShell.Run("'+pcfile+'",3,true)');
          }
          catch(e) {
            if (e.message.sst(1,6)=='Unable') {
                alert(e.message+'\n\nmanually open file '+pcfile);
                return true;  
            } 
            alert(e.message);
            return false;
         }
      }
  }
  catch(e) {
            if (e.message.sst(1,10)=='Permission') {
                alert(e.message+'\n\nUnable to write to file '+pcfile+'..File may be already opened and locked');
                return false;  
            } 
            alert(e.message);
            return false;
  }
  return true
}


function listPcFiles(parentfolderpath) {
  var filearray=new Array();
  try {var f=fso}
  catch(e) {fso = new ActiveXObject("Scripting.FileSystemObject");}
  try {
     var parentFolder = fso.GetFolder(parentfolderpath);
     var enumFiles = new Enumerator(parentFolder.files);
  } 
  catch(e) {
     alert(e.message);
     return false;
  }
  for (; !enumFiles.atEnd(); enumFiles.moveNext()) {
       filearray.push(enumFiles.item());
  } 
  return filearray;
}


function getPcFileData(pcfile) {
  try {var f=fso}
  catch(e) {fso = new ActiveXObject("Scripting.FileSystemObject");}
  var ForReading = 1;
  try {
       var f = fso.OpenTextFile(pcfile, ForReading);
       var alldata=f.ReadAll()
       f.Close();
  }
  catch(e) {
     if (e.message.sst(1,10)=='Permission') {
         alert(e.message+'\n\nUnable to open file '+pcfile+'..File may already be opened');
         return false;  
     } 
     alert(e.message);
     try {f.close} catch(e) {}
     return false;
  }  
  return alldata;
}


function pcFileExists(pcfile) {
  try {var f=fso}
  catch(e) {fso = new ActiveXObject("Scripting.FileSystemObject");}
  try {
       if (fso.FileExists(pcfile)) {
           return true;
       }
  }
  catch(e) {alert(e.message)}
  return false;
}


function deletePcFile(pcfile) {
  if (!pcFileExists(pcfile)) {return true}
  try {var f=fso}
  catch(e) {fso = new ActiveXObject("Scripting.FileSystemObject");}
  try {
    fso.DeleteFile(pcfile);
  }
  catch(e) {
    if (e.message.sst(1,10)=='Permission') {
         alert(e.message+'\n\nUnable to delete file '+pcfile);
         return false;  
    } 
    alert(e.message);
    return false;
  }
  return true;
}
//---- End PC File Functions


//---- File Locking/Unlocking Simulation 

function addDbLock(dbtable,id) {
  var updobj=new Object;
      updobj.lcktable=dbtable;
      updobj.lckuser=username;
      updobj.lckdate=sqlNum(todayDate());
      updobj.lcktime=sqlNum(todayTime('hm'));
      updobj.lckid=id;
      //updobj.lckapp=document.title; 
      updobj.lckapp=applicationname;
      updobj.lcksession=sqlNum(sessionid);
      if (!sqlInsert('systablock',updobj)) {return false}
      return true;  
}


function releaseDbLock(dbtable) {
  var i=0;
  var qrywhere='';
  //List of IDs specified
  for (i=1; i<arguments.length; i++) {
       qrywhere += 'lckid='+arguments[i].sqlWrap();
       if ((i+1) < arguments.length) {
           qrywhere += ' or '; 
       }  
  }
  if (qrywhere=='') {return true}
  sqlwhere=' and lcksession='+sessionid;
  if (!sqlDelete('systablock',qrywhere)) {return false}
  return true;
}

function releaseAppDbLock(app) {
  if (!app) {var app=applicationname}
  var i=0;
  var qrywhere='lcksession= '+sessionid+' and lckapp= '+app.sqlWrap();
  if (!sqlDelete('systablock',qrywhere)) {return false}
  return true;
}

function releaseUserDbLock(luser) {
  var qrywhere='lckuser='+username.sqlWrap()+' and lcksession ='+sessionid;
  if (!sqlDelete('systablock',qrywhere)) {return false}
  return true;
}

function checkDbLock(dbtable,id) {
  lockuser='';
  lockapp='';
  locksession=0;
  var sqltxt='';
  //If an ID was supplied check for it specifically otherwise check for a lock on the file
  if (id) {
      sqltxt='select lckuser,lcksession,lckapp from systablock where lcktable='+dbtable.sqlWrap()+' and lckid='+id.sqlWrap()+' and (lckuser <> '+username.sqlWrap()+' or lcksession <> '+sessionid+')';
  }
  else {
      sqltxt='select lckuser,lcksession,lckapp from systablock where lcktable='+dbtable.sqlWrap()+' and (lckuser <> '+username.sqlWrap()+' or lcksession <> '+sessionid+')';
  } 

  if (!sqlSelect(sqltxt,'$tablck',1)) { return false}

  if (sqlrcdcnt>0) {
      lockuser=$tablck.lckuser[0];
      lockapp=$tablck.lckapp[0];
      locksession=numeric($tablck.lcksession);
      delete $tablck;
      return true
  }
  return false; 
}

//--- End File Locking Simulation
