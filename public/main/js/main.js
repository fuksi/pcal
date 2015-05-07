$(window).load(function() {
	// glDatePicker scripts
	$('#mydate').glDatePicker(
		{
			cssName: 'flatwhite',
			containerWidth: '250px',
			showAlways: true,
		    allowMonthSelect: false,
		    allowYearSelect: false,
		    prevArrow: '\u25c4',
		    nextArrow: '\u25ba',
		    selectedDate: new Date()
		}
	);

	$.get("http://gofullstack.me:8000/getevent", function( data ) {
  		console.log("this is the received data");
  		console.log(data.events);
  		data.events.forEach( function(ele) {
  			var offset = parseInt((parseFloat(ele.time.slice(0,2)) + parseFloat(ele.time.slice(3))/60)*75 - 75*5);
  			var height = parseInt(75 * parseFloat(ele.duration));
  			var eventClass = 'class="event ' + ele.color + '" id="' + ele._id + '" ';
  			var style = 'style="top: ' + offset + 'px; height: ' + height + 'px"';
  			var singleEvent = '<div ' + eventClass + style + '><span class="remove ">-</span>' + ele.name + '</div>';
  			
  			$('.' + ele.date + ' .actual-events').append(singleEvent);
  		});
	});

	$('#submit-event').click(function() {
		setTimeout(function() {
			window.location = "http://gofullstack.me:8000/home";
		}, 1000);
	});


})


$(document).ready(function() {
	setTimeout(function() {
		$('.remove').click(function() {
			var eventID = $(this).parent().attr('id')
			var form = '<form id="hidden-login-form" style="display: none" method="post" action="http://gofullstack.me:8000/deleteevent">';
			form = form + '<input type="text" name="eventID" value="' + eventID + '">';
			form = form + '</form>';
			$('body').append(form);
			$('#hidden-login-form').submit();
			setTimeout(function() {
				window.location = "http://gofullstack.me:8000/home";
			}, 500);
		});
	}, 500);
})