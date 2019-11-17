var map, infoWindow, search_position;
var start_blink;
var resultPlaces = [];
var markers = [];
var start_marker = null;
var chargepointIcon;
var startIcon;
var markerColour = '#4cbb17';
var altStart = false;
var blinkIntervalSec = 0;
var on = true;
var setupDone = false;
var saveDefaultLocation = false;
var defaultLocationLat = null;
var defaultLocationLng = null;

const lightningIcon = "M296 160H180.6l42.6-129.8C227.2 15 215.7 0 200 0H56C44 0 33.8 8.9 32.2 20.8l-32 240C-1.7 275.2 9.5 288 24 288h118.7L96.6 482.5c-3.6 15.2 8 29.5 23.3 29.5 8.4 0 16.4-4.4 20.8-12l176-304c9.3-15.9-2.2-36-20.7-36z";
const carIcon = "M 1275.93 392.966 c 12.428 0 22.487 10.079 22.487 22.488 c 0 12.408 -10.06 22.487 -22.487 22.487 c -12.409 0 -22.488 -10.079 -22.488 -22.487 C 1253.44 403.045 1263.52 392.966 1275.93 392.966 L 1275.93 392.966 Z M 1063.31 381.67 c 0 -14.037 5.153 -14.037 7.73 -14.037 c 16.881 -35.803 20.139 -35.803 29.495 -35.803 c 62.928 0 42.646 0 105.574 0 c 12.202 0 18.303 0 53.714 35.803 c 24.673 0 31.247 0.619 51.859 3.669 c 19.686 5.277 22.179 14.305 22.179 23.291 v 0.433 h -20.323 c -0.557 0 -1.031 0.475 -1.031 1.031 c 0 0.578 0.475 1.031 1.031 1.031 h 20.323 c -0.02 20.076 -0.475 23.044 -12.408 23.044 h -19.335 c 0.269 -1.525 0.413 -3.091 0.413 -4.678 c 0 -14.697 -11.914 -26.61 -26.609 -26.61 c -14.182 0 -25.765 11.109 -26.569 25.105 h -95.228 c -0.556 0 -1.03 0.454 -1.03 1.03 c 0 0.557 0.475 1.031 1.03 1.031 h 95.207 c 0.021 1.401 0.164 2.762 0.392 4.122 h -108.913 c 0.268 -1.525 0.392 -3.091 0.392 -4.678 c 0 -7.111 -2.782 -13.583 -7.338 -18.366 h 77.006 c 0.578 0 1.031 -0.453 1.031 -1.031 c 0 -0.556 -0.453 -1.031 -1.031 -1.031 h -79.211 c -4.617 -3.854 -10.574 -6.183 -17.046 -6.183 c -14.696 0 -26.61 11.913 -26.61 26.61 c 0 1.587 0.146 3.153 0.412 4.678 h -2.122 c -19.52 0 -22.468 -0.02 -22.9 -23.044 h 17.212 c 0.576 0 1.03 -0.453 1.03 -1.031 c 0 -0.556 -0.454 -1.031 -1.03 -1.031 h -17.253 C 1063.31 391.193 1063.31 386.782 1063.31 381.67 L 1063.31 381.67 Z M 1195.23 367.634 l -5.834 -29.619 h -50.127 v 29.619 H 1195.23 Z M 1191.5 338.015 l 5.833 29.619 h 53.756 c -4.638 -4.617 -9.338 -9.192 -14.181 -13.583 c -3.937 -3.545 -8.06 -7.131 -12.388 -10.182 c -4.205 -2.968 -8.204 -5.297 -13.398 -5.73 c -1.648 -0.124 -3.339 -0.124 -5.008 -0.124 H 1191.5 Z M 1137.21 367.634 v -29.619 h -29.021 c -1.278 0 -2.906 -0.042 -4.144 0.227 c -2.246 0.516 -4.349 3.504 -5.564 5.236 c -2.186 3.133 -4.081 6.575 -5.855 9.935 c -2.493 4.659 -4.822 9.44 -7.11 14.222 H 1137.21 Z M 1114.62 392.966 c 12.408 0 22.467 10.079 22.467 22.488 c 0 12.408 -10.059 22.487 -22.467 22.487 c -12.429 0 -22.487 -10.079 -22.487 -22.487 C 1092.13 403.045 1102.19 392.966 1114.62 392.966 L 1114.62 392.966 Z M 1114.62 403.271 c 6.72 0 12.161 5.462 12.161 12.182 c 0 6.719 -5.441 12.181 -12.161 12.181 c -6.74 0 -12.183 -5.462 -12.183 -12.181 C 1102.44 408.733 1107.88 403.271 1114.62 403.271 L 1114.62 403.271 Z M 1275.93 403.271 c 6.719 0 12.181 5.462 12.181 12.182 c 0 6.719 -5.462 12.181 -12.181 12.181 c -6.72 0 -12.182 -5.462 -12.182 -12.181 C 1263.74 408.733 1269.21 403.271 1275.93 403.271 L 1275.93 403.271 Z";


//Main function for the Google maps API initialisation
function initMap() {
    
    checkSettings();

    infoWindow = new google.maps.InfoWindow;
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
        
            search_position = new google.maps.LatLng({
                lat: position.coords.latitude,
                lng: position.coords.longitude
            });

            map = new google.maps.Map(document.getElementById('map'), {
                center: search_position,
                zoom: 10
            });

            updateStatus("Got current location: " + search_position.lat().toString() + " , " + search_position.lng().toString());
            
            //Set up the marker icons
            setupIcons();
            // Add listener for map click, to allow the user select an alternate start location
            addMapClickListener();
            //We have the current/start location. Now do the search for nearby charge points
            doSearch(search_position);

        }, function () {
            handleLocationError(true, infoWindow, map.getCenter());
        });



    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }





}

//Function to do a nearby search for charge points in Google maps
function doSearch(startPos) {
    updateStatus("Searching for charge points..");
    createStartMarker(startPos);
    map.setCenter(startPos);
    var onlyTesla = (document.getElementById("tesla_car").checked === true);
    var isTeslaCP = false;

    //Set up the charge point search
    var request = {
        location: startPos,
        keyword: 'electric car charger',
        rankBy: google.maps.places.RankBy.DISTANCE

    };

    //Do the search (nearby search in Google maps)
    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, callback);

    //Callback function - get charge point location results, filter by Tesla/non-Tesla if required
    function callback(results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
                isTeslaCP = (~results[i].name.toLowerCase().indexOf("tesla"));
                if ((onlyTesla && isTeslaCP) || (!onlyTesla && !isTeslaCP)) {
                    resultPlaces.push(results[i]);
                    console.log(results[i].name);
                }


            }
            //Create the markers for each charge point location
            for (var j = 0; j < resultPlaces.length; j++) {
                createChargepointMarker(resultPlaces[j], j);
            }

            //Prompt the user if settings need to be saved
            if (!setupDone)
                updateStatus("Please change settings if needed, and Save.");
            //If a default location setting has been requested, prompt the user
            else if (saveDefaultLocation) {
                updateStatus('Click on the map to select a default location.');
            }
            else //Just report the number of charge points found.
                updateStatus(resultPlaces.length.toString() + " charge point(s) found.");

            //Clear the settings modal message area
             $("#settings_text").text("");

        }
    }



}




//Function to handle an error in geolocation
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    updateStatus("Geolocation service failed.");
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);

     //Initialise the search location to default position if set
     if (defaultLocationLat &&(defaultLocationLng)) {
          search_position = new google.maps.LatLng({
                lat: parseFloat(defaultLocationLat),
                lng: parseFloat(defaultLocationLng)
            });
            
     }
}

//Function to create markers at the charge point locations found in the search
function createChargepointMarker(place, index) {

    //Set the closest charge point marker (0) to green, others to blue
    index === 0 ? markerColour = '#4cbb17' : markerColour = '#0356fc';
    chargepointIcon.fillColor = markerColour;


    var marker = new google.maps.Marker({
        position: place.geometry.location,
        map: map,
        icon: chargepointIcon,
        title: place.name
    });

    //Add click event listener for each charge point marker
    addMarkerClickListener(marker);

    markers.push(marker);


    //Set blink interval for marker 0 closest marker, if the blink interval is > 0 seconds
    var blinkInterval = (document.getElementById("blink_speed").value);
    if (!isNaN(blinkInterval)) blinkIntervalSec = parseFloat(blinkInterval);

    if (index === 0 && (blinkIntervalSec)) {
        blinkMarker(marker);
    }

}

//Function to blink the marker of the charge point closest to your location/alternate start point
function blinkMarker(targetMarker) {

    start_blink = setInterval(function () {
        if (on) {
            targetMarker.setMap(null);
        }
        else {
            targetMarker.setMap(map);
        }
        on = !on;
    }, blinkIntervalSec * 1000);
}

// Create a marker (car icon) at your location/alternate start point
function createStartMarker(startPos) {
    start_marker = new google.maps.Marker({
        position: startPos,
        map: map,
        icon: startIcon,
        title: 'Your location'
    });

}

//Event listener for a click on the map, to select a default location or an alternate centre/start point for the search
function addMapClickListener() {
    google.maps.event.addListener(map, 'click', function (event) {

        //Get the default location or alternate start position from the map click        
        search_position = event.latLng;
        map.panTo(search_position);


        if (saveDefaultLocation) {
            document.getElementById("default_location").checked = false;
            saveDefaultLocation = false;
            defaultLocationLat = search_position.lat().toString();
            defaultLocationLng = search_position.lng().toString();
            updateStatus("Set default location at " + defaultLocationLat + " , " + defaultLocationLng);
            return;
        }
        else altStart = true;

        //Clear the existing markers
        clearMarkers();
        //New search at the new location
        doSearch(search_position);
    });

}

//Event listener for a click on a charge point marker, to select it for navigation
function addMarkerClickListener(destMarker) {
    //Add listener for marker click event, to select the destination charge point
    google.maps.event.addListener(destMarker, 'click', function () {
        if (confirm("You selected " + destMarker.title + " . Click OK to navigate to it, or Cancel to return to the map")) {
            if (altStart) {
                window.open("https://www.google.com/maps/dir/?api=1&travelmode=driving&dir_action=navigate&origin=" + search_position.lat().toString() + "," + search_position.lng().toString() + "&destination=" + destMarker.position.lat().toString() + "," + destMarker.position.lng().toString());
                updateStatus('Alternate start point selected.');
            }
            else {
                window.open("https://www.google.com/maps/dir/?api=1&travelmode=driving&dir_action=navigate&destination=" + destMarker.position.lat().toString() + "," + destMarker.position.lng().toString());
                updateStatus('Geolocated start point selected.');
            }


        }
        else updateStatus('Marker selection cancelled.');
    });

}

function setupIcons() {

    chargepointIcon = {
        path: lightningIcon,
        fillColor: markerColour,
        fillOpacity: 0.7,
        strokeWeight: 0,
        scale: 0.09, //size of the marker. This scale also affects anchor and labelOrigin!
        anchor: new google.maps.Point(200, 510), //position of the icon, affected by scale!
        labelOrigin: new google.maps.Point(205, 190) //position of the label, affected by scale!
    };

    startIcon = {
        path: carIcon,
        fillColor: 'black',
        fillOpacity: 1,
        strokeWeight: 0,
        scale: 0.12, //size of the marker. Also affects anchor!
        anchor: new google.maps.Point(1200, 400), //icon position, affected by scale!
    };
}

function clearMarkers() {
    resultPlaces = [];
    clearInterval(start_blink);
    start_marker.setMap(null);
    start_marker = null;
    markers.forEach(element => {
        element.setMap(null);
    });
}

function updateStatus(statusText) {
    $("#status_text").text("");
    $("#status_text").text(statusText);
}

function checkSettings() {
    setupDone = localStorage.getItem("setup_done");
    if (!setupDone) {
        $("#settings_text").text("Please change settings if needed, and Save.");
        updateStatus("Please change settings if needed, and Save.")
        $("#settingsModal").slideDown("slow");
    }
    else {
        $("#settings_text").text("");
        getStoredSettings();
        updateStatus('Loaded settings..');
    }

     //Initialise the search location to default position if set
     if (defaultLocationLat &&(defaultLocationLng)) {
          search_position = new google.maps.LatLng({
                lat: parseFloat(defaultLocationLat),
                lng: parseFloat(defaultLocationLng)
            });
            
     }
}

function getStoredSettings() {
    if (! (defaultLocationLat && defaultLocationLng)) {
        defaultLocationLat = localStorage.getItem("default_lat");
        defaultLocationLng = localStorage.getItem("default_lng");
    }

    var tesla = localStorage.getItem("tesla");
    if (tesla === Boolean(true).toString()) {
        (document.getElementById("tesla_car").checked = true);
    }
    else if (tesla === Boolean(false).toString()) {
        (document.getElementById("tesla_car").checked = false);
    }

    var blinkSpeed = localStorage.getItem("blink_speed");
    document.getElementById("blink_speed").value = blinkSpeed;

}

function setStoredSettings() {

    if (defaultLocationLat &&(defaultLocationLng)) {
        localStorage.setItem("default_lat",defaultLocationLat);
        localStorage.setItem("default_lng",defaultLocationLng);
    }

    localStorage.setItem("tesla", document.getElementById("tesla_car").checked.toString());

    localStorage.setItem("blink_speed", document.getElementById("blink_speed").value);

    localStorage.setItem("setup_done", "true");
    setupDone=true;

}

// Get the modal
var modal = document.getElementById("settingsModal");

// Get the button that opens the modal
var settingsButton = document.getElementById("settings");

// Get the button that cancels the modal
var cancelButton = document.getElementById("cancel");

// Get the Save button
var saveButton = document.getElementById("save");

// When the user clicks on the button, open the modal
settingsButton.onclick = function () {
    $("#settingsModal").slideDown("slow");

}

// When the user clicks on Save, save settings,close the modal and refresh the search
saveButton.onclick = function () {
    setStoredSettings();
    $("#settings_text").css('color', 'red');
    $("#settings_text").text("Settings saved.");

    //If the user has selected to choose a default start location, store it
    saveDefaultLocation = (document.getElementById("default_location").checked);
    
    if (saveDefaultLocation) {
        updateStatus('Click on the map to select a default location.');
    }
    else updateStatus('Saved settings..');

    $("#settingsModal").slideUp("slow");
    //Clear the existing markers
    clearMarkers();
    //New search with (potentially) new settings
    doSearch(search_position);

}

// When the user clicks on Cancel, close the modal without saving settings
cancelButton.onclick = function () {
    $("#settingsModal").slideUp("slow");
    updateStatus('Settings cancelled..');
}




