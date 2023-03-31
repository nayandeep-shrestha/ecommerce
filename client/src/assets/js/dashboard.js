// (function($) {
//   "use strict"; // Start of use strict

//   // Toggle the side navigation
//   // document.querySelector("#sidebarToggle, #sidebarToggleTop").addEventListener('click', function(e) {
//   //   document.body.classList.toggle("sidebar-toggled");
//   //   document.querySelector(".sidebar").classList.toggle("toggled");
//   //   if (document.querySelector(".sidebar").classList.contains("toggled")) {
//   //     document.querySelector('.sidebar .collapse').collapse('hide');
//   //   };
//   // });

//   // Close any open menu accordions when window is resized below 768px
//   document.querySelector(window).resize(function() {
//     if (document.querySelector(window).width() < 768) {
//       document.querySelector('.sidebar .collapse').collapse('hide');
//     };
    
//     // Toggle the side navigation when window is resized below 480px
//     if (document.querySelector(window).width() < 480 && !document.querySelector(".sidebar").classList.contains("toggled")) {
//       document.body.classList.add("sidebar-toggled");
//       document.querySelector(".sidebar").classList.add("toggled");
//       document.querySelector('.sidebar .collapse').collapse('hide');
//     };
//   });

//   // Prevent the content wrapper from scrolling when the fixed side navigation hovered over
//   document.querySelector('body.fixed-nav .sidebar').addEventListener('mousewheel DOMMouseScroll wheel', function(e) {
//     if (document.querySelector(window).width() > 768) {
//       var e0 = e.originalEvent,
//         delta = e0.wheelDelta || -e0.detail;
//       this.scrollTop += (delta < 0 ? 1 : -1) * 30;
//       e.preventDefault();
//     }
//   });

//   // Scroll to top button appear
//   document.querySelector(document).addEventListener('scroll', function() {
//     var scrollDistance = document.querySelector(this).scrollTop;
//     if (scrollDistance > 100) {
//       document.querySelector('.scroll-to-top').fadeIn();
//     } else {
//       document.querySelector('.scroll-to-top').fadeOut();
//     }
//   });

//   // Smooth scrolling using jQuery easing
//   document.querySelector(document).addEventListener('click', 'a.scroll-to-top', function(e) {
//     var $anchor = document.querySelector(this);
//     document.querySelector('html, body').stop().animate({
//       scrollTop: (document.querySelector($anchor.attr('href')).offset().top)
//     }, 1000, 'easeInOutExpo');
//     e.preventDefault();
//   });

// })(jQuery); 