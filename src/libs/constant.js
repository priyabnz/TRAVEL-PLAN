import * as Yup from 'yup';

export const GOOGLE_API_KEY = "AIzaSyAJfRw378ojCcfVNyRBilIdAnLmDqbSkBI";

export const CITY_OPTIONS = [
  { "value": "Paris", "label": "Paris", "coordinates": { "lat": 48.856614, "lng": 2.352222 } },
  { "value": "Marseille", "label": "Marseille", "coordinates": { "lat": 43.296482, "lng": 5.369780 } },
  { "value": "Lyon", "label": "Lyon", "coordinates": { "lat": 45.764043, "lng": 4.835659 } },
  { "value": "Toulouse", "label": "Toulouse", "coordinates": { "lat": 43.604652, "lng": 1.444209 } },
  { "value": "Nice", "label": "Nice", "coordinates": { "lat": 43.710173, "lng": 7.261953 } },
  { "value": "Nantes", "label": "Nantes", "coordinates": { "lat": 47.218371, "lng": -1.55362 } },
  { "value": "Strasbourg", "label": "Strasbourg", "coordinates": { "lat": 48.573405, "lng": 7.752111 } },
  { "value": "Montpellier", "label": "Montpellier", "coordinates": { "lat": 43.610769, "lng": 3.876716 } },
  { "value": "Bordeaux", "label": "Bordeaux", "coordinates": { "lat": 44.837789, "lng": -0.57918 } },
  { "value": "Lille", "label": "Lille", "coordinates": { "lat": 50.629250, "lng": 3.057256 } },
  { "value": "Rennes", "label": "Rennes", "coordinates": { "lat": 48.117266, "lng": -1.67779 } },
  { "value": "Reims", "label": "Reims", "coordinates": { "lat": 49.258329, "lng": 4.031696 } },
  { "value": "Le Havre", "label": "Le Havre", "coordinates": { "lat": 49.494370, "lng": 0.107929 } },
  { "value": "Saint-Étienne", "label": "Saint-Étienne", "coordinates": { "lat": 45.439695, "lng": 4.387178 } },
  { "value": "Toulon", "label": "Toulon", "coordinates": { "lat": 43.124228, "lng": 5.928000 } },
  { "value": "Angers", "label": "Angers", "coordinates": { "lat": 47.478419, "lng": -0.56316 } },
  { "value": "Grenoble", "label": "Grenoble", "coordinates": { "lat": 45.188529, "lng": 5.724524 } },
  { "value": "Dijon", "label": "Dijon", "coordinates": { "lat": 47.322047, "lng": 5.041480 } },
  { "value": "Nîmes", "label": "Nîmes", "coordinates": { "lat": 43.836699, "lng": 4.360054 } },
  { "value": "Aix-en-Provence", "label": "Aix-en-Provence", "coordinates": { "lat": 43.529742, "lng": 5.447427 } }
];

export const INITIAL_FORM_VALUES = {
  startCity: "",
  intermediateCity: "",
  endCity: "",
  passengers: "",
  startDate: new Date(),
  endDate: new Date(),
  showIntermediateCity: false,
}

export let FORM_VALIDATION_SCHEME = Yup.object().shape({
  showIntermediateCity: Yup.boolean(),
  intermediateCity : Yup.string().when('showIntermediateCity', {
    is: false, 
    then: Yup.string(),
    otherwise: Yup.string().required('Field is required.'),
    }),
  passengers: Yup.number().min(1).required('Field is required.'),
  startCity: Yup.string().required('Field is required.'),
  endCity: Yup.string().required('Field is required.'),
  startDate: Yup.date().default(() => new Date()).required('Field is required.'),
  endDate: Yup.date().min(
    Yup.ref('startDate'),
    'End date can`t be before Start date'
  ).required('Field is required.')
})