$(document).ready(function () {
  console.log("Hello World");
  var dataTable = $("#products-table").DataTable({
    processing: true,
    serverSide: true,
    searching: true,
    ordering: true,
    ajax: {
      url: "../admin/php/listprod.php",
      type: "POST",
    },
    columnDefs: [
      {
        targets: -2,
        render: function (data, type, row) {
          return (
            '<button class="btn btn-warning edit-btn" data-id="' +
            row[0] +
            '"><i class="fa-solid fa-pen"></i></button>'
          );
        },
      },
      {
        targets: -1,
        render: function (data, type, row) {
          return (
            '<button class="btn btn-danger delete-btn" data-id="' +
            row[0] +
            '"><i class="fa-solid fa-trash"></i></button>'
          );
        },
      },
    ],
  });

  // -------- validate form --------------------------------
  $.validator.addMethod(
    "validUrl",
    function (value, element) {
      var urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
      return this.optional(element) || urlRegex.test(value);
    },
    "Please enter a valid URL"
  );

  $.validator.addMethod(
    "validInteger",
    function (value, element) {
      var integerRegex = /^\d+$/;
      return this.optional(element) || integerRegex.test(value);
    },
    "Please enter valid integer"
  );

  $("#edit-product-form").validate({
    rules: {
      price: {
        validInteger: true,
      },
      image: {
        validUrl: true,
      },
    },
    messages: {
      price: {
        validInteger: "Please enter a valid integer",
      },
      image: {
        validUrl: "Please enter a valid URL",
      },
    },
    submitHandler: function (form) {
      var formData = {
        name: $("#name").val(),
        description: $("#description").val(),
        price: $("#price").val(),
        image: $("#image").val(),
      };

      // Handle null values
      for (var key in formData) {
        if (formData.hasOwnProperty(key) && formData[key] === "") {
          formData[key] = null;
        }
      }

      // Perform further processing or submit the form data
      console.log(formData);
      form.submit();
    },
  });

  // Update the URL regex pattern for more accurate validation
  $.validator.methods.url = function (value, element) {
    return (
      this.optional(element) ||
      /^(https?:\/\/)?([\w.-]+)\.([a-zA-Z]{2,})(\/\S*)?$/.test(value)
    );
  };

  // ---- delete and edit popup ----

  // ---------------- working with pop ups --------------------
  $("#products-table").on("click", ".delete-btn", function () {
    let id = $(this).attr("data-id");
    $("#popup-delete").fadeIn();

    // Perform delete operation using the ID

    $("#delete-product-form").on("submit", function (e) {
      e.preventDefault();

      var formData = new FormData(this);
      formData.append("id", id);
      console.log(formData);

      $.ajax({
        url: "../admin/php/delete.php",
        method: "POST",
        data: formData,
        contentType: false,
        processData: false,
        success: function (data) {
          console.log(data);

          console.log("deleted successfully");

          dataTable.ajax.reload();
        },
        error: function (data) {
          console.log(data);
          console.log("failed to delete");
        },
      });

      $("#popup-delete").fadeOut();
    });
  });

  //// fill the edit form with values

  $("#products-table").on("click", ".edit-btn", function () {
    let id = $(this).data("id");

    // Fetch product details including the image URL

    let productDetail;
    $.ajax({
      type: "GET",
      url: "../admin/php/fetch_product_data.php?id=" + id,
      data: "data",
      dataType: "json",
      success: function (response) {
        productDetail = response;
        console.log("successfully grabbed product detail");
        console.log(response);
      },
      error: function (data) {
        console.log("failed to grab product details into the form");
        console.log(data);
      },
    });

    $("#edit-product-form").on("submit", function (e) {
      e.preventDefault();

      var formData = new FormData(this);
      console.log(formData);
      formData.append("id", id);
      $.ajax({
        url: "../admin/php/edit.php",
        method: "POST",
        data: formData,
        contentType: false,
        processData: false,
        success: function (data) {
          console.log(data);
          console.log("deleted successfully");
          dataTable.ajax.reload();
        },
        error: function (data) {
          console.log(data);
          console.log("failed to delete");
        },
      });

      $("#popup-edit").fadeOut();
    });
  });
  // ---- close popups --------------------

  $("#btn-close-delete").click(function () {
    $("#popup-delete").fadeOut();
  });

  $("#btn-close").click(function () {
    $("#popup-edit").fadeOut();
  });
});

// =========== ADDING PRODUCT popup =================

$("#createProduct").on("submit", function (e) {
  e.preventDefault();
  console.log("Has Confirmed");
  var name = $("#name").val();
  var description = $("#description").val();
  // var detail = $('#details').val();
  var image = $("#image").val();
  // var extension = $('#image').val().split('.').pop().toLowerCase();
  var price = $("#price").val();

  var formData = new FormData(this);

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
    success: function (data) {
      // alert(data);
      console.log($("#createProduct")[0]);
      $("#createProduct")[0].reset();
      $("#modalCreate").modal("hide");
      location.reload(true);
    },
  });
});

// --------------- JQUERY ANIMATE top to bottom scroll ------------------------------
$(document).ready(function () {
  // Scroll to bottom button
  $("#scrollToBottomBtn").click(function (event) {
    event.preventDefault();
    $("html, body").animate({ scrollTop: $(document).height() }, "slow");

    return false;
  });

  // Scroll to top button
  $("#scrollToTopBtn").click(function (event) {
    event.preventDefault();
    $("html, body").animate({ scrollTop: 0 }, "slow");
    $("html").animate({ scrollTop: 0 }, "slow"); // Added this line
    return false;
  });

  // Show/hide the buttons based on scroll position
  $(window).scroll(function () {
    var scrollTop = $(this).scrollTop();
    var windowHeight = $(this).height();
    var documentHeight = $(document).height();

    if (scrollTop > windowHeight / 2) {
      $("#scrollToTopBtn").addClass("active");
    } else {
      $("#scrollToTopBtn").removeClass("active");
    }

    if (scrollTop + windowHeight < documentHeight - windowHeight / 2) {
      $("#scrollToBottomBtn").addClass("active");
    } else {
      $("#scrollToBottomBtn").removeClass("active");
    }
  });

  // Check initial scroll position to show/hide the buttons
  $(window).trigger("scroll");
});
