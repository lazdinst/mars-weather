var apiKey = "T6rafj3bCGvJ4FG8fsqOdckwJrji1RYOdlQR59YS";
var solNo = "1386"
var url = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=" + solNo + "&camera=fhaz&api_key=" + apiKey;

$.ajax({
  url: url,
  success: handleResult
});

function handleResult(result){
  console.log(result);
}