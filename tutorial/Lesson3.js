
function loadUp() {
	focusOn('inconcde');

}

function newRecord() {
	clearForm('form1');
	unProtect('concde');
	displayForm('form1');
	focusOn('concde');
	saved=new saveVar('*form:form1');
}

/**
* Adds a new record to the specfied table
* @param tableName - name of the table that will be modified
*/
function addNewRecord(tableName){
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
	// validate field entries
	// if(recordValidated()) {
	// save changes to record
	saveRecord();
	// } else {
	// alert('Record not updated.');
	//}
}

/**
* 
*/
function deleteRecord(){
	
}

function saveRecord(tablename) {
	chgddata=saved.returnChangedVar();
	if (saved.hasChangedVar()) {
		var i=0;
		//test to confirm the fields that have been changed
		for (chgdfield in chgddata) {
			if (chgdfield != 'addVar' && chgdfield != 'removeVar') {
				alert('Field: '+chgdfield+' === Value: '+valueOf(chgdfield)+' === Saved Value:'+saved.savedValueOf(chgdfield));
				i++;
		   }
		 }
		say(i + ' field(s) changed.',5);
		// send the change to the DB
		sqlwhere = 'concde=' + (valueOf('concde').sqlWrap());
		alert(sqlwhere);
		if (!sqlUpdate(tablename,chgddata,sqlwhere)) {
			alert(sqlerr);
		} else {
			say('Changes saved to database.',5);
		}
	} else {
		alert('No changes made.');
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
	saved=new saveVar('*form:form1');
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

