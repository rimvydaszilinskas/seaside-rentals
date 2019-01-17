$(window).scroll(function(){
  if($(document).scrollTop() > 20){
    $("#navigation").addClass("shrink");
  } else {
    $("#navigation").removeClass("shrink");
  }
});

$("#beds").on("change", () => {
  $("#minBeds").html($("#beds").val());
});

$("#price").on("change", () => {
  $("#maxPrice").html($("#price").val());
});