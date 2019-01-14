var priceSlider = document.getElementById("priceRange");
var priceOutput = document.getElementById("maxPrice");
var capacitySlider = document.getElementById("minimumCapacity");
var capacityOutput = document.getElementById("minCapacity");
var bedSlider = document.getElementById("minimumBeds");
var bedOutput = document.getElementById("minBeds");


priceOutput.innerHTML = priceSlider.value;
capacityOutput.innerHTML = capacitySlider.value;
bedOutput.innerHTML = bedSlider.value;

priceSlider.oninput = function() {
  priceOutput.innerHTML = this.value;
}

capacitySlider.oninput = function() {
  capacityOutput.innerHTML = this.value;
}

bedSlider.oninput = function() {
  bedOutput.innerHTML = this.value;
}
