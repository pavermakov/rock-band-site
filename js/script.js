$(function(){
	console.info('The app is ready!');
	$('#nav-toggle-box').click(expandMenu);


	function expandMenu(){
		$('#drop-navigation').toggleClass('nav-expanded');
	}
});
