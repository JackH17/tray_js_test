const fetch = require("node-fetch");



const BASE_URL = `https://grudwxjpa2.execute-api.eu-west-2.amazonaws.com/dev/`
const API_KEY = `VOwvpnwUvc2uRxdwSzkxd2JOc40iXbAma6NgF9Lt`

const reqOBJ = {

	method: `GET`,
	withCredentials: true,
	credentials: 'include',
	headers: {
		"x-api-key": `${API_KEY}`
	}

}

const compareMax = (a, b) => {
	const maxA = a.temperature_max
	const maxB = b.temperature_max
  
	let comparison = 0;

	if (maxA > maxB) {
	  comparison = 1;
	} else if (maxA < maxB) {
	  comparison = -1;
	}
	return comparison * -1;
}


// Get maximum temperate for a year - Must return a number
exports.getMaxTemperature = async ({location, year}) => {

	let data

	try {

		const yearlyInfo = await fetch(`https://grudwxjpa2.execute-api.eu-west-2.amazonaws.com/dev/${location}/year/${year}`, reqOBJ)
		const yearlyData = await yearlyInfo.json();
		
		const sortedData = yearlyData.result.sort(compareMax)

		data = sortedData;
	
	} catch(err){

		return 0;
	}

	return data[0].temperature_max
}

const compareMin = (a, b) => {

	const minA = a.temperature_min
	const minB = b.temperature_min
  
	let comparison = 0;

	if (minA > minB) {
	  comparison = 1;
	} else if (minA < minB) {
	  comparison = -1;
	}
	return comparison;
}

// Get minimum temperature for a year - Must return a number
exports.getMinTemperate = async ({location, year}) => {
	let data

	try {

		const yearlyInfo = await fetch(`https://grudwxjpa2.execute-api.eu-west-2.amazonaws.com/dev/${location}/year/${year}`, reqOBJ)
		const yearlyData = await yearlyInfo.json();
		
		const sortedData = yearlyData.result.sort(compareMin)

		data = sortedData;
	
	} catch(err){
		return 0;
	}

	return data[0].temperature_min
}

// Get maximum temperate for all years - Must return a number
exports.getMaxTemperatureForLocation = async ({location}) => {

	let allYears 

	try {

		const res = await fetch(`${BASE_URL}/${location}/years`, reqOBJ)
		const data = await res.json();
		allYears = data.result

	} catch(err){

		return 0;
	}

	let tempMax = 0;

	for(let i = allYears.startYear; i <= allYears.endYear; i++){

		try {

			const yearlyInfo = await fetch(`https://grudwxjpa2.execute-api.eu-west-2.amazonaws.com/dev/${location}/year/${i}`, reqOBJ)
			const yearlyData = await yearlyInfo.json();

			const sortedData = yearlyData.result.sort(compareMax)

			if(sortedData[0].temperature_max > tempMax){
				tempMax = sortedData[0].temperature_max
			}


		} catch(err){
			return 0;
		}
	}

	return tempMax
}

// Get minimum temperature for all years - Must return a number
exports.getMinTemperateForLocation = async ({location}) => {
	let allYears 

	try {

		const res = await fetch(`${BASE_URL}/${location}/years`, reqOBJ)
		const data = await res.json();
		allYears = data.result

	} catch(err){

		return 0;
	}

	let tempMin = null;

	for(let i = allYears.startYear; i <= allYears.endYear; i++){

		try {

			const yearlyInfo = await fetch(`https://grudwxjpa2.execute-api.eu-west-2.amazonaws.com/dev/${location}/year/${i}`, reqOBJ)
			const yearlyData = await yearlyInfo.json();

			const sortedData = yearlyData.result.sort(compareMin)

			if(!tempMin){
				tempMin = sortedData[0].temperature_min
			}

			if(sortedData[0].temperature_min < tempMin){
				tempMin = sortedData[0].temperature_min
			}


		} catch(err){
			return 0;
		}
	}

	return tempMin
}

// Get average sun hours for a year - Must return a number
exports.getAverageSunHours = async ({location, year}) => {

	let data

	try {

		const yearlyInfo = await fetch(`https://grudwxjpa2.execute-api.eu-west-2.amazonaws.com/dev/${location}/year/${year}`, reqOBJ)
		const yearlyData = await yearlyInfo.json();
		
		let reducedArr = yearlyData.result.reduce((a, b) => ({sun: a.sun + b.sun}));

		data = reducedArr.sun
			
	} catch(err){
		return 0;
	}

	return Math.floor(data / 12)
}

// Get average sun hours for all years - Must return a number
exports.getAverageSunHoursForLocation = async ({location}) => {
	let allYears

	try {

		const res = await fetch(`${BASE_URL}/${location}/years`, reqOBJ)
				const data = await res.json();
				allYears = data.result
		
	} catch(err){
		
		return 0;
	}
		
	let avSunHours = [];
		
	for(let i = allYears.startYear; i <= allYears.endYear; i++){
		
		try {
		
			const yearlyInfo = await fetch(`https://grudwxjpa2.execute-api.eu-west-2.amazonaws.com/dev/${location}/year/${i}`, reqOBJ)
			const yearlyData = await yearlyInfo.json();
					
			let reducedArr = yearlyData.result.reduce((a, b) => ({sun: a.sun + b.sun}));
			
			
			if(reducedArr.sun){

				avSunHours.push(Math.floor(reducedArr.sun / 12))
			}	
		} catch(err){
			return 0;
		}		
	}

			
	return Math.floor((avSunHours.reduce((a, b) => a + b, 0) / avSunHours.length));
}