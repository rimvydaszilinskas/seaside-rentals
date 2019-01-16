$(window).scroll(function(){
  if($(document).scrollTop() > 20){
    $("#navigation").addClass("shrink");
  } else {
    $("#navigation").removeClass("shrink");
  }
});
