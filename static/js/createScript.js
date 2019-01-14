var totalSteps = 4;
var currentStep = 1;

var step1 = $("#location-form");
var step2 = $("#price-description-form");
var step3 = $("#comodities-form");
var step4 = $("#picture-form");

var data = {};

$("form").submit(()=>{
	return false;
});
		
$(".continue-btn").on("click", ()=>{
	if(currentStep === 1){
		if($("#address").val().length === 0 || $("#city").val().length === 0){
			alert("Nera duomenu");
			return;
		}
		currentStep++;
	} else if(currentStep === 2){
		//check if data is ok
		if($("#price").val().length === 0){
			alert("Iveskite duomenis");
			return;
		}
		currentStep++;
	} else if(currentStep === 3){
		currentStep++;
	} else if(currentStep === 4){
		
	}
	
	if(currentStep === 1){
		step1.fadeIn("slow");
	} else if(currentStep === 2){
		
		// collect the data
		data.address = $("#address").val();
		data.city = $("#city").val();
		
		step1.fadeOut("slow").promise().done(()=>{
			step2.fadeIn("slow");
		});
	} else if(currentStep === 3){
		// collect the data
		data.price = $("#price").val();
		data.description = $("#description").val();
		
		step1.fadeOut("slow").promise().done(()=>{
			step2.fadeOut("slow").promise().done(()=>{
				step3.fadeIn("slow");
			});
		});
	} else if(currentStep === 4){
		data.space = $("#space").val();
		data.beds = $("#beds").val();
		data.rooms = $("#rooms").val();
		data.kitchen = $("#kitchenCheck").is(":checked");
		data.wc = $("#toiletCheck").is(":checked");
		
		console.log(data);
		step1.fadeOut("slow").promise().done(()=>{
			step2.fadeOut("slow").promise().done(()=>{
				step3.fadeOut("slow").promise().done(()=>{
					step4.fadeIn("slow");
				});
			});
		});
	}
});
		
function checkForMatch(){
}
		
function setPercentage(){
	$(".progress-bar").css({
		width: percentageCompleted,
	});
}