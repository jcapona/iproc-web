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

  $("#contact-form").on('submit',function(e)
  {
    e.stopPropagation();
    e.preventDefault();

    $.ajax({
        url:'/contact',
        type:'POST',
        data:$(this).serialize(),
        error: function(jqXHR, textStatus, errorThrown) {
          $('.form-fail').html("<p>"+jqXHR.responseText+"</p>");
          $('.form-fail').removeClass("hidden");
        },
        success:function(result){
          $('.form-success').removeClass("hidden");
          $('.form-fail').addClass("hidden");
          $('.form-control').prop("disabled",true);
          $('.form-btn').prop("disabled",true);
        }
    });
  });
});