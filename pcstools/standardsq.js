curlookdef='';
imphtmlonb4replace='';
imphtmlonreplace=''; 
imphtmlonb4remove='';
imphtmlonremove='';
htmlimportdone=false;
sqlrcdcnt=0;
$$sqlcol=new Array();
sqlerr='';
if (runenvironment=='intranet') {sqlselecttype=''}
else {sqlselecttype='php'}
submitsqlodbc='';
logconn='';
$$sqlphppath='';
submitsqlpath="phpsql.php";
submitlogsqlpath=submitsqlpath;
currentsqltabdef=''; 
currentsqlrow=0;
currentsqlfld='';
currentsqlobj=''; 
sqlcommand=''
sqltranobj=[];
rollbackonerror=false;
defaultconn=''; 
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
sqlselectbatch=0;

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
		    if (obj[j].dummy != undefined) {continue} 
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

function sqlSelect(sqlstring,use,rcd,useconn,sqlphppgm) {
  sqlerr='';
  if (!sqlphppgm) {$$sqlphppath=submitsqlpath}
  else {$$sqlphppath=sqlphppgm}
  var usedialog=true;
  var sqlbatch=numeric(sqlselectbatch);
  if (sqlbatch>0) {
       sqlselectbatch=0
  }
  var rpl="";
  if (dbasetype=='sqlserver') {
     rpl="GETDATE() as vv0_";
  }
  else { 
     rpl="now() as vv0_";
  }
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

  sqlstring=sqlstring.triml();
  var first6=sqlstring.substr(0,6).toLowerCase();
  if (first6 != 'select') {
      sqlcommand=sqlstring;
      sqlerr='Command to execute is not an SQL SELECT statement';
	  checkMonitor()
      return false;
  } 
 
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
  if (useconn) connect=useconn;
  else {
     if (defaultconn) {var connect=defaultconn}
     else {var connect=conn}
  }	 
  if (!connect) {sqlerr='No connection to DataBase'; checkMonitor(); return false}
  var dbconn=connect;
  var singleconnect=false;
  
  if (typeof connect.connect != 'unknown' && typeof connect.connect != 'undefined' ) {
      try {	   
           singleconnect=true; 
           try {connect.connect.close()} catch(e){};
		   dbconn=connect.connect;
           eval('dbconn.open ("'+connect.dsn+'")');
      } catch (e) {sqlerr=e.message+'\n\n'+sqlcommand; rtn=false}
   }	 
   if (typeof connect.adoconnect != 'unknown' && typeof connect.adoconnect != 'undefined' ) {
	   dbconn=connect.adoconnect;
   }
  var rs = new ActiveXObject ("ADODB.Recordset");

  try {rs.Open (sqlstring, dbconn,0,1);}
  catch (e) {
         sqlerr=e.message+'\n\n'+sqlcommand;
		 if (singleconnect) {try {dbconn.close()} catch(e){}}
		 checkMonitor();
 		 return false;
  }

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



  if (sqlbatch==0) {sqlSelectWithNoDialog()} 
  else {sqlSelectWithDialog()}

  rs.close ();
  if (singleconnect) {try {dbconn.close()} catch(e){}}
  rs = null;
  eval(useobj+'.rcdcnt='+c);
  sqlrcdcnt=c; 
  return true;


// Internal Functions
  function checkMonitor() { 
    if (sqltranobj.length>0 && rollbackonerror) {
      for (var ii=0; ii<sqltranobj.length; i++) {
	       if (sqltranobj[ii]==connect) {
		       sqlRollBack();
			   break;
		   }
	  }
    }
  }	

  function sqlSelectWithNoDialog() {
    var fldval='';
    while (! rs.EOF)  {
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
  } 


  function sqlSelectWithDialog() {
    var dg=new dialogDef();
    dg.height=0;
    dg.width=0;
    dg.resizable="off";
    dg.dialogHide='yes';
    dg.dialogparm.rs=rs;
    dg.dialogparm.$$sqlcol=$$sqlcol;
    dg.dialogparm.rcdcnt=rcdcnt;
    dg.dialogparm.sqlbatch=sqlbatch;
    eval('dg.dialogparm.useobj='+useobj);
   
    var endoffile=false;
    c=0;
    while (!endoffile) {
           dg.dialogparm.c=c;
           rtnobj=displayDialog('../pcstools/sqlSelectDialog.htm',dg);
   
           if (!rtnobj) {alert('Error\nSQL Dialog failed');sqlerr='Query Interrupted...SQL Dialog failed'; return false;}
   
           endoffile=rtnobj.eof;
           c=rtnobj.c; 
    }
  }

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

function sqlNow() {
 if (dbasetype=='access' || dbasetype=='as400') {return ':now()'}
 else {return ':getdate()'} 
}


function dbConnection() {
  this.connect=new ActiveXObject ("ADODB.Connection"); 
  try {this.dsn='FileDSN='+getPcFilePath('startup.js').split('\\').join('/')+'/accesspromis.dsn'}
  catch(e) {this.dsn=''}
}

function ADOConnection() {
  this.adoconnect=new ActiveXObject ("ADODB.Connection"); 
  try {this.dsn='FileDSN='+getPcFilePath('startup.js').split('\\').join('/')+'/accesspromis.dsn'}
  catch(e) {this.dsn=''}
}

function sqlInsert(file,useobj,useconn,sqlphppgm) {
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
  var f='';
    
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

  c=0;
  sqlcommand = "insert into "+file+"(";
  if (sqlselecttype=='') {
     if (useconn) connect=useconn; 
	 else {
		 if (defaultconn) {var connect=defaultconn}
		 else {var connect=conn}
     }	 
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
          if (c2 != c) {sqlcommand += property+", "} else {sqlcommand += property;}
       }
  }

  sqlcommand += ") values(";
  c2=0;
  var f='';
  for (var property in useobj) {
      if (property != 'addVar' && property != 'removeVar') {
         c2=c2+1;
         eval('value = ""+useobj.'+property);
         try {
             splitvalue=value.split('$^$');
             if (splitvalue.length>1) value=splitvalue[1];
             else {
                if (splitvalue[0].sst(1,1)=='î') {
                    value=splitvalue[0].sst(2,(splitvalue[0].length-1))
                }
                else { 
                   f=getFieldAttr(property); 
                   if (f) {
                       if (f.type == 'char') {value=splitvalue[0].substr(0,f.length).sqlWrap()}
                       else {value=''+numeric(splitvalue[0]);}  
                   }
                   else {value=splitvalue[0].sqlWrap();} 
                }
             }
         } catch(e) {}
         if (c2 != c) {sqlcommand += value+", ";} else {sqlcommand +=value;}
      }
  }
  sqlcommand += ")"; 

  
  var rtn=true;
  if (sqlselecttype=='php') {
     if (!sqlphppgm) {$$sqlphppath=submitsqlpath}
     else {$$sqlphppath=sqlphppgm}
     rtn=sqlUpdatePhp(sqlcommand); 
  } 
  else { 
      var dbconn=connect;
      var singleconnect=false; 
      try {
           if (typeof connect.connect != 'unknown' && typeof connect.connect != 'undefined' ) {
               singleconnect=true;
               try {connect.connect.close()} catch(e){};
               dbconn=connect.connect;
               eval('dbconn.open ("'+connect.dsn+'")');
           }
		   if (typeof connect.adoconnect != 'unknown' && typeof connect.adoconnect != 'undefined' ) {
		       dbconn=connect.adoconnect;
		   }
           dbconn.Execute(sqlcommand);
		   if (singleconnect) {try {dbconn.close()} catch(e){}} 
      }
	  catch (e) {
     	  sqlerr=e.message+'\n\n'+sqlcommand; 
          if (singleconnect) {try {dbconn.close()} catch(e){}} 
		  rtn=false;
	  }	  
  }

  if (dologging && rtn) {
     var connect2;
     if (logconn) {connect2=logconn}
     else {connect2=connect}
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
         logobj.tgkey=timeStamp()+''+(Math.floor(Math.random() * (9999 - 1)) + 1);
         sqlInsert(logfile,logobj,connect2,submitlogsqlpath); 
      } catch(e) {};
      sqlcommand=sqlcommand2; sqlerr=''; 
  }

  if (rtn==false && sqltranobj.length>0 && rollbackonerror) {
      for (var ii=0; ii<sqltranobj.length; i++) {
	       if (sqltranobj[ii]==connect) {
		       sqlRollBack();
			   break;
		   }
	  }
  }  
  return rtn;
}


function sqlInsertUnique(tablename,obj,idfield,cond,useconn,attempts) {
  var connect='';
  var rtn=true;
  if (useconn) connect=useconn; 
  else {
	 if (defaultconn) {var connect=defaultconn}
	 else {var connect=conn}
  }	 
  var sqlwhere='';
  if (cond) {sqlwhere=' where '+cond;}
  fileuniqueid='';
  if (!attempts) {var attempts=3}

  for (var i=0; i<attempts; i++){
       var  sqltxt ="select "+idfield+" from "+tablename+sqlwhere+" order by "+idfield +' desc';
       if (!sqlSelect(sqltxt,'$g$$tn$w',1,useconn)) {
            sqlerr='Attempted to get current value for '+idfield+'\n\n'+sqlerr;
 			break;
       }
       if ($g$$tn$w.rcdcnt==0) {obj[idfield]=1}
       else {
          obj[idfield]=numeric($g$$tn$w[idfield][0])+1;
       }
       if (sqlInsert(tablename, obj,useconn)){
           fileuniqueid=obj[idfield];
           delete $g$$tn$w;
           return true;
       }
  }
  if (sqltranobj.length>0 && rollbackonerror) {
      for (var ii=0; ii<sqltranobj.length; i++) {
	       if (sqltranobj[ii]==connect) {
		       sqlRollBack();
			   break;
		   }
	  }
  }  
  return false;
}


function massSqlInsert(tablename,sqlselectobj,connect,perbatch) {
  var rtn=true;
  if (!connect) {
	  if (defaultconn) {var connect=defaultconn}
	  else {var connect=conn}
  }	 
  //Ensure that table "token" has a record
  var sqltxt='select * from token';
  if (!sqlSelect(sqltxt,'$token$',1,connect)) {alert(sqlerr); delete $token$; return false}
  delete $token$; 
  if (sqlrcdcnt==0) {
      var tkn$obj=new Object();
      tkn$obj.tokenfld='A';
      if (!sqlInsert('token',tkn$obj,connect)) {
	      alert(sqlerr); 
		  if (sqltranobj.length>0 && rollbackonerror) {
              for (var ii=0; ii<sqltranobj.length; i++) {
	               if (sqltranobj[ii]==connect) {
		               sqlRollBack();
			           break;
		           }
	          }
          }  
		  return false
	  }
  }

  var fullbatch=40;
  if (perbatch) {fullbatch=perbatch}
  var batch=0;
  var values='';
  var val;
  var outtxt;
  var col$=[];
  var col$data;
  var k=0;
  var f; 
  var fldtype=[];
  var fldlen=[];
  var i=0;
  var j=0;  

  for (var p in sqlselectobj) {
       if (p != 'rcdcnt') {
           col$.push(p);
           f=getFieldAttr(p); 
           if (f) {
                fldtype.push(f.type);
                fldlen.push(f.length); 
           }
           else {
                 fldtype.push('');
                 fldlen.push(0);
           }
       }
  }
  
  var singleconnect=false; 
  var dbconn;
  if (runenvironment=='intranet') {
      if (typeof connect.connect != 'unknown' && typeof connect.connect != 'undefined' )  {singleconnect=true;}
  }	  
  
  var u$$string1="insert into "+tablename+" ("+col$+")";
  if (dbasetype != 'access') {
       if (dbasetype=='as400') {u$$string1 += " values";} //for AS400 OR sql server above 2008
       else {u$$string1 += " select"}
  }
  else {
      u$$string1 += " select "+col$+" from (";
  }

  for (var i=0; i<sqlselectobj.rcdcnt; i++) {
       batch++;
       col$data=[]; 
       for (j=0; j<col$.length; j++) {
            val=sqlselectobj[col$[j]][i]; 
            if (val==undefined) {val=' '}
            if (fldtype[j]) {
                if (fldtype[j] == 'char') {
                    val=(''+val).substr(0,fldlen[j]).sqlWrap();
                }
                else {val=numeric(val);}
            }
            else {val=(''+val).sqlWrap();}
            col$data.push(val); 
       }
 
       if (dbasetype != 'access') {
	       if (dbasetype=='as400') {  
               if (values) {values += ", ";} //for AS400 or sql server above 2008
               values +='('+col$data+')';    //for AS400 or sql server above 2008
		   }
		   else {
               if (values) {values += " union all select";}
               values +=' '+col$data+' ';
		   }

       }
       else {
             if (batch>1) {values += " UNION ALL "}
             values += " select top 1 "; 
             for (k=0; k<col$data.length; k++) {
                  if (k!=0) {values += ", "}
                  values += col$data[k]+' as '+col$[k];
             }
             values += " from token";   
        } 
        if (batch==fullbatch) {
            batch=0;
            outtxt = u$$string1+values;
            if (dbasetype=='access')  {outtxt += ')'} 
            values='';
            sqlcommand=outtxt; 
			
            if (runenvironment=='intranet') {
                dbconn=connect;
				try { 
				     if (singleconnect) {
                         try {connect.connect.close()} catch(e){};
                         dbconn=connect.connect;
                         eval('dbconn.open ("'+connect.dsn+'")');
	                 }
					 if (typeof connect.adoconnect != 'unknown' && typeof connect.adoconnect != 'undefined' ) {
	                     dbconn=connect.adoconnect;
                     }
                     dbconn.Execute(outtxt); 
	                 if (singleconnect) {try {dbconn.close()} catch(e){}} 
	            }
 	            catch (e) {
	               sqlerr=e.message+'\n\n'+sqlcommand; 
	               if (singleconnect) {try {dbconn.close()} catch(e){}} 
                   rtn=false;
	           } 
            }
            else {
                 rtn=sqlUpdatePhp(outtxt);                
            } 

            if (!rtn) {
				if (sqltranobj.length>0 && rollbackonerror) {
                    for (var ii=0; ii<sqltranobj.length; i++) {
	                     if (sqltranobj[ii]==connect) {
		                     sqlRollBack();
			                 break;
		                 }
	                }
                }  
			    return false
			}
        }
  }

  if (batch != 0) {
      outtxt = u$$string1+values; 
      if (dbasetype=='access')  {outtxt += ')'}
      sqlcommand=outtxt; 
      if (runenvironment=='intranet') {
		  rtn=true;
	      dbconn=connect;
          try {
               if (singleconnect) {
                   try {connect.connect.close()} catch(e){};
                   dbconn=connect.connect;
                   eval('dbconn.open ("'+connect.dsn+'")'); 
		       }
			   if (typeof connect.adoconnect != 'unknown' && typeof connect.adoconnect != 'undefined' ) {
	               dbconn=connect.adoconnect;
               }
               dbconn.Execute(outtxt);  
		       if (singleconnect) {try {dbconn.close()} catch(e){}} 
	      }
 	      catch (e) {
	         sqlerr=e.message+'\n\n'+sqlcommand; 
	         if (singleconnect) {try {dbconn.close()} catch(e){}} 
             rtn=false;
	      } 
      }
      else {
          rtn=sqlUpdatePhp(outtxt);
       } 
	   
	   if (!rtn) {
		   if (sqltranobj.length>0 && rollbackonerror) {
			   for (var ii=0; ii<sqltranobj.length; i++) {
				    if (sqltranobj[ii]==connect) {
					    sqlRollBack();
					    break;
				    }
			  }
		   }  
		   return false
		}
  }  

  return true;
}



function sqlUpdate(file,useobj,cond,useconn,sqlphppgm) {
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
  
  if (typeof dataDic.table[file] != 'undefined') {
	  var beforeupdate=dataDic.table[file].beforeupdate;
	  if (beforeupdate != undefined) {
		  var sqlcommand2=sqlcommand;
		  try {eval('var t$g$_rtn='+beforeupdate+'(file,useobj,cond,useconn,sqlphppgm)')}
		  catch(e) {
			   sqlerr=e.message;
			   var t$g$_rtn=false;
		  }	 	 
		  sqlcommand=sqlcommand2;
		  if (!t$g$_rtn) {
			  sqlerr='Error executing trigger function -'+beforeupdate+'\n\n'+sqlerr;
			  return false;
		  }
	  } 
  }
  
  sqlcommand = "update "+file+" SET ";
 
  if ((cond) && (cond !='*')) where=cond;

  if (sqlselecttype != 'php') {
    if (useconn) connect=useconn; 
	else {
		 if (defaultconn) {var connect=defaultconn}
		 else {var connect=conn}
    }	 
    if (!connect) {sqlerr='No connection to DataBase'; return false}
  }
  for (var property in useobj) {
       if (property != 'addVar' && property != 'removeVar') {
          c=c+1;
       }
  }

  var f='';
  for (var property in useobj) {
      if (property != 'addVar' && property != 'removeVar') {
          c2=c2+1; 
          fldar[c2-1]=property;
          eval('value = ""+useobj.'+property);
          var splitvalue=value.split('$^$');
          if (splitvalue.length>1) {value=splitvalue[1];}
          else {
             if (splitvalue[0].sst(1,1)=='î') {
                 value=splitvalue[0].sst(2,(splitvalue[0].length-1))
             }
             else {
                 f=getFieldAttr(property);
                 if (f) {
                     if (f.type == 'char') {value=splitvalue[0].substr(0,f.length).sqlWrap()}
                     else {value=''+numeric(splitvalue[0]);}  
                 }
                 else {value=splitvalue[0].sqlWrap();} 
             }
         }
         if (c2 != c) {sqlcommand += property+"="+value+", "}
         else {sqlcommand += property+"="+value};
      }
  }

  if (where != '') {sqlcommand += " "+"where "+where};

  if (dologging) {
    var connect2;
    if (logconn) {connect2=logconn}
    else {connect2=connect}
    var sqlcommand2=sqlcommand; 
    try {
        var sqltxt='select * ';
        if (where) {sqltxt += " from "+file+" where "+where}
        else {sqltxt += " from "+file} 
        if (sqlSelect(sqltxt,'$log',99999999,connect) && sqlrcdcnt>0) {
           logrcdcnt=sqlrcdcnt; 
        } 
    } catch(e) {}; 

    sqlcommand=sqlcommand2;
  }     
 
 
  if (sqlselecttype=='php') {
     if (!sqlphppgm) {$$sqlphppath=submitsqlpath}
     else {$$sqlphppath=sqlphppgm}
     rtn=sqlUpdatePhp(sqlcommand); 
  } 
  else { 
       rtn=true;
	   var dbconn=connect;
       var singleconnect=false; 
       try {
           if (typeof connect.connect != 'unknown' && typeof connect.connect != 'undefined' ) {
               singleconnect=true;
               try {connect.connect.close()} catch(e){};
               dbconn=connect.connect;
               eval('dbconn.open ("'+connect.dsn+'")');
		   }
           if (typeof connect.adoconnect != 'unknown' && typeof connect.adoconnect != 'undefined' ) {
	           dbconn=connect.adoconnect;
           }		   
           dbconn.Execute(sqlcommand);
		   if (singleconnect) {try {dbconn.close()} catch(e){}} 
	   }
 	   catch (e) {
	       sqlerr=e.message+'\n\n'+sqlcommand; 
	       if (singleconnect) {try {dbconn.close()} catch(e){}} 
           rtn=false
	  } 
  }
  

  if (logrcdcnt >0 && rtn) {
     var tdat=sqlNum(todayDate());
     var ttim=sqlNum(todayTime('hm')); 
     var logobj=new Object; 
     var logobj2=new Object;
     for (var i=0; i<logrcdcnt; i++) {
          for (var p in $log) {
		      if (p=='rcdcnt') {continue}
              value=$log[p][i];
              logobj[p]=value; 
              if (useobj[p] != undefined) {
                 logobj2[p]=useobj[p];
              }
              else {
                 logobj2[p]=value; 
              }
		  }	   
          logobj.tgattime='B'; logobj.tgevent='U'; 
          logobj.tgusr=username;
          logobj.tgdate=tdat;
          logobj.tgtime=ttim;
          var rkey=timeStamp()+''+(Math.floor(Math.random() * (9999 - 1)) + 1);
          logobj.tgkey=rkey;
          if (sqlInsert(logfile,logobj,connect2,submitlogsqlpath)) {
              logobj2.tgattime='A'; logobj2.tgevent='U'; 
              logobj2.tgusr=username;
              logobj2.tgdate=tdat;
              logobj2.tgtime=ttim;
              logobj2.tgkey=rkey;
              sqlInsert(logfile,logobj2,connect2,submitlogsqlpath); 
          } 
     }		  
    delete $log;
    sqlcommand=sqlcommand2
    sqlerr=''; 
 }
 
 
 if (rtn) {
     if (typeof dataDic.table[file] != 'undefined') {
		 var afterupdate=dataDic.table[file].afterupdate;
		 if (afterupdate != undefined) {
			 var sqlcommand2=sqlcommand;
			 try {eval('var t$g$_rtn='+afterupdate+'(file,useobj,cond,useconn,sqlphppgm)')}
			 catch(e) {
				 sqlerr=e.message;
				 var t$g$_rtn=false;
			 } 	 
			 sqlcommand=sqlcommand2;
			 if (!t$g$_rtn) {
				 sqlerr='Error executing trigger function -'+afterupdate+'\n\n'+sqlerr;
				 return false;
			 }
		 }
	 }
  } 
  
  if (rtn==false && sqltranobj.length>0 && rollbackonerror) {
      for (var ii=0; ii<sqltranobj.length; i++) {
	       if (sqltranobj[ii]==connect) {
		       sqlRollBack();
			   break;
		   }
	  }
  }  
  return rtn;
}


function sqlDelete(file,cond,useconn,sqlphppgm) {
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
     if (useconn) connect=useconn; 
	 else {
		 if (defaultconn) {var connect=defaultconn}
		 else {var connect=conn}
     }	 
     if (!connect) {sqlerr='No connection to DataBase'; return false}
  }
  if (where != '') {sqlcommand += " "+"where "+where}; 

  if (dologging) {
     var connect2;
     if (logconn) {connect2=logconn}
     else {connect2=connect}
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
     if (!sqlphppgm) {$$sqlphppath=submitsqlpath}
     else {$$sqlphppath=sqlphppgm}
     rtn=sqlUpdatePhp(sqlcommand); 
  }  
  if (sqlselecttype=='') {  
      var dbconn=connect;
      var singleconnect=false; 
      try {
           if (typeof connect.connect != 'unknown' && typeof connect.connect != 'undefined' ) {
               singleconnect=true;
               try {connect.connect.close()} catch(e){};
               dbconn=connect.connect;
               eval('dbconn.open ("'+connect.dsn+'")');
           }
		   if (typeof connect.adoconnect != 'unknown' && typeof connect.adoconnect != 'undefined' ) {
	           dbconn=connect.adoconnect;
           }
           dbconn.Execute(sqlcommand);
		   if (singleconnect) {try {dbconn.close()} catch(e){}} 
      }
	  catch (e) {
     	  sqlerr=e.message+'\n\n'+sqlcommand; 
          if (singleconnect) {try {dbconn.close()} catch(e){}} 
		  rtn=false;
	  }	  
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
             logobj.tgkey=timeStamp()+''+(Math.floor(Math.random() * (9999 - 1)) + 1);
             sqlInsert(logfile,logobj,connect2,submitlogsqlpath); 
         }
         delete $log;
      } catch(e) {};
      sqlcommand=sqlcommand2;
      sqlerr=''; 
  }

  if (rtn==false && sqltranobj.length>0 && rollbackonerror) {
      for (var ii=0; ii<sqltranobj.length; i++) {
	       if (sqltranobj[ii]==connect) {
		       sqlRollBack();
			   break;
		   }
	  }
  }  
  return rtn;
}

function runSqlCommand(cmd,useconn,sqlphppgm) {

 sqlcommand=cmd;
 
 if (sqlselecttype=='php') {
     if (!sqlphppgm) {$$sqlphppath=submitsqlpath}
     else {$$sqlphppath=sqlphppgm}
     try {submitSql(' ',sqlcommand);} catch(e) {}
     var section=ajaxresponse.split('ERR~^~');
     if (section.length>1) {
         sqlerr=section[1];
         return false;
     }
     return true;
 }
 else {
       var connect='';
	   if (useconn) connect=useconn; 
	   else {
		  if (defaultconn) {var connect=defaultconn}
		  else {var connect=conn}
       }	 
       if (!connect) {sqlerr='No connection to DataBase'; return false}
	 
       var rtn=true;
	   var dbconn=connect;
       var singleconnect=false; 
       try {
           if (typeof connect.connect != 'unknown' && typeof connect.connect != 'undefined' ) {
               singleconnect=true;
               try {connect.connect.close()} catch(e){};
               dbconn=connect.connect;
               eval('dbconn.open ("'+connect.dsn+'")');
		   }
           if (typeof connect.adoconnect != 'unknown' && typeof connect.adoconnect != 'undefined' ) {
	           dbconn=connect.adoconnect;
           }		   
           dbconn.Execute(sqlcommand);
		   if (singleconnect) {try {dbconn.close()} catch(e){}} 
	   }
 	   catch (e) {
	       sqlerr=e.message+'\n\n'+sqlcommand; 
	       if (singleconnect) {try {dbconn.close()} catch(e){}} 
           rtn=false
	  }
      if (rtn==false) {
	      checkMonitor();
      }	  
	  return rtn;
 }
 
 function checkMonitor() {
   if (sqltranobj.length>0 && rollbackonerror) {
      for (var ii=0; ii<sqltranobj.length; i++) {
	       if (sqltranobj[ii]==connect) {
		       sqlRollBack();
			   break;
		   }
	  }
   }  
 } 
 
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
  this.tablewidth='';
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
  this.sqlselectbatch=0; 
  if (this.tabletype=='*LOOKUP' || this.tabletype=='LOOKUP') {
     this.tabletype='LOOKUP';
     this.dbref=false;
     this.alwaysrefresh=false;
     this.lookupfldlen=-1;
     this.lookupfld='';
	 this.matchingoptions=true;
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
  if (sqlselectbatch==0) {
      sqlselectbatch=$c.sqlselectbatch; 
  }
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
  var widthtxt='';
  if ($c.tablewidth) {widthtxt='style="overflow:hidden; width:'+$c.tablewidth+'px"'}
  var txt='<SPAN id="'+tableid+'tableheadwrap"  class=tableHeadwrap '+widthtxt+'><TABLE ID="'+tableid+'head" class="'+$c.headerclass+'"';
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
                $c.width[i]=f.length*8.1;
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
      if (!$c.matchonid) {if (!$c.id[i]) $c.id[i]=tableid+'col'+i}
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

  if ($c.resizeablecolumns) {txt += '<col width=17> <tr BGCOLOR=#336699>'}
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
  widthtxt='';
  if ($c.tablewidth) {widthtxt='overflow-x:scroll; overflow-y:auto; width:'+$c.tablewidth+'px'}
  txt += '<td class=emptycol></td></tr></table></span>'
  txt += '<table cellpadding=0 cellspacing=0 border=0><tr><td><div id='+tableid+'$wrap class="'+$c.wrapperclass+'" style="height:'+height+'px;'+widthtxt+'" onscroll='+tableid+'tableheadwrap.scrollLeft=this.scrollLeft>';
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
  sqlerr='';
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


function addSqlSelectRow(obj,at) {
 var i= obj.rcdcnt;
 var positionsent=false; 
 if (at != undefined) {
     at=numeric(at);
     positionsent=true;
 }
 for (var property in obj) {
     if (property != 'rcdcnt') {
         if (!positionsent) {obj[property][i]="";}
         else {
            obj[property].splice(at,0,"");
         }
     }
 } 
  obj.rcdcnt ++;
  if (!positionsent) {return(i);}
  else {return at}
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

  var fcount=from.rcdcnt;
  var fstart=0;

  if (fromnbr) {
      fstart=numeric(fromnbr);
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
           vlu=''+sqlrsltobj[clmn[c]][i];
		   vlu=vlu.split('\n').join(' '); 
		   vlu=vlu.split('\r').join(' ');
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


function keySqlSelectResult(obj,keyarray,returntype) {
 //returntype=unique or *unique - the default
 //           first  or *first
 //           last   or *last
 //           all    or *all   

 if (!returntype) {var returntype='unique'}
 else {
    returntype=returntype.split('*').join('').toLowerCase();
 }  

 if  (typeof obj.rcdcnt=='undefined') {
      alert('SQL-Select object not found');
      throw 'nothing';
 }

 if (arguments.length==1 ) {
     alert('No key items sent');
     throw 'nothing';
 }

 var i=0;
 var k=0;
 var z=0;
 var key='';
 var indxdata=new Object();
 var estring='key='; 
 var allowall=false;

 if (returntype=='all') {
     allowall=true;
     indxdata.$keycount=new Object();
 }

 for (i=0; i<keyarray.length; i++) {
      estring += 'obj.'+keyarray[i]+'[i]';
      if ((i+1)<keyarray.length) {
           estring += '+"|"+';
      }
 } 

 for (i=0; i<obj.rcdcnt; i++) {

      eval(estring);

      if (allowall) {
          if (!indxdata[key]) {
               indxdata[key]=new Object();
               for (k in obj) {
                    if (k != 'rcdcnt') {
                        indxdata[key][k]=obj[k][i];
                    }
               }
         }
         else {
               if (indxdata.$keycount[key]==undefined) {
                   indxdata.$keycount[key]=1; 
               }   
               indxdata.$keycount[key] ++;
               ptr=indxdata.$keycount[key]-1;
               ptr=key+'_key'+ptr; 
               indxdata[ptr]=new Object();
                for (k in obj) {
                    if (k != 'rcdcnt') {
                        indxdata[ptr][k]=obj[k][i];
                    }
               }
         }
         continue;
      }

      if (!indxdata[key]) {
           indxdata[key]=new Object();
           for (k in obj) {
                if (k != 'rcdcnt') {
                    indxdata[key][k]=obj[k][i];
                }
           }
      }
      else {
           if (returntype=='unique') {
               alert('Duplicate key - '+key); 
               throw 'nothing';
           }
           if (returntype=='last') {
               for (k in obj) {
                    if (k != 'rcdcnt') {
                        indxdata[key][k]=obj[k][i];
                    }
               }
           }
      }

 }

 return indxdata;

}

function getKSSRkey(obj) {

  var pr='';
  var mult=false;
  var fullkey='';
  var key='';
  var n=0;
  var rtnobj=new sqlSelectResult('key','count');  
  if (obj.$keycount) {mult=true}
  if (!mult) {
      for (pr in obj) {
	       n=addSqlSelectRow(rtnobj);
           rtnobj.key[n]=pr;
	       rtnobj.count[n]=1;
      }
  }
  else {
      for (pr in obj) {
 		   if (pr != '$keycount') { 
			   fullkey=pr.split('_key');
			   key=fullkey[0];
	           if (fullkey.length==1) {
				   n=addSqlSelectRow(rtnobj); 
	               rtnobj.key[n]=key;
				   if (obj.$keycount[pr]) {rtnobj.count[n]=obj.$keycount[pr]}
           		   else {rtnobj.count[n]=1}
               }
	       }
       }		   
  }
  
  return rtnobj;
}

function getKSSRdata(obj,key) {
  var rtnobj={};
  rtnobj.rcdcnt=0;
  var p;
  var p2;
  mult=false;
 
  for (p in obj) {
       if (p != '$keycount') {
	       for (p2 in obj[p]) {rtnobj[p2]=[]}
	 	  break;
	   }
  }

  if (!obj[key]) {return rtnobj}
  var datafound=true;
  var x=-1;
  var ky='';
  while (datafound) {
       x++
       if (x==0) {ky=key}
	   else {ky=key+'_key'+x}
	   if (!obj[ky]) {return rtnobj}
	   for (p2 in obj[ky]) {rtnobj[p2][rtnobj.rcdcnt]=obj[ky][p2]}
       rtnobj.rcdcnt ++;  
  }
}  


function unkeySqlSelectResult(obj) {

  var sqlrslt={};
  var j=0;
  var jj=0;
  var pr='';
  var pr2='';
  sqlrslt.rcdcnt=0;
  for (pr in obj) {
       if (pr=='$keycount') {continue}
       for (pr2 in obj[pr]) {
	        sqlrslt[pr2]=[];
	   }
	   break;
  }

  var keyflds=''; 
  for (pr in obj) {
       if (pr=='$keycount') {continue}
       j=addSqlSelectRow(sqlrslt);
   	   for (pr2 in obj[pr]) {
	        sqlrslt[pr2][j]=obj[pr][pr2];
	   }
  }
  
  return sqlrslt;  
}


function wrapSqlResultCol(srobj) {

//First parameter is the sqlSelectObject
//The other parameters are of the form AA:nn:BB (minimum AA:nn) where:
//    AA is the field to wrap
//    nn is the wrap length. If nn is null then the field will not split
//    BB if supplied, is the field to always hold the initial value of AA (for the current input row) as the wrapping would cause 
//       AA to generate more that one output row. If field BB is not in the original sql object it will be added to the output sql object
//       NOTE!! a field whose value is to be saved (in another field or with it's original length by sending null as the length) 
//       for the multiple output rows generated, must be include as a field to split 
//
// example: wrapSqlResultCol($s,'descr:20','marks:25','csnign:','bilref:15:bilref2')
          
  var obj=arguments[0];
  var i=0;
  var pair;
  var split=new Object();
  var p='';
  var txt='';
  var k=0;
  for (p in obj) {
       if (p != 'rcdcnt' && p != 'rowcount') {
           if (txt) {txt += ","} 
           txt += '"'+p+'"';
       }
  } 
  eval('var obj2=new sqlSelectResult('+txt+",'rowcount')");
  var links=false;
  var linkage=new Object();
  var maxlen=0;
  for (i=1; i<arguments.length; i++) {
       pair=arguments[i].split(':');
       split[pair[0]]=new Object();
       split[pair[0]].len=numeric(pair[1]); 
       //split[pair[0]].link='';
       if (pair.length>2) {split[pair[0]].link=pair[2]; links=true} 
  }

//Check if there are any links. If so see if this "field" exist, if not add the column to the object.
  if (links) {
      for (p in split) {
           if (split[p].link) {
               linkage[p]=new Object();
               linkage[p].link=split[p].link;
               if (!obj2[split[p].link]) {
                    addSqlSelectCol(obj2,split[p].link); 
               }
           }
      }
  }

  for (i=0; i<obj.rcdcnt; i++) {
       maxlen=1;
       for (p in split) {
             split[p].data=breakString(obj[p][i],split[p].len); 
             if (split[p].data.length>maxlen) {maxlen=split[p].data.length}
       }
       for (i2=0; i2<maxlen; i2++) {
            k=addSqlSelectRow(obj2);
			obj2.rowcount[k]=i;
            if (i2==0) {
                for (p in obj) {
                      if (p != 'rcdcnt') {
                         //if any link, save the initial value of the link-from field
                         if (linkage[p]) {
                             linkage[p].value=obj[p][i];
                         }
                         //try { 
                            if (split[p] == undefined || split[p].data.length==0) {obj2[p][k]=obj[p][i];}
                            else {obj2[p][k]=split[p].data[0]}
                         //} catch(e) {}
                      }
                }
            }
            else {
                for (p in split) {
                     if (split[p].data[i2] != undefined) {obj2[p][k]=split[p].data[i2]} 
                }
            }
            //If any link set the link-to fields as the link-from field
            for (p in linkage) {
                obj2[linkage[p].link][k]=linkage[p].value;
            }
       }
  }
  return obj2;
}



function keySqlSuggest(fld,keyobj,keyfld,vlu) {
  if (!keyfld) {var keyfld=fld}
  
  if (!vlu) {
      var vlu=valueOf(fld).trim().toLowerCase();
  }

  vlulen=vlu.length;
  var wasblank=false;
  if (isBlank(vlu)) {
      wasblank=true;
  }
  suggestdiv=document.getElementById('divSuggestDiv');
  if (!suggestdiv) {
      var divform=document.createElement('div');
      divform.id="divSuggestDiv"
      divform.style.display="none";
      divform.className="suggestlist";
      divform.style.paddingBottom='2px';
      divform.style.width=document.getElementById(fld).offsetWidth;   
      document.getElementsByTagName('body')[0].appendChild(divform);
  }

  var p;
  var txt = ""; 
  var reccnt=0;
  $new$fld$=fld;

  for (p in keyobj) {
       if (wasblank || p.toLowerCase().substr(0,vlulen)==vlu) {
           txt += "<div class=suggestitem onmouseover=colorBg(this) onmouseout=colorBg(this,'*dft') onclick=changeVar($new$fld$,this.innerText)>"+keyobj[p][keyfld]+"</div>"; 
           reccnt++;
       }
       if (reccnt==20) {break}
  }

  if (txt) {
       changeContent('divSuggestDiv',txt);      
       popUpContent('divSuggestDiv',fld); ispop=false; 
       divSuggestDiv.scrollTop=1;
  } 
  else {
       vlu=getLastOk(keyobj,vlu);
       if (!vlu) {
           closePopUps('divSuggestDiv');
       }
       else {
           keySqlSuggest(fld,keyobj,keyfld,vlu);
       }        
  }



 function getLastOk(keyobj,vlu) {
   var matchfound=false;
   for (var i=vlu.length-1; i>=0 && !matchfound; i--) {
        for (p in keyobj) {
             var vv=vlu.substr(0,i+1);
             if (p.toLowerCase().substr(0,i+1)==vv) {
                 matchfound=true;
                 break;
             }
        }
   }
   if (matchfound) {
       return vv;
   }
   return false; 
 }

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
  if ($t.alwaysrefresh || $t.refresh==true || refreshdone==true || newrun==true || $t.sqlselect != $t.sqlprevselect) {
 
     var prefix='';
     var suffix='';
     var lkfl=0;
     var lkupmsgspan='';

     if ($t.lookupfldlen>=0) {
	 
	    $$inp1chk1='';
	    $$inp1chk2=''; 
		if (curlookdef.flag==undefined) {
		    $$inp1chk1='checked';
		}
		else {
	        if (curlookdef.flag==1) {$$inp1chk1='checked'}
		   else {$$inp1chk2='checked'}
		}   
	 
        $t.lookupfld='$$inp1'+$t.tableid;
        prefix += '<span id='+lkuphtmlspan+'>'+$t.lookuphtml+'</span>'; 
        if ($t.lookupfldlen>0) {
		   if ($t.matchingoptions) {
		       prefix += "<i><input type=radio name=$$inp1rn"+$t.tableid+" id=$$inp1r1"+$t.tableid+" onclick='curlookdef.flag=1' "+$$inp1chk1+"><span style='color:black'onclick=$$inp1r1"+$t.tableid+".click()>Match On Start</span>&nbsp;&nbsp;&nbsp;&nbsp;<input type=radio name=$$inp1rn"+$t.tableid+" id=$$inp1r2"+$t.tableid+" onclick='curlookdef.flag=2' "+$$inp1chk2+"><span style='color:black'onclick=$$inp1r2"+$t.tableid+".click()>Match Anywhere</span></i><br><br>" 
		   }
           prefix +=$t.lookupfldtxt+'<br>';
           prefix += '<input name =' +$t.lookupfld+ ' type=text size='+$t.lookupfldlen+' value="'+valueOf($t.lookupfld)+'" onkeypress="initiateLookup()">';
        }
        prefix += '&nbsp<button onclick="exeFunction('+"'sqlLookUp()'"+')">Go</button><br><br>'; 
       // if (isBlank(valueOf($t.lookupfld)) && $t.lookupfldlen !=0) $t.sqlselect='';
        if (newrun && ($t.lookupfldlen !='' || $t.lookupfldlen == 0)) $t.sqlselect='';
     }
     if (prefix=='') {
        suffix += '<button onclick="exeFunction('+"'sqlLookUp()'"+')">Refresh</button>'
     }
     else {
        suffix += '<span id='+$t.lookupfld+'msg class=label style="width:240px; color:red"></span>';
        lkupmsgspan=$t.lookupfld+'msg'; 
     } 

     var val=valueOf($t.lookupfld).trim(); 
     if ($t.lookupfldcase=='UPPER') val=val.toUpperCase(); 
     if (!isBlank(val)) {
		if (curlookdef.flag==2) {
		    val='%'+val;
		}
		$t.sqlselect=$t.sqlselect.replace(/lookupfld/g,val);
     }
     else {
       $t.sqlselect=$t.sqlselect.replace(/lookupfld/g," ");
       $t.sqlselect=$t.sqlselect.replace(/\slike\s/g,"<>");
       $t.sqlrcdcnt=500;
     }

  var lhtml=prefix+applyTableDef($t)+suffix;
  $t.sqlselect=sqlselstmt;
  $t.refresh=false;
  changeContent(lkupdiv,lhtml);

   if ($t.lookupfldlen>=0) {
     if ($t.sqltotcnt > 0 && $t.sqltotcnt >= $t.sqlrcdcnt) {
        changeContent(lkupmsgspan,'First '+$t.sqlrcdcnt+' records displayed');
     }
     if (refreshdone) { 
	     if ($t.sqltotcnt==0) {changeContent(lkupmsgspan,'No record found');} 
     }		
   }
 
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
  this.sqlphppgm=submitsqlpath;
}


function applySelectList($l,sel,sqlresult) {

  var txtfld='';
  var obj=document.getElementById(sel);
  if (obj==null) return false;
  if ($l.sqlresult && !sqlresult) {
      sqlresult=$l.sqlresult;  
  }
  if (!sqlresult) {
      if (!(sqlSelect($l.sqlselect,'$r',$l.sqlrcdcnt,$l.sqlconnect,$l.sqlphppgm))) return false; 
  }
  else {
      $r=sqlresult; 
      var p=0;
      $$sqlcol=[];
      for (p in $r) {
           if (p != 'rcdcnt') {
               $$sqlcol.push(p);
           }
      } 
  } 

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

  if (!sqlresult) {
     if ($l.nulltext) {
         opttxt=$l.nulltext;
         if (obj.fldtype) {
             if (obj.fldtype=='numeric') {
                 opt='0';
             }
         } 
         addopt = new Option(opttxt,opt);
         obj.options[obj.length] = addopt; 
     }
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

  if (!sqlresult) {
      if ($l.defaultvalue != '~!^') {changeVar(sel,$l.defaultvalue)}
  }
  
  return true; 

}


function applyColDef(state, coldef,obj,tableid,indx,type) {

  if (state=='change') {
     var edc=''; 
     var edd=0;  
     if (coldef.edit[indx] && coldef.edit[indx] != 'none') {
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
      var i=0;
      var string=coldef.style[indx];
      var chr='';
      var prvchr='';
      var sstring='';
      for (i=0; i<string.length; i++) {
           chr=string.charAt(i);
           if (chr != '-') {
               if (prvchr=='-') {sstring += chr.toUpperCase()}
               else {sstring += chr}
           }
           prvchr=chr;
      }
      var attr=sstring.split(';');
      var pairs='';
      for (i=0; i<attr.length; i++) {
           pairs=attr[i].split(':');
           if (pairs.length==1) {
               pairs=attr[i].split('=');
           } 
           if (pairs.length>1) {
               try {obj.style[pairs[0].trim()]=pairs[1].trim();} catch(e) {}
          }
      } 
   }

} 


function getUsr(user,passwrd,useconn) {
  var str='$user'
  if (!useconn) {var useconn=conn}
  var sqlstring="select usrid, usrnmf,usrnml,usrpwd, usrlvl, usrgrpprf, usrpwexp from wmnuusr where usrid="+user.sqlWrap()+" and usrsts <> 'D'";
  if (!sqlSelect(sqlstring,str,1,useconn)) {return false}
  if (sqlrcdcnt==0) {return "usererror"}; 
  if (dataDic.field.usrpwd.length==10) {   
      if ($user.usrpwd[0].trim() != passwrd.trim()) {return "passworderror"};
  }
  else {
      if ($user.usrpwd[0].trim() != encrypt(passwrd.trim())) {return "passworderror"};
  }
  if (numeric($user.usrpwexp[0]) !=0 && (numeric($user.usrpwexp[0]) < numeric(todayDate()))) {return "expireerror"}
  username=$user.usrid[0]; 
  if (!getUsrData()) {return false} 
  return true; 
}


function logOnUsr(user,passwrd,useconn) {
  var str='$user'
  if (!useconn) {var useconn=conn}
  var sqlstring="select usrid, usrnmf,usrnml,usrpwd, usrlvl, usrgrpprf, usrpwexp from wmnuusr where usrid="+user.sqlWrap()+" and usrsts <> 'D'";
  if (!sqlSelect(sqlstring,str,1,useconn)) {return false}
  if (sqlrcdcnt==0) {return "usererror"};
  if (dataDic.field.usrpwd.length==10) {      
      if ($user.usrpwd[0].trim() != passwrd.trim()) {return "passworderror"};
  }
  else {
      if ($user.usrpwd[0].trim() != encrypt(passwrd.trim())) {return "passworderror"};
  }
  username=$user.usrid[0];
  if (numeric($user.usrpwexp[0]) !=0 && (numeric($user.usrpwexp[0]) < numeric(todayDate()))) {
      if (!window.confirm('Your password have expired\n\nSelect OK to change your password')) {return 'expireerror'}
      var pwdchg=displayDialog('mntpwd.htm');
      if (!pwdchg) {return 'expireerror'}
  }
  else {
      if (!passWordOk(passwrd)) {
          if (!window.confirm('Your password structure is inconsistent with that required\n\nSelect OK to change your password')) {return 'formaterror'}
          var pwdchg=displayDialog('mntpwd.htm');
          if (!pwdchg) {return 'formaterror'}
      }
  }
  username=$user.usrid[0]; 
  if (!getUsrData()) {return false} 
  return true; 
}

function checkPassWord(user,passwrd,usecon) {
  var str='$user'
  if (!useconn) {var useconn=conn}
  var sqlstring="select usrid, usrnmf,usrnml,usrpwd, usrlvl, usrgrpprf, usrpwexp from wmnuusr where usrid="+user.sqlWrap()+" and usrsts <> 'D'";
  if (!sqlSelect(sqlstring,str,1,useconn)) {return false}
  if (sqlrcdcnt==0) {return "usererror"};
  if (dataDic.field.usrpwd.length==10) {      
      if ($user.usrpwd[0].trim() != passwrd.trim()) {return false}
  }
  else {
      if ($user.usrpwd[0].trim() != encrypt(passwrd.trim())) {return false}
  }
  if (numeric($user.usrpwexp[0]) !=0 && (numeric($user.usrpwexp[0]) < numeric(todayDate()))) {
      alert('Password have expired');
      return false;
  }
  return true; 
}

function passWordOk(passwrd) {

//Check password against password definition
 
 sqltxt="select * from wmnupwd";
 if (!sqlSelect(sqltxt,'$ps',1)) {alert(sqlerr); return false}
 if (sqlrcdcnt==0) {
     return true; 
 }

 var pwexpdys=numeric($ps.pwexpdys[0]);
 var pwminlen=numeric($ps.pwminlen[0]); 
 var pwupper=$ps.pwupper[0];
 var pwlwer=$ps.pwlwer[0];
 var pwnbr=$ps.pwnbr[0];
 
 var strupper='ABCDEFGHIJKLMNOPQRSTUVWXYZ';
 var strlower='abcdefghijklmnopqrstuvwxyz';
 var strnbr='1234567890';

 passwrd=passwrd.trim();
 var i=0; 

 if (passwrd.length < pwminlen) {
    //alert('Password must be at least '+pwminlen+' characters long');
    return false; 
 } 

 if (pwupper=='Y') {
    var containupper=false;
    for (i=0; i<passwrd.length; i++) {
        if (strupper.indexOf(passwrd.charAt(i))>-1) {
            containupper=true;
            break;
        }
    }
    if (containupper==false) {
        //alert('password should contain at least one uppercase character');
        return false;
    }    
 }

 if (pwlwer=='Y') {
    var containlower=false;
    for (i=0; i<passwrd.length; i++) {
        if (strlower.indexOf(passwrd.charAt(i))>-1) {
            containlower=true;
            break;
        }
    }
    if (containlower==false) {
        //alert('new password should contain at least one lowercase character');
        return false;
    }    
 }

 if (pwnbr=='Y') {
    var containnumber=false;
    for (i=0; i<passwrd.length; i++) {
        if (strnbr.indexOf(passwrd.charAt(i))>-1) {
            containnumber=true;
            break;
        }
    }
    if (containnumber==false) {
        //alert('new password should contain at least one numeric character');
        return false;
    }    
 }

 return true;

}


function getUsrData(useconn) {
  var sqlstring;
  if (!useconn) {var useconn=conn}
  str='$$u';

  //Check if multiple signon allowed
  sqlstring='select concursess from syssecurity';
  if (sqlSelect(sqlstring,str,1,useconn)) {
      if (sqlrcdcnt==1) {
          if ($$u.concursess[0]=='N') {
              if (checkLock('LOGON',$user.usrid[0])) {
                  if (!window.confirm('Multiple log-on sessions for a user is not allowed\n\nUser '+$user.usrid[0]+' is already signed on with session ID - '+locksession+'\n\nDo you wish to make this the active Session?')) {
                      sqlerr='Multiple log-on sessions for a user is not allowed';
                      return false; 
                  }
                  sqlDelete('systablock',"lcktable='LOGON' and lckuser="+$user.usrid[0].sqlWrap());
                  sqlerr='Please retry logging on again';
                  return false;
              }
          }
      addLock('LOGON',$user.usrid[0]);
      }
  } 


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
 
 if (exitOnConcurrent()) {return false} 

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
         //var dobj=$oo.optpgm[0].strip(".",'/',':','?','=').trim()+"$$"; 
          var dobj='pgm'+encrypt($oo.optpgm[0]); 
          dobj=dobj.strip('-');
          try {eval('var diaobj='+dobj);}
          catch(e) {
              eval(dobj+'=new dialogDef()'); 
              eval('var diaobj='+dobj);
          }
           
          if (isBlank($oo.optmode[0]) || $oo.optmode[0]=='0') {
              var ifrmobj= new iframeDialogDef();
              if ($oo.optpgm[0].split('/').length > 1) {
                ifrmobj.passglobalparms = false;
              }       
              displayIframeDialog($oo.optpgm[0],$oo.optdsc[0],ifrmobj); 
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
  var section=ajaxresponse.split('ERR~^~');
  if (section.length>1) {
     sqlerr=section[1];
     return false;
  } 
  section=ajaxresponse.split('~^~');
  $$sqlcol=section[0].split('^^');
  var ff;
  var ffnum=new Object(); 
  for (var i=0; i<$$sqlcol.length; i++) {
      rplval=$$sqlcol[i].split('vv0_'); 
      if (rplval.length>1) {
          try {currentsqltabdef.valuefunction[i]=searchForValueFunction(rplval[1]);} catch(e) {} 
          eval(useobj+'.'+$$sqlcol[i]+"= new Array()"); 
          //eval(useobj+'.'+rplval[1]+"= new Array()"); 
          //$$sqlcol[i]=rplval[1];
          ff=getFieldAttr(rplval[1]);
          if (ff) {
              if (ff.type != 'char') {
                  ffnum[rplval[1]]=true;
              }
          }
      }
      else { 
          eval(useobj+'.'+rplval[0]+"= new Array()");
          ff=getFieldAttr(rplval[0]);
          if (ff) {
              if (ff.type != 'char') {
                  ffnum[rplval[0]]=true;
              }
          }

      }
  } 

  var rtnrows=section[1].split('~~'); 
  var rlen=rtnrows.length-1; 
  var vlu='';   
  for (var i=0; i<rlen; i++) {
      rtncolumn=rtnrows[i].split('^^'); 
      //var clen=rtncolumn.length-1;
      var clen=$$sqlcol.length;  
      for (var i2=0;i2<clen; i2++) {
          if (!ffnum[$$sqlcol[i2]]) {
              eval(useobj+"."+$$sqlcol[i2]+"[i]=rtncolumn[i2].trim()"); 
          }
          else {
              vlu=parseFloat(rtncolumn[i2]); 
              if (isNaN(vlu)) {vlu=0} 
              eval(useobj+"."+$$sqlcol[i2]+"[i]=vlu"); 
          }
      }
  } 
  eval(useobj+'.rcdcnt='+rlen); 
  sqlrcdcnt=rlen;
  return true;  
}


function sqlUpdatePhp(sqlcommand) {
  submitSql('update',sqlcommand); 
  //useobj=new Object(); 
  var section=ajaxresponse.split('ERR~^~');
  if (section.length>1) {
     sqlerr=section[1];
     return false;
  } 

  return true;  
}

function submitSql(sqltype, sqlstring, rcdcnt){
  sqlstring=encodeURIComponent(sqlstring);
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

ajaxCall($$sqlphppath,urlp); 

}


 
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
 this.beforeupdate=''; // Function to execute before table update
 this.afterupdate='';  // Function to execute after table update
}

function applyDbTableDef(dbtable) {
 eval("dataDic.table."+dbtable.name+"=new Object");
 eval("var obj=dataDic.table."+dbtable.name);
 obj.desc=dbtable.desc;
 obj.field=dbtable.field;
 obj.keyfield=dbtable.keyfield;
 obj.view=dbtable.view;
 obj.index=dbtable.index;
 if (dbtable.hidden) {obj.hidden=true}
 if (dbtable.beforeupdate != '') {obj.beforeupdate=dbtable.beforeupdate}
 if (dbtable.afterupdate != '') {obj.afterupdate=dbtable.afterupdate}
} 

function getFieldAttr(field) {
 var obj=false;
 try {
    eval("obj=clone(dataDic.field."+field.toLowerCase()+')');
	if (dbasetype=='access') {
		if (obj.length>255) {
		    obj.truelength=obj.length;
			obj.length=255;
		}
    }
 }  
 catch(e) {} 
 return obj;
}

function getDbTableAttr(table){
 var obj=false;
 //try {eval("obj=clone(dataDic.table."+table.toLowerCase()+")");} 
 try {obj=clone(dataDic.table[table.toLowerCase()]);}  
 catch(e) {} 
 return obj;
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
  try {var f=s_fso}
  catch(e) {s_fso = new ActiveXObject("Scripting.FileSystemObject");}
  if (s_fso.FileExists(pcfile)) {
     if (!window.confirm('File '+pcfile+' already exists\n\n Do you wish to replace it?')) {
        return false;
     }
  }
  try {
      var s=s_fso.CreateTextFile(pcfile, true);
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
  try {var f=s_fso}
  catch(e) {s_fso = new ActiveXObject("Scripting.FileSystemObject");}
  try {
     var parentFolder = s_fso.GetFolder(parentfolderpath);
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
  try {var f=s_fso}
  catch(e) {s_fso = new ActiveXObject("Scripting.FileSystemObject");}
  var ForReading = 1;
  try {
       var f = s_fso.OpenTextFile(pcfile, ForReading);
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
  try {var f=s_fso}
  catch(e) {s_fso = new ActiveXObject("Scripting.FileSystemObject");}
  try {
       if (s_fso.FileExists(pcfile)) {
           return true;
       }
  }
  catch(e) {alert(e.message)}
  return false;
}


function deletePcFile(pcfile) {
  if (!pcFileExists(pcfile)) {return true}
  try {var f=s_fso}
  catch(e) {s_fso = new ActiveXObject("Scripting.FileSystemObject");}
  try {
    s_fso.DeleteFile(pcfile);
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


function getPcFilePath(pcfile) {
  pcfile=pcfile.trim();
  try {var f=s_fso}
  catch(e) {s_fso = new ActiveXObject("Scripting.FileSystemObject");}
  try {var afile = ''+s_fso.GetFile(pcfile);} 
  catch(e) {alert('Error obtaining file path\n\n'+e.message); return false}      
  return   afile.substring(0,afile.indexOf(pcfile)); 
}

function pcPathExists(parentfolderpath) {
  try {var f=s_fso}
  catch(e) {s_fso = new ActiveXObject("Scripting.FileSystemObject");}
  try {
     var parentFolder = s_fso.GetFolder(parentfolderpath);
  } 
  catch(e) {
     return false;
  }
  return true;
}

//---- End PC File Functions



//---- Locking/Unlocking Simulation 

function addLock(entity,id) {
  entity=''+entity;
  id=''+id;
  var updobj=new Object;
      updobj.lcktable=entity;
      updobj.lckuser=username;
      updobj.lckdate=sqlNum(todayDate());
      updobj.lcktime=sqlNum(todayTime('hm'));
      updobj.lckid=id;
      //updobj.lckapp=document.title; 
      updobj.lckapp=applicationname;
      updobj.lcksession=sqlNum(sessionid);
      if (!sqlInsert('systablock',updobj)) {return false}

      // Indicate that locking was done by storing the application name in the com element
      try { 
        document.getElementById('$com$element').app=applicationname; 
      } catch(e) {}

      return true;  
}


function releaseLock(entity) {
  entity=''+entity;
  var i=0;
  var qrywhere='';
  //List of IDs specified
  for (i=1; i<arguments.length; i++) {
       qrywhere += 'lckid='+(''+arguments[i]).sqlWrap();
       if ((i+1) < arguments.length) {
           qrywhere += ' or '; 
       }  
  }
  if (qrywhere) { // If at least one id was supplied
       qrywhere = '('+qrywhere+') and lcksession='+sessionid;
  }
  else {
      qrywhere = 'lcksession='+sessionid;
  }
  qrywhere += " and lcktable="+(''+entity).sqlWrap();
  if (!sqlDelete('systablock',qrywhere)) {return false}
  return true;
}


function releaseAppLock(app) {
  if (!app) {var app=applicationname}
  var i=0;
  var qrywhere='lcksession= '+sessionid+' and lckapp= '+app.sqlWrap();
  if (!sqlDelete('systablock',qrywhere)) {return false}
  return true;
}
releaseDbAppLock=releaseAppLock;

function releaseUserLock(luser) {
  var qrywhere='lckuser='+username.sqlWrap()+' and lcksession ='+sessionid;
  if (!sqlDelete('systablock',qrywhere)) {return false}
  return true;
}
releaseUserDbLock=releaseUserLock;

function checkLock(entity,id) {
  entity=''+entity;
  id=''+id;
  lockuser='';
  lockapp='';
  locksession=0;
  var sqltxt='';
  //If an ID was supplied check for it specifically otherwise check for a lock on the file
  if (id) {
      sqltxt='select lckuser,lcksession,lckapp from systablock where lcktable='+entity.sqlWrap()+' and lckid='+id.sqlWrap()+' and (lckuser <> '+username.sqlWrap()+' or lcksession <> '+sessionid+')';
  }
  else {
      sqltxt='select lckuser,lcksession,lckapp from systablock where lcktable='+entity.sqlWrap()+' and (lckuser <> '+username.sqlWrap()+' or lcksession <> '+sessionid+')';
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

function getServer(val) { //val='date', 'time', 'fulldate'

  val=val.toLowerCase();

  if (val=='date' || val=='time' || val=='fulldate') {
      return serverDate();
  }
  else {return ''}


function serverDate() {

   var sqltxt='';
   $$sqlcolhold=clone($$sqlcol); 
   sqlrcdcnthold=sqlrcdcnt;
   
   if (dbasetype=='access' || dbasetype=='as400') {
       sqltxt='SELECT now() as dt FROM token';
   }
   else {
      if (dbasetype=='sqlserver') {
          sqltxt='SELECT getdate() as dt FROM token';
      }
      else {
          alert("Fatal Error retrieving server "+val+"!!!\n\ndbasetype not initialized\n\n --- Please contact the developers immediately ---");
          throw 'error';
      }
   }

   if (!sqlSelect(sqltxt,'$t$m',1)) {
       addDicField('tokenfld:1:Token Field');
       var $dt=new dbTableDef("token")
       $dt.desc="Token Table"
       $dt.field="tokenfld"
       applyDbTableDef($dt);
       appendExternalScript("../pcstools/standardmntdb.js");
       createDbTable('token');
       var $upd=new Object();
       $upd.tokenfld='A';
       if (!sqlInsert('token',$upd)) {
           resetSQLvars();
           alert("Fatal Error retrieving server "+val+"!!!\n\n"+sqlerr+"\n\n --- Please contact the developers immediately --- ");
           throw 'error';
        } 
        sqlSelect(sqltxt,'$t$m',1);
        if (sqlerr) {
            resetSQLvars();
            alert("Fatal Error retrieving server "+val+"!!!\n\n"+sqlerr+"\n\n --- Please contact the developers immediately ---");
            throw 'error';
        }
     }

     if (sqlrcdcnt==0) {
         var $upd=new Object();
         $upd.tokenfld='A';
         if (!sqlInsert('token',$upd)) {
             resetSQLvars();
             alert("Fatal Error retrieving server "+val+"!!!\n\n"+sqlerr+"\n\n --- Please contact the developers immediately --- ");
             throw 'error';
         } 
         sqlSelect(sqltxt,'$t$m',1)
     }

     resetSQLvars();
     var datetime=''+$t$m.dt[0]; 
     delete $t$m;

     if (val=='fulldate') {return datetime}

     var datetime=datetime.split(' ');

     if (runenvironment=='internet') {
         if (val=='date') {
             return datetime[0].split('-').join('');
         }
         else {
             datetime=datetime[1].split('.');
             datetime=datetime[0].split(':');
             return datetime[0]+datetime[1];           
         }
     }

     if (val=='date') {
         var mth='';
         switch (datetime[1]) {
           case 'Jan': mth='01'; break; 
           case 'Feb': mth='02'; break;
           case 'Mar': mth='03'; break;
           case 'Apr': mth='04'; break;
           case 'May': mth='05'; break;
           case 'Jun': mth='06'; break;
           case 'Jul': mth='07'; break;
           case 'Aug': mth='08'; break;
           case 'Sep': mth='09'; break;
           case 'Oct': mth='10'; break; 
           case 'Nov': mth='11'; break;
           case 'Dec': mth='12'; break;

         }
         if (datetime[2].length==1) {datetime[2]='0'+datetime[2]}
         return datetime[5]+mth+datetime[2];
     }

     if (val=='time') {
         datetime=datetime[3].split(':');
         return datetime[0]+datetime[1];
     }

 }
   
 function resetSQLvars() {
   $$sqlcol=clone($$sqlcolhold);
   $$sqlcolhold='';
   sqlrcdcnt=sqlrcdcnthold; 
 }

}

function removeServerDocument(document) {
  try {
       var s_fso = new ActiveXObject("Scripting.FileSystemObject");
       s_fso.DeleteFile (documentpath+document,true);
       return true;
  } catch(e) {return false}
}


function deleteProcessRefDocuments(pc,pr,connect) {
 pc=''+pc;
 pr=''+pr; 
 try {
      var where="proccode="+pc.sqlWrap()+" and procref="+pr.sqlWrap();
      var sqltxt="select docname from DocumentDetail where "+where;
      if (!sqlSelect(sqltxt,'$d$ocs','',connect)) {alert(sqlerr); return false}
      if (sqlrcdcnt==0) {return true}
      if (!sqlDelete('DocumentDetail',where)) {alert(sqlerr); return false}
      for (var i=0; i<$d$ocs.rcdcnt; i++) {
           removeServerDocument($d$ocs.docname[i]);
      }
 } catch(e) {alert(e.message); return false}
 $d$ocs='';
 return true; 
}


function sqlMonitor(conobjarr,defaultconnection,autorollback) {
  // conobjarr         - array of ADOconnection's created
  // defaultconnection - If supplied states the connection to use as a default. Usually the default used is conn. This default must be in the array of connections 
  // autorollback      - If suplied should take the boolean value true (the default) or false. If value=true, if an SQL error error an automatic rollback is done
  //                     If a non-null value other than false is supplied it will be interpreted as true
  if (runenvironment=='internet') {return true}
  if (!conobjarr) {
     conobjarr=[monconn];
	 defaultconnection=monconn;
  }
  sqlRollBack();
  sqltranobj=[];
  defaultconn='';  
  var cnec, ii; 
  rollbackonerror=true;
  var indefaultconn=defaultconnection;
  if (autorollback) {
     rollbackonerror=autorollback;
  }
  for (ii=0; ii<conobjarr.length; ii++) {
       cnec=conobjarr[ii];
       if (typeof cnec.adoconnect == 'unknown' || typeof cnec.adoconnect == 'undefined') {
	       sqlerr='ADO Database connect object not defined at element '+ii;
		   return false;
       }
       sqltranobj.push(cnec);
	   if (defaultconnection) {
	       if (defaultconnection==conobjarr[ii]) {
		       defaultconn=defaultconnection;
		   }
	   }
  }

  if (defaultconnection && defaultconn=='') {
      sqlerr='Default Connection not in the connection set sent';
      return false;	  
  }

  for (ii=0; ii<sqltranobj.length; ii++) {
       try {
		   cnec=sqltranobj[ii];
		   try {cnec.adoconnect.close()} catch(e){};
		   eval('cnec.adoconnect.open ("'+cnec.dsn+'")');
       } 
	   catch (e) {
	       sqlerr=e.message+'\n\n'+sqlcommand;
		   for (ii=0; ii<sqltranobj.length; ii++) {
 		       try {cnec.adoconnect.close()} catch(e){}
		   }
           return false;		   
	   }
  }    	   
  for (var ii=0; ii<sqltranobj.length; ii++) {
       sqltranobj[ii].adoconnect.BeginTrans;
  }
  return true;
}


function sqlRollBack() {
  if (runenvironment=='internet') {return true}
  for (var ii=0; ii<sqltranobj.length; ii++) {
       try {sqltranobj[ii].adoconnect.RollbackTrans} catch(e){};
	   try {sqltranobj[ii].adoconnect.close()} catch(e){};
  }
  sqltranobj=[];
  rollbackonerror=false;
  defaultconn='';
}

function sqlCommit() {
  if (runenvironment=='internet') {return true}
  for (var ii=0; ii<sqltranobj.length; ii++) {
       try {sqltranobj[ii].adoconnect.CommitTrans} catch(e){};
	   try {sqltranobj[ii].adoconnect.close()} catch(e){};
  }
  sqltranobj=[];
  rollbackonerror=false;
  defaultconn='';
  delay(1000);
}


// Relating to Picklist
function pickList() {
 this.title='';
 this.sqlselect='';
 this.sqlselectresult='';
 this.sqlrcdcnt='';
 this.top='center';
 this.left='';
 this.returncol=[];
 try {this.sqlconnect=conn;}
 catch(e) {this.connect=''} 
 this.sqlphppgm='';
 this.returninto='$pk'; // Returns into an sqlselect result
 this.filteron='';
 this.filtertext='';
 this.header=[];
 this.width=[];
 this.align=[];
 this.style=[];
 this.edit=[];
 this.height=200;
 this.onaccept='alert("Selection made")';
}

function displayPickList(pklstobj) {
 pl_obj=pklstobj;
 var ii, jj;
 var oprm=['header','width','align','style','edit'];
 pl_tab=new tableDef();
 pl_tab.dbref=true;
 //pl_tab.tablestyle="cursor:pointer";
 pl_tab.rowselectcolor='';
 pl_tab.tableonclick='pickListTableClicked()';
 pl_tab.colprefix='_P$l';
 pl_tab.header=["Select<br><input type=checkbox onclick='pickListHeadCheckBoxClicked()' id='pl_tabhead_chk'>"];
 pl_tab.width=[60];
 pl_tab.align=['center'];
 pl_tab.edit=[''];
 pl_tab.height=pklstobj.height;
 for (jj=0; jj<oprm.length; jj++) {
	 for (ii=0; ii<pl_obj[oprm[jj]].length; ii++) {
	      pl_tab[oprm[jj]].push(pl_obj[oprm[jj]][ii]);
	 }
 }
 if (pl_obj.sqlselect) {
     if (!sqlSelect(pl_obj.sqlselect,'$r',pl_obj.sqlrcdcnt,pl_obj.connect,pl_obj.sqlphppgm)) {
	     alert(sqlerr);
	     return false; 
	 }
 }
 else {
    $r=pl_obj.sqlselectresult;
 }

 var $pr=new sqlSelectResult('_select');
 for (var pt in $r) {
 	 $pr[pt]=$r[pt];
 }
 for (ii=0; ii<$r.rcdcnt; ii++) {
      $pr._select[ii]="<input type=checkbox onclick='pickListCheckBoxClicked()' name='pl_tab_chk' id='pl_tab_chk'>"; 
 }

  var pkls_form='pkls_form';
  var pkls_formdiv='div'+pkls_form;
  var pkls_div=pkls_formdiv+'d';
  var pkls_formobj=document.getElementById(pkls_formdiv);

  if (pkls_formobj == null) {
     var divnewform=document.createElement('div');
     divnewform.id=pkls_formdiv; 
     divnewform.className="window";
     divnewform.style.display="none"; 
	 divnewform.style.border="3px solid";
     var inner='<form name="'+pkls_form+'" onsubmit="return false">';
     inner += '<div class="titleBar">'+pl_obj.title+'</div>';
     inner += '<img SRC="../image/closewin_icon.gif"  alt="close"  class="ximage" onClick="closeForm()"></img>';
	 if (pl_obj.filteron) {
	     var filtertitle=pl_obj.filtertext;
		 if (!filtertitle) {
		     try {
			     var dsc=getFieldAttr(pl_obj.filteron).desc;
				 filtertitle='Filter on '+dsc;
			 }
			 catch(e) {
			    filtertitle='Enter data for filtering';
			 }
		 }
	     inner += '<span class=label style="width:0px;white-space:nowrap">'+filtertitle+'</span>&nbsp;<input id=pkls_searchfld size=30 onkeyUp=showHidePickListRow()>';
		 inner += '&nbsp;&nbsp;<span class=label style="width:70px">Match Anywhere</span>&nbsp;<input type=checkbox id=pkls_flchkbox onclick=showHidePickListRow() checked="selected">';
	 }
     inner += '<div id="'+pkls_div+'" style="border:2px solid gold; margin-top:10px; margin-bottom:10px"></div>';
	 inner += '<button onclick="acceptPickList()">Accept</button></form>'; 
     divnewform.innerHTML=inner; 
     document.getElementsByTagName('body')[0].appendChild(divnewform);
     //newrun=true; 
  } 

 setSqlSelectResult(pl_tab,$pr);
 changeContent(pkls_div,applyTableDef(pl_tab));

 if (pl_obj.top=='center' || pl_obj.left=='center') {
	 displayForm(pkls_form);
 }
 else {
	if (pl_obj.top) {ypos=pl_obj.top;}
	if (pl_obj.left) {xpos=pl_obj.left;}
	displayForm(pkls_form,ypos,xpos);
 }
 
}


function pickListCheckBoxClicked() {
  readClickedRow();
  if (eof) {return}
  if (isCheckedCol('pl_tab_chk')) {
      setRowBgColor(rowselectcolor);
  }
  else {
      checkVar('pl_tabhead_chk','*off');
	  setRowBgColor('*dft');
  }
}


function pickListTableClicked() {
  readClickedRow();
  if (eof) {return}
  if (event.srcElement.name=='pl_tab_chk') {return}
  if (isCheckedCol('pl_tab_chk')) {
      checkCol('pl_tab_chk','*off');
	  checkVar('pl_tabhead_chk','*off');
      setRowBgColor('*dft');
  }
  else {
	  checkCol('pl_tab_chk');
	  setRowBgColor(rowselectcolor);
  } 
}


function pickListHeadCheckBoxClicked() {
  var state='*off'
  if (isCheckedVar('pl_tabhead_chk')) {
      state='*on';
  }
  posTabCursor(pl_tab.tableid,'*top');
  readRow();
  while (!eof) {
	  if (state=='*off') {
	      if (isCheckedCol('pl_tab_chk')) {
			  checkCol('pl_tab_chk','*off');
			  setRowBgColor('*dft');
		  }
	  }
	  else {
	      if (!isCheckedCol('pl_tab_chk')) {
			  checkCol('pl_tab_chk');
			  setRowBgColor(rowselectcolor);
		  } 
	  }
	  readRow();
   }
}


function acceptPickList() {
  eval(pl_obj.returninto+"=new sqlSelectResult("+itemList(pl_tab.sqlcol)+')');
  eval("var pl_rtn="+pl_obj.returninto);
  delete pl_rtn['_select'];
  posTabCursor(pl_tab.tableid,'*top');
  readCheckedRow(pl_tab.tableid,'pl_tab_chk');
  if (eof) {
       alert('No selection made');
	   return false;
  }
  
  var _v=0;
  while (!eof) {
 		 _v=addSqlSelectRow(pl_rtn); 
		 for (ii=0; ii<pl_obj.returncol.length; ii++) {
		      try {
			     pl_rtn[pl_obj.returncol[ii]][_v]=$r[pl_obj.returncol[ii]][currentrow];
			  } catch(e) {}
		 }
         readCheckedRow(pl_tab.tableid,'pl_tab_chk');
  }
  closeForm();
  delete pl_tab;
  eval(pl_obj.onaccept);
  changeContent('divpkls_formd','');
}

function showHidePickListRow() {
  filtertype='anywhere';
  if (!isCheckedVar('pkls_flchkbox')) {filtertype='start'}
  filterTable(pl_tab.tableid,'_P$l#'+pl_obj.filteron,valueOf('pkls_searchfld'),filtertype);
}

// End Relating to Picklists