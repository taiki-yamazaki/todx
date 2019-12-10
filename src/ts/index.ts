import GoogleMapsLoader from "google-maps";

GoogleMapsLoader.KEY = 'API_KEY';
GoogleMapsLoader.CLIENT = 'yourclientkey';
GoogleMapsLoader.VERSION = '3.14';
GoogleMapsLoader.LIBRARIES = ['geometry', 'places'];
GoogleMapsLoader.LANGUAGE = 'ja';
GoogleMapsLoader.REGION = 'JP';

GoogleMapsLoader.load((google) => {
  console.log("loaded");
  const center = new google.maps.LatLng(26.2126803, 127.6763238);
  const options = {
    zoom: 15,
    center: center,
    mapTypeId: 'roadmap'
  };
  const map = new google.maps.Map(document.getElementById("map"), options);
  new google.maps.Marker({
    position: {lat: center.lat(), lng: center.lng()},
    map: map
  });

  const marker = [
    {lat: center.lat(), lng: center.lng()},
    {lat: center.lat() - 0.01, lng: center.lng() - 0.01},
    {lat: center.lat() - 0.01, lng: center.lng() + 0.01},
    {lat: center.lat() + 0.01, lng: center.lng() + 0.01},
    {lat: center.lat() + 0.01, lng: center.lng() - 0.01},
    {lat: 24.337612, lng: 124.154725},
    {lat: 24.338249, lng: 124.156326},
  ];
  marker.forEach(position => {
      const marker = new google.maps.Marker({position, map});
      const info = new google.maps.InfoWindow({
        content: `<span>${[position.lat, position.lng]}</span>`
      });
      marker.addListener('click', () => {
        info.open(map, marker);
      });
    }
  );

  const polyline = new google.maps.Polyline({
    path: google.maps.geometry.encoding.decodePath("ampsCg~wtVG?C]C]Ca@C_@c@BKyAM{Ae@F"),
      map
  });
  console.log(map);
});
