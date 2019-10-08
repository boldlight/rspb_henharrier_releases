var trackers = [];
var pois = [];
var usualRoute = [];
var map;
var globalbounds;


var Red = '#e6194b';
var Green = '#3cb44b';
var Yellow = '#ffe119';
var Deep_blue = '#0082c8';
var Orange = '#f58231';
var Purple = '#911eb4';
var Cyan = '#46f0f0';
var Magenta = '#f032e6';
var Lime = '#d2f53c';
var Pink = '#fabebe';
var Teal = '#008080';
var Lavender = '#e6beff';
var Brown = '#aa6e28';
var Beige = '#fffac8';
var Maroon = '#800000';
var Mint = '#aaffc3';
var Olive = '#808000';
var Coral = '#ffd8b1';
var Navy = '#000080';
var Grey = '#808080';
var Black = '#000000';
var Petrol = '#0d9896';
var Burnt_orange = '#983505';
var Salmon = '#de7264';
var Gold = '#ba9640';
var Red18 = '#855A5A';
var Olive18 = '#879962';
var Blue18 = '#59818D';
var Purple18 = '#674C74';
var Lavender18 = '#9C6D94';
var Mint18 = '#83C098';
var Salmon18 = '#CFA2A2';
var Grey18 = '#8F8F8F';
var Red19 = '#A00000';
var Blue19 = '#004AAC';
var Green19 = '#009458';


var trackerConfig = {
	trackers: [
		
	
		{ name: 'Aalin', colour: Olive },
		{ name: 'Arthur', colour: Green },
		{ name: 'Beater', colour: Yellow },
		{ name: 'Bonny', colour: Deep_blue },
		{ name: 'Calluna', colour: Orange },
		{ name: 'Carroll', colour: Purple },
		{ name: 'Chance', colour: Cyan },
		{ name: 'Deecee', colour: Magenta },
		{ name: 'Donald', colour: Lime },
		{ name: 'Elwood', colour: Pink },
		{ name: 'Eric', colour: Teal},
		{ name: 'Finn', colour: Olive18},
		{ name: 'Harriet', colour: Brown},
		{ name: 'Heather', colour: Beige },
		{ name: 'Hermione', colour: Maroon },
		{ name: 'Holly', colour: Mint },
		{ name: 'Keen', colour: Red },
		{ name: 'Lia', colour: Coral },
		{ name: 'Mairie', colour: Navy },
		{ name: 'Manu', colour: Grey },
		{ name: 'Marci', colour: Black },
		{ name: 'Nyx', colour: Petrol },
		{ name: 'Rain', colour: Burnt_orange },
		{ name: 'Rannoch', colour: Salmon },
		{ name: 'Saorsa', colour: Gold},
		{ name: 'Sirius', colour: Red18 },
		{ name: 'Skylar', colour: Lavender},
		{ name: 'Thoth', colour: Blue18 },
		{ name: 'Tony', colour: Purple18},
		{ name: 'Vulcan', colour: Mint18 },
		{ name: 'Wendy', colour: Salmon18},
		{ name: 'Doona', colour: Blue19},	
		{ name: 'Apollo', colour: Navy },
		{ name: 'Cyan', colour: Grey },
		{ name: 'Tornado', colour: Black },
		{ name: 'Ada', colour: Petrol },
		{ name: 'Oscar', colour: Burnt_orange },
		{ name: 'Marko', colour: Salmon },
		{ name: 'Sheba', colour: Gold},
		{ name: 'Mary', colour: Red18 },
		{ name: 'Maye', colour: Lavender},
		{ name: 'Gryff', colour: Blue18 },
		{ name: 'Angharad', colour: Purple18},
		{ name: 'Thistle', colour: Mint18 },
		
		

	],
	center: {lat: '54.356536', lng: '-4.458614'},
	zoom: 6
};



var poiConfig = {
	pois: [
		
		{ name: 'Deecee' },
		{ name: 'Wendy' },
		{ name: 'Harriet' },
		{ name: 'Finn' },
		{ name: 'Aalin' },
		{ name: 'Chance' },
		{ name: 'Holly' },
		{ name: 'Elwood' },
		{ name: 'Carroll' },
		{ name: 'Bonny' },
		{ name: 'Beater' },
		{ name: 'Donald' },
		{ name: 'Hermione' },
		{ name: 'Calluna' },
		{ name: 'Heather' },
		{ name: 'Eric' },
		{ name: 'Skylar' },
		{ name: 'Saorsa' },
		{ name: 'Sirius' },
		{ name: 'Lia' },
		{ name: 'Rannoch' },
		{ name: 'Tony' },
		{ name: 'Manu' },
		{ name: 'Arthur' },
		{ name: 'Keen' },
		{ name: 'Mairie' },
		{ name: 'Marci' },
		{ name: 'Nyx' },
		{ name: 'Rain' },
		{ name: 'Thoth' },
		{ name: 'Vulcan' },
		{ name: 'Doona' },
		
		{ name: 'Apollo' },
		{ name: 'Cyan' },
		{ name: 'Tornado' },
		{ name: 'Ada' },
		{ name: 'Oscar' },
		{ name: 'Marko' },
		{ name: 'Sheba' },
		{ name: 'Mary' },
		{ name: 'Maye' },
		{ name: 'Gryff' },
		{ name: 'Angharad' },
		{ name: 'Thistle' },
		

		
		

	]
};



var infowindow;


// DEFINE tracker OBJECT
function tracker(name, colour)
{
	this.name = name; // Proper name
	this.isDisplayed = false; // Displayed on map
	//this.live = null;	// Live marker
	this.live = {
		marker: null,
		info: '',
		infoWindow: null,
		icon: 'images/mapping/latest.png',
		isDisplayed: false,
		datetime: ''
	};
	this.polyline = null;	// polyline for tracker
	this.points = [];	// array of trackerPoint (LatLng and datetime)
	this.colour = colour;	// colour of polyline
	this.latlngbounds = new google.maps.LatLngBounds();	// LatLngBounds for tracker
}


// DEFINE points_of_interest OBJECT
function points_of_interest(name)
{
	this.name = name; // Proper name
	this.isDisplayed = false; // Displayed on map
	this.markers = [];	// array of markers (point (latlng), datetime, content and complete marker)
	this.latlngbounds = new google.maps.LatLngBounds();	// LatLngBounds for tracker
}




// Return slug format string of tracker name (basically get rid of spaces and lowercase)
function cleanName(inName)
{
	return inName.toLowerCase().replace(/\s+/g, '');
}

// function to show tracker on the map, display polyline, initialise live marker (but keep it hidden until the user clicks Live)
// update globalbounds to include tracker route to fit in map
// only show points within date range
function showTracker(trackerName, startRange, endRange)
{	
	// Get the route to show
	var o = trackers[trackerName];
	var p = pois[trackerName];

	
	// Reset polyline to null as it might not be displayed because of date range
	if (o.polyline != null)
	{
		o.polyline.setMap(null);
	}

	// Build polyline and rebuild latlngbounds for this tracker to fit map
	var arrPolyline = [];
	o.latlngbounds = new google.maps.LatLngBounds();

	// Loop through each points and check datetime is within range
	for (var i = 0; i < o.points.length; i++)
	{
		var pointDate = moment(o.points[i].datetime, 'YYYY-MM-DD');
		if (pointDate.isAfter(startRange) && pointDate.isBefore(endRange))
		{
			// Add LatLng to list passed to google.maps.Polyline
			// add LatLng to bounds for current tracker
			arrPolyline.push(o.points[i].point);
			o.latlngbounds.extend(o.points[i].point);
		}
	}

	// GM polyline object to place on map
	if (arrPolyline.length > 0) {
		var polyline = new google.maps.Polyline({path:arrPolyline, strokeColor: o.colour, strokeOpacity: 1, strokeWeight: 3});
		o.polyline = polyline;
		o.polyline.setMap(map);
	}
	else
	{
		// No points within date range, set bounds to null as we don't want to
		// include it in the globalbounds
		o.latlngbounds = null;
	}
	// Add the live marker object to the tracker object so we can use later on if someone click the Live button for that tracker
	// but again only do it if live object hasn't been defined
	if (o.live.marker == null)
	{
		var lastPoint = o.points[o.points.length-1];
	
		var liveMarker = new google.maps.Marker({
		position: lastPoint.point,
		icon: 'images/mapping/latest.png'
	});


		InfoWindow = new google.maps.InfoWindow({
    	content: o.live.info,
    	maxWidth: 400
	});

		bindInfoWindow(liveMarker, map, InfoWindow, o.live.info); 

        // Set infowindow to be open automatically on first display
		o.live.marker = liveMarker;
		o.live.infoWindow = InfoWindow;
	}

	// if live tracking is on, check it's within date range
	// Turned this off, because current position should be shown either way...
	if (o.live.isDisplayed) {
		//var liveDate = moment(o.live.datetime);
		//if (liveDate.isAfter(startRange) && liveDate.isBefore(endRange))
		//{
			o.live.marker.setMap(map);
		//}
		//else
		//{
		//	o.live.marker.setMap(null);
		//}
	}

	// set tracker bool isDisplayed is true
	// used for populating globalbounds and refreshing the map when date range has changed
	o.isDisplayed = true;

	resetGlobalBounds();
	
}

// Remove tracker from map, remove live marker as well (even if it's not shown)
function clearTracker(trackerName) {
	var o = trackers[trackerName];
	o.polyline.setMap(null);
	o.live.marker.setMap(null);
	// Set bool isDisplayed to false as hidden from map
	o.isDisplayed = false;

	resetGlobalBounds();

}




// function to show POI on the map
// update globalbounds to include POI markers to fit in map
function initializePOIs(birdName)
{
	
	// Get the pois object
	var p = pois[birdName];

	// Rebuild latlngbounds for these POIs to fit map
	p.latlngbounds = new google.maps.LatLngBounds();
	
	// Loop through each point
	for (var i = 0; i < p.markers.length; i++)
	{	
		//If markers are set clear them out
		if(p.markers[i].marker != null){
			p.markers[i].marker.setMap(null);
		}
		var poi_point = p.markers[i].point;

		p.markers[i].marker = new google.maps.Marker({
		position: poi_point,
		icon: 'images/mapping/poi.png',
	});

		p.markers[i].infowindow  = new google.maps.InfoWindow({
    	content: p.markers[i].content,
    	maxWidth: 600
	});

		bindInfoWindow(p.markers[i].marker, map, p.markers[i].infowindow, p.markers[i].content); 
		p.latlngbounds.extend(poi_point);
	}	
}


function showPOI(birdName, startRange, endRange){
	var p = pois[birdName];

	for (var i = 0; i < p.markers.length; i++)
	{
		
		var poiDate = moment(p.markers[i].datetime, 'YYYY-MM-DD');
			if (poiDate.isAfter(startRange) && poiDate.isBefore(endRange))
			{
				p.markers[i].marker.setMap(map);
			}
			else
			{
				p.markers[i].marker.setMap(null);
			}

	}

	p.isDisplayed = true;
	resetGlobalBounds();
}




// Remove tracker from map, remove live marker as well (even if it's not shown)
function hidePOI(birdName) {

	var p = pois[birdName];
	for (var i = 0; i < p.markers.length; i++)
	{
		p.markers[i].marker.setMap(null);
	}
	p.isDisplayed = false;
	resetGlobalBounds();
}




// loop through trackers
// find the ones that are displayed and add the bounds to the globalbounds
// to create a new globalbounds for the map
function resetGlobalBounds() {
	globalbounds = new google.maps.LatLngBounds();
	for (var i = 0; i < trackerConfig.trackers.length; i++)
	{
		var o = trackers[cleanName(trackerConfig.trackers[i].name)];
		if (o.isDisplayed)
		{
			if (o.latlngbounds != null) {
				globalbounds.extend(new google.maps.LatLng(o.latlngbounds.getNorthEast().lat(), o.latlngbounds.getNorthEast().lng(), true));
				globalbounds.extend(new google.maps.LatLng(o.latlngbounds.getSouthWest().lat(), o.latlngbounds.getSouthWest().lng(), true));
			}
		}
	}
	// if globalbounds is empty that means no trackers are displayed
	// set center and zoom level from config
	// otherwise fit map to total of each tracker bounds
	if (globalbounds.isEmpty())
	{
		map.setCenter({lat: parseFloat(trackerConfig.center.lat), lng: parseFloat(trackerConfig.center.lng)});
		map.setZoom(trackerConfig.zoom);
	}
	else
	{
		map.fitBounds(globalbounds);

		// Don't let zoom level go higher than 12.
		var listener = google.maps.event.addListener(map, "idle", function() { 
		  if (map.getZoom() > 12) map.setZoom(12); 
		  google.maps.event.removeListener(listener); 
		});
	}
}

// Refresh map after date range selection
function refreshTrackerMap() {
	for (var i = 0; i < trackerConfig.trackers.length; i++)
	{
		var o = trackers[cleanName(trackerConfig.trackers[i].name)];
		var p = pois[cleanName(trackerConfig.trackers[i].name)];
		if (o.isDisplayed)
		{
			showTracker(cleanName(trackerConfig.trackers[i].name), beginDateRange, endDateRange);
		}
		if (p.isDisplayed)
		{
			showPOI(cleanName(trackerConfig.trackers[i].name), beginDateRange, endDateRange);
		}

	}
}


function bindInfoWindow(marker, map, infowindow, html) {
    marker.addListener('click', function() {
        infowindow.setContent(html);
        infowindow.open(map, this);
    });
} 


// Show/hide live marker
function showLive(trackerName,open) {
	var o = trackers[trackerName];
	o.live.marker.setMap(map);

	var latLng = o.live.marker.getPosition(); // returns LatLng object
	map.setCenter(latLng); // setCenter takes a LatLng object

	if(open == true){
		o.live.infoWindow.open(map, o.live.marker);
	}
	o.live.isDisplayed = true;
}
function hideLive(trackerName) {
	var o = trackers[trackerName];
	o.live.marker.setMap(null);
	o.live.isDisplayed = false;
}



function createInfoWindow(textToDisplay) {
	var infowindow = new google.maps.InfoWindow({
    	content: textToDisplay,
    	maxWidth: 400
	});
	return infowindow;
}


// function to create Live position marker
function createCustomMarker(point, liveIcon){
	var Marker = new google.maps.Marker({
		position: point,
		icon: 'images/mapping/latest.png'
	});
	return Marker;
}





function initMap() {

	// Toggle view of tracker on map
	$('.tracker-toggle').on('click', function(e) {
		e.preventDefault();
		
		//if it's on, hide the route, live and poi markers
		if ($(this).hasClass('on')) {
			$(this).removeClass('on').siblings().removeClass('on');
			clearTracker($(this).parent().attr('data-tracker'));
			hideLive($(this).parent().attr('data-tracker'));
			hidePOI($(this).parent().attr('data-tracker'));
		} else {
		//if it's off, hide all other live and poi markers and switch this one on

		for (var i = 0; i < trackerConfig.trackers.length; i++){
				var name = cleanName(trackerConfig.trackers[i].name);
				var o = trackers[name];
				var p = pois[name];
	
				if (o.live.isDisplayed)
				{
					hideLive(name);
				}
				if (p.isDisplayed)
				{
					hidePOI(name);
				}
			}
			
			$('.bird-controls .live-toggle').removeClass('on');
			$('.bird-controls .poi-toggle').removeClass('on');
			$(this).addClass('on');
			showTracker($(this).parent().attr('data-tracker'), beginDateRange, endDateRange);
		}
	});


	// Toggle view of POI icon on map
	$('.poi-toggle').on('click', function(e) {
		e.preventDefault();

		//if it's on, turn it off
		if($(this).hasClass('on'))
		{
			hidePOI($(this).parent().attr('data-tracker'));
			$(this).removeClass('on');

		// if it's off, turn it on
		}else{

		//check if Live is on - if so, record that so we can keep it on
		var liveOn = false;
		if($(this).siblings('.live-toggle').hasClass('on')){
			liveOn = true;
		}

		
			//Hide all other routes, live and poi markers and turn on route and POI for this one
			for (var i = 0; i < trackerConfig.trackers.length; i++){
				var name = cleanName(trackerConfig.trackers[i].name);
				var o = trackers[name];
				var p = pois[name];
				if (o.isDisplayed)
				{
					clearTracker(name);
				}
				if (o.live.isDisplayed)
				{
					hideLive(name);
				}
				if (p.isDisplayed)
				{
					hidePOI(name);
				}
			}
			// remove 'on' class from any other bird buttons
			$('.bird-controls .btn').removeClass('on');
			//turn 'on' state on for this POI button
			$(this).addClass('on');
			// Add class on to tracker button as well
			$(this).siblings('.tracker-toggle').addClass('on');
			//if Live was on, leave it on
			if(liveOn == true){
				$(this).siblings('.live-toggle').addClass('on');
			}
			// show tracker
			if (trackers[$(this).parent().attr('data-tracker')].isDisplayed == false)
			{
				showTracker($(this).parent().attr('data-tracker'), beginDateRange, endDateRange);
			}
			//show POIs
			showPOI($(this).parent().attr('data-tracker'), beginDateRange, endDateRange);
			if(liveOn == true){
				showLive($(this).parent().attr('data-tracker'),false);
			}

		}
	});



	// Toggle view of live icon on map
	$('.live-toggle').on('click', function(e) {
		e.preventDefault();

		//if it's on, turn it off
		if($(this).hasClass('on'))
		{
			hideLive($(this).parent().attr('data-tracker'));
			$(this).removeClass('on');

		// if it's off, turn it on
		}else{

		//check if POI is on - if so, record that so we can keep it on
		var poiOn = false;
		if($(this).siblings('.poi-toggle').hasClass('on')){
			poiOn = true;
		}
			//if route is off, hide all other routes, live and poi markers and turn on route and live for this one
			for (var i = 0; i < trackerConfig.trackers.length; i++){
				var name = cleanName(trackerConfig.trackers[i].name);
				var o = trackers[name];
				var p = pois[name];
				if (o.isDisplayed)
				{
					clearTracker(name);
				}
				if (o.live.isDisplayed)
				{
					hideLive(name);
				}
				if (p.isDisplayed)
				{
					hidePOI(name);
				}
			}
			$('.bird-controls .btn').removeClass('on');
			$(this).addClass('on');
			// Add class on to tracker button as well
			$(this).siblings('.tracker-toggle').addClass('on');
			//if POI was on, leave it on
			if(poiOn == true){
				$(this).siblings('.poi-toggle').addClass('on');
			}
			// show tracker if not shown before toggling on the live marker (otherwise marker appears with no line)
			if (trackers[$(this).parent().attr('data-tracker')].isDisplayed == false)
			{
				showTracker($(this).parent().attr('data-tracker'), beginDateRange, endDateRange);
			}
			showLive($(this).parent().attr('data-tracker'),false);
			if(poiOn == true){
				showPOI($(this).parent().attr('data-tracker'), beginDateRange, endDateRange);
			}

		}
	});


	


	// initialise map object
	map = new google.maps.Map(document.getElementById('map'), {
          zoom: trackerConfig.zoom,
          		fullscreenControl: false,
				streetViewControl: false,
				mapTypeControl: false,
				zoomControl: false,
			    scrollwheel: false,
			    navigationControl: false,
			    scaleControl: false,
			    //draggable: false,
			    disableDoubleClickZoom: true,
			    TiltGestures: false,
			    AllGestures: false,
			    ZoomGestures: false,
			    ScrollGestures: false,


          zoomControlOptions: {
              position: google.maps.ControlPosition.RIGHT_TOP
          },
          center: {lat: parseFloat(trackerConfig.center.lat), lng: parseFloat(trackerConfig.center.lng)},
          styles: [
    {
        "featureType": "administrative",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#444444"
            }
        ]
    },
    {
        "featureType": "administrative.locality",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {
                "color": "#f2f2f2"
            },
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "simplified"
            },
            {
                "saturation": "-65"
            },
            {
                "lightness": "45"
            },
            {
                "gamma": "1.78"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "lightness": 45
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit.line",
        "elementType": "geometry",
        "stylers": [
            {
                "saturation": "-33"
            },
            {
                "lightness": "22"
            },
            {
                "gamma": "2.08"
            }
        ]
    },
    {
        "featureType": "transit.station.airport",
        "elementType": "geometry",
        "stylers": [
            {
                "gamma": "2.08"
            },
            {
                "hue": "#ffa200"
            }
        ]
    },
    {
        "featureType": "transit.station.airport",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit.station.rail",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit.station.rail",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "simplified"
            },
            {
                "saturation": "-55"
            },
            {
                "lightness": "-2"
            },
            {
                "gamma": "1.88"
            },
            {
                "hue": "#ffab00"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "color": "#bbd9e5"
            },
            {
                "visibility": "simplified"
            }
        ]
    }
]

    });

	

    


	// Initialise globalbounds object
	globalbounds =  new google.maps.LatLngBounds();

	// make sure zoom can't go higher than 8
	map.addListener('zoom_changed', function() {
  			  if (map.getZoom() > 8) map.setZoom(8); 
  		});


	// INITIALISE ALL TRACKERS & POIs
	for (var i = 0; i < trackerConfig.trackers.length; i++)
	{
		trackers[cleanName(trackerConfig.trackers[i].name)] = new tracker(trackerConfig.trackers[i].name, trackerConfig.trackers[i].colour, trackerConfig.trackers[i].icon);
	}

	for (var i = 0; i < poiConfig.pois.length; i++)
	{
		pois[cleanName(poiConfig.pois[i].name)] = new points_of_interest(poiConfig.pois[i].name);
	}

	

	// Loop through the data and populate each tracker object with:
	// .points = array of latlngs and datetime for building the polyline
	// .liveInfo = string with relevant information for the last point for that tracker
	$.ajax({
			url: 'data/data.xml', 
			async: false
		}).done(function(xml) {
			$(xml).find('placemark').each(function(){

				// LOOP THROUGH POINTS AND POPULATE OBJECTS
				var trackerName = cleanName($(this).find('name').text());
				
				// Get the tracker object
				var o = trackers[trackerName];

				// Get the lattitude and longitude
				var lat = $(this).find('X').text();
				var lng = $(this).find('Y').text();
				var point = new google.maps.LatLng(lat,lng, true);
				
				var datetime = $(this).find('date_time').text();
				datetime_formatted = moment(datetime,'YYYY-MM-DD').format('D MMMM YYYY');
				// Add the point to array of tracker points
				o.points.push({point: point,  datetime: $(this).find('date_time').text()});

				// Live tracker info, last one eventually parsed will be the one used on the map
				var info = '<div class="latest-info"><p class="datetime">'+datetime_formatted+'</div><div class="latest-info-text">' + $(this).find('latest_position').text() +'</div></div>';
				o.live.info = info;
				o.live.datetime = $(this).find('date_time').text();
			});
		});


	// Loop through the Points of Interest data and populate each marker object with data from the XML
	$.ajax({
			url: 'data/poi.xml', 
			async: false
		}).done(function(xml) {

			$(xml).find('marker').each(function(){

				// LOOP THROUGH POINTS AND POPULATE OBJECTS
				var POIname = cleanName($(this).find('name').text());

				// Get the poi object
				var p = pois[POIname];

				
				// Get the lattitude and longitude
				var lat = $(this).find('X').text();
				var lng = $(this).find('Y').text();
				var datetime = $(this).find('date_time').text();
				var media = $(this).find('media').text();
				var title = $(this).find('title').text();
				var text = $(this).find('text').text();
				var link = $(this).find('link').text();
				var button_text = $(this).find('button_text').text();

	    		
	    		var point = new google.maps.LatLng(lat,lng, true);
				
	    		//build up the content of the POI
				var content = '<div class="poi-info">';
				var pattern = /iframe/;
				var exists = pattern.test(media);
				if(exists)
				{
					content += '<div class="video-container">'+media+'</div>';
				}
				else if(!exists && media != ''){
					content += '<div class="image-surround">'+media+'</div>';
				}

				if(title != ''){
					content += '<h3>' + title +'</h3>';
				}
				if(datetime != ''){
					datetime_formatted = moment(datetime, 'YYYY-MM-DD').format('D MMMM YYYY');
					content += '<p class="datetime">' + datetime_formatted + '</p>';
				}
				if(text != ''){
					content += '<p class="text">' + text +'</p>';
				}
				if(link != '' && button_text != ''){
				content += '<p class="link"><a target="_blank" href="' + link +'">' + button_text + '</a></p>';
				}
				content += '</div>';



				// Add the point to array of POI points
				p.markers.push({point: point, datetime: datetime, content: content});
				
				
				
			});
		});

	
	
  		
		// Show tracker by default - which to show on load
		
		initializePOIs('deecee');
		initializePOIs('wendy');
		initializePOIs('harriet');
		initializePOIs('finn');
		initializePOIs('aalin');
		initializePOIs('chance');
		initializePOIs('holly');
		initializePOIs('elwood');
		initializePOIs('carroll');
		initializePOIs('bonny');
		initializePOIs('beater');
		initializePOIs('donald');
		initializePOIs('hermione');
		initializePOIs('calluna');
		initializePOIs('heather');
		initializePOIs('eric');
		initializePOIs('skylar');
		initializePOIs('saorsa');
		initializePOIs('sirius');
		initializePOIs('lia');
		initializePOIs('rannoch');
		initializePOIs('tony');
		initializePOIs('manu');
		initializePOIs('arthur');
		initializePOIs('keen');
		initializePOIs('mairie');
		initializePOIs('marci');
		initializePOIs('nyx');
		initializePOIs('rain');
		initializePOIs('thoth');
		initializePOIs('vulcan');
		initializePOIs('doona');
		initializePOIs('apollo');
		initializePOIs('cyan');
		initializePOIs('tornado');
		initializePOIs('ada');
		initializePOIs('oscar');
		initializePOIs('marko');
		initializePOIs('sheba');
		initializePOIs('mary');
		initializePOIs('maye');
		initializePOIs('gryff');
		initializePOIs('angharad');
		initializePOIs('thistle');
		
		

		showTracker('aday', beginDateRange, endDateRange);
		showLive('ada',false); // false = infowindow closed
		showPOI('ada', beginDateRange, endDateRange);


}
