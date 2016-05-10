
function loadUp() {
 focusOn('inconcde');

}

function newRecord() {
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
	// validate field entries
	saveData();
	// 
}

/**
* 
*/
function deleteRecord(){
	
}

function saveData() {
	saved=new saveVar('*form:form1');
	chgddata=saved.returnChangedVar();
	//test to confirm the fields that have been changed
	for (chgdfield in chgddata) {
		if (chgdfield != 'addVar' && chgdfield != 'removeVar') {
			alert('Field: '+chgdfield+' === Value: '+valueOf(chgdfield)+' === Saved Value:'+saved.savedValueOf(chgdfield));
	   }
	// send the change to the DB
	
	}
}

/**
 *
 *
 */
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
/**
 *
 *
 */
function changeMode(mode) {
	// modes: 1=add, 2=update, 3=delete, 4=view
	switch (mode) {
		case 1:	// Add Mode
			titlebar1.innerHTML = 'Add New Record';
			saverecord.visible = true;
			clearform.visible = true;
			deleterecord.visible = false;
			closeform.visible = true;
			break;
		case 2: // Update Mode
			titlebar1.innerHTML = 'Edit Record';
			disableFields(['rcpnbr']);
			saverecord.visible = true;
			clearform.visible = false;
			deleterecord.visible = false;
			closeform.visible = true;			
			break;
		case 3: // Delete Mode
			titlebar1.innerHTML = 'Delete Record';
			disableFields(entryFields);
			saverecord.visible = false;
			clearform.visible = false;
			deleterecord.visible = true;
			closeform.visible = true;
			break;
		default:
			// View Mode	
	}
}

function disableFields(flds){  
	for(var i=0; i<flds.length; i++)
		protect(flds[i]);
}	
	
function enableFields(flds)	{
	for(var i=0; i<flds.length; i++)
		unProtect(flds[i]);	
}	

