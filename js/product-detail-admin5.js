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

// ------------- popup edit and delete------------

// -------- validate form --------------------------------
$(document).ready(function () {
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

  // Get the parameter of the url and send request to the database

  var urlParams = new URLSearchParams(window.location.search);
  var productId = urlParams.get("id");
  // var refresh = getParameterById("refresh");
  // console.log(refresh);

  console.log(productId);
  // var productDetailJson = getCookie("product_details");
  // console.log(productDetailJson);

  $.ajax({
    url: "../admin/php/fetch_product_data.php?id=" + productId,
    type: "GET",
    dataType: "json",
    success: function (response) {
      productDetail = response;
      console.log(response);
      setUpData(response);
    },
  });

  $(".open-edit-modal").click(function () {
    $("#popup-edit").fadeIn();
    $("#name-edit").val(productDetail["name"]);
    $("#description-edit").val(productDetail["description"]);
    $("#price-edit").val(productDetail["price"]);
    $("#image-edit").val(productDetail["image"]);
  });

  $("#btn-close").click(function () {
    $("#popup-edit").fadeOut();
  });

  $(".open-delete-modal").click(function () {
    $("#popup-delete").fadeIn();
  });

  $("#btn-close-delete").click(function () {
    $("#popup-delete").fadeOut();
  });

  $("#edit-product-form").on("submit", function (e) {
    productId = urlParams.get("id");
    e.preventDefault();

    var formData = new FormData(this);
    console.log(formData);
    formData.append("id", productId);

    if ($(this).valid()) {
      $.ajax({
        url: "../admin/php/edit-2.php",
        method: "POST",
        data: formData,
        dataType: "json",
        contentType: false,
        processData: false,

        success: function (data) {
          // alert(productId);
          // console.log(data['id']);
          console.log("edited successfully");

          // Reload the DataTable
          var url = `../admin/product-detail-admin.php?id=${productId}&reloadTable=true`;
          window.location.href = url;
        },
        error: function (jqXHR, textStatus, errorThrown) {
          // Code to be executed if the AJAX request encounters an error
          alert("An error has occured");
          console.log(textStatus, errorThrown); // Log the error details
          window.location.href = `../admin/product-detail-admin.php?id=${productId}`;
        },
      });
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

  $("#delete-product-form").on("submit", function (e) {
    e.preventDefault();

    var formData = new FormData(this);
    formData.append("id", productId);
    console.log(formData);

    $.ajax({
      url: "../admin/php/delete.php",
      method: "POST",
      data: formData,
      contentType: false,
      processData: false,
      success: function (data) {
        // alert(data);
        window.location.href = "../admin/admin-listprod.html";
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log("failed to delete product");
      },
    });
  });


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

function getParameterById(name) {
  name = name.replace(/[\[\]]/g, "\\$&");
  var url = window.location.href;
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  console.log(results);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function setUpData(response) {
  var img = $("#image-product");
  img.attr("src", response["image"]);
  $("#purchase-time").html(`${response["purchasetime"]}`);
  $("#product-name").html(`${response["name"]}`);
  $("#product-price").html(`${response["price"]}`);
  $("#product-description").html(`${response["description"]}`);
}

function getCookie(name) {
  var cookies = document.cookie.split(";");
  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i].trim();
    if (cookie.startsWith(name + "=")) {
      return decodeURIComponent(cookie.substring(name.length + 1));
    }
  }
  return "";
}
