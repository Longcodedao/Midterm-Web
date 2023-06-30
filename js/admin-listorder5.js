$(document).ready(function () {
  console.log("wassup");

  let dataTable = $("#orders-table").DataTable({
    // processing: true,
    // serverSide: true,
    // searching: true,
    // ordering: true,

    ajax: {
      url: "../admin/php/listorder.php",
      type: "POST",
      // success: function (response) {
      //   console.log(response); // Check the response data
      //   console.log(response.data); // Check the data array
      // },
    },

    columns: [
      { data: "OrderID" },
      { data: "Date" },
      { data: "name" },
      { data: "price" },
      { data: "Name" },
      { data: "Phone" },
      { data: "Email" },
      { data: "Address" },
      { data: "City" },
      {
        data: "ViewDetails",
        render: function (data, type, row) {
          return data; // Ensure HTML is not escaped
        },
      },
    ],
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
