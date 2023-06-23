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
});

// Get the parameter of the url and send request to the database

$(document).ready(function () {
  var productId = getParameterById("id");
  // var refresh = getParameterById("refresh");
  // console.log(refresh);
  var productDetailJson = getCookie("product_details");
  console.log(productDetailJson);

  var productDetail;
  if (productDetailJson) {
    productDetail = JSON.parse(productDetailJson);

    if (productDetail["id"] == productId) {
      setUpData(productDetail);
    } else {
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
    }
  } else {
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
  }

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

  // $('edit-button').click(function() {
  //   $('#name-edit').val(productDetail['name']);
  //   $('#description-edit').val(productDetail['description']);
  //   $('#price-edit').val(productDetail['price']);
  //   $('#image-edit').val(productDetail['image']);
  // })

  $("#edit-product-form").on("submit", function (e) {
    e.preventDefault();

    var formData = new FormData(this);
    console.log(formData);
    formData.append("id", productId);
    $.ajax({
      url: "../admin/php/edit.php",
      method: "POST",
      data: formData,
      contentType: false,
      processData: false,
      success: function (data) {
        // alert(data);
        window.location.href = "../admin/admin-listprod.html";
      },
    });
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
    });
  });
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
