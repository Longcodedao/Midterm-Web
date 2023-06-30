$(document).ready(function() {

    $('#log-out').click(function() {
        $.ajax({
            url: "php/delete-session.php",
            type: "POST",
            processData: false,
            contentType: false,
            success: function(response) {
                window.location.href = 'admin-login.html';
            }
        })
    })
})