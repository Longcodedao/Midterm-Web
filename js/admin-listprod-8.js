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
    // ------------ adding edit and delete buttons to dataTable ------
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

  // -------- validate form using JQUERY VALIDATE--------------------------------
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

  // Update the URL regex pattern for more accurate validation
  $.validator.methods.url = function (value, element) {
    return (
      this.optional(element) ||
      /^(https?:\/\/)?([\w.-]+)\.([a-zA-Z]{2,})(\/\S*)?$/.test(value)
    );
  };

  // ---- working with delete and edit popup ----

  // ---------------- working with delete pop up --------------------
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

  // ============ working with edit form =================
  var productId; // Variable to store the product ID

  // ---- fill the edit form with the product information
  $("#products-table").on("click", ".edit-btn", function () {
    productId = $(this).data("id"); // Store the product ID in the productId variable

    // Fetch product details including the image URL
    let productDetail;
    $.ajax({
      type: "GET",
      url: "../admin/php/fetch_product_data.php?id=" + productId,
      dataType: "json",
      success: function (response) {
        productDetail = response;
        console.log("successfully grabbed product detail");
        console.log(response);
        // -------- fill out the edit form ----------
        $("#name-edit").val(productDetail.name);
        $("#description-edit").val(productDetail.description);
        $("#price-edit").val(productDetail.price);
        $("#image-edit").val(productDetail.image);

        $("#popup-edit").fadeIn();
      },
      error: function (data) {
        console.log("failed to grab product details into the form");
        console.log(data);
      },
    });
  });

  // send it
  $("#edit-product-form").on("submit", function (e) {
    e.preventDefault(); // Prevent default form submission

    // Use the productId variable to access the stored ID
    var id = productId;
    console.log("the product id is: " + id);

    var formData = new FormData(this);
    formData.append("id", id);

    if ($(this).valid()) {
      $.ajax({
        url: "../admin/php/edit-3.php",
        method: "POST",
        data: formData,
        contentType: false,
        processData: false,
        success: function (data) {
          console.log("edited successfully");
          dataTable.ajax.reload();
        },
        error: function (data) {
          console.log("failed to edit");
        },
      });

      $("#popup-edit").fadeOut();
    }
  });
  // ---------------- addd validation so users cant submit with empty fields ----------------
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
        validInteger: "Please enter a valid integer or DIE",
      },
      image: {
        validUrl: "Please enter a valid Image URL or DIE",
      },
    },
    submitHandler: function (form) {
      // Manually trigger validation
      if ($(form).valid()) {
        var formData = {
          name: $("#name-edit").val(),
          description: $("#description-edit").val(),
          price: $("#price-edit").val(),
          image: $("#image-edit").val(),
        };

        // Handle null values
        for (var key in formData) {
          if (formData.hasOwnProperty(key) && formData[key] === "") {
            formData[key] = null;
          }
        }

        // Perform further processing or submit the form data
        console.log(formData);
      }
    },
  });

  // ---- close popups --------------------

  $("#btn-close-delete").click(function () {
    $("#popup-delete").fadeOut();
  });

  $("#btn-close").click(function () {
    $("#popup-edit").fadeOut();
  });

  // =========== ADDING PRODUCT popup =================

  // ---- validate create form --------------------------------
  // $("#createProduct").validate({
  //   rules: {
  //     price: {
  //       validInteger: true,
  //     },
  //     image: {
  //       validUrl: true,
  //     },
  //   },
  //   messages: {
  //     price: {
  //       validInteger: "Please enter a valid integer",
  //     },
  //     image: {
  //       validUrl: "Please enter a valid Image URL",
  //     },
  //   },
  //   submitHandler: function (form) {
  //     if ($(form).valid()) {
  //       var formData = {
  //         name: $("#name").val(),
  //         description: $("#description").val(),
  //         price: $("#price").val(),
  //         image: $("#image").val(),
  //       };

  //       // Handle null values
  //       for (var key in formData) {
  //         if (formData.hasOwnProperty(key) && formData[key] === "") {
  //           formData[key] = null;
  //         }
  //       }

  //       // Perform further processing or submit the form data
  //       console.log(formData);
  //     }
  //   },
  // });

  // $("#createProduct").on("submit", function (e) {
  //   e.preventDefault();
  //   console.log("Has Confirmed");
  //   var name = $("#name").val();
  //   var description = $("#description").val();
  //   // var detail = $('#details').val();
  //   var image = $("#image").val();
  //   // var extension = $('#image').val().split('.').pop().toLowerCase();
  //   var price = $("#price").val();

  //   var formData = new FormData(this);

  //   console.log(formData);
  //   console.log(image);
  //   // if (extension != ''){
  //   //     if (jQuery.inArray(extension, ['gif', 'png', 'jpg', 'jpeg']) == -1){
  //   //         alert("Wrong format of the image (Only accept gif, png, jpg, jpeg)");
  //   //         return false;
  //   //     }
  //   // }

  //   $.ajax({
  //     url: "../admin/php/create.php",
  //     method: "POST",
  //     data: formData,
  //     contentType: false,
  //     processData: false,
  //     success: function (data) {
  //       // alert(data);
  //       console.log($("#createProduct")[0]);
  //       $("#createProduct")[0].reset();
  //       $("#modalCreate").modal("hide");
  //       dataTable.ajax.reload(); // Reload the table data using Ajax
  //     },
  //   });
  // });

  // ------------ FORCE USER TO FILL OUT EVERY INPUTS TO CREATE NEW PRODUCT--------------

  $("#createProduct").validate({
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
        validInteger: "Enter a valid integer OR DIE",
      },
      image: {
        validUrl: "Enter a valid Image URL OR DIE",
      },
    },
    submitHandler: function (form) {
      if ($(form).valid()) {
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

        // Add your additional validation logic here
        var isFormValid = true; // Assume the form is valid

        // Check if any required fields are empty
        if ($("#name").val().trim() === "") {
          isFormValid = false;
        }
        // Add similar checks for other required fields

        if (isFormValid) {
          // Submit the form
          $.ajax({
            url: "../admin/php/create.php",
            method: "POST",
            data: new FormData(form),
            contentType: false,
            processData: false,
            success: function (data) {
              console.log($("#createProduct")[0]);
              $("#createProduct")[0].reset();
              $("#modalCreate").modal("hide");
              dataTable.ajax.reload(); // Reload the table data using Ajax
            },
          });
        }
      }
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
});
