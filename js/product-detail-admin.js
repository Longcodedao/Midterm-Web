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
$(document).ready(function () {
  $(".open-edit-modal").click(function () {
    $("#popup").fadeIn();
  });

  $("#btn-close").click(function () {
    $("#popup").fadeOut();
  });

  $(".open-delete-modal").click(function () {
    $("#popup-delete").fadeIn();
  });

  $("#btn-close-delete").click(function () {
    $("#popup-delete").fadeOut();
  });
});

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
