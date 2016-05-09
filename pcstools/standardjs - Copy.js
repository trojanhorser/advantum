// Basic Program Initialization
//* has the comments related to frames for a window
//var xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
var xmlHttp=new ActiveXObject("Msxml2.XMLHTTP");
var CGIresponse="";
var CGImsgsplit='|';
var CGIdatasplit='¤';
var CGIrtnprefix="";
var CGIrtnerror="";
var CGIrtnfocus="";
var CGIrtnmsg="";
var CGIrtndata="";
var CGIwaitonreturn=false;
var CGIlockscreen=true;
var urlparm="";
var inlurlstring=document.URL;
var path="";
var inpath="";
var inurlparm="";
var inonreturncall="";
var indirective="";
var rows="";
var headrows="";
var col="";
var headcol="";
var oddrowcolor="#effbff";
var evenrowcolor="#f2f2ff";
var clickedtable="";
var dialogrtnval="";
var clickedrow;
//var opopup = window.createPopup();
var focusform='';
var currentrow=-1;
var currenttable="";
var tablenames=["","","","","","","","","","","","","","","","","","","",""];
var tabrows=["","","","","","","","","","","","","","","","","","","",""];
var tabheadrows=["","","","","","","","","","","","","","","","","","","",""];
//var tabrowsslt=["","","","",""];
var tablecursor=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var tabrowclicked= new Object();
var tabindex="";
var eof=true;
var optmenu="";
var optobj="";
var CGIreturncall="";
var keylist="";
var DIRective="";
var refobjtable="";
var zidx=100;
var wincount=0;
var popcount=0;
var winform=["","","","","","","","","","","","","","","","","","","",""]
var popform=["","","","","","","","","","","","","","","","","","","",""]
var pophow=["","","","","","","","","","","","","","","","","","","",""]
var ypos=0;
var xpos=0;
var popupY=0;
var popupX=0;
var lastimportpath="";
//var rowselectcolor="#CCCFFF"
var rowselectcolor="#f7df95" 
var lasttrobj="";
var loadingmessage="<img style='width:14px' src='../image/waiting.gif'> processing..."
var checkedrowtable="";
var checkedrowoptfld="";
var ispop=false;
var submit$tring="";
var rtnfldstring="";
var lookupidx=-1;
var lookuppath=["","","","","","","","","","","","","","","","","","","",""];
var lookupparms=["","","","","","","","","","","","","","","","","","","",""];
var lookupHTML=["","","","","","","","","","","","","","","","","","","",""];
var lookupcount=-1;
var hideedit=false;
var importtype='*window';
var divsrc='divsource';
var suggestfld='';
var suggestdiv=false;
var processerror=false;
var loadfrmtps='no';
var dialognbr=0;
var dialogidarray=new Array();
var currenttabobj;
var applicationname=window.location.pathname;
var datefmt='y';
var timefmt='a';

//  --- Some default button settings --
//var buttonareacolor=['#54CADD:#125080','#125080:#4881B5'];
//var buttonareapercent=[50,50];
//var buttonborder='1px solid #072933'; 
var buttonareacolor=['#A6DDF2:#558EC3','#558EC3:#4A78A9','#4A78A9:#558EC3','#558EC3:#A6DDF2'];
var buttonareapercent=[30,20,30,20];     
var buttonborder='1px solid #2D4F7D'; 

var domove=false;
//var x,y;
var fobj;
var mobj;
var windowbgcolor='';
var windowbgfade='50';
var snduniquerowname=false;
//* var mfobj;
var popupid='';
var allowpopup=false;
var $cal$day;
var $cal$mth;
var $cal$yer;
var popcalfmt='';
var popcalcode='';
var newrowpos=-9;
var allowadd=true;
var allowchange=true;
var allowdelete=true;
var username='';
var undoclickrow=false; 
var dataLog=new Object();
var dataDic=new Object();
var dialogparm=new Object();
var globaldialogparm=new Object(); 
globaldialogparm.accesscode='nopass';
var sortorder='ascend';

if (window.dialogArguments) {
   if (!window.dialogArguments.allowadd) allowadd=false;
   if (!window.dialogArguments.allowchange) allowchange=false;
   if (!window.dialogArguments.allowdelete) allowdelete=false;
   if (window.dialogArguments.username) username=window.dialogArguments.username;
   if (window.dialogArguments.globaldialogparm) globaldialogparm=window.dialogArguments.globaldialogparm;
   if (window.dialogArguments.dialogparm) dialogparm=window.dialogArguments.dialogparm;
   if (window.dialogArguments.dataLog) dataLog=window.dialogArguments.dataLog;
   if (window.dialogArguments.datadic) dataDic=window.dialogArguments.dataDic;
} 
else {
   var iframeparms=parent.document.getElementsByTagName('iframeparm')[0];
   if (iframeparms) {
       if (!iframeparms.allowadd) allowadd=false;
       if (!iframeparms.allowchange) allowchange=false;
       if (!iframeparms.allowdelete) allowdelete=false;
       if (iframeparms.username) username=iframeparms.username;
       if (iframeparms.globaldialogparm) globaldialogparm=iframeparms.globaldialogparm;
       if (iframeparms.dialogparm) dialogparm=iframeparms.dialogparm;
       if (iframeparms.dataLog) dataLog=iframeparms.dataLog;
       if (iframeparms.datadic) dataDic=iframeparms.dataDic;
   } 
}

if (!globaldialogparm.sessionid) {
    sessionid=(Math.floor(Math.random() * (99999999 - 1)) + 1);
    globaldialogparm.sessionid=sessionid;
}
else {
    sessionid=globaldialogparm.sessionid
}   

if (!globaldialogparm.environment) {
    if (window.location.href.split(':')[0]=='file') {
        globaldialogparm.environment='intranet';
    }
    else {
        globaldialogparm.environment='internet';
    }
}

runenvironment=globaldialogparm.environment;

document.onmousedown=mouseDown
document.onmouseup=mouseUp;
document.onmousemove=moveMouse;
document.onclick=onClick;
document.onkeypress=onKeyPress;

window.onerror = doError;

//-------- Start Prototype Section ------------------------
String.prototype.trim = function() {
  //return this.replace(/^\s+|\s+$/g, "");
  var str = this.replace(/^\s\s*/, ''), ws = /\s/, i = str.length;
  while (ws.test(str.charAt(--i)));
  return str.slice(0, i + 1);
};

String.prototype.triml = function() {
 var r=/\s*((\S+\s*)*)/;
 return this.replace(r,"$1");
};

String.prototype.trimr = function() {
 var r=/((\s*\S+)*)\s*/;
 return this.replace(r,"$1");
};

String.prototype.sst = function(start,length) {
  return this.substring(start-1,start-1+length); 
}

String.prototype.strip = function(str) {
  var strarr=this.split(str);
  var txt=strarr.join(''); 
  for (var i=1; i<arguments.length; i++) {
      strarr=txt.split(arguments[i]);
      txt=strarr.join('');

  }
  return txt; 
}

String.prototype.toCamelCase = function() {
  var i, l;
  str=this.trim().split(' '); 
  for (i=0; i<str.length; i++) {
       l=str[i].length; 
       if (l==1) {str[i]=str[i].toUpperCase();}
       else {
          str[i]=str[i].sst(1,1).toUpperCase()+str[i].sst(2,(l-1)).toLowerCase();
       }
  }
  return str.join(' ');  
}

Number.prototype.chgDateFmt = function(ffmt,tfmt) {
  ffmt=ffmt.toUpperCase();
  if (!tfmt) {
     var tfmt='Y';
  }
  else {tfmt=tfmt.toUpperCase();}
  if (ffmt==tfmt) {return this;}
  var fmdate=this;
  var todate=''; 
  if (numeric(this)==0) return this;
  var now=convertToDate(fmdate,ffmt); 
  var year=now.getFullYear(); 
  var month=now.getMonth()+1;
  var day=now.getDate(); 
  if (month <= '9') month='0'+month; 
  if (day <= '9') day='0'+day; 
  if (tfmt=='Y') {
     todate=''+year+month+day;  
  }
  if (tfmt=='D') {
     todate=''+day+month+year;
  }
  if (tfmt=='M') {
     todate=''+month+day+year;
  } 
  return numeric(todate); 
}

//-------- End Prototype Section ------------------------

function doError(msg,url,ln) {
  if (!processerror) return;
  var breaker=doError.caller;
  var breaker=breaker+'';
  breaker=breaker.split('function ');
  var funcname=breaker[1].split('(');
  try {workDbg(funcname[0],'Error: '+msg)} catch(e) {}
  return false;
}


function topIt() {
  try {
   header.style.top=document.body.scrollTop;
   header.style.left=document.body.scrollLeft;
   optionarea.style.top=document.body.scrollTop;
   optionarea.style.left=document.body.scrollLeft;
   footer.style.left=document.body.scrollLeft;
   footer.style.top=document.body.scrollTop+document.body.clientHeight-20;
   optionarea2.style.top=document.body.scrollTop;
   optionarea2.style.right=document.body.scrollRight;
  } catch (e) {}

  try {
   divcover.style.top=document.body.scrollTop;
   divcover.style.left=document.body.scrollLeft;
  } catch (e2) {}

  try {
   cover.style.top=document.body.scrollTop;
   cover.style.left=document.body.scrollLeft;
  } catch (e3) {}
}

  setInterval("topIt()",100);


function mouseDown() {

try {

var extformobj=document.getElementById('divextform');
if (extformobj==null) {
var divextform=document.createElement('div');
    divextform.id="divextform";
    divextform.className="importWindow";
    divextform.style.display="none";
    divextform.innerHTML='<form name="extform"> <div id="extformdata"></div></form>'
    document.getElementsByTagName('body')[0].appendChild(divextform);
//  workarea.appendChild(divextform);
}

getForm();
//*
//*
} catch (e) {};

}


function moveMouse()
{
 
 if (domove)
 {
  
  var newx=tx + event.clientX-x;
  var newy=ty + event.clientY-y;
  try {
      //if (newx<optionarea.offsetWidth) newx=optionarea.offsetWidth;
      //if (newy<header.offsetHeight) newy=header.offsetHeight;
      if (newx<0) newx=0;
      if (newy<0) newy=0;
  } catch (e) {};

  var xxdif=newx-numeric(mobj.style.left);
  var yydif=newy-numeric(mobj.style.top);
  mobj.style.left = newx;
  mobj.style.top  = newy;

//* try {
//*  mfobj.style.left = newx;
//*  mfobj.style.top  = newy;
//*  }
//*catch (e) {}

  return false;
}
}


function selectMouse()
{
var moveit=false;
var fobj = event.srcElement;
var uclass;

if (fobj.id=='cover' || fobj.id=='divcover') return

while (fobj.tagName != 'BODY')
{
  uclass=fobj.className.toUpperCase(); 
  if (uclass=="MOVEIT" || uclass=="TITLEBAR" || uclass=="TITLEBARI") moveit=true;
  if (uclass.search("WINDOW")!=-1) break;
  fobj = fobj.parentNode;
}

if (moveit==false) {fobj = event.srcElement}
if (fobj.className.toUpperCase().search("WINDOW")!=-1) {
    moveit=true;
} 
if (fobj.nomove != undefined) {moveit=false}  

  if (moveit)
  {
    mobj = fobj;
//* try {mfobj = document.getElementById('iframe'+mobj.id)} catch (e) {};
    tx = parseInt(mobj.style.left+0,10);
    ty = parseInt(mobj.style.top+0,10);
    domove = true;
    x =  event.clientX;
    y =  event.clientY;
    mobj.style.cursor='move';
    //document.onmousemove=moveMouse;
    return false;
  }
}


function mouseUp()
{ 
try {up$Pos()} catch(e) {}
if (popcount != 0 && ispop==false) {
    for (var j=1; j<=popcount; j++) {
      if (pophow[j]=='') {
         document.getElementById(popform[j]).style.display='none';
      }  else howClosePopUps(popform[j],pophow[j]);
    }
    popcount=0;
 }
 ispop=false;

try {optmenu.style.display = "none";} catch (e){};

 if (domove==true){
  mobj.style.cursor='';
  domove=false;
 }
}


function getCookieVal (offset) {
  var endstr = document.cookie.indexOf (";", offset);
  if (endstr == -1)
    endstr = document.cookie.length;
  return unescape(document.cookie.substring(offset, endstr));
}

function getCookie (name) {
  var arg = name + "=";
  var alen = arg.length;
  var clen = document.cookie.length;
var i = 0;
while (i < clen) {
  var j = i + alen;
      if (document.cookie.substring(i, j) == arg)
        return getCookieVal (j);
      i = document.cookie.indexOf(" ", i) + 1;
      if (i == 0) break;
    }
    return null;
  }

function setCookie (name, value) {
    var argv = setCookie.arguments;
    var argc = setCookie.arguments.length;
    var expires = (argc > 2) ? argv[2] : null;
    var path = (argc > 3) ? argv[3] : null;
    var domain = (argc > 4) ? argv[4] : null;
    var secure = (argc > 5) ? argv[5] : false;
    document.cookie = name + "=" + escape (value) +
      ((expires == null) ? "" : ("; expires=" + expires.toGMTString())) +
    ((path == null) ? "" : ("; path=" + path)) +
    ((domain == null) ? "" : ("; domain=" + domain)) +
    ((secure == true) ? "; secure" : "");
}

function deleteCookie (name) {
  var exp = new Date();
  exp.setTime (exp.getTime() - 1);  // This cookie is history
  var cval = GetCookie (name);
  document.cookie = name + "=" + cval + "; expires=" + exp.toGMTString();
}

//function numOrdA(a, b){ return (a-b); }
function numOrdD(a, b){ return (b-a); }

//function charOrdA(a, b){
//a = a.toLowerCase(); b = b.toLowerCase();
//if (a>b) return 1;
//if (a <b) return -1;
//return 0;
//}

function charOrdD(a, b) {
 a = a.toLowerCase(); b = b.toLowerCase();
 if (a<b) return 1;
 if (a >b) return -1;
 return 0;
}


function startDebug() {
   processerror=true;
   try {createdbghtml();} catch(e) {}
}

function onKeyPress () {

if (wincount!=0) {
getForm();
if (winform[wincount] != focusform) {focusform=winform[wincount]; return false;}
}

var keycode = window.event.keyCode;
if (keycode == 13 && event.srcElement.tagName !='TEXTAREA') return false;
 
//return true;
}

function dialogDef() {
  this.type="modal"; //or modeless or iframe;
  this.height=document.body.clientHeight*.86;
  this.width=document.body.clientWidth*.95;
  this.center="yes";
  this.dialoghide="no";
  this.edge="raised"; //or sunken
  this.resizable="on";
  this.scroll="yes";
  this.status="no";
  this.help="no";
  this.unadorded="yes";
  this.dialogparm=new Object();
  this.loadfrmtps=loadfrmtps;
  this.allowmultiple='no'; //applies to type=modeless
  
  // Internal - Do not change properties
  this.id=""; 
  dialognbr += 1;
  this.idnbr=dialognbr;
 // End-Internal

}


function displayDialog(exturl,dobj) {
  if (!dobj) {
     var dobj=new dialogDef();
  } 
  var parms=new Object();
  parms.dialogparm=dobj.dialogparm; 
  parms.allowadd=allowadd; 
  parms.allowdelete=allowdelete;
  parms.allowchange=allowchange; 
  parms.globaldialogparm=globaldialogparm;
  parms.dataLog=dataLog;
  parms.datadic=dataDic;
  if  (dobj.loadfrmtps=='yes') {
     try { 
       var WshShell = new ActiveXObject("WScript.Shell"); 

       var y=exturl.lastIndexOf('/') + 1;
       exturl=exturl.sst(y,80);
       exturl=exturl.split('.');
       exturl=exturl[0]+'.tps';

       eval('WshShell.Run("rtvsource.exe '+globaldialogparm.accesscode+' '+sessionid+'  '+exturl+'",2,true)'); 
       exturl='~tmp'+sessionid+'.hta';
      } catch (e) {alert('Error: '+e.message+' dialog could not be opened'); return false};
   }
  try {parms.username=username} catch (e) {parms.username=''};
  var boxfeatures = "dialogHeight:" + dobj.height+"px; dialogWidth:"+dobj.width+"px; dialogLeft:"+dobj.left+"; dialogTop:"+dobj.top+";status:"+dobj.status+";help:"+dobj.help+";unadorded:"+dobj.unadorded;
      boxfeatures += "; center:"+dobj.center+"; dialogHide:"+dobj.dialoghide+"; edge:"+dobj.edge+"; resizable:"+dobj.resizable+"; scroll:"+dobj.scroll; 

  if (dobj.type=='modal') {
     dialogrtnval = window.showModalDialog(exturl, parms, boxfeatures);
  }
  else {
       if (dobj.allowmultiple=='no') {
        try {
            if (!dobj.id) {
               dobj.id=window.showModelessDialog(exturl, parms, boxfeatures); 
               dialogidarray[dobj.idnbr]=dobj.id; 
            }
            else {dobj.id.focus()}
        }
        catch(e) {
                 dobj.id=window.showModelessDialog(exturl, parms, boxfeatures);
                 dialogidarray[dobj.idnbr]=dobj.id; 
        }
     }
     else {
          dobj.id=window.showModelessDialog(exturl, parms, boxfeatures);
          dialognbr += 1; 
          dobj.idnbr=dialognbr;
          dialogidarray[dobj.idnbr]=dobj.id;
     }
     return true;
  }
  return dialogrtnval;
}


function closeModelessDialog(dobj) {
  if (dobj && dobj=='all') {
     for (var i=0; i<dialogidarray.length; i++) {
         try {
             dialogidarray[i].close(); 
         }
         catch(e) {}
     }
     return;
  } 

  try {
      if (dobj.id) {
         dialogidarray[dobj.idnbr].close();
      }
  } catch(e) {}
}


function iframeDialogDef() {
  this.dialogparm=new Object();
  this.loadfrmtps=loadfrmtps;
}


function displayIframeDialog(exturl,tabtext,dobj) {
  if (!tabtext) {
     tabtext=exturl.sst(1,15); 
  }
  if (!dobj) {
     var dobj=new iframeDialogDef();
  } 

   if  (dobj.loadfrmtps=='yes') {
     try { 
       var WshShell = new ActiveXObject("WScript.Shell"); 
       var y=exturl.lastIndexOf('/') + 1;
       exturl=exturl.sst(y,80);
       exturl=exturl.split('.');
       exturl=exturl[0]+'.tps';       
       eval('WshShell.Run("rtvsource.exe '+globaldialogparm.accesscode+' '+sessionid+' '+exturl+' htm ",2,true)'); 
       exturl='~tmp'+sessionid+'.htm?exturl='+exturl;
      } catch (e) {alert('Error: '+e.message+' dialog could not be opened'); return false};
   }

  var parms=document.getElementById('iframeparmid');
  if (!parms) {
      parms=document.createElement('iframeparm');
      parms.id='iframeparmid';
      document.getElementsByTagName('body')[0].appendChild(parms);
  } 
  parms.style.display='';
  parms.dialogparm=dobj.dialogparm; 
  parms.allowadd=allowadd; 
  parms.allowdelete=allowdelete;
  parms.allowchange=allowchange; 
  parms.globaldialogparm=globaldialogparm;
  parms.dataLog=dataLog;
  parms.datadic=dataDic;  
  parms.username=username;

  displayInIframeTab(exturl,tabtext);
} 


function iframeTabsDef(nbr) {
  if (!nbr) {maxtabs=8}
  else {maxtabs=numeric(nbr)} 
  //this.style="background-color:green; margin:0; width:750; height:600";
  this.height=600; 
  this.width=750;
  this.tabcolorselect='white';
  this.background='';
  this.tabstyle=new Array();
  this.tabdatastyle=new Array();
  for (var i=0; i<maxtabs; i++) {
      this.tabstyle[i]="width:120; overflow:hidden; background-color:#cce2fb"; 
      this.tabdatastyle[i]="text-align:center; width:100%; height:100%";
  }
}

function createIframeTabs(ifobj,container,hide) {
  var hidedata=false;
  if (hide && hide.toLowerCase()=='hide') {hidedata=true}
  urlarray=new Array();
  tabcount=0;
  var obj=document.getElementById(container);
  if (!obj) {return}
  var background=0;
  if (ifobj.background) {
     background='background: '+ifobj.background; 
  }
  var txt="<div id=diviframetabsform style='margin:0'><form name=iframetabsform style='margin:0; padding:0'>";
  txt += "<div id=iframetabsformtab style='position:relative; margin:0; padding:0; height:100%; width:100%;"+background+"' tabselectcolor='"+ifobj.tabcolorselect+"' class=tabswrap>";
  txt += "<span id=closecurrenttab style='position:absolute; top:-18; right:0' onclick=removeIframeTab()>X</span>";
  for (var i=0; i<maxtabs; i++) {
      //txt += "<div id=iftab#"+(i+1)+" class=tab style='"+ifobj.tabstyle[i]+"'><span id=ifx#"+(i+1)+"></span></div>";
      txt += "<div id=iftab#"+(i+1)+" class=tab style='"+ifobj.tabstyle[i]+"'></div>";
  }
  for (var i=0; i<maxtabs; i++) {
      txt += "<div id=iftab#"+(i+1)+"data class=tabdata style='"+ifobj.tabdatastyle[i]+"'>";
      //txt += "<iframe id=iframe#"+(i+1)+" application='yes' style='"+ifobj.iframestyle[i]+"'></iframe></div>";
      txt += "<iframe id=iframe#"+(i+1)+" application='yes' scrolling='auto' height=98% width=98%></iframe></div>";
  }
  txt += "</div></form></div>";
  obj.innerHTML=txt;

  //var obji=document.getElementById('diviframetabsform');
  var obji=document.getElementById('iframetabsformtab');
  try {
     eval("obji.style.height="+ifobj.height) ;
     eval("obji.style.width="+ifobj.width); 
     obji.style.margin=0;
  } catch(e) {}

  but=new buttonDef('exit');
  createButton(but,'closecurrenttab');
  constructTabs('iframetabsform');
  document.getElementById('diviframetabsform').className='';
  for (var i=1; i<=maxtabs; i++) {
       hideElement('iftab#'+i); 
       if (hidedata) {
          hideElement('iftab#'+i+'data');
       }
  }
  hideElement('closecurrenttab');

}


function displayInIframeTab(url,text) {
 if (!text) {
     var text=url.sst(1,15);
 }
 var usetab;
 var tabfound=false; 
 for (var i=1; i<=tabcount; i++) {
     if (urlarray[i]==url) {
        usetab='iftab#'+i;
        tabfound=true;
        break
     }
 }

//---
 //if (tabcount!=maxtabs) {
    //for (i=1; i<=tabcount; i++) {
        //hideElement("ifx#"+i);
    //}
 //}
//---
 if (!tabfound) {
    if (tabcount==maxtabs) {
       alert('New tab not added...close at least one tab');
       return; 
    }
    tabcount ++;
    usetab='iftab#'+tabcount;
    var useframe='iframe#'+tabcount; 
    var el=document.getElementById(useframe); 
    el.src=url; 
    urlarray[tabcount]=url;
    //text = "<span class=ximageif id=ifx#"+tabcount+" onmouseup='removeIframeTab()'>X</span>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp"+text; 
    //text +="<span style='margin:2px' id=ifx#"+tabcount+" class=ximage onmouseup='removeIframeTab()'>X</span>"; 
    //text +="&nbsp&nbsp<span title='close' onmousedown='removeIframeTab("+tabcount+")' class=xtabimage><span>";
    changeContent(usetab,text); 
  }
 //showElement("ifx#"+tabcount);
 showElement(usetab,'closecurrenttab');
 showTab(usetab);

}


function removeIframeTab() {
  tabremove=currenttabobj;
  var nbr=numeric(tabremove.id.split('#')[1]);
  var tabarray=new Array();
  var framearray=new Array();
  var tabdataarray=new Array();
  //var tabxarray=new Array();
  var newurl=new Array();
  var obj='';
  var frameobj;
  var tabdataobj;
  //var tabxobj;
  var firstobj='';
  var objprv='';
  var i=0;
  var spacing=4
  //var tabremove=document.getElementById('iftab#'+nbr);

  for (var j=1; j<=maxtabs; j++) {

      obj=document.getElementById('iftab#'+j);
      frameobj=document.getElementById('iframe#'+j); 
      //tabxobj=document.getElementById('ifx#'+j); 
      tabdataobj=document.getElementById('iftab#'+j+'data'); 
      tabarray[j]=obj;
      framearray[j]=frameobj;
      tabdataarray[j]=tabdataobj;
      //tabxarray[j]=tabxobj;

      if (j==nbr) {continue;}      
      obj.prevdisplay=obj.style.display;
      obj.style.display='';
      if (i==0) {
         obj.style.left=spacing;
         objprv=obj;
         firstobj=obj;
      }
      else {
           obj.style.left=objprv.offsetLeft+objprv.offsetWidth+spacing;
           objprv=obj
      }
     
      i=i+1; 
      obj.newid='iftab#'+i;
      frameobj.newid='iframe#'+i;
      tabdataobj.newid='iftab#'+i+'data';
      //tabxobj.newid='ifx#'+i;
      newurl[i]=urlarray[j];
  }

  tabarray[nbr].newid='iftab#'+maxtabs;
  tabarray[nbr].prevdisplay='none';
  tabarray[nbr].style.left=objprv.offsetLeft+objprv.offsetWidth+spacing;
  framearray[nbr].newid='iframe#'+maxtabs;
  framearray[nbr].src='';
  tabdataarray[nbr].newid='iftab#'+maxtabs+'data';
  //tabxarray[nbr].newid='ifx#'+maxtabs; 

  newurl[maxtabs]='';
  
  for (j=1; j<= maxtabs; j++) {
       tabarray[j].id=tabarray[j].newid;
       tabarray[j].style.display=tabarray[j].prevdisplay;
       framearray[j].id=framearray[j].newid;
       tabdataarray[j].id=tabdataarray[j].newid; 
       //tabxarray[j].id=tabxarray[j].newid; 
       urlarray[j]=newurl[j];
  }

  tabcount=tabcount-1; 

  if (tabcount>0) { 
     if (tabremove!=currenttabobj) {
        tabSelect(currenttabobj.id);
     }
     else { 
        if (nbr>1) {
           showTab('iftab#'+(nbr-1));
           //showElement('ifx#'+(nbr-1)); 
        }
        else {
           showTab('iftab#1');
           //showElement('ifx#1'); 
        }
     }
  }
  else {
          hideElement('iftab#'+maxtabs+'data','closecurrenttab'); 
  }    

}


function getRowOption(bodyhtml){
var refobj=event.srcElement;
currenttable=clickedtable;
currentrow=clickedrow;
posTabCursor(currenttable, currentrow);
readRow();
optobj=refobj;
optmenu=bodyhtml;
}

function getPosition(e) {
 try {
    e = e || window.event;
    var cursor = {x:0, y:0};
    if (e.pageX || e.pageY) {
        cursor.x = e.pageX;
        cursor.y = e.pageY;
    }
    else {
        var de = document.documentElement;
        var b = document.body;
        cursor.x = e.clientX +
            (de.scrollLeft || b.scrollLeft) - (de.clientLeft || 0);
        cursor.y = e.clientY +
            (de.scrollTop || b.scrollTop) - (de.clientTop || 0);
    }
    return cursor;
  }
 catch (e) {return 0};
}


function onClick()
{

try {

var workitem=event.srcElement;

try {
  var obj = workitem.parentNode;
  if ((obj.tagName == 'TD' || obj.tagName == 'TR') && (!undoclickrow)) {
     var trobj = obj.parentNode;
     if (obj.tagName == 'TR') trobj = obj;
        var selectcolor=rowselectcolor;
        try {
            var rowsltcolor=eval('tab$$selectcolor.'+clickedtable);
            selectcolor=rowsltcolor;
        } catch(e) {}

        var ptrobj=eval('tabrowclicked.'+clickedtable);
        if (ptrobj != trobj && selectcolor != '') {
           trobj.lang=trobj.style.backgroundColor;
           trobj.style.backgroundColor=selectcolor;
           try {
               eval('tabrowclicked.'+clickedtable+'.style.backgroundColor=tabrowclicked.'+clickedtable+'.lang');
           } catch (e) {}
           try {  
               eval('tabrowclicked.'+clickedtable+'=trobj');  
           } catch (e1) {}
        } 
     
  } 
} catch (e2) {};

undoclickrow=false;
// Special popup
try {
  if (popupid != '') {
     if (!allowpopup) {
        var prevobj=workitem;
        for (var i=0; i < 10; i++) {
            if (prevobj.id==popupid || prevobj.tagName=='BODY') break;
            prevobj=prevobj.parentNode;
        }
        if (prevobj.id !=popupid) hidePopUp();
      }
      else allowpopup=false;
  }
} catch (e21) {}


if (optmenu == "") return;

   if (workitem == optobj) {

    //  lasttrobj.lang=lasttrobj.style.backgroundColor;
     // if (lasttrobj.lang != "") lasttrobj.style.backgroundColor=rowselectcolor;

       optmenu.style.top=ypos+4;
       optmenu.style.left=xpos-4;
       optmenu.style.display="block";
       zidx=zidx+1;
       optmenu.style.zIndex=zidx;

       return false;
   }
 else {
      optmenu.style.display = "none";
      optmenu = "";

 //    if (lasttrobj.lang !="") {
 //     lasttrobj.style.backgroundColor=lasttrobj.lang;
 //     lasttrobj.lang="";}
 }

} catch(e3) {}

}




function displayForm(form)
{

var frm=form.split(':');
var alignform='*rel';
var obj; 

form=frm[0];
if (frm.length>1) alignform=frm[1];

if (form=='*import') {form='extform';}

var division='div'+form;
obj=document.getElementById(division); 
if (!obj) {;
    var division=form;
    obj=document.getElementsByName(division)[0];
    if (!obj) {alert('required DIV - '+division+' - not found'); return}
}
var coverobj=document.getElementById('divcover');
if (coverobj==null) {
  var divcover=document.createElement('div');
  divcover.id="divcover";
  divcover.className="windowBackground";
  divcover.style.display="none";
  document.getElementsByTagName('body')[0].appendChild(divcover);
}
coverobj=document.getElementById('divcover');

if (windowbgcolor!='') {
    try {
    coverobj.style.backgroundColor=windowbgcolor;
    } catch (e) {}
}

if (windowbgfade!='') {
  try {
  coverobj.style.filter="alpha(opacity="+windowbgfade+")";
  } catch (e) {}
}

 for (var i=1; i<=wincount; i++) {
     if (winform[i]==form) {
        wincount=i-1;
//      toppos=winformtop[i];
//      leftpos=winformleft[i];
        break;
     }
 }

var oclass=obj.className
var toppos=parseInt(obj.style.top+0,10);
var leftpos=parseInt(obj.style.left+0,10);
 
if (arguments.length==1 && toppos==0 && leftpos==0) {
 try {
  obj.style.display=''; 
  var workarea=document.getElementById('workarea');
  if (!workarea) {workarea=document.getElementsByTagName('body')[0]};
  try {    
      toppos=workarea.offsetHeight-obj.offsetHeight-header.offsetHeight-footer.offsetHeight; 
      leftpos=workarea.offsetWidth-obj.offsetWidth-optionarea.offsetWidth-optionarea2.offsetWidth;
      toppos=toppos/2+header.offsetHeight; 
      leftpos=leftpos/2+optionarea.offsetWidth;
  } 
  catch(e) {
      toppos=(workarea.offsetHeight-obj.offsetHeight)/2; 
      leftpos=(workarea.offsetWidth-obj.offsetWidth)/2; 
  }
  if (toppos<5) {toppos=5}
  if (leftpos<5) {leftpos=5}
  obj.style.display='none';
 } catch (e) {}
}
else {
  if (arguments.length>1) {if (arguments[1] != '0') toppos=arguments[1]} ;
  if (arguments.length>2) {if (arguments[2] != '0') leftpos=arguments[2]};
}

  if (arguments.length>1 && alignform=="*rel") {
   try {
       toppos=toppos+header.offsetHeight;
   } catch (e) {}
  }
  if (arguments.length>2 && alignform=="*rel") {
   try {
       leftpos=leftpos+optionarea.offsetWidth;
   } catch (e) {}
  }


if (oclass != 'exportWindow' && (oclass.toUpperCase().search("WINDOW")!=-1)) {
  var toppospx=toppos+"px";
  var leftpospx=leftpos+"px";
  zidx=zidx+1;
  coverobj.style.zIndex=zidx;
  zidx=zidx+1;
  obj.style.zIndex=zidx;
  obj.style.top=toppospx;
  obj.style.left=leftpospx;

  showElement('divcover',division);
  obj.style.height=obj.offsetHeight;
  obj.style.width=obj.offsetWidth;

  focusform=form;
  try {if (oclass.toUpperCase()=='TABSWINDOW') constructTabs(form)} catch (e) {};

  if (arguments.length<4) {
     wincount=wincount+1;
     winform[wincount]=form;
  }

  return;
}


var divfocus='div'+focusform;
hideElement('divcover',divfocus);
showElement(division);
focusform=form;
try {if (obj.lang=='tab') constructTabs(form)} catch (e) {};
wincount=0;

}


function closeForm(how) {

var parms='';
var dotransit=false;
var nbr=1;

if (how) {
   how=how.toUpperCase();
   try {
       if (how=='*FADE') {
          fade(focusform,'*off');
          return;
       }
       if (how.search("SLIDE")!=-1) {
          var ptop='*';
          var pleft='*';
          var parms=how.split(':');
          if (parms.length>1) {ptop=parms[1]}
          if (parms.length>2) {pleft=parms[2]}
          slide(focusform,ptop,pleft,'closeForm()');
          return;
       }
       if (how.search("RESIZE")!=-1) {
          var pheight='*';
          var pwidth='*';
          var parms=how.split(':');
          if (parms.length>1) {pheight=parms[1]}
          if (parms.length>2) {pwidth=parms[2]}
          resize(focusform,pheight,pwidth,'closeForm()');
          return;
       }
        if (how.search("TRANSIT")!=-1) {
           parms=how.split(':');
           if (parms.length>1) {nbr=parms[1]}
           dotransit=true;
        }
    } catch (e) {}
 }

 var divfocus='div'+focusform;
 var obj=document.getElementById(divfocus);
 var oclass=obj.className
 if (oclass == 'outside') {leaveExtwin(); return}
 if (oclass.toUpperCase().search("WINDOW")==-1)
 {alert('CLOSE function applies only to System Windows'); return}
 if (!dotransit) {hideElement('divcover',divfocus)}
 else {hideElement('divcover');}
 //* try {hideElement('iframe'+divfocus)} catch(e) {}
 say(' ');
 wincount=wincount-1;
 if (wincount>0) {displayForm(winform[wincount])}
 else (wincount=0);
 if (lookupidx != -1) {lookupHTML[lookupidx]=obj.innerHTML; lookupidx=-1;}
 if (dotransit) {obj.style.zIndex=10000; transit(divfocus,nbr,'*off')};

 }


function returnToForm(toform) {
   var x=0;
   while (wincount>0 && winform[wincount]!=toform) {
         closeForm();
         x=x+1;
         if (x==20) break;
   }

 }



function focusOn(focusfld) {
 var focusdata=focusfld.split(':');
 focusfld=focusdata[0];
 var obj=document.getElementById(focusfld);
 if (!obj) return;
 if (obj.className=='datefield') {
     focusfld='d1#$'+focusfld;
 }

 if (focusdata.length==1) {

  try {
     document.getElementById(focusfld).focus();
      if (arguments.length>1)
      {
      if (arguments[1]=='*highlight' || arguments[1]=='*hi')
       document.getElementById(focusfld).select();
      }
  }
  catch (e) {
            try {
            eval('document.forms.'+focusform+'.'+focusfld+'.focus()');
            if (arguments[1].toUpperCase()=='*HIGHLIGHT' || arguments[1].toUpperCase()=='*HI')
             eval('document.forms.'+focusform+'.'+focusfld+'.select()');
                }  catch (e2) {return}
            }
 }

 else {
  try {
      var index=focusdata[1];
      index=index-1;
      var obj=document.getElementsByName(focusfld);
      obj[index].focus();
      if (arguments[1].toUpperCase()=='*HIGHLIGHT' || arguments[1].toUpperCase()=='*HI')
        obj[index].select();
  } catch (e2) {return}

 }

}



function focusOnCol(fld) {
  var obj=document.getElementsByName(fld);
  if (obj == null) return;
    if (obj[0].tagName != "TD") {
     try {
      obj[currentrow].focus();
      if (arguments[1].toUpperCase()=='*HIGHLIGHT' || arguments[1].toUpperCase()=='*HI')
       obj[currentrow].select();
     } catch (e) {}
    }
}


function numeric(intext,deci) {
 var nbr=convertToNumber(intext); 
 if (nbr==0 || deci==undefined) {return nbr}
 deci=convertToNumber(deci);
 nbr=convertToNumber(nbr.toFixed(deci)); 
 return nbr;
}   


function convertToNumber(intext) {
 if (intext=="") {return 0;}

 intext=''+intext;
 var len=intext.length;
 var nvalue="";
 for (var i = 0; i < len; i++)
 {
  var c = intext.charAt(i);
  if (c=='1' || c=='2' || c=='3' || c=='4' || c=='5' || c=='6' || c=='7' || c=='8' || c=='9' || c=='0' || c=='.' || c=='-')
     nvalue=nvalue+c;
 }
 if (nvalue=="") {return 0;}
    return parseFloat(nvalue);
}


function numValueOf(fld) {
 try {
 var value=numeric(valueOf(fld));
 return value;
 } catch (e) {return 0;};
}


function numValueOfCol(fld) {
 try {
 var value=numeric(valueOfCol(fld));
 return value;
 } catch (e) {return 0;};
}


function numContentOf(cnt) {
 try {
 var value=numeric(contentOf(cnt));
 return value;
 } catch (e) {return 0;};
}

function numToWords(s){
  var th = ['','thousand','million', 'billion','trillion'];
  // uncomment this line for English Number System
  // var th = ['','thousand','million', 'milliard','billion'];
  var dg = ['zero','one','two','three','four', 'five','six','seven','eight','nine'];
  var tn = ['ten','eleven','twelve','thirteen', 'fourteen','fifteen','sixteen', 'seventeen','eighteen','nineteen'];
  var tw = ['twenty','thirty','forty','fifty', 'sixty','seventy','eighty','ninety'];
  s = ''+numeric(s);
  var x = s.indexOf('.');
  if (x == -1) x = s.length;
  if (x > 15) {alert('The amount to covert is too large'); return 'The amount to convert is too large'};
  var n = s.split('');
  var str = '';
  var sk = 0;
  for (var i=0; i < x; i++) {
      if ((x-i)%3==2) {
         if (n[i] == '1') {
            str += tn[Number(n[i+1])] + ' ';
            i++;
            sk=1;
        } 
        else 
        if (n[i]!=0) {
           str += tw[n[i]-2] + ' ';sk=1;
        }
      } 
      else
      if (n[i]!=0) {
         str += dg[n[i]] +' ';
         if ((x-i)%3==0) str += 'hundred ';
         sk=1;
      }
      if ((x-i)%3==1) {
         if (sk) str += th[(x-i-1)/3] + ' ';
          sk=0;
      }
   } 
   if (x != s.length) {
      var y = s.length;
      str += 'point ';
      for (var i=x+1; i<y; i++) str += dg[n[i]] +' ';
   }
   return str.replace(/\s+/g,' ');
}

function editWord(val,fmat,prefix) {
  var result='';
  if (!prefix) {var prefix=''}
  var f=fmat.length-1;
  val=''+val; 
  val=''+numeric(val.strip('.')); 
  var y=val.length-1; 
  for (var i=0; i<val.length; i++) {
      if (fmat.charAt(f)==' ') {
          result=val.charAt(y)+result;
          y=y-1;
      }
      else {
         if (fmat.charAt(f)=='&') {
            result=' '+result;
            i=i-1;
         }
         else {
            result=fmat.charAt(f)+result;
            i=i-1;
         } 
      }
      f=f-1;
      if (f<0) return prefix+result
  } 
  return prefix+result;
}


function editField(fieldname, decimal) {

var editcode='0';
  if (arguments.length>2) editcode=arguments[2];

try {fieldvalue=fieldname.value} catch(e) {}
if (fieldvalue==undefined) {
   fieldname=document.getElementById(fieldname);
   fieldvalue=fieldname.value;
}

if (fieldvalue=="") {return true;}

var len=fieldname.value.length; 
var flen=fieldname.size; 
if (arguments.length>3) flen=numeric(arguments[3]);
var fvalue="";
var c2=0;
var dectext="";

for (var i = 0; i < len; i++)
{
var c = fieldvalue.charAt(i);
if (c!='0' || fvalue!="")
if (c!=',' && c!='/') fvalue += c;
}

if (fvalue=="") fvalue="0";

if (isNaN(fvalue)) {
 if (!hideedit) {
  alert("Oops!  That does not appear to be a valid number");
  fieldname.focus();
  fieldname.select();
 }
  hideedit=false;
  return false;
}

for (i = 0; i < len; i++)
 {
 c = fvalue.charAt(i);
  if (c=='1' || c=='2' || c=='3' || c=='4' || c=='5' || c=='6' || c=='7' || c=='8' || c=='9' || c=='0')
   {
    c2=c2+1;
      if (c2>flen) {
       if (!hideedit) {
        alert('Oops..too many digits entered. Enter no more than '+flen+' digits');
        fieldname.focus();
        fieldname.select();
        hideedit=false;
        return false;
       }
       else {
         //len=flen;
         //fvalue=''+numeric(fieldvalue); 
         //l1=fvalue.length;
         //var l2=flen;
         //if (numeric(decimal)>0) {l2=l2+1}
         //if (l1>l2) {
             //fvalue=fvalue.sst((l1-l2+1),l2);
         //}
         break;
       }
      }
  }
}



var dotpos=fvalue.indexOf('.');
if (dotpos != -1)
{
 dectext = fvalue.substring(dotpos+1, flen);
 if (dectext.length > decimal)
 {
   if (!hideedit) {
    alert ("Oops!  Please enter a number with up to " + decimal + " decimal places");
    fieldname.focus();
    fieldname.select();
   }
  hideedit=false;
  return false;
 }

 hideedit=false;

}

//if (editcode=="0" || editcode=="J" || editcode=="Y" || editcode== "D" || editcode== "M")) {
 editNumeric(fieldname, len, decimal, dectext, fvalue, editcode);
//}

hideedit=false;
return true;

}


function editNumeric(fieldname, len, decimal, dectext, fvalue, editcode) {

var decimalmet=false;
var lastpos=len-1;
var c2=0;
var c="";
var i=0;
var fieldvalue="";
if (!editcode) {
   var editcode='0';
}    

  if (editcode=='0' || editcode=='*0') //Start-Editcode(0)
  {
    for (i = 0; i < len; i++)
    {
    c = fvalue.charAt(i);
     if (c=='1' || c=='2' || c=='3' || c=='4' || c=='5' || c=='6' || c=='7' || c=='8' || c=='9' || c=='0' || c=='.' || c=='-') {
    fieldvalue += c;}
    }
  }  // End-Editcode(0)


editcode=editcode.toUpperCase().strip('*');

if (editcode=='J' || editcode=='N')  // Start-Editcode(J)
{
if (dectext.length>0) decimalmet=true;
for (i = 0; i < len; i++)
{
  c = fvalue.charAt(lastpos);
    if (decimalmet==false) {
      if (c=='1' || c=='2' || c=='3' || c=='4' || c=='5' || c=='6' || c=='7' || c=='8' || c=='9' || c=='0')
        {
        if (c2==3) {fieldvalue=','+fieldvalue; c2=0}
        c2=c2+1;
        fieldvalue = c+fieldvalue;
        }
     }
    else {if (c=='.') decimalmet=false;}
  lastpos=lastpos-1;
 }

if (fvalue.charAt(0)=='-') fieldvalue='-'+fieldvalue;

 var decdif=decimal-dectext.length
  if (decdif > 0) {
     for (var i = 1; i <= decdif; i++) dectext=dectext+'0';
  }

  if (dectext != "") fieldvalue=fieldvalue+'.'+dectext;
}  // End-Editcode(J)



if (editcode=="Y" || editcode=="D" || editcode=="M")  // Start-Editcode(Y/M/D)
{
var slashes=0;
var betweenslashes=2;
if (editcode=="D" || editcode=="M") betweenslashes=4;
for (i = 0; i < len; i++)
{
  c = fvalue.charAt(lastpos);
      if (c=='1' || c=='2' || c=='3' || c=='4' || c=='5' || c=='6' || c=='7' || c=='8' || c=='9' || c=='0')
      {
        if (c2==betweenslashes && slashes<2) {
        fieldvalue='/'+fieldvalue; c2=0; slashes=slashes+1; betweenslashes=2;
        }
      c2=c2+1;
      fieldvalue = c+fieldvalue;
      }
  lastpos=lastpos-1;
}

}  // End-Editcode(Y/M/D)


if (editcode=="T" || editcode=="A")  // Start-Editcode(T)
{ 
   fieldvalue=editWord(fvalue,'  :  :  '); 
}

if (editcode=="S")  // Start-Editcode(S)
{ 
   var hr=0;
   var mn=0; 
   var ampm='am'
   var f=editWord(fvalue,'  :  ').split(':'); 
   if (f.length>=1) {
      hr=numeric(f[0]);
      if (f.length>1) {mn=numeric(f[1])}
      if (hr>12 || (hr==12 && mn>0) ) {
          ampm='pm';
          if (hr>12) {
             hr=hr-12;
          }
      }
   }
   hr=''+hr; mn=''+mn;   
   if (hr.length==1) {hr='0'+hr} 
   if (mn.length==1) {mn='0'+mn} 
   fieldvalue=hr+':'+mn+ampm;
}

 if ((fieldvalue=="" || fieldvalue==" ") && editcode != 'N') fieldvalue="0";
 if (fieldvalue=="0.00" && editcode=="J") {
     fieldvalue=".00";
 }
 else {
    if (editcode=='N' && numeric(fieldvalue)==0) {fieldvalue=''};
 }
 
fieldname.value=fieldvalue;

}




//-- Convert a field to uppercase
function setUpper(myfield) {
  if (myfield.inchange)return;
  myfield.inchange=true;
  myfield.value=myfield.value.toUpperCase();
  myfield.inchange=false;
}
//-->

setupper=setUpper;

function upperVar() {
  for (var i=0; i<arguments.length; i++) {
      try {
          changeVar(arguments[i], valueOf(arguments[i]).toUpperCase());
      }
      catch(e) {}
  }
}  



function keyPressedToUpper() {
  var key = window.event.keyCode;
  if ((key > 0x60) && (key < 0x7B))
  window.event.keyCode = key-0x20;
}



function enterKey()
{
if (eventKey()=='13') {
return true;
}
return false;
}


function acceptEnter() {
 var sobj=event.srcElement;
 if (sobj.tagName=='textarea') return;
 if (eventKey()=='13') {
    try {
        if (sobj.upper) {sobj.value=sobj.value.toUpperCase();}
        else {
            if (sobj.className=='numeric') {
                if (sobj.editcode) {
                    editField(sobj,sobj.decimal,sobj.editcode,sobj.length);
                }
            }
        }  
    } catch(e) {}
    for (var i=0; i<arguments.length; i++) {
        if (isVisible(arguments[i])) {
           document.getElementById(arguments[i]).click();
           return;
        }
    } 
 }
}


function getForm() {

 ypos=getPosition(e).y;
 xpos=getPosition(e).x;
 selectMouse();

try {

clickedrow=-1;
clickedtable="";

try {
var prevobj=event.srcElement.parentNode;
} catch (e) {return}

for (var i=0; i < 10; i++)
{

 if (prevobj.tagName=='TR' && clickedrow==-1) {clickedrow=prevobj.rowIndex;}
 if (prevobj.tagName=='TABLE' && clickedtable=="") clickedtable=prevobj.id

 try {
     if (prevobj.tagName=='FORM' || prevobj.tagName=='BODY') {i=11;}
      else {prevobj=prevobj.parentNode};
 } catch (e) {i=11}
}

try {if (prevobj.tagName=='FORM') {focusform=prevobj.name}} catch (e) {}

} catch (e2) {}

}


function getConfirm(confirmmsg) {
  if (showModalDialog) {
//  var aform;
//  aform=form1.elements;
    var mymsg = new Object();
    mymsg.msg=confirmmsg;
    var confirmed = showModalDialog("/pcstools/confirm.pgm",mymsg,"center=yes;dialogWidth=135pt;dialogHeight=100pt;status:no;help:no;unadorned:yes");
    if (confirmed=='YES') {return true;}
    else {return false;}
  }
  return false;
 }


function formatTable(oTable) {
if (!oTable) {
    var oTable=currenttable; 
}
var oddcolor=oddrowcolor
var evencolor=evenrowcolor
if (arguments.length > 1)  oddcolor=arguments[1];
if (arguments.length > 2)  evencolor=arguments[2];
 var trows = document.all(oTable).rows;
 for (var i = 0; i < trows.length; i++) {
 trows[i].setAttribute('id', oTable+'$#$'+i);
  if (i % 2 == 0) {
   trows[i].style.backgroundColor = evencolor;
   //trows[i].style.color = "000000";
  } else {
   trows[i].style.backgroundColor = oddcolor;
   //trows[i].style.color = "black";
  }
 }
}


function addRow (tableid) {
  if (!tableid) {
     var tableid=currenttable;
  }
  var tableinfo=tableid.split(':');
  tableid=tableinfo[0];
  var doscroll=tableinfo[1];
  var table = document.getElementById(tableid); 
  var insertat=table.rows.length;
  if (newrowpos>=-1) {insertat=newrowpos;}
  newrowpos=-9;
  if (arguments.length > 1) {
    var row = table.insertRow(insertat);
    if (document.all) {
      for (var i = 1; i < arguments.length; i++) {
        var cell = row.insertCell(i - 1);
        cell.innerHTML = arguments[i];
      }
    }
    else if (document.getElementById) {
      for (var i = arguments.length - 1; i >= 1; i--) {
        var cell = row.insertCell(arguments.length - 1 - i);
        cell.appendChild(document.createTextNode(arguments[i]));
        cell.innerHTML = arguments[i];
      }
    }
  }
  try {
   if (doscroll.toUpperCase()=='*SCROLL') {rows[currentrow].scrollIntoView(true)}
  } catch (e){};

  return row.rowIndex;
}

function newRow(intable, insertat) {
  var otable=intable.split(':')[0];
  var otablehead=otable+"head";
  var tableh = document.getElementById(otablehead);
  var headrow = tableh.getElementsByTagName("tr");
  var headrow = headrow[0].getElementsByTagName("td");
  if (insertat || insertat==0) newrowpos=insertat;
  else newrowpos=-9; 
  var txt='addRow("'+intable+'",';
  var indx=new Array();
  for (var i=0; i<headrow.length; i++) {
    if (headrow[i].className!='emptycol') {
     txt += '" "';
     if (headrow[i].className=='columnseparator') {
        txt += ' ';
        indx[i]='s';
     }
     else {indx[i]=' ';} 
     if (((i+1)<headrow.length)  && (headrow[i+1].className!='emptycol')) txt += ',';
    }
  }
  txt += ')'; 
  var nRow=eval(txt); 
  posTabCursor(otable,nRow);
  readRow();
  var obj=rows[currentrow]
  obj.setAttribute('id', otable+'$#$'+currentrow);
  if (nRow % 2 == 0) {
   obj.style.backgroundColor = evenrowcolor;
  //obj.style.color = "000000";
  } else {
   obj.style.backgroundColor = oddrowcolor;
   //obj.style.color = "black";
  }

  eval('var coldef=t$$d$_'+otable); 
  var i2=-1;
  for (var i=0; i<headcol.length; i++) {
      try { 
          if (indx[i]=='s') {col[i].className='columnseparator2'} 
          else {i2 += 1; applyColDef('new', coldef,col[i],otable,i2)}
      } catch(e) {}; 
  } 

  //var ptrobj=eval('tabrowclicked.'+otable);
  //if (ptrobj != obj) { 
  //    obj.lang=obj.style.backgroundColor;       
  //    obj.style.backgroundColor=rowselectcolor;       
  //    try {                                                        
  //        eval('tabrowclicked.'+otable+'.style.backgroundColor=tabrowclicked.'+otable+'.lang'); 
  //    } catch (e) {}                                               
  //    try {                                                        
  //       eval('tabrowclicked.'+otable+'=obj');            
  //    } catch (e) {}
  //} 
}


function deleteRow() {
  var tableid=currenttable;
  var dltrow=currentrow;
  if (arguments.length>0) tableid=arguments[0];
  if (arguments.length>1) dltrow=arguments[1];
  var table = document.getElementById(tableid);
  table.deleteRow(dltrow);
}


function clearTable(tableid) {
  if (!tableid) {
     var tableid=currenttable;
  }
  var table = document.getElementById(tableid);
  var forever=true;
 while (forever) {
  try { table.deleteRow(0); } catch(e) {return}
 }
}


function say(msg,secondstoclear) {
  try {msgarea.innerHTML = msg;}
  catch (e) {
        try {
             window.status=msg;
        } catch(e2) {return}
  }
  if (secondstoclear) {
     secondstoclear=numeric(secondstoclear)*1000;
     if (secondstoclear<=0) secondstoclear=2000;
     setTimeout('say("")',secondstoclear);
  }
}


//function fullScreen(theURL) {
//window.open(theURL, '', 'channelmode=yes,type=fullWindow,scrollbars=yes,status=yes');
//}

//function cursorwait(obj)
//{
//requiredobj=obj;
//obj.style.cursor='wait';
//document.body.style.cursor='wait';
//}

function getTabIndex(otable)
{
tabindex=-1;
       for (var i=1; i<=20; i++) {
           if (tablenames[i]=="" || tablenames[i]==otable) {
              if (tablenames[i]=="") {
                 var tabobj=document.getElementById(otable);
                 if (!tabobj || tabobj.tagName !='TABLE') {return}
              }
              tabindex=i;
              break;
           }
        }
 }

function posTabCursor(otable, position)
{
eof=false;
getTabIndex(otable);
   if (tabindex==-1) { eof = true; return;}
   if (position=='top' || position=='*top' || position<0) position=0;
   if (position=='END' || position=='*end') position=-9;
   if (isNaN(position)) position=0;
var table = document.getElementById(otable);
var otablehead=otable+"head";
var table2 = document.getElementById(otablehead);
   if (tablenames[tabindex]=="") tablenames[tabindex]=otable;
   tabrows[tabindex] = table.getElementsByTagName("tr");
   tabheadrows[tabindex] = table2.getElementsByTagName("tr");
   if (position==-9) position=tabrows[tabindex].length;
   tablecursor[tabindex] = position;
 }

function readRow()
{
eof=false;
if (arguments.length > 0)  getTabIndex(arguments[0]);

    if (tabindex==-1) {
       eof=true;
       return(0);
    }
var i=tablecursor[tabindex];
    if ((i+1)>tabrows[tabindex].length) {
       eof=true;
       return(0);
    }
    rows = tabrows[tabindex];
    col = rows[i].getElementsByTagName("td");
    headrows = tabheadrows[tabindex];
    headcol = headrows[0].getElementsByTagName("td");
    currentrow=i;
    currenttable=tablenames[tabindex]
    tablecursor[tabindex]=i+1;
    return(i);
}

function moreRow()
{
var tabtempval = tablecursor[tabindex];
var eofsaved=eof;
readRow();
tablecursor[tabindex]=tabtempval;
if (eof == true) {eof=eofsaved; return false;}
else {eof=eofsaved; return true};
}


function readClickedRow(tbl){
  var table='';
  var clkrow=''; 
  if (tbl) {
     try {clkrow=(eval('tabrowclicked.'+tbl+'.rowIndex'))}
     catch(e) {eof=true; return -1}
     if (clkrow==undefined) {eof=true; return -1}
     table=tbl;
  }
  else {
       if (clickedtable=='') {eof=true; return -1;}
       table=clickedtable;
       clkrow=clickedrow;  
  } 
  posTabCursor(table, clkrow); 
  readRow();
  if (!eof) {return currentrow;}
  else  {return -1};
}

function cancelRowClick() {
 undoclickrow=true;
}

function readCheckedRow(otable, optfld)
{
checkedrowtable=otable;
checkedrowoptfld=optfld;
var uncheck='KEEP'; //or UNCHECK
if (arguments.length > 2) uncheck=arguments[2].toUpperCase();
var i=readRow(otable);
  if (eof == false) {
    var opt=document.getElementsByName(optfld);
    var max = opt.length;
    while (eof == false) {
      if (opt[i].checked == true) {
        col = rows[i].getElementsByTagName("td");

        if (uncheck != 'KEEP') {
        opt[i].checked = false;
        var tdobj = opt[i].parentNode;
        var trobj = tdobj.parentNode;
        if (trobj.lang !="") trobj.style.backgroundColor=trobj.lang;
        }

        return(i);
      }
    i=readRow();
    }
   }
  eof = true;
  return(0);
  }

function moreCheckedRow()
{
var tabtempval = tablecursor[tabindex];
var eofsaved=eof;
readCheckedRow(checkedrowtable,checkedrowoptfld,'keep');
tablecursor[tabindex]=tabtempval;
if (eof == true) {eof=eofsaved; return false;}
else {eof=eofsaved; return true};
}


function valueOfCol(fld) {
 usehtml=false; 
 fld=fld.split(':');
 if (fld.length>1) {
     if (fld[1]=='html') {
         usehtml=true;
     }
 }
 fld=fld[0];
 var obj=document.getElementsByName(fld); 
 if (obj == null) return;

 if (obj[0].tagName != "TD") {
    try {return(obj[currentrow].value);} catch (e) {return}
    return;
 }
 for (var i=0; i<headcol.length; i++) {
      if (headcol[i].id==fld) {
          if (!usehtml) {
              if (headcol[i].fldtype && headcol[i].fldtype=='numeric') {return numeric(col[i].innerText)};
              else {return(col[i].innerText)};
          }
          return col[i].innerHTML;
      }
 }
}



function changeCol(from, tovalue, type)
{
 var obj=document.getElementsByName(from);
 if (obj == null) return;
 if (type) {
    type=''+type;
    type=type.toLowerCase();
    if (type=='date') {type='*date'}  
 }
 if (obj[0].tagName != "TD") {
    //try {obj[currentrow].value=tovalue;} catch (e) {return}
    try {
         var$_object=true;
         changeVar(obj[currentrow],tovalue);
    }    catch(e) {var$_object=false; return}
    return;
 }

   for (var i=0; i<headcol.length; i++)
   if (headcol[i].id==from) {
      col[i].innerHTML=tovalue; 
      try {
          var i2=i;
          if (col[i+1] && col[i+1].className=='columnseparator2') {i2=i/2}
          eval('var coldef=t$$d$_'+currenttable);
          applyColDef('change',coldef,col[i],currenttable,i2,type);  
      } catch(e) {};
      return;
   }
}



function setColAttr(clumn, attr, tto)
{
  var obj=document.getElementsByName(clumn);
  if (obj == null) return;

  for (var i=0; i<headcol.length; i++)
  if (headcol[i].id==clumn){
     try {eval('col[i].style.'+attr+'="'+tto+'"');} catch(e) {}  
  }
}



function eventKey() {
var keycode=0;
if (window.event) keycode = window.event.keyCode;
return(keycode);
}


var$_object=false;
function changeVar(invar, newvalue, fldtype) {
 var istext=false;
 if (!fldtype) {var fldtype=''}
 var fld=''; 
 if (var$_object==false) {
     fld=document.getElementById(invar);
 }
 else {
    var$_object=false;
    fld=invar;
 }    
 if (!fld) return;
 if (fld.className !='datefield') {
    try {
         fld.value=newvalue.trimr();
         istext=true;
    }
    catch (e) {fld.value=newvalue}

    if (fld.fldtype=='numeric' && fld.editcode) {
        fld.value=edit(newvalue,fld.decimal,fld.editcode,fld.length);
    } 
    else {
       if (fld.fldtype == 'char') {
           if (istext==false) {fld.value=''+fld.value};
           var len=numeric(fld.length);
           if (len<fld.value.length) {
              try {fld.value=fld.value.sst(1,len)} catch(e){} 
           }
           if (fld.upper != undefined) {fld.value=fld.value.toUpperCase()} 
       } 
    }
 }
 else {
      var d1='d1#$'+invar;
      var d2='d2#$'+invar;
      var d3='d3#$'+invar;
      var d1obj=document.getElementById(d1); if (!d1obj) return;
      var d2obj=document.getElementById(d2); if (!d2obj) return;
      var d3obj=document.getElementById(d3); if (!d3obj) return;
      if (d3obj.dt.sst(1,1)=='d') {
         if (fldtype=='date' || fldtype=='*date') {
            var fmt=d3obj.dt.sst(2,1);
            newvalue=numeric(newvalue).chgDateFmt('Y',fmt);
         }
         if (d1obj.size==4) {
            newvalue=editWord(newvalue,'    /  /  ').split('/')
         }	
         else {
            newvalue=editWord(newvalue,'  /  /    ').split('/')
         } 
         d1obj.value='';
         d2obj.value='';
         d3obj.value=''; 
         if (newvalue.length>2) {d3obj.value=newvalue[2]};
         if (newvalue.length>1) {d2obj.value=newvalue[1]};
         if (newvalue.length>0) {d1obj.value=newvalue[0]};
         while (d1obj.value.length<d1obj.size) {d1obj.value='0'+d1obj.value;}
         while (d2obj.value.length<d2obj.size) {d2obj.value='0'+d2obj.value;}
         while (d3obj.value.length<d3obj.size) {d3obj.value='0'+d3obj.value;}
         if ((''+d1obj.value+d2obj.value+d3obj.value)=='00000000') {
             d1obj.value='';
             d2obj.value='';
             d3obj.value='';
         }
      }
      else {
         newvalue=''+newvalue;
         newvalue=newvalue.trim();
         if (newvalue.length==6) newvalue='0'+newvalue;
         if (newvalue.length==7) {
            if (newvalue.sst(6,2)=='pm') {
               var hr=numeric(newvalue.sst(1,2))+12;
               newvalue=hr+':'+newvalue.sst(4,2); 
            }      
         }
         newvalue=editWord(newvalue,'  :  ').split(':');
         d1obj.value='';
         d2obj.value='';
         d3obj.value='AM'; 
         if (newvalue.length>1) {d2obj.value=newvalue[1]};
         if (newvalue.length>0) {d1obj.value=newvalue[0]}; 
         if (d3obj.dt=='ts') {
             var hr=numeric(d1obj.value);
             if (hr>12) {
                 d3obj.value='PM';
                 hr=hr-12;
                 d1obj.value=''+hr;
             }
         }
         while (d1obj.value.length<d1obj.size) {d1obj.value='0'+d1obj.value;}
         while (d2obj.value.length<d2obj.size) {d2obj.value='0'+d2obj.value;}
         if ((''+d1obj.value+d2obj.value)=='0000') {
             d1obj.value='';
             d2obj.value='';
             if (d3obj.dt=='ds') {d3obj.value='AM'}
         }
      } 
 }
 return;
}



function assignVar(invar, invar2) {
 try {
   var fld1=document.getElementById(invar);
   var fld2=document.getElementById(invar2);
   var tofmt='';
   if (fld1.className=='datefield' && fld2.className=='datefield') {
       var d31='d3#$'+invar;
       var d32='d3#$'+invar2;
       d31=document.getElementById(d31);
       d32=document.getElementById(d32);
       if (d31.dt.sst(1,1)=='d' && d32.dt.sst(1,1)=='d') {
          tofmt=d31.dt.sst(2,1);
       }
   } 
   if (!tofmt) {changeVar(invar,valueOf(invar2))}
   else {changeVar(invar,numValueOf(invar2).chgDateFmt('y',tofmt))} 
 } catch (e) {}
 return;
}


function valueOf(invar) {
 var obj=document.getElementById(invar); 
 if (!obj) return '';
 if (obj.className!='datefield') { 
    try {
       var fldvalue=document.getElementById(invar).value;
       if (obj.fldtype=='numeric') {fldvalue=numeric(fldvalue)} 
       return fldvalue;
    } catch (e) {return '';}
 }
 else {
    var d1='d1#$'+invar;
    var d2='d2#$'+invar;
    var d3='d3#$'+invar;
    var d1obj=document.getElementById(d1); if (!d1obj) return '';
    var d2obj=document.getElementById(d2); if (!d2obj) return '';
    var d3obj=document.getElementById(d3); if (!d3obj) return '';
    if (d3obj.dt.sst(1,1)=='d') {
        var fmt=d3obj.dt.sst(2,1);
        if (fmt=='y') {return numeric(d1obj.value+''+d2obj.value+''+d3obj.value)}
        if (fmt=='m') {return numeric(d3obj.value+''+d1obj.value+''+d2obj.value)}
        return numeric(d3obj.value+''+d2obj.value+''+d1obj.value);
    }
    else {
        if (d3obj.value=='PM') {
          var hr=numeric(d1obj.value);
          hr=hr+12;
          return hr+''+d2obj.value; 
        }
        else {
          return d1obj.value+''+d2obj.value;
        } 
    }
 }
}


function hideElement() {
  for (var i = 0; i < arguments.length; i++) {
      var obj = arguments[i];
      try {document.getElementById(obj).style.display="none";} catch (e) {}
      try {document.getElementById(obj+'_label').style.display="none";} catch (e) {}
      try {document.getElementById(obj+'_calendar').style.display="none";} catch (e) {}
      try {document.getElementById(obj+'_search').style.display="none";} catch (e) {}
 }
 return;
}

function showElement() {
  for (var i = 0; i < arguments.length; i++) {
      var obj = arguments[i];
      try {
          if (document.getElementById(obj).nevershow=='yes') {continue}
      }   catch(e) {} 
      try {document.getElementById(obj).style.display="";} catch (e) {}
      try {document.getElementById(obj+'_label').style.display="";} catch (e) {}
      try {document.getElementById(obj+'_calendar').style.display="";} catch (e) {}
      try {document.getElementById(obj+'_search').style.display="";} catch (e) {}
 }
 return;
}


function neverShow() {
  for (var i = 0; i < arguments.length; i++) {
     try {
          hideElement(arguments[i]);
          obj=document.getElementById(arguments[i]); 
          obj.nevershow='yes'; 
     }
     catch(e) {} 
 }
}

function changeContent(element, htmltext) {
if (element=='*import') element='divextform';
try {
  document.getElementById(element).innerHTML=htmltext;
  } catch (e) {document.getElementById(element).innerTEXT=htmltext;}
return;
 }

function assignContent(element, element2) {
  if (element=='*import') element='divextform';
  document.getElementById(element).innerHTML=document.getElementById(element2).innerHTML
  return;
 }


function contentOf(element,type) {                            
if (!type) var type='text'                                    
if (element=='*import') element='divextform';                 
if (!type || type=='text' || type=='*text')                   
   return document.getElementById(element).innerText;         
else                                                         
   return document.getElementById(element).innerHTML;         
}                                                            

//function SaveRowSelected(otable) {
//getTabIndex(otable);
//tabrowsslt[tabindex]=tabrowsslt[tabindex]+currentrow+'|';
//return;
// }


function changeCursor(cursortype) {
var coverobj=document.getElementById('cover');
if (coverobj==null) {
var cover=document.createElement('div');
    cover.id="cover";
    cover.className="loadingBackground";
    cover.style.display="none";
    document.getElementsByTagName('body')[0].appendChild(cover);
 // workarea.appendChild(cover);
}

var form=focusform
if (arguments.length > 1)  form=arguments[1];
try {
  if (cursortype=='wait') {showElement('cover')}
  if (cursortype=='default') {hideElement('cover'); importtype='*window'}
}
catch (e2) {}
  document.body.style.cursor=cursortype;
}





function  checkRowField(chkfld) {

    var opt=document.getElementsByName(chkfld);
    var i=currentrow;
    var onoff='*ON';

  if (arguments.length>1) onoff=arguments[1].toUpperCase();

    if (i<opt.length) {

    var tdobj=opt[i].parentNode;
    var trobj=tdobj.parentNode;

     if (onoff=='*ON' && opt[i].checked == false) {
//   if (onoff=='*on') {
      opt[i].checked = true;
      trobj.lang=trobj.style.backgroundColor;

      var selectcolor=rowselectcolor;
      try {
          var rowsltcolor=eval('tab$$selectcolor.'+clickedtable);
          selectcolor=rowsltcolor;
      } catch(e) {}

      trobj.style.backgroundColor=selectcolor;
     }

     if (onoff=='*OFF' && opt[i].checked == true) {
//   if (onoff=='*off') {
      opt[i].checked = false;
//    if (lasttrobj.id != "") trobj.style.backgroundColor=trobj.lang;
      trobj.style.backgroundColor=trobj.lang;
     }

    }

  }


function  checkCol(chkfld) {
    var opt=document.getElementsByName(chkfld);
    var i=currentrow;
    var onoff='*ON';
    if (arguments.length>1) onoff=arguments[1].toUpperCase();
    try { 
        if (i<opt.length) {
           if (onoff=='*ON' && opt[i].checked == false) {
              opt[i].checked = true;
           }
           else {
                if (onoff=='*OFF' && opt[i].checked == true) {
                  opt[i].checked = false;
                }
          }
        }
    }  catch (e) {return false}
}


function popUpContent(content) {
var parent="";
var toppos=ypos;
var leftpos=xpos;
var offset=0;
var transform='';
content=content.split(':');
if (content.length==2) {transform=content[1].toUpperCase()}
if (content.length>2) {transform=content[1].toUpperCase()+':'+content[2].toUpperCase()}
content=content[0];
try {
  parent = event.srcElement;
  toppos=getPosition(e).y;
  leftpos=getPosition(e).x;
}
catch (e) {}
var ref = '*CURSOR';
var posn = '*UNDER';
if (arguments.length>1) ref=arguments[1].toUpperCase();
if (arguments.length>2) posn=arguments[2].toUpperCase();

try {
var obj=document.getElementById(content);
} catch (e2) {alert('required DIV - '+content+' - not found'); return}

if (obj.className.search("window")!=-1 || obj.className.search("Window")!=-1) {
alert('popUp not allowed for system Windows');
return;
}

    for (var i=1; i<=popcount; i++) {
        if (popform[i]==content) {
         for (var j=i+1; j<=popcount; j++) {
           if (pophow[j]=='') {
              document.getElementById(popform[j]).style.display='none';
           }  else howClosePopUps(popform[j],pophow[j]);
           pophow[j]='';
         }
        popcount=i-1;
        break;
        }
     }


try {

   if (ref !='*PARENT' && ref !='*CURSOR') {
      parent=document.getElementById(ref);
      ref='*PARENT';
   }

   if (ref=='*PARENT') {
    var posnar=posn.split('+');
    if (posnar.length>1) {
       if (!isNaN(posnar[1])) {offset=numeric(posnar[1])}
    }
    else {
       posnar=posn.split('-');
       if (posnar.length>1) {
          if (!isNaN(posnar[1])) {offset=0-numeric(posnar[1])}
       }
    }
    posn=posnar[0];
    if (posn=='*UNDER') {
     toppos=parent.offsetTop + parent.offsetHeight-parent.clientTop+offset;
     leftpos=parent.offsetLeft-parent.clientLeft;
    }
    else
    {
     toppos=parent.offsetTop-parent.clientTop;
     leftpos=parent.offsetLeft + parent.offsetWidth-parent.clientLeft+offset;
    }
     while (parent.offsetParent) {
       parent=parent.offsetParent;
       leftpos += parent.offsetLeft+parent.clientLeft;
       toppos += parent.offsetTop+parent.clientTop;
     }
    }

} catch (e) {};

  ispop=true;
  popcount=popcount+1;
  popform[popcount]=content;
  pophow[popcount]='';
  //zidx=zidx+1;
  obj.style.zIndex=10000;
  obj.style.display="";
  obj.style.top=toppos;
  obj.style.left=leftpos;

  if (transform !='') {
     var how=transform.toUpperCase();
     pophow[popcount]=how;
     if (how.search('FADEIN')!=-1) {fadeIn(content)}
     else {
       if (how.search("SLIDE")!=-1) {
          var ptop=toppos;
          var pleft=leftpos;
          var parms=how.split(':');
          if (parms.length>1) {ptop=parms[1]}
          if (parms.length>2) {pleft=parms[2]}
          obj.style.top=0;
          obj.style.left=0;
          slide(content,ptop,pleft);
        }
        else {
            if (how.search("TRANSIT")!=-1) {
               var nbr=1;
               var parms=how.split(':');
               if (parms.length>1) {nbr=parms[1]}
               transit(content,nbr,'*on');
            }
            else {
                 if (how.search("RESIZE")!=-1) {
                    var pheight='#';
                    var pwidth='#';
                    var parms=how.split(':');
                    if (parms.length>1) {pheight=parms[1]}
                    if (parms.length>2) {pwidth=parms[2]}
                    pophow[popcount]='RESIZE:1';
                    resize(content,pheight,pwidth,'showElement("'+content+'")');
                 }
            }
        }
     }
  }

}


function  protect() {

var form="";
var obj="";
var calfld;

for (var i=0; i<arguments.length; i++)
{

 var element=arguments[i].split(':');

 if (element[0]=='*form') {

  if (element.length==1) form=focusform;
     else form=element[1];
  try {
   obj=document.getElementById(form);
  } catch (e) {alert('required form - '+form+' - not found'); return}

   for (var j=0; j<obj.length; j++) {
      if (obj[j].tagName != 'BUTTON' && obj[j].tagName != 'FIELDSET') {
          try {obj[j].disabled=true} catch (e2) {};
      } 
      try {
          calfld=obj[j].name.split('d1#$')[1];
          try {document.getElementById(calfld+'_calendar').style.visibility='hidden';} catch(e){};
          try {document.getElementById(calfld+'_search').style.visibility='hidden';} catch(e){};
      } catch(e) {};
      try {document.getElementById(obj[j].name+'_search').style.visibility='hidden'} catch(e) {};
      if ((obj[j].tagName == 'INPUT' || obj[j].tagName == 'TEXTAREA') && obj[j].className != 'outputastext') {
          try {obj[j].style.backgroundColor="#f0f8ff"} catch(e) {};
      }
   }

 }

 else
 {
 try {
     obj=document.getElementById(element[0]); 
     if (obj.tagName != 'BUTTON' && obj.tagName != 'FIELDSET') {
        try {document.getElementById(element[0]+'_calendar').style.visibility='hidden'} catch(e) {};
        try {document.getElementById(element[0]+'_search').style.visibility='hidden'} catch(e) {};
        if (obj.className != "datefield") {  
           try {obj.disabled=true} catch (e2) {};
           if ((obj.tagName == 'INPUT' || obj.tagName == 'TEXTAREA') && obj.className != 'outputastext') {
               try {obj.style.backgroundColor="#f0f8ff"} catch(e) {};
           }
        }
        else {
           var dte=document.getElementById("d1#$"+element[0]); dte.disabled=true; dte.style.backgroundColor="#f0f8ff";
               dte=document.getElementById("d2#$"+element[0]); dte.disabled=true; dte.style.backgroundColor="#f0f8ff"; 
               dte=document.getElementById("d3#$"+element[0]); dte.disabled=true; dte.style.backgroundColor="#f0f8ff"; 
        }
     }
  } catch (e3) {};
 }

}

}


function  protectCol() {

 for (var i=0; i<arguments.length; i++)
 {
  var obj=document.getElementsByName(arguments[i]);
  if (obj != null) {
    if (obj[0].tagName != "TD") {
     try {
      obj[currentrow].readOnly=true;
      obj[currentrow].disabled=true;
     } catch (e) {}
    }
  }
 }

}


function  unProtect() {

var form="";
var obj="";

for (var i=0; i<arguments.length; i++)
{

 var element=arguments[i].split(':');

 if (element[0]=='*form') {

  if (element.length==1) form=focusform;
     else form=element[1];
  try {
   obj=document.getElementById(form);
  } catch (e) {alert('required form - '+form+' - not found'); return}

   for (var j=0; j<obj.length; j++)
   {
   if (obj[j].tagName != 'BUTTON') {
    try {obj[j].readOnly=false} catch (e) {};
    try {obj[j].disabled=false} catch (e2) {};
    try {
         calfld=obj[j].name.split('d1#$')[1];
         try {document.getElementById(calfld+'_calendar').style.visibility='visible';} catch(e) {};
         try {document.getElementById(calfld+'_search').style.visibility='visible';} catch(e) {};
    } catch(e) {};
    try {document.getElementById(obj[j].name+'_search').style.visibility='visible'} catch(e) {}
    }
    if ((obj[j].tagName == 'INPUT' || obj[j].tagName == 'TEXTAREA') && obj[j].className != 'outputastext') {
        try {obj[j].style.backgroundColor=""} catch(e) {};
    }
   }

 }

 else
 {
 try {
   obj=document.getElementById(element[0]);
   if (obj.tagName != 'BUTTON') {
      try {document.getElementById(element[0]+'_calendar').style.visibility='visible'} catch(e) {};
      try {document.getElementById(element[0]+'_search').style.visibility='visible'} catch(e) {};
      if (obj.className != "datefield") {  
         try {obj.disabled=false} catch (e2) {};
         if ((obj.tagName == 'INPUT' || obj.tagName == 'TEXTAREA') && obj.className != 'outputastext') {
             try {obj.style.backgroundColor=""} catch(e) {};
         }
      }
      else {
       var dte=document.getElementById("d1#$"+element[0]); dte.disabled=false; dte.style.backgroundColor="";
           dte=document.getElementById("d2#$"+element[0]); dte.disabled=false; dte.style.backgroundColor=""; 
           dte=document.getElementById("d3#$"+element[0]); dte.disabled=false; dte.style.backgroundColor=""; 
      } 
   }
  } catch (e3) {};
 }

}

}


function  unProtectCol() {

 for (var i=0; i<arguments.length; i++)
 {
  var obj=document.getElementsByName(arguments[i]);
  if (obj != null) {
    if (obj[0].tagName != "TD") {
     try {
      obj[currentrow].readOnly=false;
      obj[currentrow].disabled=false;
     } catch (e) {}
    }
  }
 }

}


function  setWriteOff() {

var form="";
var obj="";

for (var i=0; i<arguments.length; i++)
{

 var element=arguments[i].split(':');

 if (element[0]=='*form') {

  if (element.length==1) form=focusform;
     else form=element[1];
  try {
   obj=document.getElementById(form);
  } catch (e) {alert('required form - '+form+' - not found'); return}

   for (var j=0; j<obj.length; j++)
   {
   if (obj[j].tagName != 'BUTTON' && obj[j].tagName != 'FIELDSET') {
    try {obj[j].readOnly=true} catch (e) {}
   }
   }

 }

 else
 {
 try {
     obj=document.getElementById(element[0]); 
     if (obj.tagName != 'BUTTON' && obj.tagName != 'FIELDSET') {
        if (obj.className != "datefield") { 
           try {obj.readOnly=true} catch (e2) {} ;
        } 
        else {
           var dte="d1#$"+element[0]; document.getElementById(dte).readonly=true; 
               dte="d2#$"+element[0]; document.getElementById(dte).readonly=true;
               dte="d3#$"+element[0]; document.getElementById(dte).readonly=true;  
        }
     }
  } catch (e3) {};
 }

}

}



function clearForm(form) {
 var formtoclear=document.getElementById(form);
  for (var i=0; i<formtoclear.length; i++)
  {
   if (formtoclear[i].tagName != 'TD' && formtoclear[i].tagName != 'BUTTON' && formtoclear[i].type != 'checkbox' &&  formtoclear[i].type != 'radio' && formtoclear[i].type != 'button')
   try {
       formtoclear[i].value=""; 
       if (formtoclear[i].className=='subdatefield' && formtoclear[i].name.sst(1,4)=='d3#$') {
          var objp=formtoclear[i].parentNode.parentNode; 
          changeVar(objp.id,''); 
       }
       if (formtoclear[i].className=='numeric') {formtoclear[i].value=0}
   } catch (e) {}
  }
}


function closePopUps(pops,howto){

var i=0;
var j=0;
var pops='*ALL';
var how='';

if (arguments.length>0) pops=arguments[0];

if (pops.toUpperCase()=='*ALL') {
    for (i=1; i<=popcount; i++) {
        if (howto) {how=howto} else {how=pophow[i];}
        if (how=='') {
           document.getElementById(popform[i]).style.display='none'
        } else howClosePopUps(popform[i],how);
    }
  popcount=0;
  return;
 }

var popelement=pops.split(':');

if (popelement.length==1) {
var fobj = event.srcElement;
 while (fobj.tagName != 'BODY')
 {
  for (i=1; i<=popcount; i++) {
   if (popform[i]==fobj.id) {popelement[1]=fobj.id; break;}
  }
   fobj = fobj.parentNode;
 }
}

var popele=popelement[0].toUpperCase();

if (popele=='*FROM' || popele=='*AFTER') {

if (i>popcount) {
    for (i=1; i<=popcount; i++) {
        if (howto) {how=howto} else {how=pophow[i];}
        if (how=='') {
           document.getElementById(popform[i]).style.display='none';
        } else howClosePopUps(popform[i],how);
    }
  popcount=0;
  return;
}

var s=0; e=1;
  if (popele=='*AFTER') {s=1; e=0;}
  for (i=1; i<=popcount; i++) {
      if (popform[i]==popelement[1]) {
         for (j=i+s; j<=popcount; j++) {
             if (howto) {how=howto} else {how=pophow[i];}
             if (how=='') {
                document.getElementById(popform[j]).style.display='none';
             } else howClosePopUps(popform[i],how);
          }
       popcount=i-e;
       break;
      }
   }
}

}


function howClosePopUps(element,how) {
  how=how.toUpperCase();
   try {
       if (how.search("FADE")!=-1) {
          fade(element,'*off');
          return;
       }
       if (how.search("RESIZE")!=-1) {
          var pheight='#';
          var pwidth='#';
          var parms=how.split(':');
          if (parms.length>1) {pheight=parms[1]}
          if (parms.length>2) {pwidth=parms[2]}
          resize(element,pheight,pwidth,'hideElement("'+element+'")');
          return;
       }
       if (how.search("SLIDE")!=-1) {
          var ptop=0;
          var pleft=0;
          var parms=how.split(':');
          if (parms.length>1) {ptop=parms[1]}
          if (parms.length>2) {pleft=parms[2]}
          slide(element,ptop,pleft,'hideElement("'+element+'")');
          return;
       }
        if (how.search("TRANSIT")!=-1) {
           parms=how.split(':');
           if (parms.length>1) {nbr=parms[1]}
           transit(element,nbr,'*off')
        }
   } catch (e) {document.getElementById(element).style.display='none'}
}

function colorBg(obj) {
  var color=rowselectcolor;
  if (arguments.length>1) color=arguments[1].toUpperCase();
  try {
      if (color=='*DFT') {
         obj.style.backgroundColor=obj.lang; 
      }
      else {
          obj.lang=obj.style.backgroundColor;
          obj.style.backgroundColor=color;
      }
  } catch (e) {}
}


function setRowBgColor() {
var color=rowselectcolor;
var selectcolor=rowselectcolor;
try {
    var rowsltcolor=eval('tab$$selectcolor.'+clickedtable);
    color=rowsltcolor;
} catch(e) {} 
var obj=rows[currentrow]
  if (arguments.length>0) color=arguments[0].toUpperCase();
  try {
      if (color=='*DFT') obj.style.backgroundColor=obj.lang;
         else {
          obj.lang=obj.style.backgroundColor;
          obj.style.backgroundColor=color;
         }
   } catch (e) {}
}



function compute(f){
 var s=f.toPrecision(14);
 s=s.replace(/^([\+\-0-9\\.]*[1-9\.])0+((?:e[0-9\+\-]+)?)$/g,'$1$2');
 s=s.replace(/\.((?:e[0-9\+\-]+)?)$/g,'$1');
 return parseFloat(s);
}


function edit(text,decimal,code,fl) {
 if (decimal==undefined) {var decimal=2}
 if (code==undefined) {var code='j'}
 var edtobj=document.getElementById('edit#editfld');
 if (edtobj==null) {
     var newobj=document.createElement('INPUT');
     newobj.id='edit#editfld';
     newobj.size=25;
     document.getElementsByTagName('body')[0].appendChild(newobj);
     edtobj=document.getElementById('edit#editfld'); 
     edtobj.style.display='none';
 }
 hideedit=true; 
 if (fl) {edtobj.size=numeric(fl)};
 edtobj.value=''+numeric(text).toFixed(decimal); 
 editField(edtobj,decimal,code); 
 if (fl) {edtobj.size=25}
 return edtobj.value;
}


function editDate(value,fmt) {
 if (!fmt) {var fmt='Y'};
 try {
     return edit((numeric(value).chgDateFmt('Y',fmt)),0,fmt);
 } catch(e) {return false}
}


function editTime(value,fmt) {
 if (!fmt) {var fmt='M'};
 try {
     return edit(numeric(value),0,fmt);
 } catch(e) {return false}
}


function newClass(newclass) {
try {
   event.srcElement.className=newclass;} catch (e) {}
return;
}

function exit() {
if (!window.opener) {history.go(-1)}
   else window.close();
return;
}


function viewSource() {

 try {

  if (!document.getElementById('divsource')) {
    var htmltxt="";
    htmltxt='<div id="divsource" class="window" style="display:none; top:50; left:20; z-index:100000">';
    htmltxt=htmltxt+'<div class="titleBar">View Source</div>'
    htmltxt=htmltxt+'<img SRC="../image/closewin_icon.gif"  alt="close"  class="ximage" onClick="hideElement(divsrc); clearSourceTxt()"> </img>';
//  htmltxt=htmltxt+'<form name="source">';
    htmltxt=htmltxt+'<textarea id=sourcetxt readonly cols=120 rows=40 wrap=virtual style="font-family:garmond"></textarea>';
    htmltxt=htmltxt+'<br>';
    htmltxt=htmltxt+'<BUTTON onclick="hideElement(divsrc); clearSourceTxt()">Close</button>';
//  htmltxt=htmltxt+'</form>';
    htmltxt=htmltxt+'</div>';
    var divform=document.createElement('div');
        divform.innerHTML=htmltxt;
        document.getElementsByTagName('body')[0].appendChild(divform);
  //    workarea.appendChild(divform);
  }

  var txt=unescape(document.body.innerHTML);
   // txt=url.replace(/&gt/g, ">");
   // txt=url.replace(/&lt/g, "<");
  changeVar('sourcetxt',txt);
  showElement('divsource');

 } catch (e) {}

}


function clearSourceTxt() {
changeVar('sourcetxt','');
changeVar('errorfunctiontxt','');
}


function isVisible(element) {
 try {
   var obj=document.getElementById(element);
   while (obj.tagName != 'BODY') {
      if (obj.style.display=='none') {return false;}
      obj = obj.parentNode;
   }
 } catch(e) {return false}
 return true;
}

function positionRow() {
//var position='top'
//if (arguments.length>0) position=arguments[0];
  //if (position=='top') {
    //rows[currentrow].scrollIntoView(true);
  //}
  //else {rows[currentrow].scrollIntoView(false)};
  try {col[0].focus();} catch(e) {}
}


//function setRowAttr2(attr, value) {
//var id=currenttable+currentrow;
//var obj=document.getElementById(id);
//if (obj!=null) {
//   try {
//      switch(attr)
//      {
//        case '*display':
//        obj.style.display=value;
//        break;
//        case '*bgcolor':
//        obj.style.backgroundColor=value;
//        break;
//      }
//   } catch(e) {return false}
//}
// return true;
//}


function setRowAttr(attr, tto)
{
  //var id=currenttable+currentrow; 
  //var obj=document.getElementById(id);
  var obj=rows[currentrow]; 
  if (obj == null) return;
  try {
      eval('obj.style.'+attr+'="'+tto+'"');
  } catch(e) {}  
}

function setRowAsClicked() {

  var selectcolor=rowselectcolor;
  try {
      var rowsltcolor=eval('tab$$selectcolor.'+currenttable);
      selectcolor=rowsltcolor;
  } catch(e) {}
  var obj=rows[currentrow];
  var ptrobj=eval('tabrowclicked.'+currenttable);
  if (ptrobj != obj && selectcolor != '') {
      obj.lang=obj.style.backgroundColor; 
      obj.style.backgroundColor=selectcolor; 
      try {
          eval('tabrowclicked.'+currenttable+'.style.backgroundColor=tabrowclicked.'+currenttable+'.lang');
      } catch (e) {}
      try {  
          eval('tabrowclicked.'+currenttable+'=obj');  
      } catch (e1) {}
  } 
}


function unClickTable(tabl) {
  if (!tabl) {var tabl=clickedtable} 
     try {
         eval('tabrowclicked.'+tabl+'.style.backgroundColor=tabrowclicked.'+tabl+'.lang');
         eval('tabrowclicked.'+tabl+'=""');
     } catch(e) {}
     return;   
}


function hideCol(colmn) {
 for (var i=0; i<headcol.length; i++) {
      if (headcol[i].id==colmn) {
          hideElement(currenttable+'$ha'+i, currenttable+'$hb'+i); 
          break;
      }
 }
}


function showCol(colmn) {
 for (var i=0; i<headcol.length; i++) {
      if (headcol[i].id==colmn) {
          showElement(currenttable+'$ha'+i, currenttable+'$hb'+i);
          break;
      }
 }
}

function hideRow() {
 setRowAttr('display','none');
}

function showRow() {
 setRowAttr('display','');
}


function isBlank(value) {
  if ((''+value).trim().length==0) {return true}; 
  return false;
}

function isChecked(fld) {
  var obj=document.getElementById(fld);
  if (obj.checked) return true;
     else return false;
}

isCheckedVar=isChecked;

function checkVar(fld,state) {
 try {
   var sts=true; 
   if (!state) {var state='on'}
   if (state=='off' || state=='*off') {sts=false}
   document.getElementById(fld).checked=sts;
 } catch(e) {return false}
}

function isCheckedRow(fld) {
  var obj=document.getElementsByName(fld); 
  if (obj[currentrow].checked) return true;
     else return false;
}


isCheckedCol=isCheckedRow;

function searchArray(ar,vl) {
 for (var i=0; i<ar.length; i++) {
     if (ar[i]==vl) {return i}
 }
 return -1;
} 

function sortTable() {
 var order=sortorder;
 sortorder='ascend';
 try {
  var table='';
  var sortfld='';
  var dataarr=new Array();
  var arglen=arguments.length;
  var fld='';
  var i=0;

  if (arguments.length==0) {
// if no arguments assume a click done on the table head. From the
// eventSrc element deterime the name of the table clicked on,
// get the table name with the data (i.e name of table clicked on
// with "head" removed. Get the field to be sorted by the id of the
// eventSrc element
     var fobj = event.srcElement.parentNode;
     fobj = fobj.parentNode;
     table=fobj.parentNode.id.replace(/head/,"");
     sortfld=event.srcElement.id;
     arglen=2;
  }
  else {
       table=arguments[0];
       if (arguments.length==1) {
      // if 1 argument assume a click done on the table head. From the
      // eventSrc element Get the field to be sorted by the id of the
      // eventSrc element
          sortfld=event.srcElement.id;
          arglen=2;
       }
  }

  posTabCursor(table,'top');
  readRow();
  while (!eof) {
    dataarr[i]='';
    for (var m=1; m<arglen; m++) {
      // if sortfld is null the use field to sort from the argument(s)
      //entered..otherwise use sortfld
      if (sortfld == '') {fld=valueOfCol(arguments[m])}
         else {fld=valueOfCol(sortfld)}
      if (isNaN(fld)) {
         dataarr[i]=dataarr[i]+fld.toUpperCase();
      }
      else {
         fld=edit(fld,0,'0');
         dataarr[i]=dataarr[i]+''+String.fromCharCode(48 + fld.length) + fld;
      }
      if (m<arglen-1) {dataarr[i]=dataarr[i]+' |'}
    }
     for (var j=0; j<col.length; j++) {
     dataarr[i]=dataarr[i]+' |'+col[j].innerHTML;
     }
     i=i+1;
     readRow();
  }

  if (order !='descend') {dataarr.sort()}
  else {dataarr.sort(charOrdD)}

  posTabCursor(table,'top');
  i=0;
  readRow();
  while (!eof) {
    dataarr2=dataarr[i].split(' |');
    for (var j=0; j<col.length; j++) {
      col[j].innerHTML=dataarr2[j+(arglen-1)];
    }
    rows[i].setAttribute('id', table+i);
    i=i+1;
    readRow();
  }

 } catch (e) {return false}

 return true;

}


function textOfSelect(sel) {
var invalue='';
  try {
      var obj=document.getElementById(sel);
      if (arguments.length==1) {
         invalue=valueOf(arguments[0]);
      }
      else {
           invalue=arguments[1];
      }
      for (i=0; i<obj.length; i++) {
          if (obj[i].value==invalue) {
             return (obj[i].text);
          }
      }
  } catch (e) {alert(e.message); return ''};
  return '';
}


function tabsFormDef() {
  this.name='tabf'+(Math.floor(Math.random() * (99999999 - 1)) + 1);
  this.width='';
  this.selectcolor='';
  this.tabspacing=4;
  this.tabimagesheight='';
  this.tabimageswidth='';
  this.formclass='';
  this.formstyle='padding:0; margin:0';

  this.content=new Array(); //Id of element with the content OR the actual content
  this.id=new Array();
  this.text=new Array();
  this.style=new Array();
  this.onselect=new Array();
  this.color=new Array(); 
  this.image=new Array();

  this.create=createTabsForm; 
}


function createTabsForm(container) {
 tabform=this;
 var i=0;
 var iswindow=false;
 var obj, dataobj, vlu, vluisobject; 

 if (tabform.formclass.toLowerCase().search('window')>-1) {
     iswindow=true;
 }
 var txt="<div id='div"+tabform.name+"' class= '"+tabform.formclass+"' style='"+tabform.formstyle+"'>"; 
 txt += "<form name='"+tabform.name+"'style='padding:0; margin:0;'>"; 
 if (iswindow) {
     txt += "<div class=titlebar id="+tabform.name+"title ></div>";
     txt += "<img src='../image/closewin_icon.gif'  alt='close'  class=ximage onClick=closeForm()><br>";
 }
 txt +="<div id='"+tabform.name+"tab' style='width:"+tabform.width+"; position:relative' tabselectcolor='"+tabform.selectcolor+"' class=tabswrap";
 txt +=" tabspacing="+tabform.tabspacing+">"  

 for (i=0; i<tabform.content.length; i++) {

      if (!tabform.id[i]) {tabform.id[i]='tabid'+(Math.floor(Math.random() * (99999999 - 1)) + 1);}
      if (!tabform.text[i]) {tabform.text[i]='Tab'+(i+1);}
      if (!tabform.color[i]) {tabform.color[i]='white';}

      txt +="<div id='"+tabform.id[i]+"' class=tab style='background-color:"+tabform.color[i]+";"+tabform.style[i]+"'";
      if (tabform.onselect[i]) {
          txt += " onmouseup="+tabform.onselect[i]+">";
      } 
      else {txt += '>'}
      if (tabform.image[i]) {
          txt += "<img this.onclick=this.parentNode.click() src='"+tabform.image[i]+"'";
          if (tabform.tabimagesheight) {txt += " height="+tabform.tabimagesheight}
          if (tabform.tabimageswidth)  {txt += " width="+tabform.tabimageswidth}
          txt += " /></div>";
      }
      else {
        txt += tabform.text[i]+"</div>";
      }

      dataobj=document.getElementById(tabform.content[i]); 
      if (dataobj) {vlu=dataobj.innerHTML; vluisobject=true;}
      else {vlu=tabform.content[i]; vluisobject=false;} 
      txt += "<div id='"+tabform.id[i]+"data'"+" class=tabdata>"+vlu+"</div>";
      if (vluisobject) { 
          dataobj.parentNode.removeChild(dataobj);
          delete dataobj;
      }  
 } 
 txt += "</div></form></div>";

 if (container) {changeContent(container,txt)}
 else {
      var divtemp=document.createElement('div');
      divtemp.innerHTML=txt;
      document.getElementsByTagName('body')[0].appendChild(divtemp);
      var obj=document.getElementById("div"+tabform.name);
      obj.parentNode.removeChild(obj);
      document.getElementsByTagName('body')[0].removeChild(divtemp);
      document.getElementsByTagName('body')[0].appendChild(obj);
 }
 constructTabs(tabform.name); 
 if (iswindow) {
     hideElement("div"+tabform.name);
 }
}


function constructTabs(form) {

  var spacing=4;
  var divobjar = new Array();
  var divobjarlen=0;
  var isiframe=false;
  var tabname=form+'tab';
  try {
       var tabobj=document.getElementById(tabname);
       form=document.getElementById('div'+form);
       if (tabobj.tabspacing) {spacing=numeric(tabobj.tabspacing)}
  } catch (e) {return}

  var divobj=tabobj.getElementsByTagName('div');
  var obj='';
  var firstobj='';
  var objprv='';
  var top=0;
  var i=0;
  var totalwidth=0;
  if (tabobj.style.position!='absolute' && numeric(tabobj.style.width)==0) {
     tabobj.style.width=0;
  }

  for (var j=0; j<divobj.length; j++) {
      obj=divobj[j];
      if (obj.className=='tab') {
//      try {
            obj.style.display='';
            top=0-obj.offsetHeight;
            obj.style.top=top;
            obj.onclick=tabSelect;
            if (i==0) {
               obj.style.left=spacing;
               objprv=obj;
               firstobj=obj;
            }
            else {
                 obj.style.left=objprv.offsetLeft+objprv.offsetWidth+spacing;
                 objprv=obj
            }
            divobjar[i]=obj
  //     } catch(e) {}
         totalwidth=totalwidth+obj.offsetWidth+spacing
         i=i+1;
      }
  }
  divobjarlen=i

  if (tabobj.offsetWidth<totalwidth+spacing) {tabobj.style.width=totalwidth+spacing}

  totalwidth=tabobj.offsetWidth;
  totalheight=tabobj.offsetHeight;

  for (var j=0; j<divobjarlen; j++) {
      obj=divobjar[j].id+'data';
      obj=document.getElementById(obj);
      obj.style.display='';
      if (obj.offsetWidth+10>totalwidth) {
         tabobj.style.width=obj.offsetWidth+10;
         totalwidth=tabobj.offsetWidth;
      }
      if (obj.offsetHeight+20>totalheight) {
         tabobj.style.height=obj.offsetHeight+20;
         totalheight=tabobj.offsetHeight;
      }
      obj.style.display='none';
  }

  //if (form.offsetWidth<tabobj.offsetWidth) {form.style.width=form.offsetWidth+tabobj.offsetWidth}
  //if (form.offsetHeight<tabobj.offsetHeight+28) {form.style.height=form.offsetHeight+tabobj.offsetHeight+28}
  if (form.offsetWidth<tabobj.offsetWidth+tabobj.offsetLeft+9) {form.style.width=tabobj.offsetWidth+tabobj.offsetLeft+9}
  if (form.offsetHeight<tabobj.offsetHeight+tabobj.offsetTop+26) {form.style.height=tabobj.offsetHeight+tabobj.offsetTop+26}

  if (form.className.toLowerCase()=='tabswindow') {form.className='window'}
  //form.className='window';

  firstobj.click();

}


function tabSelect() {
  var tabselectcolor='';
  var srcobj=event.srcElement;
  if (srcobj.tagName=='IMG') {srcobj=srcobj.parentNode;}
  var tabobj=srcobj.parentNode;
  if (tabobj.tabselectcolor) {
     tabselectcolor=tabobj.tabselectcolor; 
  } 
  //if (tabselectcolor) {
     //srcobj.style.backgroundColor=tabselectcolor;
  //}
  //tabobj.style.backgroundColor=srcobj.style.backgroundColor;
  var divobj=tabobj.getElementsByTagName('div');
  var obj2=srcobj.id+'data';
  obj2=document.getElementById(obj2);
  if (!obj2) return;
  obj2.style.top=10;
  obj2.style.left=5;
    for (var j=0; j<divobj.length; j++) {
        obj=divobj[j];
        if (obj.className=='tab') {
           obj.style.borderTopColor='';
           obj.style.borderTopWidth='';
           obj.style.top=0-obj.offsetHeight;
           obj3=divobj[j].id+'data';
           obj3=document.getElementById(obj3);
           obj3.style.display='none';
           obj3=divobj[j];
           obj3.style.borderBottomColor='';
           if (tabselectcolor) {
              if (obj.storecolor) {
                 obj.style.backgroundColor=obj.storecolor; 
              }
              else {obj.storecolor=obj.style.backgroundColor}
           }
        }
    }

  if (tabselectcolor) {
     srcobj.style.backgroundColor=tabselectcolor;
  }
  tabobj.style.backgroundColor=srcobj.style.backgroundColor;

  obj2.style.display='';
  srcobj.style.borderBottomColor=srcobj.style.backgroundColor;
  srcobj.style.borderTopColor='orange';
  srcobj.style.borderTopWidth='3px';
  srcobj.style.top=0-srcobj.offsetHeight;
  currenttabobj=srcobj;
}

function showTab(tabname) {
  var obj=document.getElementById(tabname);
  if (obj!=null) {
     if (obj.className=='tab') {
        var parentobj=obj.parentNode;
        if (isVisible(parentobj.id)) {
           obj.click();
        }
     }
  }
}

function showElementTab(element) {
  var obj=document.getElementById(element);
  if (obj!=null) {
    obj=obj.parentNode;
    while (obj.tagName != 'BODY') {
        if (obj.parentNode.className.toUpperCase()=='TABSWRAP') {
           var tabname=obj.id.replace(/data/,"");
           showTab(tabname);
           if (arguments.length>1) {
              if (arguments[1].toUpperCase()=='*HIGHLIGHT' || arguments[1].toUpperCase()=='*HI') {
                 focusOn(element,'*hi');
              }
           }
           break;
        }
    obj=obj.parentNode;
    }
  }
}


function fade(ele,percent,runcode,opac) {
   var obj='';
   if (!ele) {var ele='*this'}
   if (ele!='*this') {
      if (ele==focusform) {ele='div'+focusform}
      obj=document.getElementById(ele);
      if (obj==null) {return}
   }
   else {obj=event.srcElement; ele=obj.id;};

  if (!percent) {
   var percent=10;
  }
  if (isNaN(percent)) {
     if (percent.toUpperCase()=='*OFF') {
        percent=0.99;
     }
     else percent=10;
  }
  if (!runcode) {var runcode=''};
  if (!opac) {
     obj.style.filter="alpha(opacity=0)";
     var opac=110;
  }
  opac=opac-10;
  if (opac >= percent) {
    obj.style.filter="alpha(opacity="+opac+")";
    opactimer=setTimeout("fade('"+ele+"',"+percent+",'"+runcode+"',"+opac+");"+10);
  }
  else {
       if (percent==0.99) {
          obj.style.filter="alpha(Opacity=100)";
          obj.style.display="none";
          if (ele=='div'+focusform) closeForm();
       }
       else {
            obj.style.filter="alpha(Opacity="+percent+")";
            try {eval(runcode)}
            catch (e) {}
       }
  }
}

function fadeIn(ele,percent,opac) {
  var fadespeed=10;
  var obj='';
  if (!ele) {var ele='*this'}
  if (ele!='*this') {
     if (ele==focusform) {ele='div'+focusform}
     obj=document.getElementById(ele);
     if (obj==null) {return}
  }
  else {obj=event.srcElement; ele=obj.id;};
  if (!percent || isNaN(percent)) {
   var percent=100;
  }
  if (!opac) {
     obj.style.filter="alpha(opacity=0)";
     var opac=0;
  }
  opac=opac+10;
  if (opac <= percent) {
    obj.style.filter="alpha(opacity="+opac+")";
    opactimer=setTimeout("fadeIn('"+ele+"',"+percent+","+opac+");"+fadespeed);
  }
  else {
       obj.style.filter="alpha(Opacity="+percent+")";
       }
}

function blink(element){
  if (!ele) {var ele='*this'}
  func='fadeIn("'+element+'")';
  fade(element,75,func);
}

function slide(ele,ptop,pleft,runcode) {
var by=15;
if (ele==focusform) {ele='div'+focusform}
obj=document.getElementById(ele);
if (obj==null) return;

var leftpos='#';
var toppos='#';
var spacetop=0;
var spaceleft=0;
if (arguments.length>1) {toppos=ptop}
if (arguments.length>2) {leftpos=pleft}
if (!runcode) {var runcode=''};

if (!isNaN(toppos)) {
   spacetop=toppos-obj.offsetTop;
}

if (!isNaN(leftpos)) {
   spaceleft=leftpos-obj.offsetLeft;
}

if ((spacetop==0) && (spaceleft==0)) {
   try {eval(runcode)}
   catch (e) {}
   return;
}

if (spacetop !=0) {
   if (spacetop>0) {
      if (spacetop>by) {spacetop=by;}
   }
   else {
      if (spacetop<(0-by)) {spacetop=(0-by)}
   }
   obj.style.top=obj.offsetTop+spacetop;
}

if (spaceleft !=0) {
   if (spaceleft>0) {
      if (spaceleft>by) {spaceleft=by;}
   }
   else {
      if (spaceleft<(0-by)) {spaceleft=(0-by)}
   }
   obj.style.left=obj.offsetLeft+spaceleft;
}

    slidetimer=setTimeout("slide('"+ele+"','"+ptop+"','"+pleft+"','"+runcode+"');"+1);
}

function transit(ele,nbr,status)
{

// Values and meanings of "nbr"
// 0 Box in                       1 Box out
// 2 Circle in                    3 Circle out
// 4 Wipe up                      5 Wipe down
// 6 Wipe right                   7 Wipe left
// 8 Vertical blinds              9 Horizontal blinds
// 10 Checkerboard across        11 Checkerboard down
// 12 Random dissolve
// 13 Split vertical in          14 Split vertical out
// 15 Split horizontal in        16 Split horizontal out
// 17 Strips left down           18 Strips left up
// 19 Strips right down          20 Strips right up
// 21 Random bars horizontal     22 Random bars vert
// 23 Random (1-22; 30-38)
//
// 30 Wheel - 6 spokes           31 Fade
// 32 Gradient Wipe              33 Pixelate
// 34 Radial Wipe                35 Spiral
// 36 Stretch                    37 Zigzag
// 38 Slide
//
  var obj='';
   if (!ele) {var ele='*this'}
   if (ele!='*this') {
      if (ele==focusform) {ele='div'+focusform}
      obj=document.getElementById(ele);
      if (obj==null) {return}
   }
   else {obj=event.srcElement};

  var trans = new Array();
  trans[0]="progid:DXImageTransform.Microsoft.Wheel(spokes=6)"         ;
  trans[1]="progid:DXImageTransform.Microsoft.Fade(Overlap=0.25)"      ;
  trans[2]="progid:DXImageTransform.Microsoft.GradientWipe(GradientSize=0.25,wipestyle=1,motion=forward)";
  trans[3]="progid:DXImageTransform.Microsoft.Pixelate(MaxSquare=50)"; ;
  trans[4]="progid:DXImageTransform.Microsoft.RadialWipe(wipestyle=CLOCK)";
  trans[5]="progid:DXImageTransform.Microsoft.Spiral(GridSizeX=16,GridSizeY=16)";
  trans[6]="progid:DXImageTransform.Microsoft.Stretch(stretchstyle=SPIN)";
  trans[7]="progid:DXImageTransform.Microsoft.Zigzag(GridSizeX=16,GridSizeY=16)";
  trans[8]="progid:DXImageTransform.Microsoft.Slide(slidestyle=HIDE,Bands=25)";

   if (!status) {
      var status='*off'
      if (obj.style.visibility=='hidden') {status='*on'}
      else (obj.style.visibility=='visible')
   }
   else {
        if (status.toUpperCase()=='*ON') {obj.style.visibility = "hidden";}
        else {obj.style.visibility = "visible";}
   }

   if (!nbr) {var nbr=1}
   else {
        if (isNaN(nbr)) {nbr=1}
   }

   obj.style.height=obj.offsetHeight;
   obj.style.width=obj.offsetWidth;

   if (nbr>38) nbr=38;
   if (nbr>23 && nbr<30) nbr=23;
   if (nbr==23) {nbr=(Math.floor(Math.random() * (39 - 1)) + 1);}
   if (nbr<30) {obj.style.filter="revealTrans(duration=.95)";}
   else {obj.style.filter=trans[(nbr-30)];}
   obj.filters[0].Apply();
   if (status.toUpperCase()=='*ON') {
      obj.style.visibility = "visible";
      if (nbr<30) {obj.filters.revealTrans.transition=nbr;}
   }
   else {
        obj.style.visibility = "hidden";
        if (nbr<30) {obj.filters[0].transition=nbr;}
   }
   obj.filters[0].Play();
}


function transitContent(ele,value,nbr)
{
  var intvalue=value;
  var code='';
  values=value.split(':');
  value=values[0];
  var obj='';
   if (ele!='*this') {
      if (ele==focusform) {ele='div'+focusform}
      obj=document.getElementById(ele);
      if (obj==null) {return}
   }
   else {obj=event.srcElement};

try {
     if (obj==null) {return}
     if (!value) {return}

     var trans = new Array();
     trans[0]="progid:DXImageTransform.Microsoft.Wheel(spokes=6)"         ;
     trans[1]="progid:DXImageTransform.Microsoft.Fade(Overlap=0.25)"      ;
     trans[2]="progid:DXImageTransform.Microsoft.GradientWipe(GradientSize=0.25,wipestyle=1,motion=forward)";
     trans[3]="progid:DXImageTransform.Microsoft.Pixelate(MaxSquare=50)"; ;
     trans[4]="progid:DXImageTransform.Microsoft.RadialWipe(wipestyle=CLOCK)";
     trans[5]="progid:DXImageTransform.Microsoft.Spiral(GridSizeX=16,GridSizeY=16)";
     trans[6]="progid:DXImageTransform.Microsoft.Stretch(stretchstyle=SPIN)";
     trans[7]="progid:DXImageTransform.Microsoft.Zigzag(GridSizeX=16,GridSizeY=16)";
     trans[8]="progid:DXImageTransform.Microsoft.Slide(slidestyle=HIDE,Bands=25)";

     if (!nbr) {var nbr=1}
     else {
          if (isNaN(nbr)) {nbr=1}
     }

     obj.style.height=obj.offsetHeight;
     obj.style.width=obj.offsetWidth;

     if (nbr>38) nbr=38;
     if (nbr>23 && nbr<30) nbr=23;
     if (nbr==23) {nbr=(Math.floor(Math.random() * (39 - 1)) + 1);}
     if (nbr<30) {obj.style.filter="revealTrans(duration=.95)";}
     else {obj.style.filter=trans[(nbr-30)];}

     if (values.length>1) {
        if (values[0].toUpperCase()=='*SCRIPT') {
           code=values[1];
           code=code.replace(/this/g, obj.id);
        }
        else {value=intvalue}
     }

     obj.filters[0].Apply();
     if (code=='') {obj.innerHTML=value;}
     else {eval(code)}
     obj.filters[0].Play();
   } catch (e) {}
}

function resize(ele,pheight,pwidth,runcode) {
var by=6;
var objhgt=0;
var objwdh=0;
var height='#';
var width='#';
if (!runcode) {var runcode=''};

if (arguments.length>1) {height=pheight}
if (arguments.length>2) {width=pwidth}

if (ele==focusform) {ele='div'+focusform}
obj=document.getElementById(ele);
if (obj==null) return;
if (obj.style.display=="none") return;

if (height<=0) height=1;
if (width<=0) width=1;

if (isNaN(height)) height=obj.offsetHeight;
if (isNaN(width)) width=obj.offsetWidth;

if (!isNaN(height)) {
   if (obj.offsetHeight>height) {
       objhgt=obj.offsetHeight-by;
       if (objhgt<height) objhgt=height;
       obj.style.height=objhgt;
   }
   else {
          if (obj.offsetHeight<height) {
             objhgt=obj.offsetHeight+by;
             if (objhgt>height) objhgt=height;
             obj.style.height=objhgt;
          }
   }
}

if (!isNaN(width)) {
   if (obj.offsetWidth>width) {
       objwdh=obj.offsetWidth-by;
       if (objwdh<width) objwdh=width;
       obj.style.width=objwdh;
   }
   else {
          if (obj.offsetWidth<width) {
             objwdh=obj.offsetWidth+by;
             if (objwdh>width) objwdh=width;
             obj.style.width=objwdh;
          }
   }
}

   if (obj.offsetHeight==height & obj.offsetWidth==width) {
      try {eval(runcode)}
      catch (e) {}
      return;
   }

    resizetimer=setTimeout("resize('"+ele+"','"+height+"','"+width+"','"+runcode+"');",2);
}




function exeFunction(string,text,nodefault) {
  changeCursor('wait');
  if (text) {say(text);}
  else {var text='*none'}
  setTimeout('functionExe("'+string+'","'+text+'","'+nodefault+'")',10);
}

function functionExe(string,text,nodefault) {
 try {eval(string)}
 catch(e) {changeCursor('default'); say(''); alert(e.message); return}
 if (!nodefault || nodefault=='undefined') {changeCursor('default')};
 if (text!='*none') {say('');} 
}



function autoJump(field,full) {

 var key = window.event.keyCode; 
 if ((key==null) || (key==0) || (key==8) || (key==9) || (key==13) || (key==16) || (key==27) || (key==37) || (key==38) || (key==39) || (key==40)) {
    return;
 }
 if (field) {
     var obj = event.srcElement;
     if (obj.value.length==obj.size) {
        if (full) {
           var f2='d2#$'+full; 
           if (f2==field) {
              var f2='d2#$'+full;
              var f3='d3#$'+full;
              var f2obj=document.getElementById(f2); 
              var f3obj=document.getElementById(f3);
              if (f2obj && f3obj) {
                 if (numeric(f2obj.value)==0 && numeric(f3obj.value)==0) {
                    var datenow=new getToday();
                    if ((obj.size==4 && numeric(obj.value)==numeric(datenow.year)) || obj.size==2) {
                       f2obj.value=datenow.month; 
                       if (f3obj.size==2) {f3obj.value=datenow.day}
                       else {f3obj.value=datenow.year}
                    } 
                 }
              }  
           } 
        }
        focusOn(field,'*hi');
     }
 }
}




function numbersOnly(field) {

 var key = window.event.keyCode;
 var keychar = String.fromCharCode(key);

 // control keys
 if ((key==null) || (key==0) || (key==8) || (key==9) || (key==13) || (key==27)) {
    return true;
 } 

 // numbers
 if ((("0123456789").indexOf(keychar) > -1)) {
    return true;
 }

 return false;
}


function setToNbr() {
 var obj = event.srcElement;
 if (isBlank(obj.value)) return
 while (obj.value.length<obj.size) {
       obj.value='0'+obj.value;
 }
}


//-------------------- Start Date and Time Functions

function delay(millis) {
 var date = new Date();
 var curDate = null;
 do { curDate = new Date(); }
 while(curDate-date < millis);
}


function getToday() {
  var currentdate=new Date();
  this.year = currentdate.getFullYear();
  this.month = currentdate.getMonth()+1;
  this.day = currentdate.getDate();
  if (this.month <= '9') this.month='0'+this.month; 
  if (this.day <= '9') this.day='0'+this.day; 
 }

function todayDate(datfmt) {
  var fmt='y';
  var today = new getToday();
  if (datfmt) fmt=datfmt;
  fmt=fmt.toUpperCase();
  if (fmt=='*Y' || fmt =='Y') return (''+today.year+today.month+today.day);
  if (fmt=='*D' || fmt == 'D') return (''+today.day+today.month+today.year);
  if (fmt=='*M' || fmt == 'M') return (''+today.month+today.day+today.year);
}

function getNow() {
  var currenttime = new Date();;
  this.hour = currenttime.getHours()
  this.minute = currenttime.getMinutes();
  this.second = currenttime.getSeconds();
  if (this.hour < 10) this.hour = "0" + this.hour; 
  if (this.minute < 10) this.minute = "0" + this.minute;
  if (this.second < 10) this.second = "0" + this.second;
}


function todayTime(part) {
  var now = new getNow();
  if (part) {
     part=part.toLowerCase(); 
     if (part=='h') return (now.hour);
     if (part=='m') return (now.minute);
     if (part=='s') return (now.second);
     if (part=='hm') return (''+now.hour+now.minute);
  }
  return (''+now.hour+now.minute+now.second);
}

 
function timeStamp() {
  return (new Date())-0;
} 


function convertToDate(dat,fmt) {
  var datfmt='Y';
  var day='';
  var month='';
  var year='';
  if (fmt) datfmt=fmt.toUpperCase();
  dat=numeric(dat).toFixed(0); 
  if (dat.length==7) dat='0'+dat; 
  if (datfmt=='Y' || datfmt=='*Y') {
     year=dat.sst(1,4); 
     month=numeric(dat.sst(5,2))-1;
     day=dat.sst(7,2);
  }
  if (datfmt=='D' || datfmt=='*D') {
     day=dat.sst(1,2);
     month=numeric(dat.sst(3,2))-1; 
     year=dat.sst(5,4);
  }
  if (datfmt=='M' || datfmt=='*M') {
     month=numeric(dat.sst(1,2))-1; 
     day=dat.sst(3,2);
     year=dat.sst(5,4);
  }
  var now=new Date(year,month,day,0,0,0);
  //now.setYear(year);
  //now.setMonth(month);
  //now.setDate(day); 
  return now;
}
  
function addDays(dat,dys,fmt) {

  var datfmt='Y';
  var day='';
  var month='';
  var year='';
  dys=numeric(dys);
  if (fmt) datfmt=fmt.toUpperCase();
  var now=convertToDate(dat,datfmt); 
  now.setDate(now.getDate() + dys); 
  year=now.getFullYear(); 
  month=now.getMonth()+1;
  day=now.getDate();
  if (month <= '9') month='0'+month; 
  if (day <= '9') day='0'+day; 
  if (datfmt=='Y') {
     return ''+year+month+day;  
  }
  if (datfmt=='D') {
     return ''+day+month+year;
  }
  if (datfmt=='M') {
     return ''+month+day+year;
  }
}


function daysDuration(stdate,enddate,fmt) {
  var datfmt='Y';
  if (fmt) datfmt=fmt.toUpperCase();
  var oneday=1000*60*60*24; 
  var dtstdate = convertToDate(stdate,datfmt); 
  var dtenddate = convertToDate(enddate,datfmt); 
  return (Math.ceil((dtenddate.getTime()-dtstdate.getTime())/(oneday))); 
}
  

function validDate(dat,fmt) {
  var datfmt='Y';
  var day='';
  var month='';
  var year='';
  if (fmt) datfmt=fmt.toUpperCase();
  dat=''+numeric(dat); 
  if (dat.length==7) dat='0'+dat; 
  if (datfmt=='Y' || datfmt=='*Y') {
     year=numeric(dat.sst(1,4)); 
     month=numeric(dat.sst(5,2));
     day=numeric(dat.sst(7,2));
  }
  if (datfmt=='D' || datfmt=='*D') {
     day=numeric(dat.sst(1,2));
     month=numeric(dat.sst(3,2)); 
     year=numeric(dat.sst(5,4));
  }
  if (datfmt=='M' || datfmt=='*M') {
     month=numeric(dat.sst(1,2));
     day=numeric(dat.sst(3,2)); 
     year=numeric(dat.sst(5,4));
  }

  if (year<1000) return false;
  if (day < 1 || day>31) return false;
  if (month < 1 || month > 12) return false;
  if (month==4 || month==6 || month==9 || month==11) {
     if (day > 30) return false;
  }
  else {
     if (month==2) {
        if (year % 4 == 0) {
            if (day >29) return false;
        }
        else {if (day > 28) return false} ; 
     }
     else {
        if (day >31) return false; 
     } 
  } 

  return true;
}


function createDateVar(el,fmt) {
 if (!fmt) {
    var fmt='y';
 }
 fmt=fmt.toLowerCase();
 elobj=document.getElementById(el);
 if (!elobj) return;
 elobj.className='datefield';  
 var d1='d1#$'+el;
 var d2='d2#$'+el;
 var d3='d3#$'+el;
 var w1='3em';
 var w2='1.4em';
 var w3='1.4em';
 var s1='4';
 var s2='2';
 var s3='2';

 if (fmt!='y') {
    w1='1.4em';
    w3='3em';
    s1='2';
    s3='4';
 }

 var txt="<span style='background-color:white; border:2px inset; overflow:hidden; padding:0; padding-right:1px; padding-top:1.5px; padding-left:2px'>";
 txt += "<input class=subdatefield name="+d1+" size="+s1+" maxlength="+s1+" onKeyPress='return numbersOnly()' onKeyUp=autoJump('"+d2+"','"+el+"') onBlur='setToNbr()' style='border:none; padding:0; width:"+w1+"'>/&nbsp";
 txt += "<input class=subdatefield name="+d2+" size="+s2+" maxlength="+s2+" onKeyPress='return numbersOnly()' onKeyUp=autoJump('"+d3+"') onBlur='setToNbr()' style='border:none; padding:0; width:"+w2+"'>/&nbsp";
 txt += "<input dt='d"+fmt+"' class=subdatefield name="+d3+" size="+s3+" maxlength="+s3+" onKeyPress='return numbersOnly()' onBlur='setToNbr()' style='border:none; padding:0; width:"+w3+"'></span>";
 changeContent(el,txt);
}

function createTimeVar(el,fmt) {
 if (!fmt) {
    var fmt='s';
 }
 fmt=fmt.toLowerCase();
 elobj=document.getElementById(el);
 if (!elobj) return;
 elobj.className='datefield';  
 var d1='d1#$'+el;
 var d2='d2#$'+el;
 var d3='d3#$'+el;
 var w1='1.4em';
 var w2='1.4em';
 var w3='3em'; 
 var s1='2';
 var s2='2';
 var s3='4';

 var txt="<span style='background-color:white; border:2px inset; overflow:hidden; padding:0; padding-right:1px; padding-top:1.5px; padding-left:2px'>";
 txt += "<input class=subdatefield name="+d1+" size="+s1+" maxlength="+s1+" onKeyPress='return numbersOnly()' onKeyUp=autoJump('"+d2+"') onBlur='setToNbr()' style='border:none; padding:0; width:"+w1+"'><b>:</b>&nbsp";
 txt += "<input class=subdatefield name="+d2+" size="+s2+" maxlength="+s2+" onKeyPress='return numbersOnly()' onKeyUp=autoJump('"+d3+"') onBlur='setToNbr()' style='border:none; padding:0; width:"+w2+"'>";
 if (fmt=='s') {
     txt += "&nbsp<select dt='ts' class=subdatefield name="+d3+" style='border:none; padding:0'><option value=AM>AM</option><option value=PM>PM</option></select>";
 }
 else {
     txt += "<input dt='ts' class=subdatefield name="+d3+" style='display:none'>";
 }
 changeContent(el,txt);
}

//-------------------- End Date and Time Functions

// -------------- Start PopUp Calendar-2 related
var cal$months = new Array("January", "February", "March",
   "April", "May", "June", "July", "August", "September",
   "October", "November", "December");
var cal$daysinmth = new Array(31, 28, 31, 30, 31, 30, 31, 31,30, 31, 30, 31);
var cal$days = new Array("Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat");


function promptCal(target,fmt,code) {
 var datfldfmt='';
 var poppos=''; 
 target=target.split(':');
 if (target.length>1) {poppos=target[1]}
 target=target[0]; 
 var targetvalue=document.getElementById(target);
 if (!targetvalue) return;
 
 popcalfmt='*y';
 if (arguments.length>1) {
     if (arguments[1].toUpperCase()=='*D' || arguments[1].toUpperCase()=='D') {
          popcalfmt='*d';
     }
     if (arguments[1].toUpperCase()=='*M' || arguments[1].toUpperCase()=='M') {
          popcalfmt='*m';
     }
 }
 popcalcode='';
 if (code) popcalcode=code;
 var today = new getToday();
 var todayyear=today.year;
 var inday=today.day;
 var inmonth=today.month;
 var inyear=today.year;

 if (targetvalue.className !='datefield') {
    targetvalue=targetvalue.value.split('/'); 
 }
 else { 
    var d1='d1#$'+target;
    var d2='d2#$'+target;
    var d3='d3#$'+target;
    var d1obj=document.getElementById(d1); if (!d1obj) return;
    var d2obj=document.getElementById(d2); if (!d2obj) return;
    var d3obj=document.getElementById(d3); if (!d3obj) return;
    datfldfmt=d3obj.dt.sst(2,1); 
    popcalfmt='*'+datfldfmt;
    if (!isBlank((d1obj.value+d2obj.value+d3obj.value))) {
        targetvalue=d1obj.value+'/'+d2obj.value+'/'+d3obj.value;
    } else targetvalue='';
    targetvalue=targetvalue.split('/'); 
 }
 
 if (targetvalue.length==3) {
    inday=targetvalue[2];
    inmonth=targetvalue[1];
    inyear=targetvalue[0];
    if (arguments.length>1 || datfldfmt) {
       var dtfmt='';
       if (arguments.length>1) {dtfmt=arguments[1].toLowerCase()}
       else {dtfmt=datfldfmt}
       if (dtfmt=='d'|| dtfmt=='*d') {
          inday=targetvalue[0];
          inmonth=targetvalue[1];
          inyear=targetvalue[2];
       }
       else {
          if (dtfmt=='m' || dtfmt=='*m') {
             inmonth=targetvalue[0];
             inday=targetvalue[1];
             inyear=targetvalue[2];
          }
       } 
    }
 }

 try {
   var indate= new Date(inyear, inmonth-1, inday); 
   today.day=indate.getDate();
   today.month=indate.getMonth(); today.month=today.month+1;
   today.year=indate.getFullYear();
 } catch(e) {today = new getToday()}

 $cal$day=today.day;
 $cal$mth=today.month-1; if ($cal$mth==-1) $cal$mth=11;
 $cal$yer=today.year;

 datetarget=target;
 var thisdiv=document.getElementById('divpopcal')
 if (!thisdiv) {
  var divpopcal=document.createElement('div');
  divpopcal.id="divpopcal";
  divpopcal.className="calPopShadowWindow";
  divpopcal.style.display="none";
  document.getElementsByTagName('body')[0].appendChild(divpopcal);
 }

  var thisdiv=document.getElementById('divpopcal')
  var txt='<TABLE ID="popcalendar"><THEAD><TR><TD COLSPAN=7 ALIGN=CENTER>';
  // Month combo box
  txt +='<SELECT ID="popcalmonth" ONCHANGE="new$calendar()">';
  // Output cal$months into the document.
  // Select current month.
  for (var intLoop = 0; intLoop < cal$months.length; intLoop++) {
      txt += "<OPTION VALUE= " + (intLoop + 1) + " " + ($cal$mth == intLoop ? "Selected" : "") + ">" + cal$months[intLoop];
  }
  txt +='</SELECT>';
  // Year combo box
  txt += '<SELECT ID="popcalyear" ONCHANGE="new$calendar()">'
  // Output years into the document.
  // Select current year.
  for (var intLoop = todayyear-100; intLoop < (todayyear + 50); intLoop++) {
      txt += "<OPTION VALUE= " + intLoop + " " + (today.year == intLoop ? "Selected" : "") + ">" + intLoop;
  }
  txt += '</SELECT></TD></TR><TR CLASS="days">';
  //-- Generate column for each day. --
  // Output days.
  for (var intLoop = 0; intLoop < cal$days.length; intLoop++) {
      txt += "<TD style=background-color:orange>" + cal$days[intLoop] + "</TD>";
  }
  txt += '</TR></THEAD><TBODY ID="dayList" ALIGN=CENTER style="cursor:arrow" ONCLICK=getClickedDate()>';
  // Generate grid for individual days.
  for (var intWeeks = 0; intWeeks < 6; intWeeks++) {
      txt += "<TR>";
      for (var intDays = 0; intDays < cal$days.length; intDays++) {
          txt += "<TD onmouseover=colorCalDay(this) onmouseout=colorCalDay2(this)></TD>";
      }
      txt += "</TR>";
  }
  txt +='</TBODY></TABLE>';
  txt +='<div class=popcalcancel onclick="hidePopUp()">Cancel</div>';
  txt +='</div>'
  changeContent('divpopcal',txt);
  new$calendar(); 
  if (poppos=='*center' || poppos=='center') {
      showElement('divpopcal');
      var workarea=document.getElementById('workarea');
      if (!workarea) {workarea=document.getElementsByTagName('body')[0]};
      try {    
          ypos=workarea.offsetHeight-thisdiv.offsetHeight-header.offsetHeight-footer.offsetHeight; 
          xpos=workarea.offsetWidth-thisdiv.offsetWidth-optionarea.offsetWidth-optionarea2.offsetWidth;
          ypos=ypos/2+header.offsetHeight; 
          xpos=xpos/2+optionarea.offsetWidth;
      } 
      catch(e) {
          ypos=(workarea.offsetHeight-thisdiv.offsetHeight)/2; 
          xpos=(workarea.offsetWidth-thisdiv.offsetWidth)/2; 
      } 
      hideElement('divpopcal');
  }
  thisdiv.style.top=ypos; thisdiv.style.left=xpos;
  popUp('divpopcal');
  thisdiv.style.width="0";
  thisdiv.style.height="0";
}

 

function getCal$Days(month, year) {
// Test for leap year when February is selected.
   if (1 == month)
      return ((0 == year % 4) && (0 != (year % 100))) || (0 == year % 400) ? 29 : 28;
   else
      return cal$daysinmth[month];
}

function new$calendar() {
  var today=new Object;
  today.day=$cal$day;
  today.month=$cal$mth;
  today.year=$cal$yer;

   var parseYear = parseInt(document.all.popcalyear
      [document.all.popcalyear.selectedIndex].text);
   var newCal = new Date(parseYear,
      document.all.popcalmonth.selectedIndex, 1);
   var day = -1;
   var startDay = newCal.getDay();
   var daily = 0;
   if ((today.year == newCal.getFullYear()) && (today.month == newCal.getMonth()))
      day = today.day;
   // Cache the popcalendar table's tBody section, dayList.
   var tableCal = document.all.popcalendar.tBodies.dayList;
   var intcal$daysinmth = getCal$Days(newCal.getMonth(), newCal.getFullYear());
   for (var intWeek = 0; intWeek < tableCal.rows.length; intWeek++)
      for (var intDay = 0; intDay < tableCal.rows[intWeek].cells.length; intDay++) {
         var cell = tableCal.rows[intWeek].cells[intDay];

         // Start counting days.
         if ((intDay == startDay) && (0 == daily))
            daily = 1;

         // Highlight the current day.
         cell.className = (day == daily) ? "today" : "";
         // Output the day number into the cell.
         if ((daily > 0) && (daily <= intcal$daysinmth))
            cell.innerText = daily++;
         else
            cell.innerText = "";
       }

}

function getClickedDate() {
   var sDate;
// This code executes when the user clicks on a day
// in the popcalendar.
   if ("TD" == event.srcElement.tagName) {
      // Test whether day is valid.
     if ("" != event.srcElement.innerText) {
        var m=valueOf('popcalmonth');
        var d=event.srcElement.innerText;
        if (numeric(m) < 10) m='0'+m;
        if (numeric(d) < 10) d='0'+d;
    //  if (m.length=1) m='0'+m;
        sDate = document.all.popcalyear.value+"/"+m+ "/"+ d;
        if (popcalfmt=='*d') {sDate = d + "/"+m+ "/"+ document.all.popcalyear.value;}
        if (popcalfmt=='*m') {sDate = m + "/"+d+ "/"+ document.all.popcalyear.value;}
      
	changeVar(datetarget,sDate);
        if (popcalcode !='') {try {eval(popcalcode)} catch(e) {}};
     }
   }
   hidePopUp();
 }

function colorCalDay(obj) {
 if (obj.innerHTML !='' && obj.className !='today') {
    obj.className='days2';
 }
}

function colorCalDay2(obj) {
 if (obj.innerHTML !='' && obj.className !='today') {
    obj.className='days3';
 }
}


// -------------- End PopUp Calendar related

function popUp(id) {
  var obj=document.getElementById(id);
  if (obj) {
     try {hideElement(popupid)} catch (e) {}
     popupid=id;
     allowpopup=true;
     showElement(id);
     obj.style.top=ypos;
     obj.style.left=xpos;
  }
}

function hidePopUp() {
  try {hideElement(popupid)} catch (e) {}
  popupid='';
}

// -------------- Start Fancy Buttons

function buttonDef(type) {
 this.text='Submit';
 this.width=120;
 this.height=22;
 this.border=buttonborder;
 this.areaalign='horizontal';
 this.areacolor=buttonareacolor;
 this.areapercent=buttonareapercent;
 this.hovereffect='fade';

 //******************************************************************************************************** 
 // Valid Types: exit, add, recycle, delete, print,cancel, change, edit, refresh, accept, save, apply, back
 //********************************************************************************************************
 if (type && type.toUpperCase()=='EXIT') {
     this.text='<span style="font-family:arial; font-size:10pt; vertical-align: text-top; color:white">x</span>';
     this.width=40; this.height=15;                                  
     this.areacolor=['#E8988D:#D36554','#C72B0E:#BB4721'];             
     this.areapercent=[50,50];                                         
     this.areaalign='horizontal';                                      
     this.border='1px solid #072933';
     this.hovereffect='glow';
     return;                     
  }
  if (type && type.toUpperCase()=='ADD') {
     this.height=30;
     this.width=80;
     this.text='<span style="font-family:Helvetica; font-size:9pt; color:white"><img src="../image/insert.ico" align="absmiddle"  height="32" width="32"></img>Add</span>';
     return;                     
  } 
  if (type && type.toUpperCase()=='NEW') {
     this.height=30;
     this.width=160;
     this.text='<span style="font-family:Helvetica; font-size:9pt; color:white"><img width="28" height="28" SRC="../image/Pencil 7.ico"  align="absmiddle" alt="new" />&nbspCreate New Entries</span>';
     return;                     
  } 
  if (type && type.toUpperCase()=='RECYCLE') {
     this.height=30;
     this.width=80;
     this.text='<span style="font-family:Helvetica; font-size:9pt; color:white"><img src="../image/bin.ico" top=18 align="absmiddle"  height="32" width="32"></img>Delete</span>';
     return;                     
  } 
  if (type && type.toUpperCase()=='DELETE') {
     this.height=30;
     this.width=80;
     this.text='<span style="font-family:Helvetica; font-size:9pt; color:white"><img src="../image/trash.ico" top=18 align="absmiddle"  height="32" width="32"></img>Delete</span>';
     return;                     
  } 
  if (type && type.toUpperCase()=='PRINT') {
     this.height=30;
     this.width=80;
     this.text='<span style="font-family:Helvetica; font-size:9pt; color:white"><img src="../image/printer.ico" top=18 align="absmiddle"  height="32" width="32"/>Print</span>';
     return;                     
  } 
  if (type && type.toUpperCase()=='CANCEL') {
     this.height=30;
     this.width=80;
     this.text='<span style="font-family:Helvetica; font-size:9pt; color:white"><img src="../image/x2.ico" align="absmiddle"  height="25" width="25"></img>Cancel</span>';
     return;                     
  } 
  if (type && type.toUpperCase()=='CLOSE') {
     this.height=30;
     this.width=80;
     this.text='<span style="font-family:Helvetica; font-size:9pt; color:white"><img src="../image/x2.ico" align="absmiddle"  height="25" width="25"></img>Close</span>';
     return;                     
  } 
  if (type && type.toUpperCase()=='CHANGE') {
     this.height=30;
     this.width=80;
     this.text='<span style="font-family:Helvetica; font-size:9pt; color:white"><img src="../image/tools.ico" align="absmiddle"  height="25" width="25"></img>Change</span>';
     return;                     
  }  
  if (type && type.toUpperCase()=='EDIT') {
     this.height=30;
     this.width=80;
     this.text='<span style="font-family:Helvetica; font-size:9pt; color:white"><img src="../image/note14.ico" align="absmiddle"  height="25" width="25"></img>Edit</span>';
     return;                     
  } 
  if (type && type.toUpperCase()=='REFRESH') {
     this.height=30;
     this.width=100;
     this.text='<span style="font-family:Helvetica; font-size:9pt; color:white"><img src="../image/revert.ico" align="absmiddle"  height="32" width="32"></img>Refresh</span>';
     return;                     
  }   

  if (type && type.toUpperCase()=='ACCEPT') {
     this.height=30;
     this.width=80;
     this.text='<span style="font-family:Helvetica; font-size:9pt; color:white"><img src="../image/ok.ico" align="absmiddle"  height="25" width="25"></img>Accept</span>';
     return;                     
  }   

  if (type && type.toUpperCase()=='SAVE') {
     this.height=30;
     this.width=80;
     this.text='<span style="font-family:Helvetica; font-size:9pt; color:white"><img src="../image/save.ico" align="absmiddle"  height="25" width="25"></img>Save</span>';
     return;                     
  }   

  if (type && type.toUpperCase()=='APPLY') {
     this.height=30;
     this.width=80;
     this.text='<span style="font-family:Helvetica; font-size:9pt; color:white"><img src="../image/apply.ico" align="absmiddle"  height="25" width="25"></img>Apply</span>';
     return;                     
  }  

  if (type && type.toUpperCase()=='BACK') {
     this.height=30;
     this.width=100;
     this.text='<span style="font-family:Helvetica; font-size:9pt; color:white"><img src="../image/back.png" align="absmiddle"  height="25" width="25"></img>&nbspBack</span>';
     return;                     
  }  

 
 //this.areacolor=new Array();
 //this.areacolor[0]='#ffdc8a';
 //this.areapercent=new Array();
 //this.areapercent[0]=100;
}

function createButton(but,div) {
 var butobj=document.getElementById(div);
 if (!butobj) return;

var dummy$$but=document.getElementById('dummy$$but');
if (dummy$$but==null) {
    dummy$$but=document.createElement('div');
    dummy$$but.id="dummy$$but";
    document.getElementsByTagName('body')[0].appendChild(dummy$$but);
}

 var butname = 'but'+(Math.floor(Math.random() * (99999999 - 1)) + 1);
 var gradienttype='0';
 var ele=but.areacolor.length;
 dummy$$but.innerHTML='';
 but.areaalign=but.areaalign.toUpperCase();
 if (but.areaalign!='HORIZONTAL') gradienttype='1';
 if (ele<but.areapercent.length) ele=but.areapercent.length;
 var txt='<div class=fancydatawrap style="cursor:hand; border:'+but.border;
 if (but.width) txt += '; width:'+but.width;
 if (but.width) txt += '; height:'+but.height;
 txt += '" onmousedown=chg$$But("in",this,"'+butname+'")';
//txt += ' onmouseover=chg$$ButFilter("over",this)';
//txt += ' onmouseout=chg$$ButFilter("out",this)';
  txt += ' onmouseover=chg$$ButFilter("over",this,"'+butname+'","'+but.hovereffect+'")';
  txt += ' onmouseout=chg$$ButFilter("out",this,"'+butname+'","'+but.hovereffect+'")';
 txt += ' onmouseup=chg$$But("out",this,"'+butname+'")';
 txt +='>';
 for (var x=0; x<ele; x++) {
     if (but.areaalign=='HORIZONTAL')
        txt +='<div class=fancycolor style="'
     else
        txt +='<span class=fancycolor style="height:100%;'
     if (but.areacolor[x]) {
        var colors=but.areacolor[x].split(':');
        if (colors.length==1) {txt +='background-color:'+colors[0];}
        else {
            txt += ' filter:progid:DXImageTransform.Microsoft.Gradient (GradientType='+gradienttype+', StartColorStr=' +colors[0]+' endColorStr=' +colors[1]+')';
        }
     }
     if (but.areaalign=='HORIZONTAL') {
       if (but.areapercent[x]) txt +='; height:'+but.areapercent[x]+'%';
       txt +='"></div>';
     }
     else  {
        if (but.areapercent[x]) txt +='; width:'+but.areapercent[x]+' %';
        txt +='"></span>';
     }
 }
 if (!isBlank(butobj.innerHTML)) {but.text=butobj.innerHTML};
 txt += '<div class=fancydata id='+butname+'>'+but.text+'</div></div>';
 dummy$$but.innerHTML=txt;
 var butobjdata=document.getElementById(butname);
 var top=but.height-butobjdata.offsetHeight-3;
 var left=but.width-butobjdata.offsetWidth;
 butobjdata.style.top=top/2;
 butobjdata.style.left=left/2;
 butobj.innerHTML=dummy$$but.innerHTML
 butobj.style.width=0;
 dummy$$but.innerHTML='';
}

function chg$$But(dir,obj,dtaId)
{
 dir=dir.toUpperCase();
 var dobj=document.getElementById(dtaId);

 if(dir=='IN'|| dir=='*IN'){
  dobj.lang=obj.style.borderStyle;
  obj.style.borderStyle='inset';
  var top = parseInt(dobj.style.top+0,10);
  var left = parseInt(dobj.style.left+0,10);
  dobj.style.top=top+1;
  dobj.style.left=left+1;
 }

 if(dir=='OUT' || dir=='*OUT'){
  obj.style.borderStyle=dobj.lang;
//obj.style.borderStyle='solid';
  var top = parseInt(dobj.style.top+0,10);
  var left = parseInt(dobj.style.left+0,10);
  dobj.style.top=top-1;
  dobj.style.left=left-1;
 }
}

function chg$$ButFilter(posn,obj,butname,hover) {
 hover=hover.toUpperCase();
 var bobj=document.getElementById(butname);
   if (posn=='over') {
      switch(hover) {
        case 'FADE':
          obj.style.filter="alpha(opacity=75)";
          bobj.style.filter="alpha(opacity=100)";
          break;
        case 'GLOW':
          bobj.style.filter="glow(color=#0000FF,strength=2)";
          break;
        case 'SHADOW':
         bobj.style.filter="shadow(color=#0000FF,strength=1)";
         break
      } 
   }
   else {
      switch(hover) {
        case 'FADE':
         obj.style.filter="alpha(enabled=0)";
         bobj.style.filter="alpha(enabled=0)";
         break;
        case 'GLOW':
         bobj.style.filter="glow(enabled=0)";
         break
        case 'SHADOW':
         bobj.style.filter="shadow(enabled=0)";
         break
      }
  }
}

function chg$$ButFilter2(posn,obj,butname,hover) {
 hover=hover.toUpperCase();
 var bobj=document.getElementById(butname);
   if (posn=='over') {
      if (hover=='FADE') {
        obj.style.filter="alpha(opacity=75)";
        bobj.style.filter="alpha(opacity=100)";
      }
      if (hover=='GLOW') {
         bobj.style.filter="glow(color=#0000FF,strength=1)";
      } 
   }
   else {
      if (hover=='FADE') {
         obj.style.filter="alpha(enabled=0)";
         bobj.style.filter="alpha(enabled=0)";
      }
      if (hover=='GLOW') { 
         bobj.style.filter="glow(enabled=0)";
      }
  }
}
// -------------- End Fancy Buttons

function getFormVar(useform) {
  var form=' ';
  var obj="";
  var index=0; 
  var formarray=new Array();
  if (useform) form=useform;
  else form=currentform;
  obj=document.getElementById(form);
   
  if (obj==null) {alert('required form - '+form+' - not found'); return ''}

  for (var j=0; j<obj.length; j++) {
      if (obj[j].className=='subdatefield') {
          if (obj[j].name.sst(1,4)=='d1#$') {
              formarray[index]=obj[j].name.split('d1#$')[1];
              index ++;
          }
      }
      if ((obj[j].tagName == 'INPUT' && obj[j].className !='subdatefield') || obj[j].tagName == 'TEXTAREA' || obj[j].tagName=='SELECT' || obj[j].className=='datefield') {
        if (obj[j].name!='') formarray[index]=obj[j].name;
        else formarray[index]=obj[j].id; 
        index ++;  
      }
  }
  return formarray; 
 }


function loadSelect(sel,ary,dft) {                   
  if (ary.length<1) return;                      
  var obj=document.getElementById(sel);          
  if (obj==null) return;                         
  var len=obj.length;                            
    for (var i=0; i<len; i++) {                  
      try {                                      
        obj.options[0] = null;                   
      } catch (e) {}                             
    }                                            
    var opttxt='';                               
    for (i=0; i<ary.length; i++) {               
        ary[i]=''+ary[i];                        
        var opt=ary[i].split(':');               
        if (opt.length>1) opttxt=opt[1];         
        else opttxt=opt[0];                      
        var addopt = new Option(opttxt,opt[0]);  
        obj.options[obj.length] = addopt;        
    } 
    if (dft) {changeVar(sel,dft)} 
}


function assignSelectVar(selfrom,selto,dft) {                   
                   
  var obj=document.getElementById(selfrom);          
  if (obj==null) return;  
  var obj2=document.getElementById(selto);          
  if (obj2==null) return;
                        
  var len=obj.length; 
  var len2=obj2.length;                          
  for (var i=0; i<len2; i++) {                  
      try {                                      
        obj2.options[0] = null;                   
      } catch (e) {}                             
    }                                            
                            
    for (i=0; i<len; i++) {               
        //var opt=obj[i].value;               
        //var opttxt=obj[i].text;                      
        var addopt = new Option(obj[i].text,obj[i].value);  
        obj2.options[obj2.length] = addopt;        
    } 
    if (dft) {changeVar(selto,dft)} 
}

function getUrlParms() {
  var urlprms=new Object();
  var getVars = new Array();
  var qString = unescape(top.location.search.substring(1));
  var pairs = qString.split('&');
  for (var i in pairs) {
      var nameval = pairs[i].split('=');
      if (nameval.length>1) {
         eval('urlprms.'+nameval[0]+'= nameval[1]');
      }
  } 
  return urlprms;
}                


function searchCol(tabl,column,val,matchtype,startatrow) { 

 //matchype='partial' or 'total' the default is 'full'

 var len=0; 
 if (!startatrow) {var startatrow='top'}
 else {startatrow=numeric(startatrow)}
 if (!matchtype || (matchtype != 'partial')) {var matchtype='full'}
 var valuetype='char';
 var cmpval='';
 try {
    val=val.trim().toUpperCase();
    if (matchtype='partial') {len=val.length}
 }
 catch(e) {val=numeric(val); valuetype='num';}
 posTabCursor(tabl,startatrow);
 readRow(); 
 while (!eof) {
   if (valuetype=='char') {
      cmpval=valueOfCol(column).trim()
      if (len !=0) {cmpval=cmpval.sst(1,len).toUpperCase()}
   }
   else {cmpval=numValueOfCol(column);}
   
   if (cmpval==val) {
      var obj=rows[currentrow]; 
      
      if (currentrow==0) {rows[currentrow].scrollIntoView(true);}
      else {rows[currentrow-1].scrollIntoView(true);}  

      //try {
         //if (currentrow==0) {rows[currentrow].focus();}
         //else {rows[currentrow-1].focus();}  
      //}  catch(e) {}

      var ptrobj=eval('tabrowclicked.'+tabl);
      if (ptrobj != obj) { 
         obj.lang=obj.style.backgroundColor;   
         var selectcolor=rowselectcolor;
         try {
             var rowsltcolor=eval('tab$$selectcolor.'+clickedtable);
             selectcolor=rowsltcolor;
         } catch(e) {}    
         obj.style.backgroundColor=selectcolor;       
         try {                                                        
             eval('tabrowclicked.'+tabl+'.style.backgroundColor=tabrowclicked.'+tabl+'.lang'); 
         } catch (e) {}                                               
         try {                                                        
            eval('tabrowclicked.'+tabl+'=obj');            
         } catch (e) {}
      } 
      return currentrow;                                              
      break;
   }
   readRow();
 }
 return -1; 
}


function spinDef(id) {
this.id=id; 
this.size=100;
this.align='right';
this.maxlength=10;
this.increment=1;
this.lowervalue='none';
this.uppervalue='none';
this.upfunction='spinValue';
this.downfunction='spinValue'; 
}

function applySpinDef(obj,area) {
 var sw=28+(obj.size-1)*7; 
 var swfull=sw+13;
 var txt="<span class=spincontainer style='width:"+swfull+"'>";
     txt += "<div class=spinwrap style='width:"+swfull+"'>";
     txt += "<input name="+obj.id+" style='text-align:"+obj.align+"' size="+obj.size+" maxlenght="+obj.maxlength+">";
     txt += "<div class=spinimgwrap>";
     txt += " <img class=spinimgup src='../image/spin_up.gif'";
     txt += " onclick="+obj.upfunction+"('"+obj.id+"','up',"+obj.increment+",'"+obj.lowervalue+"','"+obj.uppervalue+"') ondblclick="+obj.upfunction+"('"+obj.id+"','up',"+obj.increment;
     txt += ",'"+obj.lowervalue+"','"+obj.uppervalue+"')"; 
     txt += " onmouseover=this.className='spinimgupover' onmouseout=this.className='spinimgup'></img>";
    
     txt += " <img class=spinimgdown src='../image/spin_down.gif'";
     txt += " onclick="+obj.downfunction+"('"+obj.id+"','down',"+obj.increment+",'"+obj.lowervalue+"','"+obj.uppervalue+"') ondblclick="+obj.downfunction+"('"+obj.id+"','down',"+obj.increment;
     txt += ",'"+obj.lowervalue+"','"+obj.uppervalue+"')";
     txt += " onmouseover=this.className='spinimgdownover' onmouseout=this.className='spinimgdown'></img>"; 
       

     txt += "</div></div></span>"; 
 changeContent(area,txt);
 return true;
}
 
function spinValue(fld, dir, by, lower, upper) {
 var value=0;
 
 if (!by || by=='') {var by=1}
 else {by = numeric(by)} ;
 if (!lower || lower=='none') {var lower=-99999999999999}
 else {lower=numeric(lower)} ;
 if (!upper || upper=='none') {var upper=99999999999999;}
 else {upper=numeric(upper)}
 
 if (dir=='up') {value=numValueOf(fld)+by};
 else {value=numValueOf(fld)-by}
 if (value < lower || value > upper) {return}
 changeVar(fld,value);

}


function removeElement() {
 for (var i=0; i<arguments.length; i++) {
     var obj=document.getElementById(arguments[i]); 
     try { 
         obj.parentNode.removeChild(obj);
         delete obj;
     } catch (e) {}
 }
}


function isEqual(v1,v2) {
 try {v1=v1.trimr()} catch(e) {}
 try {v2=v2.trimr()} catch(e) {}  
 if (v1==v2) {return true}
 else return false;
}  


function dataStore() {
  var numflds='';
  for (var i=0; i<arguments.length; i++) {
      var fulldata=arguments[i].split(':');
      var use=fulldata[0];
      eval('this.'+use+'=new Array()');
      if (fulldata.length>1) {
         if (fulldata[1].toUpperCase()=='N') {
            if (numflds=='') numflds="'"+use+"'";
            else numflds += ','+"'"+use+"'";
         }
      }
  }
  if (numflds=='') this.numflds=new Array();
  else eval("this.numflds=["+numflds+"]"); 
}


function inzDataStore(obj,indx) {
  
  if (arguments.length==1) {
      for (var property in obj) {
          if (property !='numflds')
             eval('obj.'+property+'=new Array()');
      }
  return;
  }
  
  for (var property in obj) { 
      if (property !='numflds') {
         if (obj.numflds.length>0) {
            var matchfound=false;
            for (var i=0; i<obj.numflds.length; i++) {
                if (obj.numflds[i]==property) {
                   matchfound=true;
                   i=9999; 
                }
            }
            if (!matchfound) eval('obj.'+property+'['+indx+']=" "');  
            else eval('obj.'+property+'['+indx+']=0');
         }
         else eval('obj.'+property+'['+indx+']=" "');
      }
  }

}

//--- Start Saving/comparing and Restoring Variables

function saveVar() {

 var form='';
 var obj=''; 
  
 for (var i=0; i<arguments.length; i++) {
 
      var element=arguments[i].split(':');

  if (element[0]=='*form') {
     form=element[1];
     obj=document.getElementById(form);
     if (obj) {
        for (var j=0; j<obj.length; j++) {
            if ((obj[j].tagName == 'INPUT' || obj[j].tagName == 'TEXTAREA' || obj[j].tagName=='SELECT') && obj[j].className !='subdatefield') {
               eval("this."+obj[j].name+"=obj[j].value"); 
            }
            else {
                 if (obj[j].className=='subdatefield' && obj[j].name.sst(1,4)=='d1#$') {
                    var objp=obj[j].parentNode.parentNode; 
                    eval("this."+objp.id+"=valueOf(objp.id)"); 
                 }
            }
        }
     }
  }
  else {
       obj=document.getElementById(element[0]);
       if (obj) {
          if (obj.className !='datefield') {
             eval("this."+element[0]+"=obj.value");
          }
          else {
             eval("this."+element[0]+"=valueOf(obj.id)");
          }
       }
  }

 } //end for

} 


saveVar.prototype.restoreVar = function() {
 var obj='';
 if (arguments.length==0) {
    for (var property in this) {
       obj=document.getElementById(property);
       if (obj) {
          if (obj.className !='datefield') {
             eval("obj.value=this."+property);
          }
          else {
             eval("var v=this."+property); alert(v);
             changeVar(obj.id,v);
          }
       }
    }
    return;
 }

 var form='';
 
 for (var i=0; i<arguments.length; i++) {
 
      var element=arguments[i].split(':');

  if (element[0]=='*form') {
     form=element[1]
     obj=document.getElementById(form);
     if (obj) {
        try {
            if (obj[i].className !='datefield') {
               eval("obj[i].value=this."+obj[i].name);
            } 
            else {
              if (obj[i].name.sst(1,4)=='d1#$') { 
                 var obj2=obj[j].parentNode.parentNode;
                 eval("var v=this."+obj2.id);
                 changeVar(obj2.id,v);
              }
            }
        } catch(e) {}
     }
  }
  else {
       obj=document.getElementById(element[0]);
       if (obj) {
          if (obj.className !='datefield') {
             eval("obj.value=this."+element[0]);
          }
          else {
              eval("var v=this."+element[0]);
              changeVar(obj.id,v);
          } 
       }
  }

 } //end for

} 


saveVar.prototype.hasChangedVar = function() {
 var obj='';
 var value='';
 if (arguments.length==0) {
    for (var property in this) {
       obj=document.getElementById(property);
       if (obj) {
          eval("value=this."+property);
          if (obj.className != 'datefield') {
             if (!isEqual(value,obj.value)) return true;
          }
          else {
             if (!isEqual(value,valueOf(obj.id))) return true;
          }
       }
    }
    return false;
 }

 var form='';
 
 for (var i=0; i<arguments.length; i++) {
 
      var element=arguments[i].split(':');

  //if (element[0]=='*form') {
  //   form=element[1]
  //   obj=document.getElementById(form);
   //  if (obj) {
    //    try {
   //         eval("value=this."+obj[j].id);
   //         if (!isEqual(value,valueOf(obj[j].id))) return true;  
   //    } catch(e) {}
    // }
  //}
  //else {
       obj=document.getElementById(element[0]);
       if (obj) {
          eval("value=this."+element[0]);
          try {
              if (obj.className !='datefield') {
                 if (!isEqual(value,obj.value)) return true;
              }
              else {
                 if (!isEqual(value,valueOf(obj.id))) return true;
              }  
          } catch(e) {}
       }
  //}

 } //end for
 return false;
} 


saveVar.prototype.savedValueOf = function(fld) {
 var value='';
 try {
     eval("value=this."+fld);
     return value;  
 } catch(e) {return ''}
}



saveVar.prototype.returnChangedVar = function(as) {
 var value=''; 
 if (!as) {var as='sqlupdateobj'}
 if (as != 'array') {as='sqlupdateobj'}
 if (as=='array') {var rtnas=new Array()}
 else {var rtnas=new sqlUpdateObj()}
  
 for (var property in this) {
     obj=document.getElementById(property);
     if (obj) {
        eval("value=this."+property);
        var vlu=''; 
        if (obj.className !='datefield') {vlu=obj.value;}
        else {vlu=valueOf(obj.id)} 
        if (!isEqual(value,vlu)) {
           if (as=='array') {rtnas.push(property)}
           else {rtnas.addVar(property)}
        }
     }
 }
 return rtnas;
} 


function clone(obj) {
 if (Object.prototype.toString.call(obj) === '[object Array]') {
    var out = [], i = 0, len = obj.length;
    for ( ; i < len; i++ ) {
        out[i] = arguments.callee(obj[i]);
    }
    return out;
 }
 if (typeof obj === 'object') {
    var out = {}, i;
    for ( i in obj ) {
         out[i] = arguments.callee(obj[i]);
    }
    return out;
 }
 return obj;
}


// Start email functions
function emailDef() {
  this.to=''; //address1; address2;..addressn..
  this.from='';
  this.subject='';
  this.cc='';
  this.bcc='';
  this.attachment=new Array(); //drive/
  this.message='';
}


function sendEmail(email) {

  //sndEmailPhp();  return;

  var i=0;  
  //Create a object of Outlook.Application
    try {
        var outlookApp = new ActiveXObject("Outlook.Application");
        var nameSpace = outlookApp.getNameSpace("MAPI");
        mailFolder = nameSpace.getDefaultFolder(6);
        mailItem = mailFolder.Items.add('IPM.Note.FormA');
        mailItem.Subject=email.subject;
        mailItem.To = email.to;
        mailItem.Cc = email.cc;
        mailItem.Bcc = email.bcc;
        mailItem.HTMLBody = email.message; 

        for (i=0; i<email.attachment.length; i++) {
             try {
                  mailItem.Attachments.Add(email.attachment[i]);
             } 
             catch(e) {
                  alert('Attachment '+email.attachment[i]+' was not found\nMail not sent');
                  return false;
             }
        }

        mailItem.Send();
  
        mailItem=null;
        mailFolder=null;
        nameSpace=null;
        outlookApp=null;
    }
    catch(e) {
      alert('Mail not sent\n'+e.message);
      return false;
    }
    
  return true;
}


function sndEmailPhp(){
var dontwait=false;
var phppath='../pcstools/phpsendmail.php';
var urlp="to=dwatson@portsofjamaica.com&from=me&subject=Testing PHP&message=<b>Hi There</b>"; 

ajaxCall(phppath,urlp); 

}

// End email functions  


function ajaxCall(pgm,urlp){
 var dontwait=false;
 ajaxerror='';
 ajaxresponse='';
      
 try {
    if ((urlp.length+pgm.length)<200) {
      var inpath=pgm+'?'+urlp;
      xmlHttp.open("GET",inpath, dontwait);
      xmlHttp.onreadystatechange = ajaxReturn;
      xmlHttp.send(null);
    }
    else {
      xmlHttp.open("POST",pgm, dontwait);
      xmlHttp.onreadystatechange = ajaxReturn;
      xmlHttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      xmlHttp.send(urlp);
    }
 }
 catch (e){
      ajaxerror='Unspecified error on ajaxCall function\n'+e.message;
      return 
 }
}


function ajaxReturn() {
  if (xmlHttp.readyState == 4) {
     if (xmlHttp.status != 200) {
         ajaxerror=xmlHttp.statusText;
     }
     if (xmlHttp.status == 200) {
         ajaxresponse = xmlHttp.responseText;
     }
  }
} 

function evalSpecial(string) {
  try {eval(string)} catch(e) {return false}
  return true;
}


function parseLineCsv(linecsv) {  

 // parse csv line by line into array  
  var csv = new Array(); 
  var i=0, j=0; 
  var linecsv = linecsv.replace(/,/g," ,");  
  var linecsv = linecsv.split(/,/g);  

 // This is continuing of 'split' issue in IE  
 // remove all trailing space in each field  

  for (var i=0;i <linecsv.length;i++) {  
    linecsv[i] = linecsv[i].replace(/\s*$/g,"");     
  }   

  linecsv[linecsv.length-1]=linecsv[linecsv.length-1].replace(/^\s*|\s*$/g,"");  

  var fstart = -1;  

  for (var i=0;i<linecsv.length;i++) { 
    if (linecsv[i].match(/"$/)) {  
      if (linecsv[i].match(/^"/)) {
        linecsv[i] = linecsv[i].replace(/^"|"$/g,"");
      }
      else {
             
        if (fstart>=0) {  
          for (var j=fstart+1;j<=i;j++) {  
            linecsv[fstart]=linecsv[fstart]+","+linecsv[j];  
            linecsv[j]="-DELETED-";  
          }  
           
          fstart=-1;   
        }  
      }  
    } 
       
    fstart = (linecsv[i].match(/^"/)) ? i : fstart;  
  }  

  var j=0;  

  for (var i=0;i<linecsv.length;i++) {  
    if (linecsv[i]!="-DELETED-") {  
      csv[j] = linecsv[i];  
      csv[j] = csv[j].replace(/^\s*|\s*$/g,"");     // remove leading & trailing space  
      csv[j] = csv[j].replace(/^"|"$/g,"");         // remove " on the beginning and end  
      csv[j] =csv[j].replace(/""/g,'"');           // replace "" with "               
      j++;  
    }
  }  
     
  return csv;  
}  


function makeFields(fieldspan) {

  //var field='*all'}
  var flds;
  if (fieldspan) {
      fieldspan=document.getElementById(fieldspan); 
      if (fieldspan.tagName=='SPAN' && fieldspan.field !=undefined) {
          var fobj=fieldspan;
          makeAllFields();
      }
      return;
  }
 
  var flds=document.getElementsByTagName("span");
  var i=0;
  var j=0;
  var k=0;
  var slttxt='';
  var slt='';

  for (i=0; i<flds.length;i++) { 

    var fobj=flds[i];
    if (fobj.field!=undefined) {makeAllFields()};
    else {
       if (fobj.button != undefined) {makeAllButtons()}
    }
  } 

  function makeAllFields() {

//.ref         {field from the data dictionary that is to be referenced}
//.type        {'char','numeric','time','date'}
//.length      {ll or ll,dd where ll=total length and dd=decimal length. eg: 8 or 11,0 or 13,3}
//             {ignored for type='time' or 'date'}    
//.decimal     {decimal protion if not stated in the length definition}
//             {ignored for type='time' or 'date'} 
//.editcode    {ignored for type='time' or 'date'} 
//.fieldclass
//.label       
//.nolabel     {no label is to be used}
//.labelclass
//.labelwidth
//.upper
//.output
//.textarea    {ignored for type='time' or 'date'} 
//.rows        {ignored for type='time' or 'date'} 
//.cols        {ignored for type='time' or 'date'} 
//.nocalendar  {Calendar not to be displayed for date field} 
//.select      {field create as a select field. Use a string of ordered pairs to show the values/text set
//              Example: select='1:One, 2:Two' eq. <select><option value=1>One</value><option value=2>Two</option></select>} 
    var fnam='';
    var f='';
    var len=0;
    var deci='';
    var nbr='';
    var nbr2='';
    var onblur='';
    var editcode='j';
    var txt1='';
    var txt2=''; 
    var ld='';
    var output='';
    var c=80; 
    var upper='';
    var upper2='';
    var upflag=0;
    var fieldclasstxt=''; 
    var evnts=['onchange','onkeypress','onkeyup','onkeydown','onmousedown','onmouseover','onmouseout','onclick'];

    if (fobj.fieldclass != undefined) {fieldclasstxt=" class="+fobj.fieldclass}
    if (fobj.output && fobj.output=='text') {fieldclasstxt=" class= outputastext"}

    var txt="<input type=text name="+fobj.field+fieldclasstxt;

    if (fobj.ref != undefined) {fnam=fobj.ref}
    else {fnam=fobj.field}
  
    f=clone(getFieldAttr(fnam));
    if (!f) {f=new Object()} 
    
    fnam=fobj.field;

    if (fobj.label)    {f.desc=fobj.label}
    if (fobj.type)     {f.type=fobj.type}
    if (fobj.length) {
       ld=fobj.length.split(',');
       f.length=ld[0];
       if (ld[1]) {f.decimal=ld[1]}
    }
    if (fobj.decimal)  {f.decimal=fobj.decimal}
    if (fobj.editcode) {f.editcode=fobj.editcode} 

    if (!f.type)   {f.type='char'}
    if (!f.length) {f.length=20}

    if (fobj.labelclass==undefined) {f.labelclass='label'}
    else {f.labelclass=fobj.labelclass}
    if (fobj.labelwidth==undefined) {f.labelwidth=''}
    else {f.labelwidth=" style='width:"+fobj.labelwidth+"'";} 

    if (fobj.nolabel != undefined) {
       // Do nothing
    }
    else {
       if (fobj.label != undefined) {
           //if (fobj.label) {
               txt1 = "<span id="+fnam+"_label class="+f.labelclass+f.labelwidth+">"+fobj.label+"</span>";
           //}
       }
       else {
           if (f.desc) {
               txt1 = "<span id="+fnam+"_label class="+f.labelclass+f.labelwidth+">"+f.desc+"</span>"; 
           }
       } 

    }

    if (f.type=='date') {
        fobj.id=fobj.field;
        createDateVar(fobj.field,datefmt);
        txt=fobj.innerHTML;
        if (fobj.output == undefined && fobj.nocalendar == undefined) {
            txt += "&nbsp<img id="+fnam+"_calendar src='../image/cal.jpg' onclick=promptCal('"+fobj.id+"') align=middle border=1></img>";
        }
        if (fobj.search != undefined) {
            txt += "&nbsp&nbsp<img id="+fnam+"_search src='../image/lookup.gif' onClick="+fobj.search+"></img>"; 
        }
        fobj.innerHTML=txt1+txt;
        if (fobj.output != undefined) {protect(fobj.field)}
        return;
    }

    if (f.type=='time') {
        fobj.id=fobj.field;
        createTimeVar(fobj.field,timefmt);
        txt=fobj.innerHTML;
        if (fobj.search != undefined) {
            txt += "&nbsp&nbsp<img id="+fnam+"_search src='../image/lookup.gif' onClick="+fobj.search+"></img>"; 
        }
        fobj.innerHTML=txt1+txt;
        if (fobj.output != undefined) {protect(fobj.field)}
        return;
    }

    if (fobj.select != undefined) {
        var slttxt="<select name="+fobj.field+fieldclasstxt+">";
        slt='';
        var pairs=fobj.select.split(',');
        for (j=0; j<pairs.length; j++) {
           slt=pairs[j].split(':');
           if (slt.length>1) {slttxt += '<option value='+slt[0].trim()+'>'+slt[1].trim()+'</option>';}
           else {slttxt += '<option value='+slt[0].trim()+'>'+slt[0].trim()+'</option>';}   
        }
        slttxt += '</select>';
        fobj.innerHTML=txt1+slttxt;
        assignFieldEvents();
        if (fobj.output != undefined) {protect(fobj.field)}
        return;
    }


    len=numeric(f.length);
    if (f.type=='numeric' || f.decimal) { 
        f.type='numeric'; 
        deci=numeric(f.decimal);
        if (deci>len) {deci=len}
        if (f.editcode) {editcode=f.editcode}
        onblur="onBlur=editField(this,"+deci+",'"+editcode+"',"+len+")";
        nbr=" class=numeric fldtype=numeric decimal="+deci+" editcode='"+editcode+"' ";
        txt += " length="+len+" size="+(len+(len-deci)/3)+nbr+onblur+">"; 
    }
    else {
       if (fobj.upper != undefined) {upflag=1; upper=" upper='yes' onkeypress=keyPressedToUpper() "; upper2=" onblur='this.value=this.value.toUpperCase()' "}
       if (fobj.textarea==undefined && len<80) {
           txt += " length="+len+" fldtype=char size="+(len+2)+" maxlength="+len+nbr+onblur+upper+upper2+">"; 
       }
       else {
           if (fobj.cols) {c=numeric(fobj.cols)} 
           if (fobj.rows) {r=numeric(fobj.rows)} else {r=len/c+1}
           txt="<textarea name="+fobj.field+" rows="+r+" cols="+c+upper+" length="+len+" fldtype=char onkeyup='return limitTextLength(this,"+len+")' onblur='setTextLength(this,"+len+","+upflag+")'></textarea>";  
       }
    }

    if (fobj.search != undefined) {
        txt += "&nbsp&nbsp<img id="+fnam+"_search src='../image/lookup.gif' onClick="+fobj.search+"></img>"; 
    }
    fobj.innerHTML=txt1+txt;
    assignFieldEvents()
    if (fobj.output != undefined) {protect(fobj.field)}
 

   function assignFieldEvents() {
     var z=0;
     try {
          fldobj=document.getElementById(fobj.field);
          for (z=0; z<evnts.length; z++) {
              var evnt = fobj[evnts[z]];
              if (evnt) {
                  if (typeof evnt != 'function') {eval("fldobj[evnts[z]] = function() {"+fobj[evnts[z]]+"}")};
                  else {fldobj[evnts[z]] = function() {evnt}}
                  fobj[evnt]=function(){};
              }
         }
     } catch(e) {}
   }



  }


  function makeAllButtons() {
   var type='submit';
   if (fobj.type != undefined) {
       type=fobj.type; 
   }
   btn=new buttonDef(type);
   fobj.id=fobj.button;
   if (fobj.text != undefined) {btn.text=fobj.text}
   if (fobj.width != undefined) {btn.width=fobj.width}
   if (fobj.height != undefined) {btn.height=fobj.height}
   if (fobj.border != undefined) {btn.border=fobj.border}
   if (fobj.areaalign != undefined) {btn.areaalign=fobj.areaalign}
   if (fobj.areapercentage != undefined) {btn.areapercentage=fobj.areapercentage}
   if (fobj.hovereffect != undefined) {btn.hovereffect=fobj.hovereffect}
   createButton(btn,fobj.id);

  }


}// End makeFields();


function limitTextLength(obj,len) {
 if (obj.value.length>(len-1)) {
     alert('Limit of '+len+' characters reached');
     obj.focus();
     return false;
 }
 return true;
}

function setTextLength(obj,len,upflag) {
  if (obj.value.length>len) {
    obj.value=obj.value.substr(0,len);
 }
 if (upflag==1) {obj.value=obj.value.toUpperCase()} 
}


function limitPasteTextLength(obj,len) {
 if (window.clipboardData.getData("Text").length+obj.value.length>(len-1)) {
     alert('Text to paste would result in the limit of '+len+' characters be exceeded');
     obj.focus();
     return false;
 }
 return true;
}


function fieldHTML(fldattr) {
 var dynmfld=document.createElement("<span id=dyn#m#fld "+fldattr+"></span>");
 document.getElementsByTagName('body')[0].appendChild(dynmfld); 
 makeFields('dyn#m#fld');  
 var txt=dynmfld.innerHTML;
 if (dynmfld.id != 'dyn#m#fld') {
     txt="<span id="+dynmfld.id+" class=datefield type="+dynmfld.type+">"+txt+"</span>"; 
 }
 document.getElementsByTagName('body')[0].removeChild(dynmfld);
 delete dynmfld;
 return txt; 
}


function addLoadEvent(func,where) {
  var oldonload = window.onload; 
  if (!oldonload || typeof window.onload != 'function') {
      window.onload=func;
      return; 
  }
  if (where=='*top') {
      window.onload = function() {
        func();
        oldonload();
      }
  }
  else {
        window.onload = function() {
          oldonload();
          func();
       }
  }
}


function breakString(string,length) {
 var indx =string.length // length;
     indx ++;
 var i=0; 
 var start=1;
 var subs='';
 var stringarray=new Array(); 
 for (i=0; i<indx; i++) {
      subs=string.sst(start,length); 
      if (!isBlank(subs)) {
           stringarray.push(subs);
      }
      start += length; 
 }
 return stringarray; 
}


function appendExternalScript(src,where) {//where='head','body'
  try {
       if (!where) {var where='head'}
       var srcref=document.createElement('script');
       srcref.setAttribute("type","text/javascript");
       srcref.setAttribute("src", src); 
       if (typeof srcref!="undefined") {
           document.getElementsByTagName(where)[0].appendChild(srcref);
       }
  } catch(e) {}; 
}

addLoadEvent(makeFields,'*top');