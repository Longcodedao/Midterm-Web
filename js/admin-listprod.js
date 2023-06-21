$(document).ready(function() {
    var dataTable = $('#products-table').DataTable({
        processing: true,
        serverSide: true,
        searching: true,
        ordering: true,
        ajax: {
            url: "listprod.php",
            type: "POST"
        },
    });
})