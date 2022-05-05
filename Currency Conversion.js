/*
Combination of client script (onChange) and script include to provide currency conversion from one field to another, or one field to many. 
This example takes one input value to convert to two output values, EURO and USD
*/

//Client Script
function onChange(control, oldValue, newValue, isTemplate) {
   if (newValue === '') {
      return;
   }

	var input = g_form.getValue('<insert field name>'); //Get the value from field - CURR;VALUE
	var inputsplit = input.split(';'); //Split the getValue into two new varaibles below
	var currencycode = inputsplit[0]; //Retrieves the currency code
	var currencyamount = inputsplit[1]; //Retrieves the currency value
	
	var ajax = new GlideAjax('ce_currencyconversion'); // Call Script include to get the field labels and values based on sys_property
    ajax.addParam('sysparm_name', 'currencyconversion');
    ajax.addParam('sysparm_currencycode', currencycode);
	ajax.addParam('sysparm_currencyamount', currencyamount);
    ajax.getXMLAnswer(getResponse);

function getResponse(response) {
	var currencyobject = JSON.parse(response); //Create object for JSON response
	for(i=0;i<currencyobject.length;i++){
		
		if(currencyobject[i].currencycode=='USD'){
			g_form.setValue('<insert field name>',currencyobject[i].amount); //Set the value to USD
		}
		if(currencyobject[i].currencycode=='EUR'){
			g_form.setValue('<insert field name>',currencyobject[i].amount); //Set the value to EURO
		}
	}
}
   
}


//Script Include
var ce_currencyconversion = Class.create();
ce_currencyconversion.prototype = Object.extendsObject(global.AbstractAjaxProcessor, {

	currencyconversion: function(){
		var outputarray = [];
		var quotesforconversion = 'EUR,USD'; //Define the currencies to be used in conversion
		var currencyarray = quotesforconversion.split(','); //Array that will split the two currencies
		var currencycode = this.getParameter('sysparm_currencycode'); //Get the currencycode from clientscript
		var currencyamount = this.getParameter('sysparm_currencyamount'); //Get the currencyamount from clientscript
		for(i=0;i<currencyarray.length;i++){
			
			var obj = {};
			
			
			var conv = new sn_currency.GlideCurrencyConverter(currencycode,currencyarray[i]);
			conv.setAmount(currencyamount); //Set the converted amount
			var converted = conv.convert();
			obj.currencycode = converted.getCurrency(); //Set the object currency code
			obj.amount = converted.getAmount();
			outputarray.push(obj);
		}
		
		return JSON.stringify(outputarray);
	},
	
	
	
    type: 'ce_currencyconversion'
});
