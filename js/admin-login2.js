$(document).ready(function () {
  console.log("jquery ready");

  // sending login info to login.php via ajax

  $("#login-form").submit(function (event) {
    event.preventDefault();

    // let formData = $(this).serialize();
    let formData = new FormData(this);
    let userID = generateUserId();
    console.log(userID);
    formData.append("user_id", userID);

    // send the ajax object
    $.ajax({
      type: "POST",
      url: "php/login.php",
      data: formData,
      dataType: "json",
      processData: false,
      contentType: false,
      success: function (response) {
        console.log(response);

        if (response.status === "success") {
          $("#message-container")
            .text("Login successful!")
            .addClass("text-success")
            .removeClass("text-danger");

          $(".user-input").removeClass("error");

          // Perform any additional actions upon successful login, such as redirecting to a dashboard page

          setTimeout(function () {
            $("#message-container").text("Redirecting...");
            setTimeout(function () {
              window.location.href = "../admin/index.php";
            }, 750);
          }, 750);
        } else {
          $("#message-container")
            .text("Invalid username or password")
            .addClass("text-danger")
            .removeClass("text-success");

          // Add error class
          $(".user-input").addClass("error");
        }
      },
      error: function (response) {
        console.log("error");
        console.log(response);

        $("#message-container")
          .text("An error occurred. Please try again.")
          .addClass("text-danger")
          .removeClass("text-success");

        // Add error class
        $(".user-input").addClass("error");
      },
    });
  });
});

function generateUserId() {
  var currentDate = new Date().getTime().toString();
  var randomString = Math.random().toString(36).substring(2, 15);
  var userId = currentDate + randomString;
  return userId;
}
