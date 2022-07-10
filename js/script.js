navigator.geolocation.getCurrentPosition(showPosition);
function showPosition(position) {
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;
  isLocation = true;
  getData({ latitude, longitude });
}
if (!isLocation) getData("Kakanj");
