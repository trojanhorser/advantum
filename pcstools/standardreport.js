reportbreakobject='';
var r$p$$$display=false;
var r$p$$$table=new Object();
var r$p$$$report=new Object();
var currentbrkrow=0;
var $$$brk$$no=-1;
var firs$$trow=true;
var reportdisplay =true;
file$$fullpath=new Object();
reportdefaultfilename='pdf$$report.pdf';
randomizereportname=false;

if (runenvironment=='internet') {
    reportdefaultexepath='c:/wkhtmltopdf/';
    reportdefaultfilepath='c:/wkhtmltopdf/';
//    reportdefaultviewiniframe='no'; //or 'false', or 'yes' or 'true'
}
else {
    reportdefaultexepath='';
    reportdefaultfilepath='c:/';
//    reportdefaultviewiniframe='yes'; 

} 

rpt$html$$head="<html><style>body {margin:0; padding:0} td {white-space: nowrap;}.pagebreak {page-break-after: always;}pos {position:absolute; margin:0; padding:0; overflow:hidden}left {float:left; white-space:nowrap; overflow:hidden}.numcell {width:100%; text-align:right}</style>";
//rpt$html$$head += ".pos {position:absolute; margin:0; padding:0; overflow:hidden}.left {float:left; white-space:nowrap; overflow:hidden}</style>";


function reportDef() {

// Default Report Width=940px; Maximum width for centering and right-alignment=1420px

 this.type='pdf'; //or html
// this.viewiniframe=reportdefaultviewiniframe; 
 this.orientation=''   //Landscape or Portrait
 this.pagesize='';
	//A0		841 x 1189 mm
	//A1		594 x 841 mm
	//A2		420 x 594 mm
	//A3		297 x 420 mm
	//A4		210 x 297 mm, 8.26 x 11.69 inches
	//A5		148 x 210 mm
	//A6		105 x 148 mm
	//A7		74 x 105 mm
	//A8		52 x 74 mm
	//A9		37 x 52 mm
	//B0		1000 x 1414 mm
	//B1		707 x 1000 mm
	//B2		500 x 707 mm
	//B3		353 x 500 mm
	//B4		250 x 353 mm
	//B5		176 x 250 mm, 6.93 x 9.84 inches
	//B6		125 x 176 mm
	//B7		88 x 125 mm
	//B8		62 x 88 mm
	//B9		33 x 62 mm
	//B10		31 x 44 mm
	//C5E		163 x 229 mm
	//Comm10E	105 x 241 mm, U.S. Common 10 Envelope
	//DLE		110 x 220 mm
	//Executive	7.5 x 10 inches, 190.5 x 254 mm
	//Folio		210 x 330 mm
	//Ledger	431.8 x 279.4 mm
	//Legal		8.5 x 14 inches, 215.9 x 355.6 mm
	//Letter	8.5 x 11 inches, 215.9 x 279.4 mm
	//Tabloid	279.4 x 431.8 mm

 this.pagewidth='';    //in mm
 this.pageheight='';   //in mm
 this.margintop='';    //in mm
 this.marginbottom=''; //in mm
 this.marginleft='';   //in mm
 this.marginright='';  //in mm
 this.smartshrinking=true;
 this.dpi='';
 
 this.fontfamily='';
 this.fonsize='';
 this.fontweight='';
 this.color='';

 this.pagehead='';
 this.pagefoot='';
 this.reporttable=new Object();
 this.pageheadheight='';
 this.pagefootheight='';
 
 this.emailaddress='';
 this.emailattachment='';
 
 this.filepath=reportdefaultfilepath;
 this.file=reportdefaultfilename;
 this.reportbreak=new Array();
 
//internal
 this.pageno=0;  
 this.html='';
 this.detailhtml=''; 
 this.checkbreaks=false;
} 

function reportTableDef() {

  this.border='';
  this.bordercolor='';
  this.cellspacing='';
  this.cellpadding='';
  this.frame='';
  this.rules='';
  this.defaultstyle='';
  this.fixedwidth=false;
  this.whitespace='nowrap'; //or wrap

  this.tablestyle='';
  this.id=new Array();
  this.header=new Array();
  this.headstyle=new Array();
  this.style=new Array();
  this.width=new Array();
  this.align=new Array();
  this.edit=new Array();
  this.columnvalue=new Array();
  this.rowsperpage=30; 
  this.dbref=false;
  this.type=new Array();
  this.column=defineColumn;
  this.widthfactor=1;
  this.usefillerborder=true;
  this.beforerowload='';
  this.afterrowload='';
  
//Internal 
  this.currenttablerow=0;  
  this.headhtml='';
  this.headproperty='';
}

function reportBreak() {
  this.condition='';
  this.summary='';
       //'header'
       //'sum:a,b,c,..y,.'
       //'average:a,b,c,..y,.'
       //'count:a,b,c,..y..'
       //'max:a,b,c,..y,.'
       //'min:a,b,c,..y,.'
  this.text=new Array();
  this.text[0]='*breakdefault';
  this.startrow='';
  this.beforebreak='';
  this.afterbreak='';
  this.script=''; 
  this.rowsusedcount='';

//this.text[0]='<hr>'; 
//this.text[1]='*summary';
//this.text[2]='<div style="width:100%; border-bottom:3px solid"></div>'; 
//this.pageafter=false;
//Internal; 
//this.columnvalue=new Array();
//this.rowcount=new Array();
//this.summarytype='';
//this.summarycols=new Array();
  this.type='total';   // Or 'header';
}


function addReportBreak(rpt,rptbreak) {
  if (rpt && rptbreak) {
     var rbreak=clone(rptbreak);
     var vals=-1; 
     rbreak.condition=rbreak.condition.replace(/\*row/g,'currentbrkrow'); 
     var oper=rbreak.summary.split(':');
     if (oper.length>1) {
        var vals=oper[1].split(',');
        oper=oper[0];
        if (rbreak.text.length==1 && rbreak.text[0]=='*breakdefault') {
            rbreak.text[0]='<div style="width:100%; border-bottom:1px solid"></div>&nbsp'; 
            //rbreak.text[0]='&nbsp'; 
            rbreak.text[1]='*summary';
            rbreak.text[2]='<div style="width:100%; border-bottom:2px solid"></div>&nbsp'; 
        }
     }
     if (rbreak.text[0]=='*breakdefault') {rbreak.text[0]='';}
     rbreak.columnvalue=new Array();
     rbreak.rowcount=new Array();
     rbreak.columnsum=new Array();
     rbreak.summarytype=oper;
     rbreak.summarycols=new Array();
	 rbreak.valcol=[];
     if (rbreak.summary=='header') {
         rbreak.summary='';
         rbreak.type='header';       
     }
     for (var i=0; i<vals.length; i++) { 
	     if (!isNaN(vals[i])) {
             rbreak.summarycols[i]=numeric(vals[i]);
         }
         else {
		     rbreak.valcol[i]=vals[i].trim();
			 rpt.checkbreaks=true;
         }		 
     } 

     rpt.reportbreak.push(rbreak); 
  }
}


function useReport(obj,keep) {
 r$p$$$display=false;
 currentbrkrow=0; 
 $$$brk$$no=-1;
 var $c;
 var tid;
 var colobj;
 var ob;  
 var i=0;
 var txt='';

 first$$row=true;
 //if (r$p$$$table.whitespace != 'nowrap' && r$p$$$table.whitespace != 'wrap') {r$p$$$table.whitespace='nowrap'}

 if (obj) {
   
   if (obj.pagehead && obj.pageheadheight) {obj.pagehead='<div style="position:relative; width:100%; height:'+obj.pageheadheight+'px">'+obj.pagehead+'</div>';} 
   if (obj.pagefoot) {obj.pagefoot='<div style="position:relative; width:100%; height:'+obj.pagefootheight+'px">'+obj.pagefoot+'</div>';} 
   
//Build the HTML related to the report font family, size, etc..
   if (obj.fontfamily) {txt += "font-family:"+obj.fontfamily+"; "};
   if (obj.fontsize) {txt += "font-size:"+obj.fontsize+"; "};
   if (obj.fontweight) {txt += "font-weight:"+obj.fontweight+"; "};
   if (obj.color) {txt += "color:"+obj.color+"; "};
   if (txt) { 
      if (obj.pagehead) {obj.pagehead='<div style="padding:0; margin:0;'+txt+'">'+obj.pagehead+'</div>'} 
      if (obj.pagefoot) {obj.pagefoot='<div style="padding:0; margin:0;'+txt+'">'+obj.pagefoot+'</div>'} 
   } 
   obj.reporttable.defaultstyle=txt+obj.reporttable.defaultstyle; 

   r$p$$$report=obj;
   r$p$$$table=obj.reporttable;
   r$p$$$report.defaultstyle=txt;
   build$ReportColumns()
 }
 else {
    r$p$$$report=new Object();
    r$p$$$table=new Object();
 }

 if (!keep) {
     r$p$$$report.html='';
     r$p$$$report.pageno=0;
     r$p$$$table.currenttablerow=0;
 }

 for (i=0; i<r$p$$$report.reportbreak.length; i++) {
     r$p$$$report.reportbreak[i].columnvalue=new Array();
     r$p$$$report.reportbreak[i].rowcount=new Array();
     r$p$$$report.reportbreak[i].columnsum=new Array();
 }

 $t$$ablewidth=0; 
 if (r$p$$$table.fixedwidth) {
     for (i=0; i<r$p$$$table.width.length; i++) {
          $t$$ablewidth += numeric(r$p$$$table.width[i]);
          r$p$$$table.headstyle[i] = r$p$$$table.defaultstyle+';'+r$p$$$table.headstyle[i];
     }
 }

 if (!keep) {
     //if ($t$$ablewidth>940) {
     //    //$t$$ablewidth += 10;
     //    r$p$$$report.pagehead = '<div style="padding:0; overflow:hidden; margin:0; white-space:'+r$p$$$table.whitespace+'; width:'+$t$$ablewidth+'">'+r$p$$$report.pagehead+'</div>';  
     //    //r$p$$$report.pagehead = '<div style="padding:0; overflow:hidden; margin:0; width:'+$t$$ablewidth+'">'+r$p$$$report.pagehead+'</div>';  
//
 //    }

     if (r$p$$$report.pagehead && r$p$$$report.pageheadheight) {
          var wth="100%";
          //if ($t$$ablewidth>0) {wth=$t$$ablewidth}
          r$p$$$report.pagehead='<div style="padding:0; margin:0; white-space:'+r$p$$$table.whitespace+'; width:'+wth+'; position:absolute">'+r$p$$$report.pagehead+'</div><div style="padding:0; margin:0; height:'+r$p$$$report.pageheadheight+'"></div>';
          //r$p$$$report.pagehead='<div style="padding:0; margin:0; width:'+wth+'; position:absolute">'+r$p$$$report.pagehead+'</div><div style="padding:0; margin:0; height:'+r$p$$$report.pageheadheight+'"></div>';
     } 
	 if (r$p$$$report.pagefoot && r$p$$$report.pagefootheight) {
          var wth="100%";
          if ($t$$ablewidth>0) {wth=$t$$ablewidth}
          r$p$$$report.pagefoot='<div style="padding:0; margin:0; white-space:'+r$p$$$table.whitespace+'; width:'+wth+'; position:absolute">'+r$p$$$report.pagefoot+'</div><div style="padding:0; margin:0; height:'+r$p$$$report.pagefootheight+'"></div>';
     } 
 }

}

function replaceReportTable(rtab,offset) {
                          //rtab=report table to replace previous one. 
                          //offset=If provided, indicates the number of lines occupied by the heading of the new table.
                          //       the currentrow counter will be advanced by this amount
  if (!r$p$$$report.reporttable) {
       r$p$$$report.reporttable=rtab; 
       return;
  }
  if (!offset) {var offset=0}
  var oldrow=r$p$$$table.currenttablerow; 
  r$p$$$report.reporttable=rtab; 
  var oldhtml=r$p$$$report.html;
  r$p$$$report.html += '</table>'; //Ends the previous table
  useReport(r$p$$$report,'keep');
  r$p$$$report.html=oldhtml+r$p$$$table.headhtml;
  r$p$$$table.currenttablerow=oldrow+offset; 

//---------------------- Example --------------------------------------------------------------------
// rpt.reporttable=rpttab;
//
// useReport(rpt);
//
// printOut('*pagehead'); 
// printOut('*tablehead');
//
// for (var i=0; i<$s.rcdcnt; i++) {
//      loadReportTableRow($s,i);
// }
// 
// replaceReportTable(rpttab2,2);
// printOut('*tablehead'); 
//
//  for (var i=0; i<$l.rcdcnt; i++) {
//      loadReportTableRow($l,i); 
// }
// printOut('*tablefoot');
// printOut('*pagefoot');
//
// Note do not printout the tablefooter (printOut('*tablefooter')) of the first table unless you need to fill out the rest of the page with blank records
// The replaceReportTable function will end the existing table after the last record is written 
//----------------------- Example End -----------------------------------------------------------------
} 


function build$ReportColumns() {
  var $c;
  var tid;
  var colobj;
  var ob; 
  var i=0;
  var obj=r$p$$$report; 
  var factor=numeric(r$p$$$table.widthfactor);
  if (r$p$$$table.id) {
     tid=r$p$$$table.id;
     for (i=0; i<tid.length; i++) {
         if (r$p$$$table[tid[i]]) {
             ob=r$p$$$table[tid[i]];
             if (ob.header) obj.reporttable.header[i]=ob.header;
             if (ob.width) obj.reporttable.width[i]=ob.width;
             if (ob.edit) obj.reporttable.edit[i]=ob.edit; 
             if (ob.style) obj.reporttable.style[i]=ob.style;
             if (ob.align) obj.reporttable.align[i]=ob.align;
         }
    }

    $c=r$p$$$table;
    if ($c.dbref==true || r$p$$$table.header.length==0) {
      var f='';
      var ftype=''; 
      for (i=0; i<tid.length; i++) {
          if (typeof($c.id[i]) != 'string') {
              if (!$c.header[i]) {$c.header[i]=$c.id[i]}  
              continue;
          }
          f=$c.id[i].split('#');
          if (f.length==1) {f=f[0]} else {f=f[1]}
          f=getFieldAttr(f); 
          if (!f) {
             if (!$c.header[i]) {$c.header[i]=$c.id[i]}
             continue;
          }
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
                   $c.width[i]=f.length*6.5*factor;
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
  }

}

function reportTableBreak(brkobj,dodetails) {

  reportbreakobject=brkobj;
  var rtnval;

  if (brkobj.script) {
      eval('rtnval='+translateString(brkobj.script));
  }
  if (brkobj.beforebreak) {
      eval('rtnval='+translateString(brkobj.beforebreak));
  }
  if (rtnval==false) {return true}
  
  var array=brkobj.text;
  var rowstouse=array.length; 
  if (typeof brkobj.rowsusedcount=='number') {
      rowstouse=brkobj.rowsusedcount;
  } 
  var value='';
  var a=0;
  var i=0;
  var i2=0;
  var i3=0;
  var string='';
  var strln=0; 
  var txt;
  var len=r$p$$$table.header.length;
  if (r$p$$$report.reportbreak[$$$brk$$no]) {
     var len2=r$p$$$report.reportbreak[$$$brk$$no].columnvalue.length; 
     strln=numeric(r$p$$$report.reportbreak[$$$brk$$no].startrow);
  }
  else {
     var len2=-1;
  } 

  var morerows=0;
  var savepage=0;
  if (strln !=0) {
      morerows=strln-r$p$$$table.currenttablerow; 
      if (morerows<0) {morerows=r$p$$$table.rowsperpage} 
      savepage=r$p$$$report.pageno;
  }

  checkReportPageBreak(rowstouse+morerows); 

  if (strln !=0) {
      if (savepage != r$p$$$report.pageno) {
          morerows=strln-1;
          if (rowstouse+morerows>r$p$$$table.rowsperpage) {
              morerows=r$p$$$table.rowsperpage-rowstouse-1;
          } 
      }
      var rtd; 
      for (var i=0; i<morerows; i++) {
           rtd=reportTableDetail('empty');
           r$p$$$report.html += rtd;
      }
  }

  var array2=clone(array);
  var ary;
  var classtype;

  for (a=0; a<array2.length; a++) {
       if (!array2[a]) {
           array2[a]='&nbsp';
       }
       if (array2[a]!='*summary') { 

           if (array2[a].substr(0,7)=='*array:') {
               ary=array2[a].split('*array:')[1];
                eval('ary =clone('+ary+')'); 
                //r$p$$$table.columnvalue=new Array();
                txt='<tr>';
                for (i=0; i<ary.length; i++) {
                     //classtype='class=numcell' 
                     if (i==len) break;
                     if (ary[i]) {
                         if (ary[i].search('/*summary')>-1) {
                             i2=len2;
                             for (i3=0; i3<len2; i3++) {
                                  i2=i2-1;
                                  string='*summary'+i2; 
                                  value=r$p$$$report.reportbreak[$$$brk$$no].columnvalue[i2]; 
                                  if (!value) (value='0');
                                  ary[i]=ary[i].split(string).join(value);  
                              } 
                         }
                         //if (ary[i].search(':char')>-1) {
                             //ary[i]=ary[i].split(':char').join(''); 
                             //classtype='';  
                         //}

                     }   
					 
                     txt += '<td style="width:'+$t$$ablewidth+'; white-space:'+r$p$$$table.whitespace+'"><div style="'+r$p$$$table.defaultstyle+'" class=numcell>'+translateString(ary[i])+'</div></td>';
                        
                }
                txt += '</tr>'; 
                r$p$$$report.html += txt;
                if (a<rowstouse) {r$p$$$table.currenttablerow ++} 
                if (dodetails) {r$p$$$report.detailhtml += txt;}
            } 

            else {

              if (array2[a].search('/*summary')>-1) {
                  i2=len2;
                  for (i=0; i<len2; i++) {
                       i2=i2-1;
                       string='*summary'+i2;
                       value=r$p$$$report.reportbreak[$$$brk$$no].columnvalue[i2]; 
                       if (!value) (value='0');
                       array2[a]=array2[a].split(string).join(value);  
                  }       
                
              }   
              r$p$$$report.html += '<tr>';
              if (dodetails) {r$p$$$report.detailhtm += '<tr>'}
              if (a<rowstouse) {r$p$$$table.currenttablerow ++}
              if (!r$p$$$table.fixedwidth) {
                 r$p$$$report.html += '<td colspan='+len;
                 if (dodetails) {r$p$$$report.detailhtml += '<td colspan='+len;}
              }
              else {
                 r$p$$$report.html += '<td style="width:'+$t$$ablewidth+'; white-space:'+r$p$$$table.whitespace+'; overflow:hidden" colspan='+len;
                 if (dodetails) {r$p$$$report.detailhtml += '<td colspan='+len;}
              }
              r$p$$$report.html += "><div style='"+r$p$$$table.defaultstyle+"; white-space:"+r$p$$$table.whitespace+"; overflow:hidden'>"+translateString(array2[a])+"</div></td></tr>";
              if (dodetails) {r$p$$$report.detailhtml += "><div style='"+r$p$$$table.defaultstyle+"; white-space:"+r$p$$$table.whitespace+"; overflow:hidden'>"+translateString(array2[a])+"</div></td></tr>";}
           }
      } 


      else {


         var rbreak=r$p$$$report.reportbreak[$$$brk$$no]; 
         r$p$$$table.columnvalue=new Array();
         for (var k=0; k<len2; k++) {
              if (k==len) {break}
              r$p$$$table.columnvalue[k]=rbreak.columnvalue[k];
         }

         var value='';
         txt='<tr>';
         if (a<rowstouse) {r$p$$$table.currenttablerow ++}

         var tdstyle='';
  	 for (var i=0; i<len; i++) {
      	     if (!r$p$$$table.columnvalue[i]) {r$p$$$table.columnvalue[i]=''}
             tdstyle = r$p$$$table.defaultstyle+';'+r$p$$$table.style[i]; 
             txt += '<td style="'+tdstyle+'"';
       	     //if (r$p$$$table.style[i]) {txt += 'style="'+r$p$$$table.style[i]+'"'}
      	     if (r$p$$$table.align[i]) {txt += ' ALIGN="'+r$p$$$table.align[i]+'"';}

             value=''+r$p$$$table.columnvalue[i]; 
             if (r$p$$$table.edit[i] && value) {
                 var edtdata=r$p$$$table.edit[i].split(':');
                 var edc=edtdata[0].toLowerCase();
                 var edd='0';
                 if (edtdata.length>1) {edd=edtdata[1]}
                 if (edc=='y' || edc=='m' || edc=='d') {
                     value=edit(numeric(value).chgDateFmt('Y',edc),0,edc);
                 } 
                 else {value=edit(value,edd,edc);} 
             }
             else {if (value) {value=edit(value,2,'j')}} 
             txt += "><div style='"+r$p$$$table.defaultstyle+"; white-space:"+r$p$$$table.whitespace+"; overflow:hidden'>"+value+"</div></td>";
  	 }
  	 txt += '</tr>'; 
         r$p$$$report.html += txt;
         if (dodetails) {r$p$$$report.detailhtml += txt;}

      }
  }
  
  if (brkobj.afterbreak) {
      eval(translateString(brkobj.afterbreak));
  }
  
}



function printOut(string,obj) {
 var rtd='';

// if (string.sst(1,1)=='*' && !r$p$$$report.file) {
//    string='"'+string+'"';
// }
 
 if (string=='*newpage') {
    newPage();
    return; 
 }

 if (string=='*newline') {
    newLine();
    return; 
 }

 if (string=='*tablehead') {
    r$p$$$report.html += reportTableHead();
    if (!r$p$$$report.detailhtml) {r$p$$$report.detailhtml=r$p$$$table.headhtml;};
    return;
 }
 if (string=='*tabledetail') {
    rtd=reportTableDetail();
    r$p$$$report.html += rtd;
    r$p$$$report.detailhtml += rtd; 
    return;
 } 

 if (string=='*tablebreak') {
    reportTableBreak(obj);
    return; 
 }

 if (string=='*pageafter') {
    printOut('*tablefoot')
    printOut('*pagefoot');
    printOut('*pagehead');
    printOut('*tablehead');
    return;
 }

 if (string=='*tablefoot') {
    for (var i=r$p$$$table.currenttablerow; i<r$p$$$table.rowsperpage; i++) {
        rtd=reportTableDetail('empty');
        r$p$$$report.html += rtd; 
    }
    r$p$$$report.html += '</table>';
    //r$p$$$report.detailhtml += '</table>'; 
    return;
 }

 if (string=='*pagehead') {
    r$p$$$table.currenttablerow=0;
    r$p$$$report.pageno ++; 
    string=r$p$$$report.pagehead;
    if (r$p$$$report.pageno>1) {newPage();}
    r$p$$$report.html += translateString(string); 
    return; 
 }
 if (string=='*pagefoot') {
     string=r$p$$$report.pagefoot;
     r$p$$$report.html += translateString(string); 
     return;
 }

 r$p$$$report.html += translateString(string); 

}



function newPage() {
 r$p$$$report.html += '<div class=pagebreak></div>';
}

function newLine() {
 r$p$$$report.html += '<br>';
}

function reportTableHead() {

 if (r$p$$$table.headhtml) {
   return r$p$$$table.headhtml;
 }
 var value=''; 
 var len=r$p$$$table.header.length;
 for (var i=0; i<len; i++) {
      if (!r$p$$$table.width[i]) {r$p$$$table.width[i]=150}
 }

 var headproperty='<table ';
 if (r$p$$$table.fixedwidth) {headproperty += 'STYLE="table-layout:fixed; width:'+$t$$ablewidth+'" '};
 //if (r$p$$$table.fixedwidth) {headproperty += 'STYLE="table-layout:fixed;" '};
 if (r$p$$$table.border) {headproperty += ' BORDER='+r$p$$$table.border};
 if (r$p$$$table.bordercolor) {headproperty += ' BORDERCOLOR='+r$p$$$table.bordercolor};
 if (r$p$$$table.cellspacing) {headproperty += ' CELLSPACING='+r$p$$$table.cellspacing};
 if (r$p$$$table.cellpadding) {headproperty += ' CELLPADDING='+r$p$$$table.cellpadding};
 if (r$p$$$table.frame) {headproperty += ' FRAME='+r$p$$$table.frame};
 if (r$p$$$table.rules) {headproperty += ' RULES='+r$p$$$table.rules};
 //if (r$p$$$table.tablestyle) {headproperty += 'STYLE="'+r$p$$$table.tablestyle+'"'}
 headproperty += ' STYLE="table-layout:fixed; '+r$p$$$table.tablestyle+'">';
 var headhtml=headproperty;

 for (var i=0; i<len; i++) {
      headhtml += "<col width="+r$p$$$table.width[i]+'>';
 }
 headhtml += '<tr>'; 
 for (var i=0; i<len; i++) {
      if (r$p$$$table.align[i]) {headhtml +='<td align='+r$p$$$table.align[i];}
      else {headhtml += '<td'};
      if (r$p$$$table.headstyle[i]) {headhtml += ' style="'+r$p$$$table.headstyle[i]+'"';} 
      value=r$p$$$table.header[i];
      headhtml +="><div style='overflow:hidden; white-space:"+r$p$$$table.whitespace+";'>"+value+"</div></td>";
 }
 headhtml += '</tr>';
 r$p$$$table.headproperty=headproperty; 
 r$p$$$table.headhtml=headhtml; 
 return headhtml;
}
  

function reportTableDetail(empty) {
  var notempty=true;
  if (empty) {notempty=false} 

  var txt='<tr>';
  var len=r$p$$$table.header.length;
  r$p$$$table.currenttablerow ++;
  if (!empty) {
     checkReportPageBreak();
  }
  var value='';
  var tdstyle=''; 
  for (var i=0; i<len; i++) {
      if (r$p$$$table.style[i] != undefined) {
          tdstyle = r$p$$$table.defaultstyle+';'+r$p$$$table.style[i];
	  }
      else {tdstyle=r$p$$$table.defaultstyle} 	  
      if (empty && !r$p$$$table.usefillerborder) {
        tdstyle=tdstyle.toLowerCase().split("border").join("noborder");
      }
	  if (tdstyle) {
         txt += '<td style="'+tdstyle+'"'; 
	  } 
	  else {txt += '<td ';}	 
      if (notempty) {
         if (r$p$$$table.align[i]) {txt += ' ALIGN="'+r$p$$$table.align[i]+'"';}
         value=''+r$p$$$table.columnvalue[i]; 
         if (r$p$$$table.edit[i]) {
             var edtdata=r$p$$$table.edit[i].split(':');
             var edc=edtdata[0].toLowerCase();
             var edd='0';
             if (edtdata.length>1) {edd=edtdata[1]}
             if (edc=='y' || edc=='m' || edc=='d') {
                 value=edit(numeric(value).chgDateFmt('Y',edc),0,edc);
             }
             else {value=edit(value,edd,edc);} 
         }
         txt += "><div style='overflow:hidden; white-space:"+r$p$$$table.whitespace+";'>"+value+"</div></td>"; 
      }
      else {
        txt += ">&nbsp;</td>"; 
      }
  }
  txt += '</tr>'; 
  return txt;
}


function checkReportPageBreak(lines) {
   var pos=0;
   if (!lines) {var lines=0; pos=1}
   if (r$p$$$table.currenttablerow + lines > r$p$$$table.rowsperpage) {
       for (var i=r$p$$$table.currenttablerow; i<r$p$$$table.rowsperpage; i++) {
           rtd=reportTableDetail('empty');
           r$p$$$report.html += rtd; 
       }
       r$p$$$report.html +='</table>';
       //printOut('*pagefoot')
       r$p$$$report.html += translateString(r$p$$$report.pagefoot);

       //printOut('*pagehead');
       r$p$$$table.currenttablerow=pos;
       r$p$$$report.pageno ++; 
       if (r$p$$$report.pageno>1) {newPage();}
       r$p$$$report.html += translateString(r$p$$$report.pagehead);
       r$p$$$report.html += r$p$$$table.headproperty;

       //printOut('*tablehead');
       r$p$$$report.html += reportTableHead();
     
   } 
}

function translateString(txt,fromdetail) {

 if (!txt) return '&nbsp'; 

 if (txt=='*line') {
     txt='<div style="width:100%; border-bottom:1px solid"></div>&nbsp';
     return txt;
 }
 if (txt=='*thinline') {
     txt='<div style="width:100%; height:1px; border-bottom:1px solid"></div>';
     return txt;
 }
 if (txt=='*doubleline') {
     txt='<div style="width:100%; border-bottom:2px solid"></div>&nbsp';
     return txt;
 }

 if (!fromdetail) { 
     txt=txt.replace(/\*row/g,'currentbrkrow');
 }
 else { 
       txt=txt.replace(/\*row/g,'currentrptrow');
 } 

 if (txt.search("@page")!=-1) {
    txt=txt.replace(/@page/g,'<@:reportPageNbr()@>'); 
 }
 if (txt.search("@date")!=-1) {
    txt=txt.replace(/@date/g,'<@:reportDate()@>'); 
 }

 var s=txt.split('<@:');
 var t=new Array();
 var f=new Array();

 if (s.length>1) {
     
     t[0]=s[0];
     var s2='';

     for (var i=1; i<s.length; i++) {
         s2=s[i].split('@>');
         f[i]=s2[0];
         s2[0]='';
         t[i]=s2.join(''); 
     }

     for (var i=0; i<t.length; i++) {
         if (i==0) {txt=t[i]}
         else { 
            txt += eval(f[i])+t[i]; 
         }    
     }
 }

 return(txt);
}


function reportPageNbr() {
 return r$p$$$report.pageno;
}

function reportDate() {
 return new Date();
}

function getReport() {
  return r$p$$$report.html;
}


function displayReport(txt,title) {
  if (!reportdisplay) return false;
  if (r$p$$$report.type=='html') {
      var parms=document.getElementById('windowparmid');
      if (!parms) {
          parms=document.createElement('windowparmid');
          parms.id='windowparmid';
          document.getElementsByTagName('body')[0].appendChild(parms);
      } 
      parms.txt='';
      parms.report='';
      if (txt) {parms.txt=txt}
      else {parms.report=r$p$$$report}
      if (title) {
           parms.title=title;
      }
      var url='viewHtmlReport.htm'; 
      window.open(url, '', 'channelmode=yes,type=fullWindow,scrollbars=yes ,status=yes'); 
      return true;
  }
  // Else if PDF
  r$p$$$display=true; 
  return createReport(txt);
}


function createReport(txt) {

  if (r$p$$$report.type=='html') {return true} 

  //Check for installed Report tools
  if (runenvironment=='internet') {
     if (!installReportTools()) {
         reportdisplay=false;
         return false;
     }
  }

  var tempfile;
  var displayreport=false;
  if (r$p$$$display) {
     r$p$$$display=false;
     displayreport=true;
  }
  tempfile=reportdefaultfilepath+'RPT-'+username+timeStamp()+'.htm';

  var reportfile=reportdefaultfilepath+reportdefaultfilename;
  if (randomizereportname) {
      var randomname=(Math.floor(Math.random() * (99999999 - 1)) + 1)+'$R_';
      var splitname=r$p$$$report.file.split('$R_');
	  if (splitname.length==1) {
	      r$p$$$report.file=randomname+splitname[0]
	  }
	  else {
	       r$p$$$report.file=randomname+splitname[1];
	  }
   }
  if (!txt) {
     reportfile=r$p$$$report.filepath+r$p$$$report.file; 
  }

  var cmd='wkhtmltopdf '+tempfile+' '+reportfile;
  if (reportdefaultexepath) {
      cmd=reportdefaultexepath+cmd;
  }   

  var rpt$$head=rpt$html$$head;
  if (r$p$$$table.whitespace=='wrap') {rpt$$head=rpt$$head.split(': nowrap').join(':wrap');} 

  if (!txt) {
     var txt=rpt$$head+r$p$$$report.html;
     if (calledfromphp) {txt=txt.split('<divclass=').join('<div class=')}
     if (r$p$$$report.orientation) {cmd += ' --orientation '+r$p$$$report.orientation;} 
     if (r$p$$$report.pageheight) {cmd += ' --page-height '+r$p$$$report.pageheight;}
     if (r$p$$$report.pagesize) {cmd += ' --page-size '+r$p$$$report.pagesize;}
     if (r$p$$$report.pagewidth) {cmd += ' --page-width '+r$p$$$report.pagewidth;}
     if (r$p$$$report.margintop) {cmd += ' --margin-top '+r$p$$$report.margintop;}
     if (r$p$$$report.marginbottom) {cmd += ' --margin-bottom '+r$p$$$report.marginbottom;}
     if (r$p$$$report.marginleft) {cmd += ' --margin-left '+r$p$$$report.marginleft;}
     if (r$p$$$report.marginright) {cmd += ' --margin-right '+r$p$$$report.marginright;}
	 if (!r$p$$$report.smartshrinking) {cmd += ' --disable-smart-shrinking'}
	 if (r$p$$$report.dpi) {cmd += ' --dpi '+r$p$$$report.dpi}
    }
   else {
     txt = rpt$$head+txt;
   } 
   try {
      var fso = new ActiveXObject("Scripting.FileSystemObject"); 
      var s=fso.CreateTextFile(tempfile, true); 
      if (!fso.FileExists(tempfile)) {
          alert('Unable to create intermediate file:\n\n'+tempfile);
          return false; 
      } 
      s.WriteLine(txt);
      s.Close(); 
      var WshShell = new ActiveXObject("WScript.Shell"); 
      try{
         eval('WshShell.Run("'+cmd+'",2,true)');
         if (!fso.FileExists(reportfile)) {
             var fileObj = fso.GetFile(tempfile);
             fileObj.Delete(true);
             alert('Unable to create Report file:\n\n'+reportfile);
             return false; 
         }
         if (displayreport) {
            eval('WshShell.Run("'+reportfile+'",3,true)');
         }
         var fileObj = fso.GetFile(tempfile); 
         fileObj.Delete(true);
      }
      catch(e) {
          alert(e.message+'\n\nUnable to create or Display report');
          return false;
      }
  }
  catch (e) {
         alert(e.message+'\n\nUnable to create or Display report');
         return false;
  }
  return true;
}


function loadReportTable(obj,fieldlist) {
 
 var i=0;

 if (r$p$$$table.header.length==0) {
     if (fieldlist) {
        var fieldar=fieldlist.split(',');
     }
     else {
        var fieldar=new Array();
        for (property in obj) {
           if (property != 'rcdcnt') {
               fieldar.push(property);
           }
        }
    }
    for (i=0; i<fieldar.length; i++) {
         if (!r$p$$$table.id[i]) {
             try {
               eval('var i_'+fieldar[i]+'=new Object()');
               r$p$$$table.id[i]=fieldar[i];
             }
             catch(e) {r$p$$$table.id[i]='id$_'+i;}
         }
    } 

    useReport(r$p$$$report); 
 } 

 printOut('*pagehead'); 
 printOut('*tablehead'); 
 for (i=0; i<obj.rcdcnt; i++) {
     loadReportTableRow(obj,i,fieldlist);
 }
 printOut('*tablefoot');
 printOut('*pagefoot');
}


function loadReportTableRow(obj,indx,fieldlist) {

 var i=-1;
 var len=r$p$$$table.header.length; 
 var i2=0; 
 var property;
 var vlu='';
 currentrptrow=indx; 

 if (r$p$$$report.checkbreaks) {
     $checkReportBreaks(obj,fieldlist); 
	 r$p$$$report.checkbreaks=false;
 }
 
 if (r$p$$$table.beforerowload) {eval(translateString(r$p$$$table.beforerowload))}
 
 if (fieldlist) {
     fieldlist=fieldlist.split(',');
     for (i2=0; i2<fieldlist.length; i2++) {
          i++;
          if (i==len) {
              break;
          }
          try {
               eval('vlu=obj.'+fieldlist[i2]+'[indx]');
               r$p$$$table.columnvalue[i]=vlu;
          } 
          catch (e) {r$p$$$table.columnvalue[i]=translateString(fieldlist[i2],'fromdetail')};
     }
 }
 else {

    for (property in obj) {
        if (property != 'rcdcnt') {
           i++;
           if (i==len) {
               break;
           }
           eval('r$p$$$table.columnvalue[i]=obj.'+property+'[indx]');
        }
    }
 }
 
 saved$$value=clone(r$p$$$table.columnvalue);
 setBreakValues();

 currentbrkrow=indx;

 checkBreakHeaders();
 first$$row=false; 

 r$p$$$table.columnvalue=clone(saved$$value); 
 printOut('*tabledetail');
 if (r$p$$$table.afterrowload) {eval(translateString(r$p$$$table.afterrowload))}
 
 if (indx+1==obj.rcdcnt) {
     setBreakValues('lastbreak')
 }
}


function $checkReportBreaks(obj,fldlist) { // Check each report break where the field to summarize on was not represented as a number and represent it as such
 var flds={}; 
 var f='';
 var pr;
 if (fldlist) {
     f=fldlist.split(',');
	 for (pr=0; pr<f.length; pr++) {
	      f[pr]=f[pr].trim();
		  flds[f[pr]]=pr;
	 }
 }
 else {
    var t=-1;
    for (pr in obj) {
        if (pr != 'rcdcnt') {
           f=(''+pr).trim();
		   t++;
		   flds[f]=t;
        }
    }
 }
 var bkobj, bb;
 for (pr=0; pr<r$p$$$report.reportbreak.length; pr++) {
      bkobj=r$p$$$report.reportbreak[pr];
	  for (bb=0; bb<bkobj.valcol.length; bb++) {
	       if (bkobj.valcol[bb]) {
		       if (typeof flds[bkobj.valcol[bb]] != 'undefined') {
			       bkobj.summarycols[bb]=flds[bkobj.valcol[bb]];
			   }
			   else {
			       alert('Unrecognized summary field '+bkobj.valcol[bb]);
				   throw 'nothing';
				   return false;
			   }
		   }
	  }
 }
 return true;
}



function setBreakValues(lastbreak) {
 var k=0;
 var k2=0;
 var k3;
 var rbreak='';
 var ok=false;
 var vals='';
 var oper='';
 var tabval='';  
 var nbr=0;
 var breakno=-1;
 if  (lastbreak) {
     breakno=r$p$$$report.reportbreak.length-1
 }
 else { 
      if (!first$$row) {
         for (k=r$p$$$report.reportbreak.length-1; k>=0; k--) {
             rbreak=r$p$$$report.reportbreak[k];
             ok=false;
             if (rbreak.type=='total' && (rbreak.condition || lastbreak)) {
                try {
                   eval('ok='+rbreak.condition); 
                }
                catch(e) {} 
                if (ok==true) {
                   breakno=k;
                   break;
                }
             }
         }
     }
 }

 for (k=0; k<r$p$$$report.reportbreak.length; k++) {
     rbreak=r$p$$$report.reportbreak[k];
     if (k<=breakno && rbreak.type=='total') {
         $$$brk$$no=k; 
         reportTableBreak(rbreak);
         $$$brk$$no=-1;
         rbreak.columnvalue=new Array();
         rbreak.rowcount=new Array();
         rbreak.columnsum=new Array();
         if (rbreak.pageafter && !lastbreak) {currentbrkrow++; printOut('*pageafter')}
     }
     if (rbreak.summary) {
         oper=rbreak.summarytype; 
         vals=rbreak.summarycols;
         r$p$$$table.columnvalue=clone(saved$$value); 
         if (oper=='sum' || oper=='average' || oper=='count' || oper=='min' || oper=='max') {
            for (k3=0; k3<vals.length; k3++) {
                nbr=vals[k3];
                tabvalue=numeric(r$p$$$report.reporttable.columnvalue[nbr]);

                if (oper=='sum' || oper=='average' || oper=='count') { 
                    if (!rbreak.columnvalue[nbr]) {rbreak.columnvalue[nbr]=0} 
                    if (!rbreak.rowcount[nbr]) {rbreak.rowcount[nbr]=0}
                    if (!rbreak.columnsum[nbr]) {rbreak.columnsum[nbr]=0} 
                    rbreak.columnsum[nbr] += tabvalue; 
                    rbreak.rowcount[nbr] ++;
                    if (oper=='average') {
                        rbreak.columnvalue[nbr] = rbreak.columnsum[nbr] / rbreak.rowcount[nbr] 
                    }
                    else {
                        if (oper=='count') {
                            if (!rbreak.rowcount[nbr]) {rbreak.rowcount[nbr]=0}
                             rbreak.columnvalue[nbr] = rbreak.rowcount[nbr]; 
                        }
                        else {
                           rbreak.columnvalue[nbr] += tabvalue; 
                        }
                    }
                }
                if (oper=='max') {
                    if (!rbreak.columnvalue[nbr]) {rbreak.columnvalue[nbr]=-999999999999999999}  
                    if (rbreak.columnvalue[nbr] < tabvalue) { 
                        rbreak.columnvalue[nbr]=tabvalue; 
                    }
                }
                if (oper=='min') {
                    if (!rbreak.columnvalue[nbr]) {rbreak.columnvalue[nbr]=999999999999999999}  
                    if (rbreak.columnvalue[nbr] > tabvalue) { 
                        rbreak.columnvalue[nbr]=tabvalue; 
                    }
                } 
            }
         }

     }
 }

}

function checkBreakHeaders() {
   var k=0;
   for (k=r$p$$$report.reportbreak.length-1; k>=0; k--) {
        rbreak=r$p$$$report.reportbreak[k];
        ok=false;
        if (rbreak.type=='header' && (rbreak.condition || first$$row)) {
            if (first$$row) {ok=true}
            else {
               try {
                 eval('ok='+rbreak.condition); 
               }
               catch(e) {} 
            }
            if (ok==true) {
                reportTableBreak(rbreak,'*dodetail');
            }
        }
   }
}


function tableReportDef() {
 this.orientation=''   //Landscape or Portrait
 this.pagesize='';
 this.pagewidth='';    //in mm
 this.pageheight='';   //in mm
 this.margintop='';    //in mm
 this.marginbottom=''; //in mm
 this.marginleft='';   //in mm
 this.marginright='';  //in mm
 this.title='';
 this.rules='';
 this.pagehead="@date<br><br><div style='font-size:130%; width:100%'><b><u>Table Listing</u></b></div><br><br>";
 this.pageheadheight='';
 this.pagefoot='<br><br>Page: @page';
 this.rowsperpage=50;
 this.widthfactor=1; 
 this.whitespace='nowrap' //or wrap; 
 this.fixedwidth=true;
 this.summary='';
       //'header'
       //'sum:a,b,c,..y,.'
       //'average:a,b,c,..y,.'
       //'count:a,b,c,..y..'
       //'max:a,b,c,..y,.'
       //'min:a,b,c,..y,.'
 this.tabledef=new Object();
 this.create=createTableReport;
 this.display=displayTableReport;
}


function createTableReport(display) {
 rpttab=new reportTableDef();
 var tabl=this.tabledef; 
 var j=-1;
 var nfld='';
 var $r=new Object();
 rpttab.rowsperpage=this.rowsperpage;
 rpttab.fixedwidth=this.fixedwidth;
 rpttab.widthfactor=this.widthfactor;
 rpttab.whitespace=this.whitespace; 
 rpttab.rules=this.rules;
 for (var i=0; i<tabl.header.length; i++) {
      if (tabl.width[i] > 0) {
          j++;
          nfld='fld'+j;
          rpttab.width[j]=tabl.width[i]*rpttab.widthfactor;
          if (!rpttab.rules) {rpttab.header[j]='<u><b>'+tabl.header[i]+'</b></u>'}
		  else {rpttab.header[j]='<b>'+tabl.header[i]+'</b>'}
          //rpttab.edit[j]=tabl.edit[i];
          rpttab.style[j]=tabl.style[i];
          rpttab.headstyle[j]=tabl.headstyle[i];
          rpttab.align[j]=tabl.align[i];  
          $r[nfld]=new Array();
      }
 }


 var i2=0;
 var table=document.getElementById(tabl.tableid); 
 var tablerows = table.getElementsByTagName("tr"); 
 for (i=0; i<tablerows.length; i++) {
     tablecols = tablerows[i].getElementsByTagName("td"); 
     j=-1;
     for (i2=0; i2<tablecols.length; i2++) {
         if (tabl.width[i2] > 0) {
             j++;
             nfld='fld'+j; 
             $r[nfld][i]=tablecols[i2].innerHTML;

         }
     }
 }

 $r.rcdcnt=tablerows.length;

 var rpt=new reportDef();
 rpt.reporttable=rpttab;
 rpt.orientation=this.orientation;
 rpt.pagesize=this.pagesize;
 rpt.pagewidth=this.pagewidth;
 rpt.pageheight=this.pageheight;
 rpt.margin=this.margintop;
 rpt.marginbottom=this.marginbottom;
 rpt.marginleft=this.marginleft;
 rpt.marginright=this.marginright;
 rpt.pageheadheight=this.pageheadheight;

 if (this.title) {
    rpt.pagehead="@date<br><br><div style='font-size:130%; width:100%'><b><u>"+this.title+"</u></b></div><br><br>"; 
 }
 else {rpt.pagehead=this.pagehead;}
 rpt.pagefoot=this.pagefoot;
 if (this.summary) {
     var rptbk=new reportBreak();
     rptbk.condition='*end';
     rptbk.summary=this.summary;
     addReportBreak(rpt,rptbk);
 }

 useReport(rpt);
 loadReportTable($r);

 if (display) {return displayReport()}

 if (!createReport()) {return false};
 return rpt; 

}

function displayTableReport() {
 r$p$$$display=true;
 if (this.create('display')) {
     r$p$$$display=false;
     return true;
 }
 else {
      r$p$$$display=true;
      return false;
 }
}


function installReportTools() {
  var output=reportdefaultexepath.replace('//','\\'); 
  var myObject;
  myObject = new ActiveXObject("Scripting.FileSystemObject");
  
  if(myObject.FolderExists(output)){
     fso = new ActiveXObject("Scripting.FileSystemObject");
     var file1=output +'libeay32.dll';
     var file2=output +'libgcc_s_dw2-1.dll';
     var file3=output +'wkhtmltopdf.exe';
     if (fso.FileExists(file1) && fso.FileExists(file2) && fso.FileExists(file3) ) {
         return true;     
     }
  }  

  installdialog=new dialogMsgDef();
  installdialog.width=600;
  installdialog.options=[':Cancel'];
  installdialog.title='Install Report Extensions';
  var rtn=dialogMsg('The report extension files required to display Advantum reports are not installed on this computer.<br><br> Click <a onclick=sendBack("I") href=\'../applications/wkhtmltohtmlsetup.EXE\'>here</a> to install',installdialog);  
  if (!rtn) {
      say('Reports will not be generated...',3);
  }

  return false;
}

function exeReportFunction(functname) {
 serverparms='';
 runonserver = false;
 rptfunctionnm=functname;
 
  if (runenvironment == 'internet' && serverreport) {
    runonserver = true;
  }

  if (arguments.length>1) {

    for (var x=1; x<arguments.length;x++) {
    
      if (x==1) {
        if (runonserver) {
          serverparms='&prms='+arguments[x];  
        }
        else {

          if (typeof arguments[x] == 'number') {
            serverparms= arguments[x]; 
          }
          else {
            serverparms="'" + arguments[x] + "'";     
          }
        }
      }
      else {
        if (runonserver) { 
          serverparms+=':'+ arguments[x];  
        }
        else {

          if (typeof arguments[x] == 'number') {
            serverparms+="," + arguments[x];  
          }
          else {
            serverparms+=",'" + arguments[x] + "'";  
          } 
        }
      }
    }
  }

  exeFunction('runReportFunction()');


}

function runReportFunction() {
  
  var functname = rptfunctionnm;
  if (runonserver) {
    var prognam = window.location.href.split('/');
    var prgname = prognam[prognam.length-1];
 
    if (!isBlank(serverparms)) {
      rpturlparm='functname='+functname + '&prgname='+prgname + serverparms;
    }
    else {
      rpturlparm='functname='+functname + '&prgname='+prgname;
    }

    ajaxCall('phpreports.php',rpturlparm);
    if (ajaxerror) {alert(ajaxerror); return}
    var resp = ajaxresponse.split(';');
    var pdffile = serverrptpath + resp[1]; 
    rptoutput = '<embed src="'+pdffile + '" width=100% height=100%></embed>'; 
    var dlg=new dialogDef();
        dlg.dialogparm.rptoutput=rptoutput; 
        displayDialog('viewReportFromServer.htm',dlg);

    //changeContent('rptdiv',rptoutput);    
  }
  else {
    try {
      eval(" xxx =" +functname+ "(" + serverparms + ")"); 
    }
    catch(e) { alert('ERR ' + e.message + ' --- ' + serverparms);}   
    viewReport();   
  }
  rptfunctionnm = null;
  runonserver=null;

  return true;
}




function viewReport(title) {
  if (!reportdisplay) return false;
  if (r$p$$$report.type=='html') {
      displayReport('',title);
      return true; 
  } 
  /*
  if (runenvironment=='internet') {
      var WshShell = new ActiveXObject("WScript.Shell"); 
      var reportfile=r$p$$$report.filepath+r$p$$$report.file; 
      eval('WshShell.Run("'+reportfile+'",3,true)'); 
      return true
  } 
  */
  // Else... 
  var dlg=new dialogDef();
      dlg.dialogparm.report=r$p$$$report; 
      if (title) {dlg.dialogparm.title=title} 
  displayDialog('viewReport.htm',dlg);
  return true;  
}

/*
function getFullPath(relatedfile) {
  if (runenvironment=='internet') {    
    if (!file$$fullpath[relatedfile]) {  
      var url=window.location.href;
      url =url.substr(0,url.lastIndexOf('/'));
      if (relatedfile.substr(0,2)=='..') {
        url =url.substr(0,url.lastIndexOf('/'));
        relatedfile=relatedfile.substr(3);
      }
    
      file$$fullpath[relatedfile]=url+'/'+relatedfile;
    }
  }
  else{ 
    if (!file$$fullpath[relatedfile]) {  
      var myObject = new ActiveXObject("Scripting.FileSystemObject"); 
      try {var afile = ''+myObject.GetFile(relatedfile);} catch(e) {return e.message}  
      afile=afile.split('\\').join('/');
      file$$fullpath[relatedfile]=afile;
    }  
 
  }
  return file$$fullpath[relatedfile];
} */


function getFullPath(relatedfile) {
    if (relatedfile.split('/').length==1) {
	    relatedfile="../image/"+relatedfile;
	}
 /* if (runenvironment!='internet') {   */ 
    if (!file$$fullpath[relatedfile]) {  
      var url=window.location.href;
      url =url.substr(0,url.lastIndexOf('/'));
      if (relatedfile.substr(0,2)=='..') {
          url =url.substr(0,url.lastIndexOf('/'));
          relatedfile=relatedfile.substr(3);
      }
      if (runenvironment!='internet') { 
	      url=url.strip('file:///');
		  url=url.strip('file://');
		  if (url.sst(2,1) != ':') {// Link does not have a drive letter
		      var fl=relatedfile.split('/');
			  fl=fl[fl.length-1];
			  //var pgm_nm=(''+window.location).split('/'); // get the name of the programming running 
              //pgm_nm=pgm_nm[pgm_nm.length-1]; 
			  var flfull=(getPcFilePath('wkhtmltopdf.exe').split('\\').join('/')+fl); // Get the full path of the progrtam running and append the file name to it
			  flfull=flfull.split('/');
			  flfull[flfull.length-2]='image'; // replace "applications" with "image"
			  flfull=flfull.join('/');
			  var rdfp=reportdefaultfilepath; 
			  if (typeof r$p$$$report.filepath != 'undefined') {
			      rdfp=r$p$$$report.filepath;
			  }
			  var cfso = new ActiveXObject("Scripting.FileSystemObject");
              cfso.CopyFile (flfull,rdfp+fl);
			  file$$fullpath[relatedfile]=rdfp+fl;
	  	  }
		  else {file$$fullpath[relatedfile]=url+'/'+relatedfile;}
      }
	  else {
		   file$$fullpath[relatedfile]=url+'/'+relatedfile;
      }

    }
	return file$$fullpath[relatedfile];
}


function printReportNow() {
 var  pobjx=document.createElement('object');
 pobjx.style.height=0;
 pobjx.style.width=0;
 pobjx.data=r$p$$$report.filepath+r$p$$$report.file;
 pobjx.type="application/pdf";
 document.getElementsByTagName('body')[0].appendChild(pobjx);
 pobjx.PrintAll();
}

function createGridReport(gridvspace,gridhspace,reportwidth) {// gridvspace=Spacing for Vertical lines, gridhspace for horizontal lines
 if (!gridvspace) {var gridvspace=20}
 if (!gridhspace) {var gridhspace=20}
 var gridrptdiv=document.getElementById('gridrptdiv');
 if (!gridrptdiv) {
     gridrptdiv=document.createElement('div');
     gridrptdiv.id='gridrptdiv';
     document.getElementsByTagName('body')[0].appendChild(gridrptdiv);
 }

 document.getElementById('gridrptdiv').innerHTML=r$p$$$report.html; 
 var rwidth=gridrptdiv.offsetWidth;
 if (reportwidth) {rwidth=reportwidth};
 var rheight=gridrptdiv.offsetHeight; 
 if (rwidth==0) {rwidth=600}
 if (rheight>1000 || rheight==0) {rheight=1000} 
 document.getElementsByTagName('body')[0].removeChild(gridrptdiv);
 delete gridrptdiv;
 var dtxt='<div style="border:1px solid red; position:absolute; width:'+rwidth+'px; height:'+rheight+'px">';
  dtxt += '<div style="position:absolute; font-weight:bold; color:red; font-size:4px; left:1px">0</div>';
 var lft=0; 
 while(lft <= rwidth-gridvspace) {
 	 dtxt += '<div style="position:absolute; font-weight:bold; color:red; font-size:4px; left:'+(lft+1)+'px">'+lft+'</div>';
	 lft += gridvspace;
	 dtxt += '<div style="position:absolute; width:1px; background:pink; height:'+rheight+'px; left:'+lft+'px"></div>';
 }
 lft=0;
 
 while(lft <= rheight-gridhspace) {
	 lft += gridhspace;
	 dtxt += '<div style="position:absolute; height:1px; background:pink; width:'+rwidth+'px; top:'+lft+'px"></div>';
	 dtxt += '<div style="position:absolute; font-weight:bold; color:red; font-size:4px; top:'+(lft+1)+'px">'+lft+'</div>';
 }
 r$p$$$report.html=dtxt+r$p$$$report.html+'</div>';
 printOut(r$p$$$report.html);
 return createReport();
}
 