$(document).ready(function() {

    console.log("Hello World");
    var dataTable = $('#products-table').DataTable({
        "processing": true,
        "serverSide": true,
        "searching": true,
        "ordering": true,
        "ajax": {
            "url": "../admin/php/listprod.php",
            "type": "POST"
        },
    });

    
})

$('#createProduct').on('submit', function(e) {
    e.preventDefault();
    console.log('Has Confirmed');
    var name = $('#name').val();
    var description = $('#description').val();
    var detail = $('#details').val();
    var image = $('#image').val();
    // var extension = $('#image').val().split('.').pop().toLowerCase();
    var price = $('#price').val();

    var formData = new FormData(this);
    formData.append("details", detail);
    console.log(formData);
    console.log(image);
    // if (extension != ''){
    //     if (jQuery.inArray(extension, ['gif', 'png', 'jpg', 'jpeg']) == -1){
    //         alert("Wrong format of the image (Only accept gif, png, jpg, jpeg)");
    //         return false;
    //     }
    // }

    $.ajax({
        url: "../admin/php/create.php",
        method: "POST",
        data: formData,
        contentType: false,
        processData: false,
        success: function(data){
            alert(data);
            console.log($('#createProduct')[0]);
            $('#createProduct')[0].reset();
            $('#modalCreate').modal('hide');
            dataTable.ajax.reload();
        }
    });
});