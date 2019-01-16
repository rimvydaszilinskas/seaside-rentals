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