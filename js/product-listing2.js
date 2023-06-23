// ------------- WORKING WITH FIXED NAVBAR(commented out because we use bootstrap for this) -------------------
$(document).ready(function () {

  // -------------GENERATE RANDOM FUNKY COLOR FOR THE BUYING BUTTON and price------------------

  var colors = [
    "#2c3e50",
    "#d42b6a",
    "#43bc8d",
    "#60b748",
    "#2aced5",
    "#3c81c3",
    "#f39c12",
    "#4b3bc4",
    "#7822dd",
    "#b21ce3",
    "#ca35b6",
    "#c1673e",
    "#62d12e",
    "#c44e3b",
    "#d5882a",
    "#fd79a8",
    "#8adb24",
    "#2327dc",
    "#21de96",
    "#c8d32c",
    "#e4af1d",
    "#631de4",
    "#e45c1d",
    "#684b96",
    "#4c4ec9",
    "#3bbb94",
    "#17ac1e",
    "#9dbb16",
    "#cac036",
  ];


  let buyingButtons = $(".buying-button");
  let prices = $(".card-subtitle");
  let usedColors = [];

  let productWrapper = $(".product-wrapper");
  // console.log(productWrapper.length);
  // console.log(productWrapper);

  // console.log(buyingButtons.length);

  for (let i = 0; i < buyingButtons.length; i++) {
    let randomColor;

    // Generate a unique random color
    do {
      randomColor = colors[Math.floor(Math.random() * colors.length)];
    } while (usedColors.includes(randomColor)); // the used colors overlaps with the random color, we do another loop

    // add the color to the usedColors array
    usedColors.push(randomColor);

    $(prices[i]).css("color", randomColor);
    $(buyingButtons[i]).css("background-color", randomColor);
  }

  // ------------------------------------- Working with click animation -------------------------------------
  for (let i = 0; i < productWrapper.length; i++) {
    $(productWrapper[i]).hover(
      function () {
        // console.log(directory[i]);
        let animation = $(productWrapper[i]).addClass("animation");
        let height = $(productWrapper[i]).css("height");
        let imgSource = $(productWrapper[i]).find("img").attr('src');

        console.log(imgSource);

        animation.css({
          height: `${height}`,
          border: "none",
          cursor: "pointer",
          backgroundImage: `linear-gradient(rgba(63, 100, 34, 0.5), rgba(51, 95, 18, 0.5)), url(${imgSource})`,
          backgroundSize: "cover",
          animation: "backgroundIMG 0.6s linear",
        });

        let div = $(productWrapper[i]).find(".card-body");
        div.css({
          color: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        });

        let headFive = div.find("h5");
        headFive.css({
          fontSize: "35px",
        });

        let paragraph = div.find("p");
        paragraph.css({
          fontSize: "20px",
        });

        let subTitle = div.find(".card-subtitle");
        subTitle.css({
          color: "white",
          fontSize: "18px",
        });

        let images = $(productWrapper[i]).find("img");
        images.css({
          display: "none",
        });
      },
      function () {
        $(this).removeClass("animation");
        let animation = $(productWrapper[i]).addClass("animation");
        console.log(animation);
        animation.css({
          height: "",
          border: "",
          cursor: "",
          backgroundImage: ``,
          backgroundSize: "",
          animation: "",
        });

        var div = $(productWrapper[i]).find("div");
        div.css({
          color: "",
        });

        var headFive = div.find("h5");
        headFive.css({
          color: "",
          fontSize: "",
        });

        var paragraph = div.find("p");
        paragraph.css({
          fontSize: "",
        });

        var subTitle = div.find(".card-subtitle");
        var rndColor = $(buyingButtons[i]).css("background-color");
        // console.log(rndColor);

        subTitle.css({
          color: `${rndColor}`,
          fontSize: "",
        });

        var images = $(productWrapper[i]).find("img");
        images.css({
          display: "block",
        });
      }
    );

    // ------------ activate pop up----------------

    $(buyingButtons[i]).click(function (e) {
      e.preventDefault();
      let id = $(buyingButtons[i]).find('span').attr("id");
      console.log(id);
      
      $.ajax({
          url: "admin/php/fetch_product_data.php?id=" + id,
          type: "GET",
          dataType: "json",
          success: function(response) {
            productDetail = response;
            console.log(response);
            setUpData(response);
          }
        });
      
      $("#popup-container").fadeIn();
      });

    $("#cancel-btn").click(function () {
      $("#popup-container").fadeOut();
    });
  }
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



function setUpData(response){
  $('#popup-image').attr("src", response['image']);
  $('#popup-name').html(response['name']);
  $('#popup-price').html(response['price']);
  $('#popup-descrip').html(response['description']);
  $('#order-btn').attr("href",  `Order-form.html?id=${response['id']}`);
}

function getCookie(name){
  var cookies = document.cookie.split(';');
  for (var i = 0; i < cookies.length; i++){
    var cookie = cookies[i].trim();
    if (cookie.startsWith(name + '=')){
      return decodeURIComponent(cookie.substring(name.length + 1));
    }
  }
  return '';
}