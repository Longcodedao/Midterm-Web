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

// -------------- RELOAD THE DATA FROM AJAX -------------------------------------
$(document).ready(function() {
  var urlParams = new URLSearchParams(window.location.search);
  var productID = urlParams.get('id');
  // console.log(productID);

  $.ajax({
    url: "admin/php/fetch_product_data.php?id=" + productID,
    type: "GET",
    dataType: "json",
    success: function(response){
      setUpData(response);
    }
  })


  $('#buy-now').click(function(){

    var formData = new FormData();
    formData.append('id', productID);


    $.ajax({
      url: "php/session_data.php",
      type: "POST",
      data: formData,
      processData: false,
      contentType: false,
      success: function(response){
        // alert(response);
        window.location.href = 'Order-form.html';
      }
    })
  })
})


function setUpData(response) {
  var img = $("#image-product");
  img.attr("src", response["image"]);
  // $("#purchase-time").html(`${response["purchasetime"]}`);
  $("#product-name").html(`${response["name"]}`);
  $("#product-price").html(`${response["price"]}`);
  $("#product-description").html(`${response["description"]}`);
}