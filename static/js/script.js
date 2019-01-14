var priceSlider = document.getElementById("priceRange");
var priceOutput = document.getElementById("maxPrice");
var capacitySlider = document.getElementById("minimumCapacity");
var capacityOutput = document.getElementById("minCapacity");

priceOutput.innerHTML = priceSlider.value;
capacityOutput.innerHTML = capacitySlider.value;

priceSlider.oninput = function() {
  priceOutput.innerHTML = this.value;
}

capacitySlider.oninput = function() {
  capacityOutput.innerHTML = this.value;
}
