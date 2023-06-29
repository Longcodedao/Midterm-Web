// --------------- JQUERY ANIMATE top to bottom scroll ------------------------------
$(document).ready(function () {

  var productID;

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

  $("#name").on("input", function () {
    validateName();
  });

  $("#email").on("input", function () {
    validateEmail();
  });

  $("#address").on("input", function () {
    validateAddress();
  });

  $("#city").on("input", function(){
    validateCity();
  })

  $("#phone").on("input", function () {
    validatePhone();
  });


  $("#myForm").submit(function (event) {
    event.preventDefault();

    if (
      validateName() &&
      validateEmail() &&
      validateAddress() &&
      validatePhone() &&
      validateCity()
    ) {
      getProductValue();
      setUpCustomerDetail();
      $("#popup").fadeIn();
    }
  });

  $("#btn-close").click(function () {
    $("#popup").fadeOut();
  });


  $("#verify-order").click(function() {
    var orderID = generateRandomKey();
    var orderID_data = new FormData();
    orderID_data.append('order_id', orderID);
    $.ajax({
      url: "php/session_data_orderid.php",
      type: "POST",
      data: orderID_data,
      processData: false,
      contentType: false,
      success: function(response){
        // alert(response);
        // var formData = createFormData(orderID);
        createOrder(orderID);
      },
      error: function(xhr, status, error) {
        
      }
    })
    
    console.log(productID);
  })


});

function validateName() {
  var name = $("#name").val();

  if (name === "") {
    $("#name-error").html("Please enter your name");
    return false;
  } else {
    $("#name-error").html("");
    return true;
  }
}

function validateCity(){
  var city = $("#city").val();

  if (city === "") {
    $("#city-error").html("Please enter your city");
    return false;
  } else {
    $("#city-error").html("");
    return true;
  }
}

function validateEmail() {
  var email = $("#email").val();
  // console.log(email.indexOf("@"));

  // if (email === '' ){
  //   $('#email-error').html("Please enter your email");
  //   return false;
  // } else if (email.indexOf('@') === -1){
  //   $('#email-error').html("Please enter a valid email address");
  //   return false;
  // } else {
  //   $('#email-error').html("");
  //   return true;
  // }

  if (email === "") {
    $("#email-error").html("Please enter your email");
    return false;
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    $("#email-error").html(
      "Please enter a valid email address (for example: imSoStupidIcantTypeMyEmail@gmail.com)."
    );
    return false;
  } else {
    $("#email-error").html("");
    return true;
  }
}

function validateAddress() {
  var address = $("#address").val();
  if (address === "") {
    $("#address-error").html("Please enter your address");
    return false;
  } else {
    $("#address-error").html("");
    return true;
  }
}

function validatePhone() {
  var phone = $("#phone").val();
  if (phone === "") {
    $("#phone-error").html("Please enter your phone number.");
    return false;
  } else if (!/^\d{10,11}$/.test(phone)) {
    $("#phone-error").html("Please enter a valid 10 or 11-digit phone number.");
    return false;
  } else {
    $("#phone-error").html("");
    return true;
  }
}


function getProductValue() {
  $.ajax({
    url: "php/get_session_data.php",
    type: "GET",
    success: function(response){
      // alert(response);
      productID = response;
      console.log(productID);
      retrieveProduct(productID);
    }
  })
}

function retrieveProduct(id) {
  $.ajax({
    url: "admin/php/fetch_product_data.php?id=" + id,
    type: "GET",
    dataType: "json",
    success: function(response){
      setUpData(response);
    }
  })
}

function setUpData(response){
  var img = $('#product-img');
  img.attr("src", response["image"]);
  $("#product-name").html(`${response["name"]}`);
  $("#product-price").html(`${response["price"]}`);
  $("#product-description").html(`${response["description"]}`);
}

function setUpCustomerDetail(){
  var name = $('#name').val();
  var email = $('#email').val();
  var address = $('#address').val();
  var city = $('#city').val();
  var phone = $('#phone').val();
  
  $('#name-user').html(name);
  $('#email-user').html(email);
  $('#address-user').html(address);
  $('#city-user').html(city);
  $('#phone-user').html(phone);
}

/* -------------------------  CREATE A FORM DATA ------------------------- */
function createFormData(orderID) {
  // console.log(orderID);
  // console.log(productID);
  var formData = new FormData();

  formData.append('order_id', orderID);
  formData.append('product_id', productID);
  formData.append('name', $('#name-user').html());
  formData.append('email', $('#email-user').html());
  formData.append('address', $('#address-user').html());
  formData.append('city', $('#city-user').html());
  formData.append('phone', $('#phone-user').html());
  formData.append('user_data', 'Create');

  console.log(formData);
  return formData;
}


function createOrder(orderID){
  var formData = createFormData(orderID);
  $.ajax({
    url: 'php/input_customer_data.php',
    type: 'POST',
    data: formData,
    processData: false,
    contentType: false,
    success: function(response){
      alert(response);
      window.location.href = 'order-confirming.html?orderId=' + orderID;
    }
  })
}

/* -------------------------  GENERATE THE ORDER ID ---------------------- */

function generateRandomKey() {
  let keyLength = 10;
  let characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let key = "";

  for (var i = 0; i < keyLength; i++) {
    var randomIndex = Math.floor(Math.random() * characters.length);
    key += characters.charAt(randomIndex);
  }

  return key;
}

