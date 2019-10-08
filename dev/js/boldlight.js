/* BOLDLIGHT SCRIPTS */



/* See mapping.js for tracking map javascript **********/



$(document).ready(function(){


//Close control panel to begin with on small screens
if ($(window).width() < 960) {
$('.map-controls').hide();
$('.map-controls-open').hide();
$('.map-controls-closed').show();
}

$('.map-controls-open a').click(function(e) {
e.preventDefault();
$('.map-controls').slideUp();
$('.map-controls-open').hide();
$('.map-controls-closed').show();
});

$('.map-controls-closed a').click(function(e) {
e.preventDefault();
$('.map-controls').slideDown();
$('.map-controls-open').show();
$('.map-controls-closed').hide();
});

$('.year-filter a').click(function(e) {
	e.preventDefault();
  $('.year-filter a').removeClass('on');
	$(this).addClass('on');
   var target = $(this).attr('rel');
   $("#"+target).show().siblings(".year-group").hide();
});


$('#spa-button').click(function(){
    $('#spa-map').slideToggle('fast', function(){
        if($('#spa-map').is(':visible')){
            $('#spa-button .button__text').html('Hide the map');
        }else{
            $('#spa-button .button__text').html('Show the map');
        }
    });
});




});
