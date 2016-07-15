// NOTES
// https://bost.ocks.org/mike/bar/
// 7 day forecast of avergae temps]




// the Results array from REMS comes back with a length of 10
// Using the arrow keys, cycling through until i = 9, then move
// to the next page of information
// This will also allow the creation of a 7 day forecast


var url = 'http://marsweather.ingenology.com/v1/archive/?page=1&format=jsonp';
getAPI(url);

function getAPI(url) {
	$.ajax({
		dataType: 'jsonp',
		url: url,
		crossDomain:true,
		success: handleResult,
		error: ajaxError

	});
}
function ajaxError() {
	console.log("ERROR!");
}
function changeDataArrows(el, data) {
	var newSol;

	//Left Arrow
	el[0].addEventListener('click', function() {

		
	});

	//Right Arrow
	el[1].addEventListener('click', function() {
		console.log('clicked');
	});
}
function handleResult(response) {
	// for (var i = 0; i < response.results.length; i++) {
	// 	if(i < 10)
			startStuff(response.results[0]);
		// else
		// 	console.log("Move to next page");
	//}
}
function initializeDataStructure(data) {
	var degSymbol = String.fromCharCode(176);

	var dataStructure = {
		solDate: {
			sol: data.sol,
			date: data.terrestrial_date
		},

		tempMax: {
			arr: [ data.max_temp, convertFahrenheit(data.max_temp), convertKelvin(data.max_temp)],
			unit: [degSymbol + 'C', degSymbol + 'F', 'K'],
			numValue: document.getElementById('maxTemp'),
			numUnit: document.getElementById('maxTempUnit'),
			iD: 'tempMax'
		},

		tempMin: {
			arr: [ data.min_temp, convertFahrenheit(data.min_temp), convertKelvin(data.min_temp)],
			unit: [degSymbol + 'C', degSymbol + 'F', 'K'],
			numValue: document.getElementById("minTemp"),
			numUnit: document.getElementById("minTempUnit"),
			iD:  'tempMin'
		},

		pressure: {
			arr: [ data.pressure, convertAtm(data.pressure), convertmBar(data.pressure)],
			unit: ['Pa', 'atm', 'mBar'],
			numValue: document.getElementById('pressure'),
			numUnit: document.getElementById('pressureUnit'),
			iD: 'pressure'
		},

		solarDay: {
			sunrise: convertRemsDate(data.sunrise),
			sunriseLoc: document.getElementById('sunRise'),
			sunset:convertRemsDate(data.sunset),
			sunsetLoc: document.getElementById('sunSet'),
			iD: 'solarDay'
		}
	}

	return dataStructure;
}

function initializeHeader(data) {
	//HEADER
	document.getElementById('latestSol').textContent = 'Sol: ' + data.sol;
	document.getElementById('latestEarth').textContent = formatShortDate(data.terrestrial_date);

	//OPACITY
	document.getElementById('atmo_icon').className = getAtmoOpacityIcon(data.atmo_opacity);
	document.getElementById('atmoText').innerText = data.atmo_opacity;
}

function startStuff(response, index) {
	console.log(response);

	var data = response //.results[0];
	var unitButtons = document.getElementsByClassName('unitButton');
	var solArrows = document.getElementsByClassName('solArrow');
	var dataStructure = initializeDataStructure(data);

	initializeHeader(data);
	populateCard(unitButtons, dataStructure);

	//Initialize Value Unit Conversion Buttons
	//setUpEventListener(unitButtons, 1, dataStructure);
	for (var i = 0; i < unitButtons.length; i++) {
		setUpEventListener(unitButtons, i, dataStructure);
	}
	
	//Set up Unit conversion buttons to have appropriate cursor on hover
	cursorPointer(unitButtons);
	cursorPointer(solArrows);
	changeDataArrows(solArrows, data);
}

function setUpEventListener(el, index, dataStructure) {

	// for (var i = 0; i < el.length; i++) {
	// 	el[i].addEventListener('click', function () {
	// 		toggleUnits(el, i, dataStructure);
	// 	})
	// }

	el[index].addEventListener("click", function() {
		toggleUnits(el, index, dataStructure);
	});
}

function cursorPointer(el) {
	for (var i = 0; i < el.length; i++) {
		el[i].style.cursor = 'pointer';
	}

	return;
}

function populateCard(el, dataStructure) {

	dataStructure.tempMax.numValue.innerText = dataStructure.tempMax.arr[0];
	dataStructure.tempMax.numUnit.innerText = dataStructure.tempMax.unit[0];

	dataStructure.tempMin.numValue.innerText = dataStructure.tempMin.arr[0];
	dataStructure.tempMin.numUnit.innerText = dataStructure.tempMin.unit[0];

	dataStructure.pressure.numValue.innerText = dataStructure.pressure.arr[0];
	dataStructure.pressure.numUnit.innerText = dataStructure.pressure.unit[0];

	dataStructure.solarDay.sunriseLoc.innerText = dataStructure.solarDay.sunrise;
	dataStructure.solarDay.sunsetLoc.innerText = dataStructure.solarDay.sunset;

	return;
}

//Toggle units, add the da
function toggleUnits(el, index, dataStructure) {
	switch(index) {
		case 0:
			for (var i = 0; i < dataStructure.tempMax.unit.length; i++) {
				if(el[index].innerText == dataStructure.tempMax.unit[i]) {
					if(i < 2) {
						el[index].innerText = dataStructure.tempMax.unit[i+1];
						dataStructure.tempMax.numValue.innerText = dataStructure.tempMax.arr[i+1];
						break;
					}
					if(i = 2) {
						el[index].innerText = dataStructure.tempMax.unit[0];
						dataStructure.tempMax.numValue.innerText = dataStructure.tempMax.arr[0];
						break;
					}
				}
			}

			break;
		case 1:

			for (var i = 0; i < dataStructure["tempMin"].unit.length; i++) {
				if(el[index].innerText == dataStructure["tempMin"].unit[i]) {
					if(i < 2) {
						el[index].innerText = dataStructure["tempMin"].unit[i+1];
						dataStructure["tempMin"].numValue.innerText = dataStructure["tempMin"].arr[i+1];
						break;
					}
					if(i = 2){
						el[index].innerText = dataStructure.tempMin.unit[0];
						dataStructure.tempMin.numValue.innerText = dataStructure.tempMin.arr[0];
						break;
					}
				}
			}
			break;
		case 2:
			for (var i = 0; i < dataStructure["pressure"].unit.length; i++) {
				if(el[index].innerText == dataStructure["pressure"].unit[i]){
					if(i < 2) {
						el[index].innerText = dataStructure["pressure"].unit[i+1];
						dataStructure["pressure"].numValue.innerText = dataStructure["pressure"].arr[i+1];
						break;
					}
					if(i = 2) {
						el[index].innerText = dataStructure.pressure.unit[0];
						dataStructure.pressure.numValue.innerText = dataStructure.pressure.arr[0];
						break;
					}
				}
			}
			break;
		case 3:
			console.log("minTemp");
			break;
		default :
			console.log(ERROR);
			break;
	}
}

// Parse the date from REMS
function convertRemsDate(date) {
	return date.slice(11,19);
}

// Temperature Conversion Functions
function convertKelvin(temp) {
	return Number((temp +273.15).toFixed(2));
}

function convertFahrenheit(temp) {
	return Number(((temp * (9/5)) + 32).toFixed(2));
}

// Convert Pressure to Atmospheres
function convertAtm(pressure) {
	return ((pressure) / (101325)).toFixed(5);
}

// Convert Pressure to mili-Bars
function convertmBar(pressure) {
	return (pressure / 100);
}

// Return Atmosphere Opacity from REMS
function getAtmoOpacityIcon(atmo) {
	if(atmo.atmo_opacity == "Sunny")
		console.log("Sunny Day");
	return "wi wi-day-sunny";
}

//Date Formatting Functions
function formatShortDate(date) {
return date.replace(/-/g, ".");
}

function getMarsTime() {
	var time =	new Date();
	var h = time.getHours();
	var m = time.getMinutes();

	var julianDate = 367 * year - trunc(7*(year + trunc((month+9)/12))/4) + 
	trunc((275*month)/9) + day + 1721013.5 + UT()/24 + 
	(1/2)*sign(100*year+month-190002.5) + 0.5;
}

function trunc(num) {
	return num.toFixed(0);
}

function sign(num) {
	if(num > 0)
		return 1;
	else if(num < 0)
		return -1;
}

function UT() {
 var time =	new Date();
 var h = time.getHours();
 var m = time.getMinutes();

 return h + (m / 60);
}