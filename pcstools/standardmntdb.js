


//********************************DATABASE ADD FUNCTIONS*********************************************

function createDbTable(dbtable) {

var connection=conn; 
var logcreate='N';

$$sqlphppath='';

if (arguments.length>1) { 
    var arg2=arguments[1].split(':');
    if (arg2[0].toLowerCase()=='*tolog') {
      $$sqlphppath=submitlogsqlpath;
      if (logconn) {connection=logconn}
      logcreate='logyes';
    } 
}



  var  sqltxt = "select * from "+dbtable;
  if (sqlSelect(sqltxt,'$s',1,connection,$$sqlphppath)){
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


connect=connection;

//Table name definition

sqlcommand = "CREATE TABLE "+dbtable+" (";
 


//include Log fields

if (logcreate=='logyes'){


 //Add key field
  sqlcommand += "tgkey";
     if(dbasetype =='access'){
        sqlcommand += " Number";
     }
     else {
         sqlcommand += " numeric(17,0)";
         if (dbasetype=='as400') {
             sqlcommand += " NOT NULL WITH DEFAULT";
         }
     }
     if(dbasetype !='as400' && dbasetype !='access'){ sqlcommand += " default 0";}
     sqlcommand += ", ";



 //Add User field
  sqlcommand += "tgusr char(10),";


 //Add date field 
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

 
 //Add time field
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

 
 //Add other time and event fields
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

 
 for (var i=0; i<fieldnames.length; i++) {
  
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
    
         
         
        //Determine if key field 
		var setnotnull='N';  
		var kfldextr='';
        if (!isBlank(keyfields) && logcreate !='logyes'){
             for (var k=0; k<keyfields.length; k++) {
			     //Extract actual field in case sort order specified for key field
			     var kfldarr=keyfields[k].trim().split(' ');
				 kfldextr=kfldarr[0];
			     if (kfldextr == fldnam) {
				     setnotnull='Y';
					 break;
				 }
			 }
		}	
		
		
		//Specify NOT NULL if key field
        if (setnotnull=='Y') {		
			  //Specify NOT NULL (access,oracle,sqlserver) not required for mysql
			   if (dbasetype == 'access' || dbasetype =='oracle' || dbasetype =='sqlserver'){			   
						sqlcommand += " NOT NULL";
			   }
        }
		
       
          //Default value (mysql,oracle,sqlserver)

           if (dbasetype =='mysql' || dbasetype =='oracle' || dbasetype =='sqlserver'){
               if (fldattr.decimal=='') {sqlcommand += " default ' '";}
               else {sqlcommand += ' default 0';}
           }
 
      
          if (dbasetype =='as400') {sqlcommand += " NOT NULL WITH DEFAULT";}     


          if (i < (fieldnames.length)-1){
                sqlcommand += ", ";
          }


 } 


  sqlcommand += ")";


  if (!sqlCommandPhp(sqlcommand)) {return false;}


    

  //define keys 
  //Add Key
  if (!isBlank(keyfields) && logcreate !='logyes'){

      sqlcommand = "ALTER table "+dbtable+" ADD PRIMARY KEY (";
  
         for (var k=0; k<keyfields.length; k++) {
             sqlcommand += keyfields[k];
             
             if (k < (keyfields.length)-1){
                sqlcommand += ", ";
             }              
         }

      sqlcommand += ")";
      if (!sqlCommandPhp(sqlcommand)) {return false;}

  }


  return true;  

}







function createDbTableView(dbtable,viewsel,connection) {
if (!connection) {var connection=conn}
 //this.view[0]='Viewname:select_fields:where_cond:other_join_files:group_by_fields';

connect=connection;

var tabattr=getDbTableAttr(dbtable);

if (!tabattr) { return false;}

var viewselect='';

if (arguments.length==1 || viewsel=='*ALL' || viewsel=='*all') { 
   viewselect='*ALL';
}
else{ viewselect=viewsel; }


  //Create logicals

 if (viewselect=='*ALL'){
    
    for (var i=0; i<tabattr.view.length; i++) {
    
      var fieldattr=tabattr.view[i].split(':');
      var sqlcommand = buildTableViewCommand(fieldattr,dbtable);
      
      if (!sqlCommandPhp(sqlcommand)) {return false;}

    }
 }
 else{
   
    var lglattr=viewselect.split(':');
    for (var h=0; h<lglattr.length; h++) {

      for (var i=0; i<tabattr.view.length; i++) {
    
          var fieldattr=tabattr.view[i].split(':');
          if (fieldattr[0] == lglattr[h]){
               sqlcommand = buildTableViewCommand(fieldattr,dbtable);
               if (!sqlCommandPhp(sqlcommand)) {return false;}
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

      for (var j=0; j<fieldattr.length; j++) { 

          //View name
          if (j==0) {sqlcommand1 += fieldattr[j]+" AS SELECT ";}

          //Select fields
          if (j==1) {
              var selattr=fieldattr[j].split(',');
              for (var k=0; k<selattr.length; k++) { 
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
              for (var k=0; k<grpattr.length; k++) { 
                  sqlcommand1 += grpattr[k];
                  if (k<(numeric(grpattr.length)-1)){ sqlcommand1 += ", ";}
              }   
          }

     
      }

      
   return sqlcommand1;
}



function createDbTableIndex(dbtable,indexsel,connection) {
if (!connection) {var connection=conn}
connect=connection;

var tabattr=getDbTableAttr(dbtable);

if (!tabattr) { return false;}

var indexselect='';

if (arguments.length==1 || indexsel=='*ALL' || indexsel=='*all') { 
   indexselect='*ALL';
}
else{ indexselect=indexsel; }


  //Create logicals

 if (indexselect=='*ALL'){
    
    for (var i=0; i<tabattr.index.length; i++) {
    
      var fieldattr=tabattr.index[i].split(':');
      var sqlcommand = buildTableIndexCommand(fieldattr,dbtable);
      try {
        //if (!sqlCommandPhp(sqlcommand)) {return false;}
        sqlCommandPhp(sqlcommand);
      }
      catch(e) {
        alert('Error adding index '+fieldattr+' please check database');
      }
    }
 }
 else{
   
    var lglattr=indexselect.split(':');
    for (var h=0; h<lglattr.length; h++) {

      for (var i=0; i<tabattr.index.length; i++) {
    
          var fieldattr=tabattr.index[i].split(':');
          if (fieldattr[0] == lglattr[h]){
               sqlcommand = buildTableIndexCommand(fieldattr,dbtable);
               try {
                  //if (!sqlCommandPhp(sqlcommand)) {return false;}
                  sqlCommandPhp(sqlcommand);
               }
               catch(e) {
                  alert('Error adding index '+fieldattr+' please check database');
               }
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

      var sqlcommand1 = "CREATE INDEX "; 

      if (fieldattr.length > 2 && !isBlank(fieldattr[2])) {
         sqlcommand1 = "CREATE UNIQUE INDEX "; 
      }
       

      for (var j=0; j<fieldattr.length; j++) { 

          //index name
          if (j==0) {sqlcommand1 += fieldattr[j]+" ON "+tablename;}

          
          //key fields
          if (j==1 && !isBlank(fieldattr[j])) {
              sqlcommand1 += " (";
              var grpattr=fieldattr[j].split(',');
              for (var k=0; k<grpattr.length; k++) { 
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

      for (var j=0; j<fieldattr.length; j++) { 

          //index name
          if (j==0) {sqlcommand1 += fieldattr[j]+" AS SELECT * FROM "+tablename;}

          
          //key fields
          if (j==1 && !isBlank(fieldattr[j])) {
              sqlcommand1 += " ORDER BY ";
              var grpattr=fieldattr[j].split(',');
              for (var k=0; k<grpattr.length; k++) { 
                  sqlcommand1 += grpattr[k];
                  if (k<(numeric(grpattr.length)-1)){ sqlcommand1 += ", ";}
              } 
              
          }

     
      }


   return sqlcommand1;


}





//Add Column to Table

function addDbTableCol(dbtable,newcol,len,dec,connection){
if (!connection) {var connection=conn}
connect=connection;

 var sqlcommandbd=''; 

 var sqlcommandhd = "ALTER TABLE "+dbtable+" ADD";
 if (dbasetype =='as400' || dbasetype =='access') {sqlcommandbd += " COLUMN";}   //COLUMN parameter applicable only for as400 and access
 sqlcommandbd += " "+newcol+" ";

 if (dec!=undefined) {dec=''+dec} 

 //define Type attribute
         
         var fieldtyp="char";
         var lendec=len;

         //if no decimal field type is character otherwise numeric
         if (dec) { 
             fieldtyp="numeric";
             if(dbasetype =='access') {fieldtyp="Number";}
             lendec=len+','+dec;
         }
         if (fieldtyp=="Number") {sqlcommandbd += fieldtyp;}
         else { sqlcommandbd += fieldtyp+"("+lendec+")";}
    

   //Specify NOT NULL (mysql,oracle,sqlserver)
        /*
          if (dbasetype == 'access' || dbasetype =='mysql' || dbasetype =='oracle' || dbasetype =='sqlserver'){   
                    sqlcommandbd += " NOT NULL";
          }
        */
       
          //Default value (mysql,oracle,sqlserver)

           if (dbasetype =='mysql' || dbasetype =='oracle' || dbasetype =='sqlserver'){
               if (fieldtyp=='char') {sqlcommandbd += " default ' '";}
               else {sqlcommandbd += ' default 0';}
           }
 
      
          if (dbasetype =='as400') {sqlcommandbd += " NOT NULL WITH DEFAULT";}        
             
 
      var sqlcommand=sqlcommandhd+sqlcommandbd;         
 

     if (!sqlCommandPhp(sqlcommand)) {return false;}


     
     //Add to log file if necessary

     var sqltxt = "select syslogto from systablog where systab="+dbtable.sqlWrap();
     if (!sqlSelect(sqltxt,'$logmast',1,connection,$$sqlphppath)){return false;}

     if ($logmast.rcdcnt > 0) {

        $$sqlphppath=submitlogsqlpath;
        if (logconn) {connection=logconn;}
        connect=connection;

        sqlcommandhd = "ALTER TABLE "+$logmast.syslogto[0]+" ADD";

        sqlcommand=sqlcommandhd+sqlcommandbd;
      
        if (!sqlCommandPhp(sqlcommand)) {return false;}

     }
 
   

   return true;

} 



//Add Primary keys 

function addDbTablePrimary(dbtable,connection){
if (!connection) {var connection=conn}
connect=connection;

var tabattr=getDbTableAttr(dbtable);

if (!tabattr) { alert('Error getting attributes for table: '+dbtable);return false;}

var keyfields=tabattr.keyfield.split(',');

var sqlcommand='';
  

  //Add primary key

  if (tabattr.keyfield) {

    sqlcommand = "ALTER table "+dbtable+" ADD PRIMARY KEY (";
  
         for (var k=0; k<keyfields.length; k++) {
             sqlcommand += keyfields[k];
             
             if (k < (keyfields.length)-1){
                sqlcommand += ", ";
             }              
         }

      sqlcommand += ")";
      try {
         //if (!sqlCommandPhp(sqlcommand)) {return false;}
         sqlCommandPhp(sqlcommand);
      }
      catch(e) {
             alert('Error adding primary key for table '+dbtable+' please check database');
      }
  }

  
  return true; 

}


//Drop Primary keys 

function dropDbTablePrimary(dbtable,connection){
if (!connection) {var connection=conn}
connect=connection;


var sqlcommand='';
  

  //Drop primary key if it exists

   //try {

          if (dbasetype =='as400' || dbasetype =='mysql') { 
              sqlcommand = "ALTER table "+dbtable+" DROP PRIMARY KEY";
              try {
                 //if (!sqlCommandPhp(sqlcommand)) {return false;}
                 sqlCommandPhp(sqlcommand);
              }
              catch(e) {
                  alert('Error dropping primary key for table '+dbtable+' please check database');
              }
          }

          if (dbasetype == 'sqlserver') { 
       
                var  sqltxt = "select name from sysobjects where xtype = 'PK' and parent_obj = object_id('"+dbtable+"')";
                if (!sqlSelect(sqltxt,'$s',1)){alert('Error..'+sqlerr);return false; }

                if (sqlrcdcnt > 0) {
                    sqlcommand = "ALTER table "+dbtable+" DROP CONSTRAINT "+$s.name[0];
                    try {
                        //if (!sqlCommandPhp(sqlcommand)) {return false;}
                        sqlCommandPhp(sqlcommand);
                    }
                    catch(e) {
                       alert('Error dropping primary key '+$s.name[0]+' for table '+dbtable+' please check database');
                    }
                }

          }

       
   //}
   //catch (e){ sqlerr=e.message; alert(sqlerr); return false; }

  

  
  return true; 

}


//********************************DATABASE MODIFICATION FUNCTION*********************************************


//Alter Column 

function alterDbTableCol(dbtable,altcol,len,dec,connection){
if (!connection) {var connection=conn}
connect=connection;

if (dec!=undefined) {dec=''+dec} 

//Check if field is a keyfield index to be dropped and readded

var dropindex=false; 
var dropidxonly=false;

   var tabattr=getDbTableAttr(dbtable);

   if (!tabattr) { alert('Error getting attributes for table: '+dbtable);return false;}

   var keyfields=tabattr.keyfield.split(',');

   for (var k=0; k<keyfields.length; k++) {
           
        if (keyfields[k]==altcol){
         
            dropindex=true;
            if (!dropDbTablePrimary(dbtable)) { return false;}
            if (!dropDbTableIndex(dbtable,'*ALL')) {return false;} 
            break;    
        }              
   }

   //If field not primary key check if field part of index
   if (dropindex==false) {
      for (var ii=0; ii<tabattr.index.length; ii++) {
    
          var idxattr=tabattr.index[ii].split(':');
          var fldlst=idxattr[1].split(',');

          for (var kk=0; kk<fldlst.length; kk++) {
           
              if (fldlst[kk]==altcol){
         
                 dropindex=true;
                 dropidxonly=true;
                 if (!dropDbTableIndex(dbtable,'*ALL')) {return false;} 
                 break;    
              }              
          }
      }
   }

 


//Alter table column


 var sqlcommandhd = "ALTER TABLE "+dbtable;
 var sqlcommandbd = ''; 

 if (dbasetype =='mysql' || dbasetype =='oracle') {sqlcommandbd += " MODIFY";}   //MODIFY parameter applicable only for mysql and oracle
 else {sqlcommandbd += " ALTER COLUMN";} 

 sqlcommandbd += " "+altcol+" ";

 if (dbasetype =='as400') {sqlcommandbd += "SET DATA TYPE ";}


 //define Type attribute
         
         var fieldtyp="char";
         var lendec=len;

         //if no decimal field, type is character otherwise numeric

         if (dec) {
             fieldtyp="numeric";
             if(dbasetype =='access') {fieldtyp="Number";}
             lendec=len+','+dec;
         }
 
         if (fieldtyp=="Number") {sqlcommandbd += fieldtyp;}
         else { sqlcommandbd += fieldtyp+"("+lendec+")";}



  //define not null
         
          if (dbasetype =='as400') {sqlcommandbd += " NOT NULL WITH DEFAULT";} 
          else{sqlcommandbd += " NOT NULL"; }
  
     var sqlcommand=sqlcommandhd+sqlcommandbd;

     if (!sqlCommandPhp(sqlcommand)) {return false;}
 
   



  //Re add index if previously removed

  if (dropindex==true) {  
      if (!createDbTableIndex(dbtable,'*ALL')) {return false;}
      if (dropidxonly==false && dbasetype !='access') {if (!addDbTablePrimary(dbtable)) { return false;}} 
  }



  //Amend log file if necessary

     var sqltxt = "select syslogto from systablog where systab="+dbtable.sqlWrap();
     if (!sqlSelect(sqltxt,'$logmast',1,connection,$$sqlphppath)){return false;}

     if ($logmast.rcdcnt > 0) {

        $$sqlphppath=submitlogsqlpath;
        if (logconn) {connection=logconn;}
        connect=connection;

        sqlcommandhd = "ALTER TABLE "+$logmast.syslogto[0];

        sqlcommand=sqlcommandhd+sqlcommandbd;
      
        if (!sqlCommandPhp(sqlcommand)) {return false;}

     }




   return true;

} 



//********************************DATABASE DROP FUNCTIONS*********************************************



//drop table

function dropDbTable(dbtable,connection) {
if (!connection) {var connection=conn}
connect=connection;

var tabattr=getDbTableAttr(dbtable);

if (!tabattr) { alert('Error getting attributes for table: '+dbtable); return false;}

  //drop views  
  if (tabattr.view.length > 0) {
     if (!dropDbTableView(dbtable,'*ALL')) {return false;}
  } 

  //drop indexes  
  if (tabattr.index.length > 0) {
     if (!dropDbTableIndex(dbtable,'*ALL')) {return false;}
  } 

  //drop table
  var sqlcommand = "DROP TABLE "+dbtable;
  if (dbasetype =='as400'){ sqlcommand += " CASCADE";}    //If CASCADE is specified, any aliases, constraints, triggers, views, or indexes  
                                                          //associated with that table will also be dropped


  if (!sqlCommandPhp(sqlcommand)) {return false;}

  

  return true;

}




//Drop view

function dropDbTableView(dbtable,viewsel,connection) {
if (!connection) {var connection=conn}
connect=connection;

var tabattr=getDbTableAttr(dbtable);

if (!tabattr) { alert('Error getting attributes for table: '+dbtable); return false;}

var viewselect='';

if (arguments.length==1 || viewsel=='*ALL' || viewsel=='*all') { 
   viewselect='*ALL';
}
else{ viewselect=viewsel; }
 

 if (viewselect=='*ALL'){
    
    for (var i=0; i<tabattr.view.length; i++) {
    
      var fieldattr=tabattr.view[i].split(':');
      var sqlcommand = "DROP VIEW "+fieldattr[0];
      if (dbasetype =='access') sqlcommand = "DROP TABLE "+fieldattr[0]; 
      if (dbasetype =='as400'){ sqlcommand += " CASCADE";}     //Specifies that any tables, views, indexes, files, or
                                                               //referential constraints that are dependent on the   
                                                               //object being dropped are also dropped.     
      
      if (!sqlCommandPhp(sqlcommand)) {return false;}

    }
 }
 else{
   
    var lglattr=viewselect.split(':');
    for (var h=0; h<lglattr.length; h++) {

      for (var i=0; i<tabattr.view.length; i++) {
    
          var fieldattr=tabattr.view[i].split(':');
          if (fieldattr[0] == lglattr[h]){

               var sqlcommand = "DROP VIEW "+fieldattr[0];
               if (dbasetype =='access') sqlcommand = "DROP TABLE "+fieldattr[0];
               if (dbasetype =='as400'){ sqlcommand += " CASCADE";}

               if (!sqlCommandPhp(sqlcommand)) {return false;}
          }   
      }

    }


 }

 
 return true; 

}




function dropDbTableIndex(dbtable,indexsel,connection) {
if (!connection) {var connection=conn}

connect=connection;

var tabattr=getDbTableAttr(dbtable);

if (!tabattr) { alert('Error getting attributes for table: '+dbtable); return false;}

var indexselect='';

if (arguments.length==1 || indexsel=='*ALL' || indexsel=='*all') { 
   indexselect='*ALL';
}
else{ indexselect=indexsel; }

  

 if (indexselect=='*ALL'){

  
    
    for (var i=0; i<tabattr.index.length; i++) {
    
      var fieldattr=tabattr.index[i].split(':');
      var sqlcommand = "";

      if (dbasetype =='as400' || dbasetype =='oracle'){ sqlcommand = "DROP INDEX "+fieldattr[0];}
      if (dbasetype =='sqlserver') { sqlcommand = "DROP INDEX "+dbtable+"."+fieldattr[0];}
      if (dbasetype =='access') { sqlcommand = "DROP INDEX "+fieldattr[0]+" ON "+dbtable;}
      if (dbasetype =='mysql') { sqlcommand = "ALTER TABLE "+dbtable+" DROP INDEX "+fieldattr[0];}
      
      try {
        //if (!sqlCommandPhp(sqlcommand)) {return false;}

        sqlCommandPhp(sqlcommand);
      }
      catch(e) {
        alert('Error dropping index '+fieldattr[0]+' please check database');
      }

    }
 }
 else{

  
   
    var lglattr=indexselect.split(':');
    for (var h=0; h<lglattr.length; h++) {

      for (var i=0; i<tabattr.index.length; i++) {
    
          var fieldattr=tabattr.index[i].split(':');
         

          if (fieldattr[0] == lglattr[h]){
               var sqlcommand = "";

               if (dbasetype =='as400' || dbasetype =='oracle'){ sqlcommand = "DROP INDEX "+fieldattr[0];}
               if (dbasetype =='sqlserver') { sqlcommand = "DROP INDEX "+dbtable+"."+fieldattr[0];}
               if (dbasetype =='access') { sqlcommand = "DROP INDEX "+fieldattr[0]+" ON "+dbtable;}
               if (dbasetype =='mysql') { sqlcommand = "ALTER TABLE "+dbtable+" DROP INDEX "+fieldattr[0];}

               
               try {
                  //if (!sqlCommandPhp(sqlcommand)) {return false;}

                  sqlCommandPhp(sqlcommand);
               }
               catch(e) {
                   alert('Error dropping index '+fieldattr[0]+' please check database');
               }

          }   
      }

    }


 }

 

 return true; 

}






//Drop column

function dropDbTableCol(dbtable,dropcol,connection){
if (!connection) {var connection=conn}
connect=connection;


//Drop column from table


 var sqlcommandhd = "ALTER TABLE "+dbtable+" DROP";
 var sqlcommandbd='';
 if (dbasetype !='mysql') {sqlcommandbd += " COLUMN";}   //COLUMN parameter included for all other database types except mysql  
 sqlcommandbd += " "+dropcol;
 if (dbasetype =='as400'){ sqlcommandbd += " CASCADE";}

 var sqlcommand=sqlcommandhd+sqlcommandbd;
 
 if (!sqlCommandPhp(sqlcommand)) {return false;}


 //Field not dropped from log file to retain historical data

    // var sqltxt = "select syslogto from systablog where systab="+dbtable.sqlWrap();
    // if (!sqlSelect(sqltxt,'$logmast',1,connection,$$sqlphppath)){return false;}

    // if ($logmast.rcdcnt > 0) {
    //
    //    $$sqlphppath=submitlogsqlpath;
    //    if (logconn) {connection=logconn;}
    //    connect=connection;

    //    sqlcommandhd = "ALTER TABLE "+$logmast.syslogto[0]+" DROP";

    //    sqlcommand=sqlcommandhd+sqlcommandbd;
      
    //    if (!sqlCommandPhp(sqlcommand)) {return false;}

    // } 



   return true;
 


}


//***************************DATABASE COPY FUNCTIONS*****************************************************


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
  
  var sqltxt="select * from "+tablefrom;
  if (!sqlSelect(sqltxt,'$c$o$p$y',1,connectfrom)) {alert(sqlerr); return false} 
  var fldlist1=clone($$sqlcol);

  var sqltxt="select * from "+tableto;
  if (!sqlSelect(sqltxt,'$c$o$p$y',1,connectto)) {alert(sqlerr); return false} 
  var fldlist2=clone($$sqlcol);

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
 if (!sqlSelect(sqltxt,'$c$o$p$y','',connectfrom)) {alert(sqlerr); return false}

 if (!massSqlInsert(tableto,$c$o$p$y,connectto)) {
      $c$o$p$y='';
      return false;
 }

 $c$o$p$y='';
 return true;

}


function clearDbTable(dbtable,connection) {
 if (!connection) {var connection=conn}
 connect=connection; 
 sqlcommand='delete from '+dbtable;
 if (!sqlCommandPhp(sqlcommand)) {return false;}
 return true;  
}



function sqlCommandPhp(sqlcommand) {

//Execute sql command for PHP or javscript 
 
if (sqlselecttype=='php') {
       try {submitSql(' ',sqlcommand);} catch(e) {}
       $$sqlphppath=submitsqlpath; 
       var section=ajaxresponse.split('~^~');
       if (section[0]=="ERR") {
          sqlerr=section[1];
          return false;
       } 

       return true;

 }
 else {

     try {
         connect.Execute(sqlcommand);
         return true;
     } catch (e){
         sqlerr=e.message+'\n\n'+sqlcommand; 
         alert(sqlerr); 
         return false;
       }

 }

  
}



function massAlterDbTableCol(updatfields,connection) {
  if (!connection) {var connection=conn}
 // updatfields= array of fields to be altered in the form "field:len:decimal" eg. massAlterDbTableCol(['cnsacc:10','concde:10','exmpcsn:10','invcust:10','rcppylcsn:10','wsascon:10','ntfyacc:10','shpacc:10']);

  var afld='';
  var alen=0;
  var adec=0; 
  var txt='';
  var fi;
  var property;
 
  for (fi=0; fi<updatfields.length; fi++) {
      var flddet=updatfields[fi].split(':');
      afld=flddet[0];
      alen=numeric(flddet[1]);
      if (flddet[2]) {
         adec=numeric(flddet[2]);
      }
      
      for (property in dataDic.table) {
      
               var tabattr=getDbTableAttr(property);
               var fieldnames=tabattr.field.split(',');
          
               for (var l=0; l<fieldnames.length; l++) {

                   if (afld == fieldnames[l]) {

                       if (flddet[2]) {  
                         if (!alterDbTableCol(property,afld,alen,adec,connection)) {
                            alert('Error amending '+afld+' in file '+property);
                            txt+='Error amending '+afld+' in file '+property+'\n'; 
                         } 
                         break;

                       }
                       else { 
                         if (!alterDbTableCol(property,afld,alen,connection)) {
                            alert('Error amending '+afld+' in file '+property);
                            txt+='Error amending '+afld+' in file '+property+'\n'; 
                         } 
                         break;
                       }
                   }
               }

       }

 
  }

  if (!isBlank(txt)) {
     alert(txt);
  }
  else {alert('Amendments successful');}

}


function removeUploadFileColumn(pcfile,columns,outfile) {//columns is an array of the columns to be removed

  if (!outfile) {var outfile=pcfile} 
  var i=0;
  var j=0;
  var outtxt=''; 
  var rmvarr=new Object();
  var txt=getPcFileData(pcfile);  
  if (!txt) return;
  txt=txt.split('\r').join('');
  var txt2=txt.split('\n');
  txt='';
  var c;
  var clmns=txt2[0].split('||'); 

  for (i=0; i<columns.length; i++) {
      c=searchArray(clmns,columns[i]); 
      if (c>=0) {
          rmvarr[c]=true;
      }
  } 
  for (i=0; i<txt2.length; i++) {
       clmns=txt2[i].split('||');
       var outarr=[];
       for (j=0; j<clmns.length; j++) {
            if (!rmvarr[j]) {
                outarr.push(clmns[j]);
            }
       }
       outtxt += ''+outarr.join('||')+'\r\n'; 
  }

  if (!sendToPcFile(outfile,outtxt)) {return false} 
  return true;
}


function createUploadFile(sqlinput,outfile,addrec) {//sqlinput can either be the SQL select statement to run or the SQL select Object

  if (!addrec) {
      if (pcFileExists(outfile)) {
          if (!window.confirm('File '+outfile+' already exists\n\n Do you wish to replace it?')) {
              return false;
          }
      }
  }
  var sqltype='txt';
  var rcs=sqlinput.rcdcnt;
  if (rcs != undefined) { 
      sqltype='obj';  
  } 
  var fso = new ActiveXObject("Scripting.FileSystemObject");
  var forwriting = 2; 
  if (addrec) {
    forwriting = 8;
  } 
  var WshShell = new ActiveXObject("WScript.Shell"); 
  outtxt= fso.OpenTextFile(outfile,forwriting,true);  

  var txt='';
  var i; var j; var value;
  var fldtype=[];
  if (sqltype=='txt') {
      if (!sqlSelect(sqlinput,'$$$s$')) {alert(sqlerr); return false} 
  }
  else {
     $$$s$=sqlinput; 
     $$sqlcol=[];
     for (var p in sqlinput) {
          if (p != 'rcdcnt') {
              $$sqlcol.push(p);
          }
     }
  }
 
  for (i=0; i< $$sqlcol.length; i++) {
       if (i==0) {txt=$$sqlcol[i]}
       else {txt += '||'+$$sqlcol[i]}
       f=getFieldAttr($$sqlcol[i]); 
       if (f) {
           fldtype.push(f.type);

       }
       else {
           fldtype.push('');
       }
  }
  
  if (!addrec) {
    outtxt.writeline(txt); 
  }

  for (i=0; i<$$$s$.rcdcnt; i++) {
       txt='';
       for (j=0; j<$$sqlcol.length; j++) {
            value=$$$s$[$$sqlcol[j]][i]; 
            if (fldtype[j]) {
                if (fldtype[j] == 'char') {
                    value=(''+value).strip("\r").split("\n").join("~^").sqlWrap();
                }
                else {value=numeric(value);}
            }
            if (j==0) {txt += value}
            else {
                 value=(''+value).split("\n").join("~^");
                 txt += '||'+value
            }
       }
       outtxt.writeline(txt); 
   }

   outtxt.Close(); 
   if (sqltype=='txt') {delete $$$s$}
   return true;

}


function uploadToDbTable(uploadfile,dbtable) {

  //Ensure that table "token" has a record
  var sqltxt='select * from token';
  if (!sqlSelect(sqltxt,'$token$')) {alert(sqlerr); delete $token$; return false}
  delete $token$; 
  if (sqlrcdcnt==0) {
      var tkn$obj=new Object();
      tkn$obj.tokenfld='A';
      if (!sqlInsert('token',tkn$obj)) {alert(sqlerr); return false}
  }

  var i=0;
  var outtxt=''; 
  filedata=getPcFileData(uploadfile);  
  if (!filedata) return false;
  filedata=filedata.split('\n'); 

  //Check if all fields accounted for
  var sqltxt="select * from "+dbtable;
  if (!sqlSelect(sqltxt,'$$$s$',1)) {alert(sqlerr); return false}
  delete $$$s$;
  filedata[0]=filedata[0].split('\r').join('');
  col$=filedata[0].split('||');
  var msgtxt=''; 
  for (i=0; i<col$.length; i++) {
       if (searchArray($$sqlcol,col$[i])<0) {
           msgtxt += col$[i]+'\n';  
       }
  } 
  if (msgtxt) {
      alert('The following columns to be inserted are NOT found in table '+dbtable+'\n\n'+msgtxt);
      return false;
  } 

  u$$string1="insert into "+dbtable+" ("+col$+")";
  if (dbasetype != 'access') {
      u$$string1 += " values";
      
  }
  else {
      u$$string1 += " select "+col$+" from (";
  }
  s$t$artpoint = 1
  setTimeout('$addToDB()',5);

  return true;
}


function $addToDB() {
  var endpoint = 0;
  var batch=0;
  var values='';
  var outtxt;
  var col$data;
  var k=0;

  for (var i=s$t$artpoint; i<filedata.length; i++) {
       batch++;
       endpoint++;
       if (!isBlank(filedata[i])) {
           filedata[i]=filedata[i].split('\r').join('');
           filedata[i]=filedata[i].split('~^').join('\n');
           if (dbasetype != 'access') {
               if (values) {values += ", ";}
               values +='('+filedata[i].split('||')+')';
           }
           else {
               if (batch>1) {values += " UNION ALL "}
               values += " select top 1 "; 
               col$data=filedata[i].split('||');
               for (k=0; k<col$data.length; k++) {
                    if (k!=0) {values += ", "}
                    values += col$data[k]+' as '+col$[k];
               }
               values += " from token";   
           } 
            if (batch==40) {
                batch=0;
                outtxt = u$$string1+values;
                if (dbasetype=='access')  {outtxt += ')'} 
                values='';
                try {conn.Execute(outtxt);} 
                catch (e) {say(outtxt);
                     if (!window.confirm('ERROR\n\n'+e.message+'\n\n'+outtxt+'\n\nDo you wish to continue?')) {return false}
                }
           }
       }
       if (endpoint == 500) {
           break;
       }
  }
  if (batch != 0) {
      outtxt = u$$string1+values;
      if (dbasetype=='access')  {outtxt += ')'} 
      try {conn.Execute(outtxt);} 
      catch (e) {
           if (!window.confirm('ERROR\n\n'+e.message+'\n\n'+outtxt+'\n\nDo you wish to continue?')) {return false}
      }
  }  

  if (i != filedata.length) {
    s$t$artpoint = i+1;
    setTimeout('$addToDB()',5);
  }
  else {
     alert('Finished Uploading File.');
  }
  return true;
}


function appendDbTableCol(dbtab,newcol) {
  var obj=getDbTableAttr(dbtab);
  if (!obj) {
       alert("Table - "+dbtab+" not defined in the data dictionary");
       return false;
  }
  var fields=obj.field.split(',');
  var fieldfound=false;
  newcol=newcol.trim();
  for (var k=0; k<fields.length; k++) {
       if (fields[k].trim()==newcol) {
           fieldfound=true;
           break;
       }
  }
  if (!fieldfound) {
      alert('Field '+newcol+" not defined for table "+dbtab);
      return false;
  }
  fld=getFieldAttr(newcol);
  if (!fld) {
      alert('Field '+fld+" not defined in the data dictionary");
      return false;
  } 

  if (fld.type=='char') {
      return addDbTableCol(dbtab,newcol,fld.length);
  }
  else {
      return addDbTableCol(dbtab,newcol,fld.length,fld.decimal);
  }
}