find.addEventListener("click", function (e) {
  getData(searchCity.value);
  searchCity.value = "";
  searchCity.blur();
});

searchCity.addEventListener("keyup", function (e) {
  if (e.key === "Enter") {
    getData(searchCity.value);
    searchCity.value = "";
    searchCity.blur();
  }
});
