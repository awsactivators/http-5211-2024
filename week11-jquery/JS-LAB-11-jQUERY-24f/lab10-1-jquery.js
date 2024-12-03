//LAB 10 - 1 FAQ PAGE

//Use jQuery to wait for page load
$(window).on("load", function() {
	$('p').hide().addClass('panelJQuery');

	//Inside of here is your jQuery/JavaScript


	//ADD CLICK EVENT TO <h2>
	$('h2').on("click", function(){
		// Stretch Goal
		$('p').hide(3000).addClass('paraJQuery');
		$(this).next('p').slideToggle(3000);
	})


	//CHANGE <p> BACKGROUND COLOUR ON HOVER
	$('p').hover(
		function(){
			$('p').css({
				"background": "#FFE5C3", "color": "#524737"
			}).addClass('textJQuery1');
		},
		function(){
			$('p').css({
				"background": "#524737", "color": "#FFE5C3"
			}).toggleClass('textJQuery1');
		}
	);


});
