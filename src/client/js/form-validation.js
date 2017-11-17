'use strict'

// Blank form validation
function validateForm (formId) {
    var valid = true,
        message = '',
        currentForm = $('#'+formId);
 
    $('#'+formId+' input').each(function() {
        var $this = $(this);
 
        if(!$this.val()) {
            var inputName = $this.attr('name');
            valid = false;
            message += 'Please enter ' + inputName + '\n';
        }
    });
 
    message = message.replace(/[_-]/g, " ");
 
    if(!valid) {
        var msgContainer = $("<p class='text-danger'></p>");
        msgContainer.html(message);
        $('#'+formId).prepend(msgContainer);
        return false;
    } else {
        $('.jq-msg').hide();
        return true;
    }
}
