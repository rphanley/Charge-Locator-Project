       // Note: This example requires that you consent to location sharing when
      // prompted by your browser. If you see the error "The Geolocation service
      // failed.", it means you probably did not give permission for the browser to
      // locate you.
      var map, infoWindow;
      //var pos;

      function initMap() {
        //pos = google.maps.LatLng(-34.397, 150.644);

        infoWindow = new google.maps.InfoWindow;
        // Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
              //console.log(position.coords.latitude);
            var pos = new google.maps.LatLng({
              lat: position.coords.latitude,
              lng: position.coords.longitude
          });
            // console.log(pos.lat(), pos.lng());
            map = new google.maps.Map(document.getElementById('map'), {
                center: pos,
                zoom: 10
            });

            infoWindow.setPosition(pos);
            infoWindow.setContent('Your location');
            infoWindow.open(map);
            map.setCenter(pos);
            //Now do the search for nearby charge points
            doSearch(pos);

          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });



        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }





      }

       function doSearch(startPos) {

           //Test places request
            // console.log(startPos.lat(), startPos.lng());
           var request = {
                location: startPos,
                keyword: 'electric car charger',
                rankBy: google.maps.places.RankBy.DISTANCE

            };

            var service = new google.maps.places.PlacesService(map);
            service.nearbySearch(request, callback);

            function callback(results, status) {
                if (status == google.maps.places.PlacesServiceStatus.OK) {
                    for (var i = 0; i < results.length; i++) {
                        var place = results[i];
                        createMarker(results[i],i);
                        console.log(results[i].name);
                    }
                }
                }


       }


      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
      }

       function createMarker(place, index) {
               var myicon = {
        path: "M296 160H180.6l42.6-129.8C227.2 15 215.7 0 200 0H56C44 0 33.8 8.9 32.2 20.8l-32 240C-1.7 275.2 9.5 288 24 288h118.7L96.6 482.5c-3.6 15.2 8 29.5 23.3 29.5 8.4 0 16.4-4.4 20.8-12l176-304c9.3-15.9-2.2-36-20.7-36z", //SVG path of awesomefont marker
        fillColor: '#008489', //color of the marker
        fillOpacity: 1,
        strokeWeight: 0,
        scale: 0.09, //size of the marker, careful! this scale also affects anchor and labelOrigin
        anchor: new google.maps.Point(200,510), //position of the icon, careful! this is affected by scale
        labelOrigin: new google.maps.Point(205,190) //position of the label, careful! this is affected by scale
    }

        var marker = new google.maps.Marker({
           position: place.geometry.location,
           map: map,
           label:{
               fontFamily: 'FontAwesome',
               text:'\uf0e7' ,
                color: '#008489'
            },
            icon:myicon,

          title: place.name + ' ' + index
        });
        //marker.setIcon("assets/images/ecar.png");
       }


// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("settings");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}


