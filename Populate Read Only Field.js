/*
Client script that populates a value into a field. Mostly used to populate a Read Only Field with static data from a dotwalk.

*/

function onChange(control, oldValue, newValue, isLoading) {

    if (newValue == '') { //This line ensures the script only runs when a newvalue is present
		g_form.clearValue('u_consultant_agreed_pr'); //This line clears the field.
        return;
    }

    var vendor = g_form.getReference('u_consultant', callBack);

}

function callBack(vendor) {
    g_form.setValue('u_consultant_agreed_pr', vendor.u_agreed_pr); //This line populates the field with the new value
}
