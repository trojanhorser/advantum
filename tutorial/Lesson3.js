function loadUp() {
 focusOn('inconcde');

}

function newData() {
  clearForm('form1');
  unProtect('concde');
  displayForm('form1');
  focusOn('concde');
}

/**
* Adds a new record to the specfied table
* @param tableName - name of the table that will be modified
*/
function addNewRecord(tableName){
	
	alert(window.location);
 
	 recordObject = {};
	 recordObject.concde = valueOf('concde');
	 recordObject.connam = valueOf('connam');
	 recordObject.conadd = valueOf('conadd');
	 recordObject.conadd2 = valueOf('conadd2');
	 recordObject.conadd3 = valueOf('conadd3');
	 recordObject.conadd4 = valueOf('conadd4');
	 recordObject.conadd5 = valueOf('conadd5');
	 recordObject.conemail = valueOf('conemail');
	 
	 if (!sqlInsert(tableName,recordObject)) {
		  alert(sqlerr);
	 }else{
		 alert("Record Added Successfully")
	 }

}

/**
*
*/
function updateRecord(){
	
}

/**
*
*/
function deleteRecord(){
	
}


function getRecord() {
 sqltxt="select concde,connam,conadd,conadd2,conadd3,conadd4,conadd5,conemail from wsconsgn where concde="+valueOf('inconcde').sqlWrap();
 if (!sqlSelect(sqltxt,'$data',1)) {
      alert(sqlerr);
	  return false;
  }
  if ($data.rcdcnt==0) {
     alert('No data found');
	 focusOn('inconcde');
	 return false
 }
 changeVar('concde',$data.concde[0]);
 changeVar('connam',$data.connam[0]);
 changeVar('conadd',$data.conadd[0]);
 changeVar('conadd2',$data.conadd2[0]);
 changeVar('conadd3',$data.conadd3[0]);
 changeVar('conadd4',$data.conadd4[0]);
 changeVar('conadd5',$data.conadd5[0]);
 changeVar('conemail',$data.conemail[0]);
 protect('concde');
 displayForm('form1');
 focusOn('connam');
 
} 