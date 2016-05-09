//--------------------  Start Debug Functions

var $quitpgmvar=false;
//var $bkptadd="$quitpgmvar=false; while ($quitpgmvar==false) try {eval('dsppgmvar('+"+'prompt("Enter Field", "")+'+"')')} catch(e) {alert(e.message);};";
var $bkptadd="$quitpgmvar=false; while ($quitpgmvar==false) try {eval('dsppgmvar('+"+'getField()+'+"')')} catch(e) {alert(e.message);};";
var bkpticon="<ß#";
var $funname=["","","","","","","","","","","","","","","","","","","",""];
var $funparm=["","","","","","","","","","","","","","","","","","","",""];
var $funcode=["","","","","","","","","","","","","","","","","","","",""];
var $funcode2=["","","","","","","","","","","","","","","","","","","",""];
var $funbkptno=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var $funindex="";
var $thisfunction="";
var $curfunction="";
var $bkptfld="";
var $bkptindicator="*enddbg";
var $dbgtext="";

function createdbghtml() {
  if (!document.getElementById('dbgdiv')) {
    var htmltxt='<div id=dbgdiv onclick="hideElement('+"'dbgerrmsg')"+'" class=window style="display:none; top:30; left:20; z-index:10000">';
    htmltxt=htmltxt+'<div class="titleBar">Work With Debug</div>';
    htmltxt=htmltxt+'<img SRC="/webdev/closewin_icon.gif"  alt="close"  class="ximage" onClick="hideElement('+"'dbgdiv')"+'"></img>';
    htmltxt=htmltxt+'<div id=dbgerrmsg style="display:none; color:red"></div>';
    htmltxt=htmltxt+'Function Name: <input id=$fcnname type=text size=20  maxlength=100 value="xmess">';
    htmltxt=htmltxt+'<button id=setupdbgbut onClick=setUpDebug($fcnname.value); protect("$fcnname")>Setup</button><br>';
    htmltxt=htmltxt+'<textarea id=dbgftxt readonly style="display:none"; ondblclick="checkAtCursor()" cols=70 rows=22 wrap=virtual style="font-family:garmond"></textarea><br>';
    htmltxt=htmltxt+'<button id=otherfunbut onclick="hideElement('+"'otherfunbut','runfunbut'); workDbg()"+'">Other Function</button>';
    htmltxt=htmltxt+'<button id=runfunbut onclick="runFunction($fcnname.value)">Run Function</button>';
    htmltxt=htmltxt+'<button id=resetfunbut onclick="resetFun($fcnname.value)">reset</button>';
    htmltxt=htmltxt+'<button id=enddbgbut onclick="endDbg()">End Debug</button>';
    htmltxt=htmltxt+'<button id=editbut onclick="allowEdit()">Edit</button>';
    htmltxt=htmltxt+'<button id=applybut onclick="applyEdit()">Apply Edit</button>';
    htmltxt=htmltxt+'<button id=canceleditbut onclick="cancelEdit()">Cancel Edit</button>';
    htmltxt=htmltxt+'</div>'
    var debugdiv=document.createElement('div');
        debugdiv.innerHTML=htmltxt;
        document.getElementsByTagName('body')[0].appendChild(debugdiv);
  }
 workDbg('','*new');
  }

function allowEdit() {
  $dbgtext=valueOf('dbgftxt');
  $funcode2[$funindex]=$dbgtext;
  unProtect('dbgftxt'); focusOn('dbgftxt');
  hideElement('resetfunbut','otherfunbut','runfunbut');
  hideElement('editbut');
  showElement('applybut','canceleditbut');
}

function applyEdit() {
  if (!applyBkPt($funname[$funindex])) {
     $funcode2[$funindex]=$dbgtext;
     changeVar('dbgftxt',$dbgtext);
  }
  else {
      dbgftxt.readOnly=true;
      showElement('resetfunbut','otherfunbut','runfunbut');
      showElement('editbut');
      hideElement('applybut','canceleditbut');
  }
}

function cancelEdit() {
  dbgftxt.readOnly=true;
  showElement('resetfunbut','otherfunbut','runfunbut');
  showElement('editbut');
  hideElement('applybut','canceleditbut');
  changeVar('dbgftxt',$funcode2[$funindex]);
}

function copyToClipBoard(invalue) {

  var clpbrd=document.getElementById('clpbrd');
  if (clpbrd==null) {
     clpbrd=document.createElement('textarea');
     clpbrd.id="clpbrd";
     document.getElementsByTagName('body')[0].appendChild(clpbrd);
  }

  clpbrd.style.display="";
  clpbrd.value=invalue;
  v=clpbrd.createTextRange();
  v.execCommand("cut");
  clpbrd.style.display="none";
}

function checkAtCursor() {
  var ex=event.x;
  var ey=event.y;
  tr=dbgftxt.createTextRange();
  tr.moveToPoint(ex,ey);
  tr.expand("word");
  var c=tr.text;
  if (c=='1' || c=='2' || c=='3' || c=='4' || c=='5' || c=='6' || c=='7' || c=='8' || c=='9' || c=='10') {
     tr.select();
     rmvBrkPt(c);
     return;
  }

  // Add a break point
  if ($funbkptno[$funindex]>=10) {
     alert('No more than 10 breakpoints are allowed per function');
     return;
  }
  var text=valueOf('dbgftxt');
  tr.moveToPoint(ex,ey);
  $funbkptno[$funindex]=$funbkptno[$funindex]+1;
  var newdbg=bkpticon+$funbkptno[$funindex]+'>';
  copyToClipBoard(newdbg);
  tr.execCommand("paste");
  $quitpgmvar==false;
  $bkptindicator="*enddbg";
  if (!applyBkPt($funname[$funindex])) {
     $funbkptno[$funindex]=$funbkptno[$funindex]-1;
     changeVar('dbgftxt',text);
     $funcode2[$funindex]=text;
  }
return;
}


function rmvBrkPt(nbr) {
  var text=valueOf('dbgftxt');
  text=eval('valueOf("dbgftxt").replace(/<ß#'+nbr+'>/,"")');
  if (valueOf('dbgftxt') != text) {
     changeVar('dbgftxt',text);
     $funbkptno[$funindex]=$funbkptno[$funindex]-1;
  // $funcode[$funindex]=text;
  // $funcode2[$funindex]=text;
     applyBkPt($funname[$funindex]);
 //  reorderBkpt()
  }
}


function workDbg(fname,inmsg){
 showElement('dbgdiv');
 if (!fname || inmsg=='*new') {
    //var inmsg=null;
    showElement('setupdbgbut');
    hideElement('dbgftxt','resetfunbut','otherfunbut','runfunbut');
    hideElement('editbut','applyBut','canceleditbut');
    protect('dbgftext');
    unProtect('$fcnname');
    if (inmsg != '*new') {changeVar('$fcnname','');}
    else {changeVar('$fcnname',$curfunction)}
 }
 else {
      protect('$fcnname');
      changeVar('$fcnname',fname);
      setUpDebug(fname);
 }
 if (inmsg && inmsg !='*new') {
    changeContent('dbgerrmsg',inmsg);
    showElement('dbgerrmsg');
 }
 focusOn('$fcnname');
}

function reorderBkpt() {

  var bkno=$funbkptno[$funindex]+1;
  var text=valueOf('dbgftxt');
  for (var x=1; x<=bkno; x++) {
      text=eval('text.replace(/<ß#'+x+'>/,"ßf#")');
  }
  for (x=1; x<=bkno; x++) {
      text=eval('text.replace(/ßf#/,"<ß#'+x+'>")');
  }
      changeVar('dbgftxt',text);
      return text;
}


function get$funindex(fname)
{
$funindex=-1;
       for (var i=1; i<=19; i++) {
           if ($funname[i]=="" || $funname[i]==fname) {
              $funindex=i;
              break;
           }
        }
 }


function setUpDebug(fname) {

  if (!fname || isBlank(fname)) {
     alert('Supply the function name');
     focusOn('$fcnname');
     return;
  }

  var text='';
  var savef=fname+'savef';
  get$funindex(fname);
  if ($funname[$funindex]=='') {
     changeVar('dbgftxt','');

     try {eval(savef+'='+fname);}
     catch(e) {
              alert('Function does not exists');
              focusOn('$fcnname','*hi');
              return;
     }

     $curfunction=fname;
     var code=eval(fname+'.toString().split("{")');
     for (var x=1; x<code.length; x++) {
         text=text+'{'+code[x];
     }
     changeVar('dbgftxt',text); dbgftxt.style.display="";
     $funname[$funindex]=fname;
     $funcode[$funindex]=text;
     $funcode2[$funindex]=text;
     $funparm[$funindex]=code[0];
     $funbkptno[$funindex]=0;
  }
  else {
      changeVar('dbgftxt',$funcode2[$funindex]);
      applyBkPt(fname);
  }
showElement('otherfunbut', 'dbgdiv','dbgftxt','resetfunbut','runfunbut')
showElement('editbut');
hideElement('setupdbgbut');
protect('$fcnname');
}


function endDbg()
{
  for (var i=1; i<=19; i++) {
      if ($funname[i] != "") {
         eval($funname[i]+'='+$funname[i]+'savef');
         $funname[i]="";
         $funparm[i]="";
         $funcode[i]="";
         $funcode2[i]="";
      }
  }
  changeVar('dbgftxt',""); dbgftxt.style.display="none";
  hideElement('dbgdiv');
  processerror==false;
  alert('Debug Ended');
 }

function insertDbg() {
  if ($funbkptno[$funindex]>=10) {
     alert('No more than 10 breakpoints are allowed per function');
     return;
  }
  $quitpgmvar==false;
  $bkptindicator="*enddbg";
  $funbkptno[$funindex]=$funbkptno[$funindex]+1;
  var newdbg=bkpticon+$funbkptno[$funindex]+'>';
  var text=valueOf('dbgftxt');
  checkAtCursor(newdbg);
  if (!applyBkPt($funname[$funindex])) {
     $funbkptno[$funindex]=$funbkptno[$funindex]-1;
     changeVar('dbgftxt',text);
     $funcode2[$funindex]=text;
  }
return;
}

function applyBkPt(fname,applytype) {
  get$funindex(fname);
  var text=reorderBkpt();
  $funcode2[$funindex]=text;
  var $bkptadd2="";
  for (var x=1; x<=10; x++) {
     $bkptadd2="thisbkptno="+x+";"+$bkptadd;
      text=eval('text.replace(/<ß#'+x+'>/g,$bkptadd2)');
  }
  text="$thisfunction='"+fname+"';"+text;
  var code2=$funparm[$funindex].split('(');
  code2=code2[1].split(')');
  var parmcnt=code2.length-1;
  try {
    if (parmcnt==0) {
       var showFld= new Function(text);
       eval(fname+'=showFld');
    }
    if (parmcnt==1) {
       oneParm(code2[0],fname,text);
    }
    if (parmcnt==2) {
       twoParms(code2[0],code[1],fname,text);
    }
    if (parmcnt==3) {
       threeParms(code2[0],code[1],code[2],fname,text);
    }
    if (parmcnt==4) {
       fourParms(code2[0],code[1],code[2],code[3],fname,text);
    }
    if (parmcnt==5) {
       fiveParms(code2[0],code[1],code[2],code[3],code[4],fname,text);
    }
    if (parmcnt==6) {
       sixParms(code2[0],code[1],code[2],code[3],code[4],code[5],fname,text);
    }
  }  catch(e) {
         alert('Breakpoint not valid!!\n\nPress OK to remove it');
         return false;
    }
   return true;
}

function oneParm(p1,fname,text) {
 var showFld= new Function(p1,text);
 eval(fname+'=showFld');
}

function twoParms(p1,p2,fname,text) {
 var showFld= new Function(p1,p2,text);
 eval(fname+'=showFld');
}

function threeParms(p1,p2,p3,fname,text) {
 var showFld= new Function(p1,p2,p3,text);
 eval(fname+'=showFld');
}

function fourParms(p1,p2,p3,p4,fname,text) {
 var showFld= new Function(p1,p2,p3,p4,text);
 eval(fname+'=showFld');
}

function fiveParms(p1,p2,p3,p4,p5,fname,text) {
 var showFld= new Function(p1,p2,p3,p4,p5,text);
 eval(fname+'=showFld');
}

function sixParms(p1,p2,p3,p4,p5,p6,fname,text) {
 var showFld= new Function(p1,p2,p3,p4,p5,p6,text);
 eval(fname+'=showFld');
}

function runFunction(fname) {
  try {
    eval(fname+"()");
  } catch (e) {alert('unable to run function '+fname)}
}


function resetFun(fname) {
  var savef=fname+'savef';
  eval(fname+'='+savef);
  get$funindex(fname);
  changeVar('dbgftxt',$funcode[$funindex]);
  $funcode2[$funindex]=$funcode[$funindex];
//$funname[$funindex]="";
//$funparm[$funindex]="";
//$funcode[$funindex]="";
//$funcode2[$funindex]="";
  $funbkptno[$funindex]=0;
}


function dsppgmvar(fld) {

  if ($bkptindicator=='*nodbg') {
     $quitpgmvar=true;
     return;
  }
  if (fld=='*enddbg') {
     endDbg();
     $bkptindicator='*nodbg';
     $quitpgmvar=true;
     return;
  }
  if (fld=='*close') {
     $quitpgmvar=true;
     return;
  }
  if (fld=='*brkpt') {
     $quitpgmvar=true;
     workDbg($thisfunction);
     return;
  }
  alert("Field/Expression: "+$bkptfld+"\n\nValue: "+fld);
}


function getField() {
  if ($bkptindicator=='*nodbg') {
     $bkptfld='$bkptindicator';
     return $bkptfld;
  }
  var oMyFunction = new Object();
  get$funindex($thisfunction);
  oMyFunction.name=$thisfunction;
  oMyFunction.bkptno=thisbkptno;
  oMyFunction.code=$funcode2[$funindex];
  $bkptfld=showModalDialog("/pcstools/debugdata.htm",oMyFunction,"center=yes;dialogWidth=305pt;dialogHeight=315pt;status:no;help:no;unadorned:yes");
  if ($bkptfld=='*enddbg') {
     $bkptfld='$bkptindicator';
     $bkptindicator='*enddbg'
  }
  if ($bkptfld=='*close') {
     $bkptfld='$bkptindicator';
     $bkptindicator='*close'
  }
  if ($bkptfld=='*brkpt') {
     $bkptfld='$bkptindicator';
     $bkptindicator='*brkpt';
  }
  return $bkptfld;
 }

//--------------------  End Debug Functions