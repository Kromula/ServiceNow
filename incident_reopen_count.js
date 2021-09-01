//1. Below script into a business rule on Incident table. WHEN = Display 

(function executeRule(current, previous /*null when async*/){

g_scratchpad.resolvedbyFirstName = current.resolved_by.first_name;
g_scratchpad.resolvedbyLastName = current.resolved_by.last_name;

if (current.reopen_count.nil()) {
  g_scratchpad.reopenCount = "0";
} else {
  g-scrathcpad.reopenCount = current.reopen_count;
}

})(current, previous);

//2. Below script into a client script. TYPE = onChange and field name State

function onChange(control, oldValue, newValue, isLoading, isTemplate) {
  if (isLoading || newValue === '') {
    return;
    }
    
    if (oldValue > 5 && newValue <= 5) {
      var answer = confirm("This incident was resolved by " +
                   g_scratchpad.resolvedByFirstName + " " + g_scratchpad.resolvedByLastName + " and has been reopened "
                   + g_scratchpad.reopenCount + " times.\n\nAre you sure you want to reopen it?");
                   
                    if (answer == false) {
                      g_form.setValue('state', oldValue);
                      }
                    }
                 }
