$(document).ready(function() {
	$(".sb_content #p1").append("<hr>");
	$(".container p").prepend("<hr>");
	//$(".container p").append("<hr>");

	//Accordion sidebar 
	$("#p1").click(function (){
		$(".accordion1").slideDown();
		$(".accordion2").slideUp();
		$(".accordion3").slideUp();
		console.log("Create new account boxes slided down");
	});
	$("#p2").click(function (){
		$(".accordion2").slideDown();
		$(".accordion1").slideUp();
		$(".accordion3").slideUp();
		console.log("Sign In boxes slided down");
	});
	$("#p3").click(function (){
		$(".accordion3").slideDown();
		$(".accordion1").slideUp();
		$(".accordion2").slideUp();
		console.log("Enter email box slided down");
	});

});