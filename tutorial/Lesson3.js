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
*
*/
function addNewRecord(){
	
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