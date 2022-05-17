

/* 
Business Rule script to set a string field to format Q2 - 2022. 
Format will obviously set the quarter and year taken from the opened_at field
*/

var gdt = new GlideDateTime(current.opened_at);
var month = gdt.getMonthUTC();
var yr = gdt.getYearUTC();

quar = Math.ceil(month/3);


current.u_regchanges_qtr_open = "Q"+quar +"-" + yr;

