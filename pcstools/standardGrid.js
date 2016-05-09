posGridCursor=posTabCursor;
gridrowpointer=-1;
 
function gridDef() {
  this.id='grd'+(Math.floor(Math.random() * (999999 - 1)) + 1);
  this.height=500;
  this.tablewidth='';
  this.onbeforeadd='';
  this.onbeforechange='';
  this.onbeforedelete='';
  this.dbtable='';
  /*
  this.header=[];
  this.fieldHTML=[];
  this.width=[];
  this.defaultvalue=[];
  */
  this.column=defineColumn; //column properties: header, fieldHTML, width, defaultvalue, select(sqlselect object with the select pairs);
  this.sqlresult='';
  this.clickerHTML='';
  this.clickerwidth=50;
  this.clickerheader=' ';
}

function loadGrid(g,cont) {
  _blur_$row=-1;
  _blur_$obj={};
  _focus_$row=-1;
  _focus_$obj={};
  _skip_$this=false;
  _stored_$data={};
  _use_$blurr=false;
  var i, pr; 
  eval(g.id+'={}');
  eval('gridobj='+g.id);
  gridobj.id=g.id;
  gridobj.dbtable=g.dbtable;
  gridobj.flds=[];
  gridobj.newflds={}
  gridobj.lastrow=-1;
  
  if (g.dbtable) {
	  var dbatt=getDbTableAttr(g.dbtable);
	  gridobj.dbkey=dbatt.keyfield.split(',');
  }
  
  gridobj.onbeforeadd=g.onbeforeadd;
  gridobj.onbeforechange=g.onbeforechange;
  gridobj.onbeforedelete=g.onbeforedelete;
  
  gridobj.clickerHTML=g.clickerHTML;
  
  if (g.dbtable && !g.sqlresult) {
     var sqs='select * from '+g.dbtable;
	 if (!sqlSelect(sqs,'$sqs')) {alert('Grid not loaded\n\n'+sqlerr); return false}
	 g.sqlresult=$sqs;
  }
  if (!g.sqlresult) {
      g.sqlresult=new sqlSelectResult('fld1','fld2','fld3','fld4');
  }
   
  for (pr in g.sqlresult) {
	   if (pr != 'rcdcnt') {
		   gridobj.flds.push(pr);
		   gridobj[pr]=clone(g[pr]);
	   }
  }
  var f,fd,fdd,txt;
  for (i=0; i<gridobj.flds.length; i++) {
       fd=gridobj.flds[i];
	   try {
           f=g[fd].fieldHTML+' field='+fd+' nolabel';
	   }
	   catch(e) {
	       f='field='+fd+' nolabel';
	   }
	   fdd=getFieldAttr(fd);
	   if (fdd) {
	       try {wdth=g[fd].width}
		   catch(e) {
		        if (!g[fd]) {g[fd]={}}
				if (fdd.type=='char') {g[fd].width=fdd.length*7.1}
                else {g[fd].width=fdd.length*10}				
				if (g[fd].width<80) {g[fd].width=80} 
				if (g[fd].width>520) {g[fd].width=520} 
				//else {
				//    g[fd].width=g[fd].width*140;
				//}
				//if (g[fd].width>380) {g[fd].width=380} 
				if (fdd.type=='date') {g[fd].width=120}
				if (fdd.type=='time') {g[fd].width=90}
			//}
		   }
	   }
       //txt=(fieldHTML(f).split('</SPAN>')[1]); 
	   if (g[fd]) {
	       if (g[fd].select) {
		       var slttxt='';
			   var $z=g[fd].select;
			   var cc=0;
			   var pr,codef,descf;
			   for (pr in $z) {
			        if (pr=='rcdcnt') {continue}
			        cc++;
			        if (cc==1) {codef=pr}
					else {descf=pr}
					if (cc==2) {break}
			   }
			   if (cc==1) {descf=codef}
     		   var z=0;
		       for (z=0; z<$z.rcdcnt; z++) {
			        if (slttxt) {slttxt += ','}
			        slttxt += $z[codef][z].strip(',',':')+':'+$z[descf][z].strip(',',':'); 
			   }
			   slttxt=' select=":,'+slttxt+'"';
			   f=f+slttxt; 
			   slttxt='';
		   }
	   }
	   txt=(fieldHTML(f)); alert(txt);
       txt=txt.split('name='+gridobj.flds[i]).join('name='+gridobj.flds[i]+'_@nbr onfocus="use_$grid='+gridobj.id+'; _focus$_Entry(@nbr,this)" onblur="_use_$grid='+gridobj.id+'; _check$_Entry(@nbr,this)"');
	   txt=txt.split(' ID='+gridobj.flds[i]).join(' ID='+gridobj.flds[i]+'_@nbr');
	   txt=txt.split('intlFocus(').join('_use_$grid='+gridobj.id+';_focus$_Entry(@nbr,this); intlFocus('); 
	   txt=txt.split('intlFocusTime(').join('_use_$grid='+gridobj.id+';_focus$_Entry(@nbr,this); intlFocusTime('); 
	   txt=txt.split('$setDateSubFld(').join('_use_$grid='+gridobj.id+'; _check$_Entry(@nbr,this); $setDateSubFld(');
	   txt=txt.split('editField(').join('_use_$grid='+gridobj.id+'; _check$_Entry(@nbr,this); editField(');
	   txt=txt.split('onblur=this.value=this.value.toUpperCase()').join('onblur="this.value=this.value.toUpperCase();_use_$grid='+gridobj.id+'; _check$_Entry(@nbr,this)"');

	   txt=txt.split('<IMG id').join('<img onmousedown="focusOn('+"'"+gridobj.flds[i]+'_@nbr'+"'"+')" id'); 
	   txt=txt.split('lookup.gif"').join('lookup.gif" onmousedown="focusOn('+"'"+gridobj.flds[i]+'_@nbr'+"'"+')"');  
       //txt=txt.strip('onkeypress=keyPressedToUpper()');   
	   txt=txt.split('id='+fd).join('id='+fd+'_@nbr');
	   txt=txt.split("'"+fd+"'").join("'"+fd+"_@nbr'");
	   txt=txt.split("#$"+fd).join("#$"+fd+'_@nbr');
	   gridobj.newflds[gridobj.flds[i]]=txt; 
  }
  
  if (g.clickerHTML) {
      var $sf=new sqlSelectResult('clicker','select');
  }
  else {
     var $sf=new sqlSelectResult('select');
  } 
  for (i=0; i<gridobj.flds.length; i++) {
       addSqlSelectCol($sf,gridobj.flds[i]);
  }
  addSqlSelectCol($sf,'rowpointer','rowstatus');

  eval('var '+gridobj.id+'=new tableDef()'); 
  eval('var _$tabl='+gridobj.id); 
  _$tabl.tableid=gridobj.id;
  _$tabl.dbref=true;
  _$tabl.height=g.height;
  //_$tabl.resizeablecolumns=true;
  _$tabl.rowselectcolor='';
  _$tabl.oddrowcolor="white";
  _$tabl.evenrowcolor="f4f4f4";
  _$tabl.tablewidth=g.tablewidth;
  f=_$tabl.column('select'); f.width=60; f.align='center'; f.header='Select<br><input type=checkbox id="selhead'+gridobj.id+'" onclick=_set_$On_$Off_$grid_$select(this)>';
  f=_$tabl.column('rowpointer'); f.width=0; f.header='Pointer';
  f=_$tabl.column('rowstatus'); f.width=0; f.header='Status';
  f=_$tabl.column('clicker'); f.width=g.clickerwidth; f.align='center'; f.header=g.clickerheader;


  for (i=0; i<gridobj.flds.length; i++) {
       fd=gridobj.flds[i];
       _$tabl[fd]=clone(g[fd]); 
	   _$tabl.column(fd).align='center';
       f=getFieldAttr(fd);
	   if (f) {
	       if (f.type != 'char') {
		       _$tabl.column(fd).edit='';
           }		   
	   }
  }
  var n,k;
  var firstrowpointer=0;
  
  for (i=0; i<g.sqlresult.rcdcnt; i++) {
 	  gridrowpointer++;
      n=addSqlSelectRow($sf);
	  for (k=0; k<gridobj.flds.length; k++) {
           fd=gridobj.flds[k];
		   txt=gridobj.newflds[fd]; 
		   $sf[fd][n]=txt.split('@nbr').join(gridrowpointer); 
      }
	  $sf.rowpointer[i]=gridrowpointer;
	  $sf.rowstatus[i]='load';
	  $sf.select[i]='<input type=checkbox onclick=_change_$grid_$Row_$color(this) tabindex=-1 id=sel'+gridobj.id+gridrowpointer+'>';
	  if (g.clickerHTML) {
	      $sf.clicker[i]=g.clickerHTML;
	  }
	  if (i==0) {
	      firstrowpointer=gridrowpointer;
	  }
 }
 gridobj.lastrow=gridrowpointer;
 setSqlSelectResult(_$tabl,$sf);
 $sf='';
 var gotoendbut="<input type=button value='Goto End' style='color:white; background:blue; border:2px double gold' onclick=_goto_$Grid_$End()>&nbsp;&nbsp;";
 var deletebut='';
 deletebut="<input type=button value=Delete style='color:white; background:blue; border:2px double gold' onclick=grid_$Delete_$selected_$Rows()>";

 var morebuttons="<div style='margin-top:5px'>"+gotoendbut+deletebut+'</div>';
 changeContent(cont,applyTableDef(_$tabl)+morebuttons);
 document.getElementById(cont).onkeypress=restoreOnEscape; 
 var j=firstrowpointer;
 for (i=0; i<g.sqlresult.rcdcnt; i++) {
 	  for (k=0; k<gridobj.flds.length; k++) {
           fd=gridobj.flds[k];
		   changeVar(fd+'_'+j,g.sqlresult[fd][i]);
	  }
      j++;  
 }
 
 var fd=gridobj.flds[0];
 _use_$grid=gridobj;
 addGridRow();
 document.getElementById(g.id+'$wrap').scrollTop = 1;
 //focusOn(fd+'_'+firstrowpointer); 
 return true;
}

function _focus$_Entry(nbr,obj) {
  _is_$in=true;
  _focus_$row=nbr;
  if (obj) {_focus_$obj=obj}
  if (_skip_$this) {
      _skip_$this=false;
      return false;
  }
  if (_blur_$row==_focus_$row) {return true}
  readObjRow(_blur_$obj);
  if (!eof) {
	  // Check if any data was changed
	  var i, fld;
	  var changedone=false;
	  var rw=numValueOfCol('rowpointer');
	  blurgridrowpointer=rw;
	  for (i=0; i<_use_$grid.flds.length; i++) {
	       fd=_use_$grid.flds[i];
	       fld=_use_$grid.flds[i]+'_'+rw;
	       if (_stored_$data[rw][fd] != valueOf(fld)) {
		       changedone=true;
			   break;
		   }
      }
	  if (changedone) {
	      _use_$blurr=true;
	      _no_$focus=true;
		  var rsts=valueOfCol('rowstatus');  
	      if (!_grid_$update(rsts)) {
		      _skip_$this=true;
			  if (_no_$focus) {
			      _blur_$obj.focus(); 
			  }
			  _use_$blurr=false;
		      return false; 
	      }
		  _use_$blurr=false;
		  if (rsts=='new') {
			  changeCol('rowstatus','add');
			  showElement('sel'+_use_$grid.id+blurgridrowpointer); 
			  try {showElement('clk'+_use_$grid.id+blurgridrowpointer)} catch(e) {alert(e.message);}
		  }
		  else {
			 changeCol('rowstatus','change');
		  } 
	  }
	  else {
	     if (valueOfCol('rowstatus')=='new') {
		     storeFocusedRowData(); 
			 _skip_$this=true;
			 _blur_$obj.focus();
		     return true;  
         }		 
	  }

  }
  if (_use_$grid.lastrow==_focus_$row) {
	  addGridRow();
  }
  storeFocusedRowData(); 
  
  return true;
}

function _check$_Entry(nbr,obj) {
 if (_skip_$this) {
     //_skip_$this=false;
     return true
 }
 _blur_$row=nbr;
 _blur_$obj=obj;
 _skip_$this=false;
 _is_$in=false;
 setTimeout('_check_$Outside()',2);
}

function _check_$Outside() {
  if (_is_$in) {return true}
  if (_skip_$this) {
      return true; 
  }	  
  readObjRow(_blur_$obj);
  // Check if any data was changed
  var i, fld;
  var changedone=false;
  var rw=numValueOfCol('rowpointer');
  blurgridrowpointer=rw;
  for (i=0; i<_use_$grid.flds.length; i++) {
       fd=_use_$grid.flds[i];
	   fld=_use_$grid.flds[i]+'_'+rw;
	   if (_stored_$data[rw][fd] != valueOf(fld)) {
		   changedone=true;
		   break;
	   }
  }
  if (changedone) {
      _no_$focus=true; 
	  _use_$blurr=true;
	  var rsts=valueOfCol('rowstatus');   
	  if (!_grid_$update(rsts)) {
		  _skip_$this=true;
		  if (_no_$focus) {
			  _blur_$obj.focus(); 
		  }
		  _use_$blurr=false;
		  return false; 
	  }
	  _use_$blurr=false;
	  if (rsts=='new') {
		  changeCol('rowstatus','add');
		  showElement('sel'+_use_$grid.id+blurgridrowpointer); 
		  try {showElement('clk'+_use_$grid.id+blurgridrowpointer)} catch(e) {alert(e.message);}
	  }
	  else {
		 changeCol('rowstatus','change');
	  } 
  }
  return true;   
}



function storeFocusedRowData() {
  readObjRow(_focus_$obj);
  var rw=numValueOfCol('rowpointer'); 
  var fld,fd;  
  _stored_$data[rw]={};
  var i=0;
  for (i=0; i<_use_$grid.flds.length; i++) {
       fd=_use_$grid.flds[i];
	   fld=_use_$grid.flds[i]+'_'+rw;
	   _stored_$data[rw][fd]=valueOf(fld); 
  }
}

function restoreFocusedRowData() {
  try {
	  readObjRow(_focus_$obj);
	  var rw=numValueOfCol('rowpointer'); 
	  if (valueOfCol('rowstatus')=='new') {
	      deleteRow();
	      /*
	  	  for (var i=0; i<_use_$grid.flds.length; i++) {
		       fd=use_$grid.flds[i];
		       fld=use_$grid.flds[i]+'_'+rw;
		      changeVar(fld,_stored_$data[rw][fd]); 
	      }
		  */
	  }
	  else {
	  var fld=_focus_$obj.name;
	  var fd=fld.split('_'+rw)[0];
	  changeVar(fld,_stored_$data[rw][fd]);
	  }
  } catch(e) {}
}


function addGridRow(gobj) {
  if (!gobj) {gobj=_use_$grid} 
  newRow(gobj.id);
  gridrowpointer++;
  var i,txt,fd; 
  for (i=0; i<gobj.flds.length; i++) {
       fd=gobj.flds[i];
       txt=gobj.newflds[fd];
	   txt=txt.split('@nbr').join(gridrowpointer); 
	   changeCol(gobj.flds[i],txt); //changeVar('txt2',txt);
	   if (gobj[fd]) {
		   if (gobj[fd].defaultvalue) {
			   try {changeVar(fd+'_'+gridrowpointer, gobj[fd].defaultvalue)}
			   catch(e){}	
		   }
       }	   
  }
  changeCol('select','<input type=checkbox tabindex=-1 id=sel'+gobj.id+gridrowpointer+'>');
  hideElement('sel'+gobj.id+gridrowpointer);
  changeCol('rowpointer',gridrowpointer);
  changeCol('rowstatus','new');
  if (gobj.clickerHTML) {
	  changeCol('clicker','<span id=clk'+gobj.id+gridrowpointer+'>'+gobj.clickerHTML+'</span>');
	  hideElement('clk'+gobj.id+gridrowpointer);
  }
  gobj.lastrow=gridrowpointer; 
  document.getElementById(gobj.id+'$wrap').scrollTop = document.getElementById(gobj.id+'$wrap').scrollHeight;
  //viewSource();
  //skipthis=true;
  //viewSource();
  
}

function gridChangeVar(gc,vlu) {
  if (_use_$blurr) {
      changeVar(gc+'_'+blurgridrowpointer,vlu);
  }
  else {
      //changeVar(gc+'_'+_focus_$row,vlu);
	  changeVar(gc+'_'+numValueOfCol('rowpointer'),vlu);
  }
}

function gridValueOf(gc) {
 if (_use_$blurr) {
     return valueOf(gc+'_'+blurgridrowpointer);
 }
 else {
      //return valueOf(gc+'_'+valueOfCol_focus_$row);
	  return valueOf(gc+'_'+numValueOfCol('rowpointer'));
 }
}

function gridFocusOn(gc) {
  _no_$focus=false;
  if (_use_$blurr) {
	  focusOn(gc+'_'+blurgridrowpointer);
  }
  else  {
	  //focusOn(gc+'_'+_focus_$row);
	  focusOn(gc+'_'+numValueOfCol('rowpointer'));
  }
}

function gridSavedValueOf(fd) {
 return _stored_$data[blurgridrowpointer][fd];
}

function gridHasSavedVar() {
 var i,flds=[]; 
 if (arguments.length==0) {
     for (i=0; i<_use_$grid.flds.length; i++) {
       flds[i]=_use_$grid.flds[i];
     } 
  }
  else {
     for (i=0; i<arguments.length; i++) {
       flds[i]=arguments[i];
     } 
  }

 for (i=0; i<flds.length; i++) {
   if (_stored_$data[blurgridrowpointer][flds[i]] != valueOf(flds[i]+'_'+blurgridrowpointer)) {
	   return true;
   }
 }
 return false;
}

function gridReturnChangedVar() {
 var i,fd,chgvar={} ; 
 for (i=0; i<_use_$grid.flds.length; i++) {
      fd=_use_$grid.flds[i];
      if (_stored_$data[blurgridrowpointer][fd] != valueOf(fd+'_'+blurgridrowpointer)) {
	       chgvar[fd]=valueOf(fd+'_'+blurgridrowpointer);
	  }
 }
 return chgvar;
}


function gridRowStatus() {
   return valueOfCol('rowstatus');
}

function gridRowSelected() {
   var grdsel='sel'+_use_$grid.id+numValueOfCol('rowpointer'); 
   return isCheckedVar(grdsel);
}


function setGridRowSelect(state) {
   if (!state) {state='*on'}
   else {state=state.toLowerCase()}
   var grdsel='sel'+_use_$grid.id+numValueOfCol('rowpointer'); 
   if ((state=='*on' && !isCheckedVar(grdsel)) || (state=='*off' && isCheckedVar(grdsel))) {
       document.getElementById(grdsel).click();
   }
}


function restoreOnEscape() {
  if (window.event.keyCode == 27) {restoreFocusedRowData(); return false}
  return true;
} 


function _on_$Exit_$Grid_$Row(sts) {
  var ky; 
  var rv=gridReturnChangedVar(); 
  if (sts=='new') {
  	 if (!sqlInsert(_use_$grid.dbtable,rv)) {
	 	 alert(sqlerr);
		 return false;
	}
  }
  else {
     var fd,vlue, where='';
     for (ky=0; ky<_use_$grid.dbkey.length; ky++) {
	      fd=_use_$grid.dbkey[ky];
	      if (where) {where += ' and '}
		  try {vlue=gridSavedValueOf(fd).sqlWrap()}
		  catch(e) {vlue=gridSavedValueOf(fd)}
		  where += fd+' = '+vlue;
     }	 
	 if (!sqlUpdate(_use_$grid.dbtable,rv,where)) {
	  	 alert(sqlerr);
		 return false;
	}
  }
  return true;
}


function _change_$grid_$Row_$color(obj) {
  readClickedRow();
  if (obj.checked) {
      setRowBgColor(rowselectcolor);
  }
  else {
     setRowBgColor('*dft')
  }
  checkVar('selhead'+_use_$grid.id,'*off');
}


function _set_$On_$Off_$grid_$select(obj) {
  var state='*on';
  var grdsel;
  if (!obj.checked) {state='*off'}
  posTabCursor(_use_$grid.id,'*top');
  readRow();
  while (!eof) {
      if (valueOfCol('rowstatus')=='new') {readRow(); continue}
      grdsel='sel'+_use_$grid.id+numValueOfCol('rowpointer'); 
	  if (state=='*on') {
          if (!isCheckedVar(grdsel)) {
			  setRowBgColor(rowselectcolor);
		  }
	  }
	  else {
	     if (isCheckedVar(grdsel)) {
	         setRowBgColor('*dft');
		 }
	  }
	  checkVar(grdsel,state);
	  readRow(); 
  }
}


function _grid_$update(sts) {
  var rtn;
  if (sts=='new') {
     if (_use_$grid.onbeforeadd) {
		 try {eval('rtn='+_use_$grid.onbeforeadd+'()')} 
		 catch(e) {return false}
		 if (!rtn) {return false}
	 }
  }
  else {
      if (_use_$grid.onbeforechange) {
		  try {eval('rtn='+_use_$grid.onbeforechange+'()')} 
		  catch(e) {return false}
		  if (!rtn) {return false}
	  }
  }
  if (_use_$grid.dbtable) {
  	 return _on_$Exit_$Grid_$Row(sts);
  }
  return true;
}


function grid_$Delete_$selected_$Rows() {
 var rp=0;
 var gridselcount=0;
 posTabCursor(_use_$grid.id,'*top');
 readRow();
 while (!eof) {
    var grdsel='sel'+_use_$grid.id+numValueOfCol('rowpointer'); 
    if (isCheckedVar(grdsel) && valueOfCol('rowstatus') != 'new') {
	    gridselcount++;
	}
	readRow();
 }
 if (gridselcount==0) {
     alert('No records selected for deletion');
     return false;	 
 }
 if (!window.confirm('Please confirm the deletion of the '+gridselcount+' record(s) selected')) {
     return false;
 }
 exeFunction('grid_$do_$Delete_$selected_$Rows()');
} 

function grid_$do_$Delete_$selected_$Rows() {
 posTabCursor(_use_$grid.id,'*top');
 readRow();
 while (!eof) {
     var grdsel='sel'+_use_$grid.id+numValueOfCol('rowpointer'); 
     if (isCheckedVar(grdsel) && valueOfCol('rowstatus') != 'new') {
	     if (!_grid_$delete()) {
		      return false;
		 }
	     deleteRow();
		 posTabCursor(_use_$grid.id,currentrow);
	 }
	 readRow();
 }
}


function _grid_$delete() {
   if (_use_$grid.onbeforedelete) {
	   try {eval('rtn='+_use_$grid.onbeforedelete+'()')} 
	   catch(e) {return false}
	   if (!rtn) {return false}
   }
   if (!_use_$grid.dbtable) {return true}
   
   var fd,vlue, where='';
   for (ky=0; ky<_use_$grid.dbkey.length; ky++) {
	   fd=_use_$grid.dbkey[ky];
	   if (where) {where += ' and '}
	   try {vlue=gridValueOf(fd).sqlWrap()}
	   catch(e) {vlue=gridValueOf(fd)}
	   where += fd+' = '+vlue;
   }	 
   if (!sqlDelete(_use_$grid.dbtable,where)) {
        alert(sqlerr); 
		return false;
   }
   return true;
}


function _goto_$Grid_$End() {
   document.getElementById(_use_$grid.id+'$wrap').scrollTop = document.getElementById(_use_$grid.id+'$wrap').scrollHeight;
}
