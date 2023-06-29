$(document).ready(function () {
  //   ---------------------------- GENERATE RANDOM AND UNIQUE KEY-----------------------------

  // // Get the order-key span element
  // let orderKeySpan = $(".order-key");

  // // Check if a key already exists in local storage
  // let storedKey = localStorage.getItem("orderKey");
  // if (storedKey) {
  //   // Use the existing key
  //   orderKeySpan.text(storedKey);
  // } else {
  //   // Generate a new key and store it in local storage
  //   var newKey = generateRandomKey();
  //   localStorage.setItem("orderKey", newKey);
  //   orderKeySpan.text(newKey);
  // }

  //   ------------------------ working with accordion --------------------------------

  $("#my-accordion").accordion({
    // do this so we can collapse the accordion with just one section, for the sake of having implemenented one jqueryui element
    collapsible: true,
    active: false,
  });
});

/// no need to add scroll up down to this page because its not long
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
    let scrollTop = $(this).scrollTop();
    let windowHeight = $(this).height();
    let documentHeight = $(document).height();

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


  /* ---------------------- GET ORDER ID ------------------------ */
  var urlParams = new URLSearchParams(window.location.search);
  var orderID = urlParams.get('orderId');
  retreiveInformation(orderID);


  $(window).on('beforeunload', function() {
    // return 'Are you sure you want to leave the page';
    $.ajax({
      url : "php/delete_session.php",
      type: "POST",
      success: function(response){
        // alert(response);
      }
    })
  })
});


function retreiveInformation(orderID){
  var formData = new FormData();
  formData.append("order_id", orderID);

  $.ajax({
    url: "php/retrieve_order.php",
    type: "POST",
    data: formData,
    dataType: "json",
    processData: false,
    contentType: false,
    success: function(response) {
      // alert(response);
      displayInformation(response);
    }
  })
}

function displayInformation(order){
  // console.log(order['OrderID']);
  $('#order-key').html(`${order['OrderID']}`);
  $('#product-name').html(`${order['name']}`);
  $('#product-price').html(`${order['price']}`);
  $('#customer-name').html(`${order['Name']}`);
  $('#customer-address').html(`${order['Address']}`);
  $('#customer-city').html(`${order['City']}`);
  $('#customer-phone').html(`${order['Phone']}`);
  $('#customer-email').html(`${order['Email']}`);
  $('#customer-date').html(`${order['Date']}`);
  $('#productImage').attr("src", order['image']);
  $('#name-product').html(order['name']);
}