	var directionsDisplay;
	var directionsService = new google.maps.DirectionsService();
	var map;

	function placeSugg(place) {
		var input = document.getElementById(place);
        var autocomplete = new google.maps.places.Autocomplete(input);
	}

	function calDist() {
		var origin = document.getElementById('from_loc').value,
		    destination = document.getElementById('to_loc').value;

		var service = new google.maps.DistanceMatrixService();
		  service.getDistanceMatrix(
	    {
	      origins: [origin],
	      destinations: [destination],
	      travelMode: google.maps.TravelMode.DRIVING,	
	      unitSystem: google.maps.UnitSystem.METRIC,
	      avoidHighways: false,
	      avoidTolls: false
	    }, callback);
		initialize();
		plotRoute();
	}

	function initialize() {
  		directionsDisplay = new google.maps.DirectionsRenderer();
		var mapOptions = {
    		zoom:7
		};

  		map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
  		directionsDisplay.setMap(map);
	}

	function plotRoute() {
  		var start = document.getElementById('from_loc').value;
		var end = document.getElementById('to_loc').value;
		var request = {
			origin:start,
    		destination:end,
    		travelMode: google.maps.TravelMode.DRIVING
		};
  		directionsService.route(request, function(response, status) {
    		if (status == google.maps.DirectionsStatus.OK) {
    			directionsDisplay.setDirections(response);
    		}
		});
	}

	function callback(response, status) {
		if(status=="OK") {
			var result = document.getElementById("outputDiv");
			result.innerHTML = response.rows[0].elements[0].distance.text;
		} else {
			alert("Error: " + status);
		}
	}
