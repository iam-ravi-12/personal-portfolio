(function ($) {
  "use strict";

  /*================================================================= 
        Pre Loader 
    ==================================================================*/
  $(".js-preloader").preloadinator({
    animation: "fadeOut",
    animationDuration: 400,
  });

  /*================================================================= 
        Particle Js
    ==================================================================*/

  particlesJS("particles-js", {
    particles: {
      number: {
        value: 20,
        density: {
          enable: true,
          value_area: 400,
        },
      },
      color: {
        value: "#ffffff",
      },
      shape: {
        type: "circle",
        stroke: {
          width: 0,
          color: "#000000",
        },
        polygon: {
          nb_sides: 3,
        },
        image: {
          src: "img/github.svg",
          width: 100,
          height: 100,
        },
      },
      opacity: {
        value: 0.1,
        random: false,
        anim: {
          enable: false,
          speed: 1,
          opacity_min: 0.1,
          sync: false,
        },
      },
      size: {
        value: 4,
        random: true,
        anim: {
          enable: false,
          speed: 30,
          size_min: 0.1,
          sync: false,
        },
      },
      line_linked: {
        enable: true,
        distance: 150,
        color: "#ffffff",
        opacity: 0.2,
        width: 2,
      },
      move: {
        enable: true,
        speed: 12,
        direction: "none",
        random: false,
        straight: false,
        out_mode: "out",
        bounce: false,
        attract: {
          enable: false,
          rotateX: 200,
          rotateY: 300,
        },
      },
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: {
          enable: false,
          mode: "repulse",
        },
        onclick: {
          enable: true,
          mode: "push",
        },
        resize: true,
      },
      modes: {
        grab: {
          distance: 300,
          line_linked: {
            opacity: 1,
          },
        },
        bubble: {
          distance: 100,
          size: 80,
          duration: 2,
          opacity: 0.8,
          speed: 3,
        },
        repulse: {
          distance: 100,
          duration: 0.4,
        },
        push: {
          particles_nb: 4,
        },
        remove: {
          particles_nb: 2,
        },
      },
    },
    retina_detect: true,
  });

  /*================================================================= 
        Isotope initialization 
    ==================================================================*/
  var $grid = $(".grid").isotope({
    // options
  });
  // layout Isotope after each image loads
  $grid.imagesLoaded().progress(function () {
    $grid.isotope("layout");
  });

  // filter items on button click
  $(".filter-button-group").on("click", "button", function () {
    var filterValue = $(this).attr("data-filter");
    $grid.isotope({
      filter: filterValue,
    });
  });

  /* checking active filter */
  // change is-checked class on buttons
  var buttonGroups = document.querySelectorAll(".button-group");
  for (var i = 0, len = buttonGroups.length; i < len; i++) {
    var buttonGroup = buttonGroups[i];
    radioButtonGroup(buttonGroup);
  }

  function radioButtonGroup(buttonGroup) {
    buttonGroup.addEventListener("click", function (event) {
      // only work with buttons
      if (!matchesSelector(event.target, "button")) {
        return;
      }
      buttonGroup.querySelector(".active").classList.remove("active");
      event.target.classList.add("active");
    });
  }

  /*================================================================= 
        Testimonial carousel
    ==================================================================*/
  const swiper = new Swiper(".swiper", {
    // Optional parameters
    breakpoints: {
      1200: {
        slidesPerView: 3,
      },
      992: {
        slidesPerView: 2,
      },
      576: {
        slidesPerView: 1,
      },
    },
    //slidesPerView: 3,
    spaceBetween: 24,
    loop: true,
    autoplay: {
      delay: 5000,
    },

    // If we need pagination
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });

  /*================================================================= 
        Partner carousel
    ==================================================================*/
  const swiper2 = new Swiper(".partnerCarousel", {
    // Optional parameters
    breakpoints: {
      1200: {
        slidesPerView: 6,
      },
      992: {
        slidesPerView: 4,
      },
      576: {
        slidesPerView: 3,
      },
      320: {
        slidesPerView: 2,
      },
    },
    //slidesPerView: 6,
    spaceBetween: 24,
    loop: true,
    autoplay: {
      delay: 5000,
    },
  });

  /*================================================================= 
        Map
    ==================================================================*/
  var map = L.map("mapwrapper").setView([22.58875, 88.42685], 12);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  var greenIcon = L.icon({
    iconUrl: "image/location.png",

    iconSize: [48, 48], // size of the icon
  });

  L.marker([22.58875, 88.42685], {
    icon: greenIcon,
  }).addTo(map);

  /*================================================================= 
        Navbar fixed top
    ==================================================================*/
  $(document).ready(function () {
    var menu = $(".site-header nav");
    var origOffsetY = $(".hero-area").height();

    function scroll() {
      if ($(window).scrollTop() >= origOffsetY) {
        $(".site-header nav").addClass("fixed-top");
      } else {
        $(".site-header nav").removeClass("fixed-top");
      }
    }

    document.onscroll = scroll;
  });

  /*================================================================= 
        Contact form 
    ==================================================================*/
  $(function () {
    // Here is the form
    var form = $("#fungi-contact");

    // Getting the messages div
    var formMessages = $(".form-message p");

    // Setting up an event listener for the contact form
    $(form).submit(function (event) {
      // Stopping the browser to submit the form
      event.preventDefault();

      // Serializing the form data
      var formData = $(form).serialize();

      // Submitting the form using AJAX
      $.ajax({
        type: "POST",
        url: $(form).attr("action"),
        data: formData,
      })
        .done(function (response) {
          // Making the formMessages div to have the 'success' class
          $(formMessages).removeClass("error");
          $(formMessages).addClass("success");

          // Setting the message text
          $(formMessages).text(response);

          // Clearing the form after successful submission
          $("#inputName").val("");
          $("#inputEmail").val("");
          $("#inputPhone").val("");
          $("#inputMessage").val("");
        })
        .fail(function (data) {
          // Making the formMessages div to have the 'error' class
          $(formMessages).removeClass("success");
          $(formMessages).addClass("error");

          // Setting the message text
          if (data.responseText !== "") {
            $(formMessages).text(data.responseText);
          } else {
            $(formMessages).text(
              "Oops! An error occured and your message could not be sent."
            );
          }
        });
    });
  });

  /*================================================================= 
        Animating numbers
    ==================================================================*/
  $(".counter").counterUp({
    delay: 10,
    time: 3000,
  });

  /*================================================================= 
        Progress bar animation
    ==================================================================*/
  var waypoint = new Waypoint({
    element: document.getElementById("skill-section"),
    handler: function () {
      $(".progress .progress-bar").css("width", function () {
        return $(this).attr("aria-valuenow") + "%";
      });
    },
    //offset: 'bottom-in-view',
    offset: 700,
  });

  /*================================================================= 
        Animate on scroll initialization
    ==================================================================*/
  AOS.init({
    once: true,
  });
})(jQuery);
