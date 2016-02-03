$(function(){
	console.info('The app is ready!');
	$('#nav-toggle-box').click(expandMenu);


	function expandMenu(){
		$('#primary-navigation').toggleClass('nav-expanded');
	}
});