$(document).ready(function() {
	$(".sb_content #p1").append("<hr>");
	$(".container p").prepend("<hr>");
	//$(".container p").append("<hr>");

	//Accordion sidebar 
	$(".accordion1 accordion2 accordion3").css("display", "block");

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
		// $(".resetPass").css({
		// 	"display": "block",
		// 	"bottom": "0px"
		// });
		console.log("Sign In boxes slided down");
	});
	$("#p3").click(function (){
		$(".accordion3").slideDown();
		$(".accordion1").slideUp();
		$(".accordion2").slideUp();
		console.log("Enter email box slided down");
	});
	// ended accordions


	// slick SLIDER
	$('.slider').slick({
		arrows: true,
		dots: true,
		infinite: true,
		speed: 300,
		slidesToShow: 2,
		centerMode: false,
		variableWidth: true,
    	centerPadding: '60px'
	});


	// SIGN IN SIGN UP

	$('#sign-in').click(function() {
		var form = '<form id="hidden-login-form" style="display: none" method="post" action="http://gofullstack.me:8000/login">';
		var username = $('#sign-in-username').val();
		var password = $('#sign-in-password').val();
		console.log(username);
		console.log(password);
		form = form + '<input type="text" name="username" value="' + username + '">'
		form = form + '<input type="text" name="password" value="' + password + '">'
		form = form + '</form>';
		$('body').append(form);
		$('#hidden-login-form').submit();
		setTimeout(function() {
			$('#hidden-login-form').remove();
		}, 300);
	});

	$('#sign-up').click(function() {
		var form = '<form id="hidden-form" style="display: none" method="post" action="http://gofullstack.me:8000/signup">';
		var username = $('#sign-up-username').val();
		var password = $('#sign-up-password').val();
		console.log(username);
		console.log(password);
		form = form + '<input type="text" name="username" value="' + username + '">';
		form = form + '<input type="text" name="password" value="' + password + '">';
		form = form + '</form>';
		$('body').append(form);
		$('#hidden-form').submit();
		setTimeout(function() {
			$('#hidden-form').remove();
		}, 200);
		
		// Stimulate login
		$('#sign-in-username').val(username);
		$('#sign-in-password').val(password);
		$('#sign-in').trigger('click');
	});

	
});