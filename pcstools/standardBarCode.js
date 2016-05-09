
function barCodeDef() {
	this.btype='code128'; // ean8,ean13,upc,std25,int25,code11,code39,code93,code128,codabar,msi,datamatrix
	this.renderer='css'; 
	this.quietzone=false;
	this.bgcolor="#FFFFFF";
	this.color  ="#000000";	   
	this.width=3;
	this.height=70;	   	   
	this.modulesize=5;	   
	this.posx=10;
	this.posy=20;	   
	this.quietzonesize=1;	
	this.rectangular=false;  
	this.textstyle="";

	var objdiv=document.getElementById('barcode_Div');
	if (bcdiv==null) {
	  var bcdiv=document.createElement('div');
	  bcdiv.id="barcode_Div";    
	  bcdiv.style.display="none";
	  bcdiv.innerHTML='';
	  document.getElementsByTagName('body')[0].appendChild(bcdiv);
	}
	   
}

function generateBarCode(text,obj){
	var value = ''+text; 
	if (!obj) {
	    var obj=new barCodeDef();
	}
	var btype    = obj.btype;
	var renderer = obj.renderer;
	var quietZone = obj.quietzone;        		
	var settings = {
	  output:renderer,
	  bgColor: obj.bgcolor,
	  color: obj.color,
	  barWidth: obj.width,
	  barHeight: obj.height,
	  moduleSize: obj.modulesize,
	  posX: obj.posx,
	  posY: obj.posy,
	  addQuietZone: obj.quietzonesize
	};

	if (obj.rectangular){
	  value = {code:value, rect: true};
	}

	$("#barcode_Div").html("").hide().barcode(value, btype, settings);
	showElement('barcode_Div');
	var bcwidth=document.getElementById('barcode_Div').offsetWidth;
	hideElement('barcode_Div');
	
	var bcodehtml=document.getElementById('barcode_Div').innerHTML;
	if (obj.textstyle) {
	    bcodehtml=bcodehtml.split('CLEAR: both; ').join('CLEAR: both; '+obj.textstyle+'; p');
    }		
	
	return '<div style="width:'+bcwidth+'px">'+bcodehtml+'</div>';
}