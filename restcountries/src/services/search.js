import axios from "axios";
const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api/all";
const api_key = process.env.REACT_APP_API_KEY;

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const getCountry = (name) => {
  return axios
    .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
    .then((response) => response.data);
};

const getWeather = (list) =>
  axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${list[0].latlng[0]}&lon=${list[0].latlng[1]}&appid=${api_key}&units=metric`
    )
    .then((response) => response.data);

const services = { getAll, getCountry, getWeather };

export default services;
