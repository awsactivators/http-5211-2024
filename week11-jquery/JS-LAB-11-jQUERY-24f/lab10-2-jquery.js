//LAB 10 - 2 INVENTORY PAGE
$(window).on("load", function() {
	$('.desc').hide().addClass('descJQuery');


	//ADD <tr> MOUSEOVER and MOUSEOUT FUNCTIONS 

	$('tr').hover(
		function(){
			$(this).css({
				"background": "red", "color": "white"
			}).addClass('trJQuery');
		},
		function(){
			$(this).css({
				"background": "white", "color": "black"
			}).addClass('trJQuery');
		}
	);


	//ADD <tr> CLICK LISTENER 
	$('tr').on("click", function(){
		$('.desc').hide();
		$(this).find('.desc').show()
	});



	
})

