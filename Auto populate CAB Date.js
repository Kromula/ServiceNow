//This business rule will automatically set the CAB Date field in a Change Request to Wednesday when submitted.

(function executeRule(current, previous /*null when async*/ ) {

    try {
		var gdt = new GlideDateTime(gs.beginningOfNextWeek());
		gdt.addDaysLocalTime(2); //Change number to change day of the week - Monday + x days
		current.setValue('cab_date', gdt);

    } catch (err) {
        gs.error("A runtime error occured: " + err);
    }

})(current, previous);
