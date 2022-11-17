
import { CITY_OPTIONS } from "./constant";
import { fetchCities } from "../api";

const filterCity = (inputValue, cityList) => {
  return cityList.filter((i) =>
    i.label.toLowerCase().includes(inputValue.toLowerCase())
  );
};
/**
 * @param  {object} coords1,coords2
 * link : https://stackoverflow.com/questions/14560999/using-the-haversine-formula-in-javascript
 */
export const haversineDistance = (coords1, coords2) => {
  const { lat: lat1, lng: lon1 } = coords1;
  const { lat: lat2, lng: lon2 } = coords2;

  function toRad(x) {
    return x * Math.PI / 180;
  }
  //radius of earth in km
  var R = 6371;

  var x1 = lat2 - lat1;
  var dLat = toRad(x1);
  var x2 = lon2 - lon1;
  var dLon = toRad(x2)
  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d;
}

/**
 * @param  {object} values
 */
export const constructDistanceResult = (values) => {

  let cityList = [], destinationToMap = [], distances = {};

  cityList.push(...(values.startCity && [values.startCity]),
    ...values.intermediateCity, ...(values.endCity && [values.endCity]));

  if (cityList.length > 0) {
    cityList.forEach(element => {
      const { coordinates, value } = CITY_OPTIONS.find(v => v.value === element);
      destinationToMap.push({ ...coordinates, value });
    });
  };
  destinationToMap.forEach(function (item, index) {
    if (index < destinationToMap.length - 1) {
      const nextDestination = destinationToMap[index + 1];
      const currentDestination = item;
      distances[`${currentDestination.value} - ${nextDestination.value}`] =
        haversineDistance(currentDestination, nextDestination)
    }
  });

  return { distances, destinationToMap };
}

export const constructQueryParams = ({ endCity, startCity, intermediateCity }) => {
  let cityList = []
  cityList.push(...(startCity && [startCity]),
    ...intermediateCity, ...(endCity && [endCity]));
  return cityList.reduce((acc, current) => {
    return acc += `&value=${current}`
  }, "?");
}

export const promiseOptions = (inputValue) => {
  return new Promise(function (resolve, reject) {
    fetchCities(inputValue).then((data) => {
      setTimeout(() => {
        resolve(data);
      }, 1000);
    }).catch(error => {
      console.error(error);
      throw error;
    });
  })
}

/**
 * @param  {string || array of string} value
 * @param  {string} key
 */
export const getCity = (value, key = "") => {
  if (key) {
    return value?.map(value => {
      return {
        label: value,
        value: value
      }
    })
  };
  return CITY_OPTIONS.find(v => v.value === value);
}
/**
 * @param  {string} params
 */
export const paramsFormData = (params) => {
  return {
    startCity: params.get("startCity") ?? "",
    intermediateCity:  params.get("intermediateCity") ? params.get("intermediateCity")?.split(",").filter(v => v.trim() !== "") : "",
    endCity: params.get("endCity") ?? "",
    passengers: params.get("passengers") ?? "",
    startDate: params.get("startDate") === null ? new Date() : new Date(params.get("startDate")),
    endDate: params.get("endDate") === null ? new Date() : new Date(params.get("endDate")),
    showIntermediateCity:params.get("showIntermediateCity") ? Boolean(params.get("showIntermediateCity")) : false
  }
}