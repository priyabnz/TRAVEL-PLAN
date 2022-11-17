import { haversineDistance, constructQueryParams } from "../libs/helper";

export const fetchCities = (inputValue) => {
	return fetch('/api/cities/' + inputValue)
		.then((response) => response.json())
		.then((data) => {
			return data;
		}).catch(error => {
			console.error(error);
			throw error;
		});
}

/**
 * @param  {Object} values
 */
export const getCitiesDistance = (values) => {
	let distances = {}, destinationToMap = [];
	return fetch(`/api/cities?${constructQueryParams(values)}`)
		.then((response) => response.json())
		.then((data) => {
			data.forEach(function (item, index) {
				destinationToMap.push({ ...item.coordinates, value: item.value });
				if (index < data.length - 1) {
					const nextDestination = data[index + 1];
					const currentDestination = item;
					distances[`${currentDestination.value} - ${nextDestination.value}`] =
						haversineDistance(currentDestination.coordinates, nextDestination.coordinates)
				}
			});
			return { distances, destinationToMap }
		}).catch(error => {
			console.error(error);
		});
}