$(document).ready(function() {

  // HIGHLIGHT MOUSEOVER LIST ELEMENT
  $(".server-list-item").mouseenter(function() {
    $(this).addClass("active");
  });
  $(".server-list-item").mouseleave(function() {
    $(this).removeClass("active");
  });

  // POPOVER
  var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
  var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
    return new bootstrap.Popover(popoverTriggerEl)
  })


  // SERVER LIST SHOW/HIDE DETAILS
  $(".server-detail").click(function() {
    $(this).siblings(".server-detail-list").slideToggle();
  });

  
});
