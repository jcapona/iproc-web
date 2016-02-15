$(document).ready(function() {

  $('body').scrollspy({target: "#nav-btns", offset: 50});

  $(".nav-buttons a").on('click', function(e) {
    e.preventDefault();
    var hash = this.hash;

    $('html, body').animate({
      scrollTop: $(hash).offset().top-50
    }, 1000, function(){
      window.location.hash = hash;
    });
  });

});