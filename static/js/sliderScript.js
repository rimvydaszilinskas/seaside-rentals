var priceSlider = document.getElementById("priceRange");
var priceOutput = document.getElementById("maxPrice");
var roomSlider = document.getElementById("minimumRoom");
var roomOutput = document.getElementById("minRoom");
var bedSlider = document.getElementById("minimumBeds");
var bedOutput = document.getElementById("minBeds");

priceOutput.innerHTML = priceSlider.value;
roomOutput.innerHTML = roomSlider.value;

bedSlider.oninput = function() {
  bedOutput.innerHTML = this.value;
}

priceSlider.oninput = function() {
  priceOutput.innerHTML = this.value;
}

roomSlider.oninput = function() {
  roomOutput.innerHTML = this.value;
}

$(".filter").on("change", () => {
  // collect all the filters
  var filters = {};
  if($("#type").val() !== "*"){
    filters.type = $("#type").val();
  }
  if($("#location").val() !== "*"){
    filters.location = $("#location").val();
  }
  filters.rooms = $("#minimumRoom").val();
  filters.price = $("#priceRange").val();
  filters.beds = $("#minimumBeds").val();

  // send a request
  $.ajax({
    url: "/api/filter/count",
    method: "POST",
    data: filters,
    success: (response) => {
      console.log(response);
      $("#resultCount").html(`${response})`);
    },
    error: (err) => {
      console.log(err);
    }
  })
});