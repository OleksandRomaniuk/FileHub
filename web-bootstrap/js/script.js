'use strict';

// Listening for clicks on each button

$('#myModal').on('shown.bs.modal', function () {
    $('#myInput').trigger('focus')
})